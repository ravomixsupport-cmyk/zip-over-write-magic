/**
 * WebView-compatible file download, print, and share utilities.
 * Handles Android WebView quirks (median.co / GoNative APK) where blob URLs fail.
 */

/** Detect if running inside an Android WebView (including median.co) */
export const isAndroidWebView = (): boolean => {
  const ua = navigator.userAgent || '';
  return ua.indexOf('Android') > -1 && (
    ua.indexOf('wv') > -1 ||
    ua.indexOf('Version/') > -1 ||
    ua.indexOf('median') > -1 ||
    ua.indexOf('gonative') > -1
  );
};

/** Detect if running inside any WebView (Android or iOS) */
export const isWebView = (): boolean => {
  const ua = navigator.userAgent || '';
  if (ua.indexOf('Android') > -1 && (
    ua.indexOf('wv') > -1 ||
    ua.indexOf('Version/') > -1 ||
    ua.indexOf('median') > -1 ||
    ua.indexOf('gonative') > -1
  )) return true;
  if (/iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua)) return true;
  return false;
};

type MedianShareBridge = {
  downloadFile?: (options: { url: string; open?: boolean }) => unknown;
  sharePage?: (options?: { url?: string; text?: string }) => unknown;
};

type MedianBridgeHost = {
  share?: MedianShareBridge;
};

const getMedianBridge = (): MedianBridgeHost | undefined => {
  const win = window as Window & {
    median?: MedianBridgeHost;
    gonative?: MedianBridgeHost;
  };
  return win.median || win.gonative;
};

const triggerMedianProtocol = (command: string, params?: Record<string, string | boolean | number | undefined>): boolean => {
  try {
    const query = params
      ? Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
          .join('&')
      : '';
    window.location.href = `median://nativebridge/${command}${query ? `?${query}` : ''}`;
    return true;
  } catch {
    return false;
  }
};

const clickHiddenLink = (href: string): boolean => {
  try {
    const a = document.createElement('a');
    a.href = href;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try { document.body.removeChild(a); } catch { /* ignore */ }
    }, 200);
    return true;
  } catch {
    return false;
  }
};

const blobToObjectUrl = (blob: Blob): string => URL.createObjectURL(new Blob([blob], { type: blob.type || 'application/octet-stream' }));

const triggerMedianBlobDownload = async (blob: Blob, fileName: string, open = false): Promise<boolean> => {
  const bridge = getMedianBridge();
  const objectUrl = blobToObjectUrl(blob);

  try {
    if (typeof bridge?.share?.downloadFile === 'function') {
      bridge.share.downloadFile({ url: objectUrl, open });
      return true;
    }

    if (clickHiddenLink(objectUrl)) {
      return true;
    }

    return triggerMedianProtocol('share/downloadFile', { url: objectUrl, open });
  } catch (err) {
    console.warn('[triggerMedianBlobDownload] failed:', err);
    return false;
  } finally {
    setTimeout(() => {
      try { URL.revokeObjectURL(objectUrl); } catch { /* ignore */ }
    }, 30000);
  }
};

const isMobileDevice = (): boolean => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');

export const closeApp = (): boolean => {
  try {
    const android = (window as any).Android;
    if (typeof android?.closeApp === 'function') { android.closeApp(); return true; }
    if (typeof android?.exitApp === 'function') { android.exitApp(); return true; }
  } catch { /* ignore */ }
  try {
    if (typeof (navigator as any).app?.exitApp === 'function') { (navigator as any).app.exitApp(); return true; }
  } catch { /* ignore */ }
  try { window.open('', '_self')?.close?.(); } catch { /* ignore */ }
  try { window.close(); } catch { /* ignore */ }
  try { window.location.replace('about:blank'); return true; } catch { return false; }
};

/** Convert a Blob to a base64 data URI */
const blobToDataUri = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Share a PDF file using Web Share API (works in WebView APKs).
 * Returns true if shared successfully.
 */
export const shareFileViaWebShare = async (blob: Blob, fileName: string, title?: string): Promise<boolean> => {
  // Always use Web Share API with File — works in both WebView and browser
  try {
    if (typeof navigator.share !== 'function') return false;
    const file = new File([blob], fileName, { type: blob.type || 'application/pdf' });
    if (navigator.canShare && !navigator.canShare({ files: [file] })) return false;
    await navigator.share({
      title: title || fileName,
      files: [file],
    });
    return true;
  } catch (err) {
    if ((err as DOMException)?.name === 'AbortError') return true;
    console.warn('[shareFileViaWebShare] failed:', err);
    return false;
  }
};

/**
 * Safe file download that works in browser and WebView (median.co APK).
 * Strategy order:
 * 1. Web Share API with file (best for WebView - triggers system share/save)
 * 2. Standard blob URL + anchor click (browsers)
 * 3. Data URI + anchor click (fallback)
 * 4. Open data URI in new window (last resort)
 */
