/**
 * Pure web/PWA file utilities — no Android/native-specific logic.
 */

/**
 * Download a Blob as a file using standard web APIs.
 */
export const safeDownload = async (blob: Blob, fileName: string): Promise<boolean> => {
  const ua = navigator.userAgent || '';
  const inWebView = (ua.indexOf('Android') > -1 && (ua.indexOf('wv') > -1 || ua.indexOf('Version/') > -1)) ||
    (/iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua));

  if (inWebView) {
    // WebView: blob URLs don't work reliably, use base64 data URL
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const a = document.createElement('a');
      a.href = base64;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { try { document.body.removeChild(a); } catch {} }, 1000);
      return true;
    } catch (err) {
      console.warn('[safeDownload] Base64 download failed:', err);
      return false;
    }
  }

  // Browser: standard blob URL
  try {
    const freshBlob = new Blob([blob], { type: blob.type });
    const url = URL.createObjectURL(freshBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    a.rel = 'noopener';
    document.body.appendChild(a);
    await new Promise(resolve => setTimeout(resolve, 50));
    a.click();
    setTimeout(() => {
      try { document.body.removeChild(a); } catch {}
      URL.revokeObjectURL(url);
    }, 3000);
    return true;
  } catch (err) {
    console.error('[safeDownload] Download failed:', err);
    return false;
  }
};

/**
 * Print - in WebView generates PDF and downloads, in browser uses window.print().
 */
export const safePrint = async (_contentElementId?: string): Promise<boolean> => {
  const ua = navigator.userAgent || '';
  const inWebView = (ua.indexOf('Android') > -1 && (ua.indexOf('wv') > -1 || ua.indexOf('Version/') > -1)) ||
    (/iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua));

  if (inWebView && _contentElementId) {
    try {
      const { captureElementAsPdf } = await import('./documentCapture');
      const blob = await captureElementAsPdf(_contentElementId);
      if (blob) {
        await safeDownload(blob, 'document.pdf');
        return true;
      }
    } catch (err) {
      console.warn('[safePrint] WebView PDF fallback failed:', err);
    }
    return false;
  }

  try {
    window.print();
    return true;
  } catch (err) {
    console.error('[safePrint] Print failed:', err);
    return false;
  }
};

/**
 * Copy text to clipboard with execCommand fallback.
 */
export const safeCopyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* clipboard API may be blocked */ }

  // Fallback: textarea + execCommand
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
  } catch {
    return false;
  }
};

/**
 * Open a URL externally — never inside an iframe.
 * Uses anchor click with _blank to guarantee external navigation.
 */
export const openExternal = (url: string): void => {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try { document.body.removeChild(a); } catch { /* already removed */ }
    }, 100);
  } catch (err) {
    console.error('[openExternal] Failed to open URL:', err);
    // Last resort: direct navigation
    try { window.location.href = url; } catch { /* nothing more we can do */ }
  }
};

/**
 * Open a mailto: link to trigger the email client.
 * Uses anchor click to avoid navigating the main app away.
 */
export const openMailto = (subject: string, body: string): void => {
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  try {
    const a = document.createElement('a');
    a.href = mailtoUrl;
    a.target = '_self';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try { document.body.removeChild(a); } catch { /* already removed */ }
    }, 100);
  } catch (err) {
    console.error('[openMailto] Failed to open email:', err);
  }
};

/**
 * Open WhatsApp share with pre-filled text.
 * Uses intent:// scheme on Android WebViews to force external browser/app,
 * falls back to api.whatsapp.com which redirects to the native app.
 */
export const openWhatsApp = (text: string): void => {
  const encoded = encodeURIComponent(text);
  // Use https URL which works on both mobile and desktop, avoids intent issues
  const url = `https://api.whatsapp.com/send?text=${encoded}`;
  openExternal(url);
};