export const safeDownload = async (blob: Blob, fileName: string): Promise<boolean> => {
  // In WebView (median.co APK), blob URLs open in system viewer (AR/PDF viewer).
  // Use Web Share API first — it lets the user "Save to Files" or share directly.
  if (isWebView()) {
    // Try Web Share API with file attachment (best approach for WebView)
    try {
      const file = new File([blob], fileName, { type: blob.type || 'application/pdf' });
      if (typeof navigator.share === 'function' && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: fileName, files: [file] });
        return true;
      }
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return true;
      console.warn('[safeDownload] WebView Web Share failed:', err);
    }

    // Fallback: data URI download (avoids blob URL viewer issue)
    try {
      const dataUri = await blobToDataUri(blob);
      const a = document.createElement('a');
      a.href = dataUri;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { try { document.body.removeChild(a); } catch {} }, 1000);
      return true;
    } catch (err) {
      console.warn('[safeDownload] WebView data URI failed:', err);
    }

    return false;
  }

  // Browser: Standard blob URL download
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
    return true;
  } catch (err) {
    console.warn('[safeDownload] Blob URL failed:', err);
  }

  // Browser fallback: Data URI
  try {
    const dataUri = await blobToDataUri(blob);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 1000);
    return true;
  } catch (err) {
    console.warn('[safeDownload] Data URI failed:', err);
  }

  return false;
};

/**
 * Safe print that works in WebView.
 * In WebView: opens a print-ready window with only the document content.
 */
export const safePrint = async (contentElementId: string): Promise<boolean> => {
  const el = document.getElementById(contentElementId);

  // In WebView/TWA: window.open is blocked, so prioritize PDF share
  if (isWebView()) {
    // Strategy 1: Generate PDF and share via Web Share API
    try {
      const { captureElementAsPdf } = await import('./documentCapture');
      const blob = await captureElementAsPdf(contentElementId);
      if (blob) {
        const shared = await shareFileViaWebShare(blob, 'document.pdf', 'Print Document');
        if (shared) return true;
        // If share was cancelled/unavailable, try downloading
        const downloaded = await safeDownload(blob, 'document.pdf');
        if (downloaded) return true;
      }
    } catch (err) {
      console.warn('[safePrint] WebView PDF share failed:', err);
    }

    // Strategy 2: Try window.print() anyway (works in some WebViews)
    try {
      window.print();
      return true;
    } catch (err) {
      console.warn('[safePrint] WebView window.print failed:', err);
    }

    // Strategy 3: Try opening print window (may be blocked in TWA)
    if (el) {
      try {
        const styles = Array.from(document.styleSheets)
          .map(sheet => {
            try { return Array.from(sheet.cssRules).map(r => r.cssText).join('\n'); }
            catch { return ''; }
          })
          .join('\n');

        const printWin = window.open('', '_blank');
        if (printWin) {
          printWin.document.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Print Document</title>
<style>
${styles}
body { margin: 0; padding: 10mm; background: white; color: black; }
* { color: black !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
@media print { body { padding: 0; margin: 10mm; } }
</style>
</head>
<body>${el.outerHTML}</body></html>`);
          printWin.document.close();
          setTimeout(() => {
            try { printWin.focus(); printWin.print(); } catch { /* user can print manually */ }
          }, 300);
          return true;
        }
      } catch (err) {
        console.warn('[safePrint] WebView print window failed:', err);
      }
    }

    return false;
  }

  // Browser: standard window.print()
  try {
    window.print();
    return true;
  } catch (err) {
    console.warn('[safePrint] Standard print failed:', err);
  }

  // Fallback: print window
  if (el) {
    try {
      const printWin = window.open('', '_blank');
      if (printWin) {
        const styles = Array.from(document.styleSheets)
          .map(sheet => {
            try { return Array.from(sheet.cssRules).map(r => r.cssText).join('\n'); }
            catch { return ''; }
          })
          .join('\n');

        printWin.document.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Print</title>
<style>${styles}
body { margin: 0; padding: 10mm; background: white; color: black; }
@media print { body { padding: 0; } }
</style></head>
<body>${el.outerHTML}</body></html>`);
        printWin.document.close();
        setTimeout(() => { try { printWin.focus(); printWin.print(); } catch {} }, 180);
        return true;
      }
    } catch (err) {
      console.warn('[safePrint] Fallback print failed:', err);
    }
  }

  return false;
};

/** Safe clipboard copy with WebView fallback */
export const safeCopyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* clipboard API blocked in WebView */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch { return false; }
};

/** Detect if running inside an iframe (e.g. Lovable preview) */
const isInIframe = (): boolean => {
  try { return window.self !== window.top; } catch { return true; }
};

const isAndroid = (): boolean => /Android/i.test(navigator.userAgent || '');
const isIOS = (): boolean => /iPhone|iPad|iPod/i.test(navigator.userAgent || '');

/**
 * Build an Android intent:// URL that opens the target app directly,
 * falling back to the browser if the app isn't installed.
 */
const buildAndroidIntent = (
  scheme: 'https' | 'http',
  hostAndPath: string,
  pkg: string,
  fallbackUrl: string,
): string => {
  return `intent://${hostAndPath}#Intent;scheme=${scheme};package=${pkg};` +
    `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
};

/** Safe URL open that works in browser, iframe preview, and WebView/TWA */
export const safeOpenUrl = (url: string) => {
  // 1) window.open with _blank — best in normal browsers and most WebViews
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) { try { win.opener = null; } catch {} return; }
  } catch { /* popup blocked or sandboxed */ }

  // 2) Inside an iframe (Lovable preview) — break out via top
  if (isInIframe()) {
    try {
      const top = window.top;
      if (top && top !== window.self) {
        top.location.href = url;
        return;
      }
    } catch { /* cross-origin top — fall through */ }
  }

  // 3) Anchor click with target=_blank — last fallback
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { try { document.body.removeChild(a); } catch {} }, 200);
    return;
  } catch { /* ignore */ }

  // 4) Direct navigation
  try { window.location.href = url; } catch { /* nothing more we can do */ }
};

/**
 * Open a custom-scheme URL (mailto:, sms:, whatsapp://, intent://).
 * Uses synchronous top-level navigation so the OS handler can fire immediately.
 */
const openSchemeUrl = (url: string) => {
  if (isInIframe()) {
    try {
      const top = window.top;
      if (top && top !== window.self) { top.location.href = url; return; }
    } catch { /* cross-origin top — fall through */ }
  }
  try { window.location.href = url; } catch { /* ignore */ }
};

/**
 * Open a normal https URL fast. Uses window.open (works in browsers + Android
 * WebView/TWA where it routes to the system browser). Falls back to top-level
 * navigation only if the popup was blocked.
 */
const fastOpen = (url: string) => {
  try {
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (w) { try { w.opener = null; } catch {} return; }
  } catch { /* popup blocked */ }
  // Iframe preview — break out via top
  if (isInIframe()) {
    try {
      const top = window.top;
      if (top && top !== window.self) { top.location.href = url; return; }
    } catch { /* cross-origin */ }
  }
  try { window.location.href = url; } catch { /* ignore */ }
};

/**
 * Open Gmail compose. On mobile we try the Gmail app deep link first, then
 * fall back to mailto: (handled by default mail app). On desktop we open
 * Gmail's web compose page in a new tab — this works even when no native
 * mail client is configured (the common cause of "Gmail doesn't open").
 */
export const openMailto = (subject: string, body: string, to = '') => {
  const su = encodeURIComponent(subject);
  const bo = encodeURIComponent(body);
  const toEnc = encodeURIComponent(to);
  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEnc}&su=${su}&body=${bo}`;
  const mailto = `mailto:${to}?subject=${su}&body=${bo}`;

  if (isAndroid()) {
    // Gmail app intent — opens Gmail directly if installed, else any mail app
    const gmailIntent = `intent://compose?to=${toEnc}&subject=${su}&body=${bo}` +
      `#Intent;scheme=mailto;package=com.google.android.gm;` +
      `S.browser_fallback_url=${encodeURIComponent(gmailWeb)};end`;
    openSchemeUrl(gmailIntent);
    return;
  }
  if (isIOS()) {
    // iOS: mailto opens Mail app; if Gmail app installed it can be set as default
    openSchemeUrl(mailto);
    return;
  }
  // Desktop: open Gmail web compose — reliable, no mail-client dependency
  fastOpen(gmailWeb);
};

export const openWhatsApp = (text: string) => {
  const encoded = encodeURIComponent(text);
  const waUrl = `https://wa.me/?text=${encoded}`;
  if (isAndroid() || isIOS()) {
    // whatsapp:// scheme launches the app instantly on both platforms
    openSchemeUrl(`whatsapp://send?text=${encoded}`);
    return;
  }
  fastOpen(waUrl);
};

export const openTelegram = (url: string, text: string) => {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  const tgUrl = `https://t.me/share/url?url=${u}&text=${t}`;
  if (isAndroid() || isIOS()) {
    openSchemeUrl(`tg://msg_url?url=${u}&text=${t}`);
    return;
  }
  fastOpen(tgUrl);
};

export const openSMS = (text: string) => {
  const sep = isIOS() ? '&' : '?';
  openSchemeUrl(`sms:${sep}body=${encodeURIComponent(text)}`);
};

export const openFacebook = (url: string) => {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  if (isAndroid()) {
    openSchemeUrl(`fb://facewebmodal/f?href=${encodeURIComponent(fbUrl)}`);
    setTimeout(() => fastOpen(fbUrl), 600);
    return;
  }
  fastOpen(fbUrl);
};

export const openTwitter = (text: string, url: string) => {
  const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  fastOpen(twUrl);
};

export const openNativeTextShare = async (title: string, text: string): Promise<boolean> => {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text });
      return true;
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return true;
      console.warn('[openNativeTextShare] Web Share failed:', err);
    }
  }
  return false;
};
