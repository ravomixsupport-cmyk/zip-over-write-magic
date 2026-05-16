import { useState } from "react";
import { Printer, FileText, MessageCircle, Mail, Copy, Check, X, Share2 } from "lucide-react";
import { useNetwork } from "@/hooks/useNetwork";
import { type LangCode, salutations, closings, subjectLabel, dateLabel, toLabel } from '@/data/languages';
import { useAppLang } from "@/contexts/AppLanguageContext";
import { buildDocumentText, buildFormattedDocumentText } from "@/utils/documentFormatter";
import { safeDownload, safeCopyToClipboard, openWhatsApp, openMailto } from "@/utils/webCompat";
import { captureElementAsPdf } from "@/utils/documentCapture";
import { toast } from "sonner";

interface ShareActionsProps {
  title: string;
  getTextContent: () => string;
  getSignatureDataUrl?: () => string;
  documentData?: Record<string, string>;
  bodyTemplate?: string;
  lang?: LangCode;
  showBranding?: boolean;
}

const formatDate = (d?: string) => {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return d; }
};

const fillTemplate = (template: string, data: Record<string, string>) => {
  let result = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (key.toLowerCase().includes('date')) return formatDate(data[key]) || '';
    return data[key] || '';
  });
  result = result.replace(/\[(\w+)\]/g, (match, key) => {
    if (data[key] !== undefined) {
      if (key.toLowerCase().includes('date')) return formatDate(data[key]) || '';
      return data[key] || '';
    }
    return match;
  });
  return result;
};

const rtfEscape = (text: string): string => {
  return text.replace(/\\/g, '\\\\').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
};

const base64ToHex = (dataUrl: string): string => {
  const base64 = dataUrl.split(',')[1];
  if (!base64) return '';
  const binary = atob(base64);
  let hex = '';
  for (let i = 0; i < binary.length; i++) {
    hex += binary.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hex;
};

const getSignatureImageDimensions = (dataUrl: string): Promise<{ w: number; h: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.width, h: img.height });
    img.onerror = () => resolve({ w: 600, h: 200 });
    img.src = dataUrl;
  });
};

const ShareActions = ({ title, getTextContent, getSignatureDataUrl, documentData, bodyTemplate, lang = 'en-US', showBranding = true }: ShareActionsProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { requireOnline } = useNetwork();
  const { t } = useAppLang();

  /** Plain text for TXT download and clipboard */
  const getPlainText = (): string => {
    if (documentData && bodyTemplate) {
      return buildDocumentText({ title, data: documentData, bodyTemplate, lang, showBranding });
    }
    return getTextContent();
  };

  /** Formatted text for WhatsApp/Email sharing */
  const getFormattedText = (): string => {
    if (documentData && bodyTemplate) {
      return buildFormattedDocumentText({ title, data: documentData, bodyTemplate, lang, showBranding });
    }
    return getTextContent();
  };

  /** Execute action instantly — optionally require online */
  const runAction = (action: () => void, needsOnline = false) => {
    if (needsOnline) {
      requireOnline(action);
    } else {
      action();
    }
  };


  const handlePrint = () => {
    try { window.print(); } catch (err) { console.error('[ShareActions] Print error:', err); }
  };


  const buildStructuredRtf = async (): Promise<string> => {
    const data = documentData || {};
    const today = formatDate(new Date().toISOString());
    const body = bodyTemplate ? fillTemplate(bodyTemplate, data) : '';
    const sigUrl = getSignatureDataUrl?.() || '';
    const e = rtfEscape;
    let rtf = '';

    rtf += `\\pard\\qc\\sb0\\sa120\\b\\fs32 ${e(title.toUpperCase())}\\b0\\fs24\\par\n`;
    rtf += `\\pard\\qr\\sb0\\sa0\\b ${e(data.senderName || '[Your Name]')}\\b0\\par\n`;
    const senderAddr = (data.senderAddress || '[Your Address]').split('\\n').join(', ');
    rtf += `\\pard\\qr\\fs20 ${e(senderAddr)}\\fs24\\par\n`;
    if (data.senderPhone) rtf += `\\pard\\qr\\fs20 Phone: ${e(data.senderPhone)}\\fs24\\par\n`;
    if (data.senderEmail) rtf += `\\pard\\qr\\fs20 Email: ${e(data.senderEmail)}\\fs24\\par\n`;
    rtf += `\\pard\\qr\\sa200\\fs20 ${e(dateLabel[lang])}: ${e(today)}\\fs24\\par\n`;
    rtf += `\\pard\\ql\\sa0\\b ${e(toLabel[lang])}\\b0\\par\n`;
    rtf += `\\pard\\ql ${e(data.recipientName || '[Recipient]')}\\par\n`;
    rtf += `\\pard\\ql ${e(data.recipientOrg || '[Organization]')}\\par\n`;
    if (data.recipientAddress) {
      rtf += `\\pard\\ql\\fs20 ${e(data.recipientAddress.split('\\n').join(', '))}\\fs24\\par\n`;
    }
    rtf += `\\pard\\sa120\\par\n`;
    rtf += `\\pard\\ql\\sa80\\b ${e(subjectLabel[lang])}: \\ul ${e(title)}\\ulnone\\b0\\par\n`;
    rtf += `\\pard\\ql\\sa80 ${e(salutations[lang])}\\par\n`;

    const bodyLines = body.split('\n');
    for (const line of bodyLines) {
      const trimmed = line.trim();
      if (!trimmed) {
        rtf += `\\pard\\ql\\sa40\\par\n`;
      } else {
        rtf += `\\pard\\ql\\sa20 ${e(trimmed)}\\par\n`;
      }
    }

    rtf += `\\pard\\ql\\sb200\\sa0 ${e(closings[lang])}\\par\n`;

    if (sigUrl) {
      const hex = base64ToHex(sigUrl);
      if (hex) {
        const dims = await getSignatureImageDimensions(sigUrl);
        const targetW = 3000;
        const targetH = Math.round((dims.h / dims.w) * targetW);
        rtf += `\\pard\\ql\\sb120\\sa0\n`;
        rtf += `{\\pict\\pngblip\\picw${dims.w}\\pich${dims.h}\\picwgoal${targetW}\\pichgoal${targetH}\n`;
        for (let i = 0; i < hex.length; i += 128) {
          rtf += hex.slice(i, i + 128) + '\n';
        }
        rtf += `}\\par\n`;
        if (showBranding) {
          rtf += `\\pard\\ql\\sa0\\fs14\\cf2 Electronically Verified by Ravomix\\cf1\\fs24\\par\n`;
        }
      }
    }

    rtf += `\\pard\\ql${sigUrl ? '\\sb20' : '\\sb240'}\\sa0\\b ${e(data.senderName || '[Your Name]')}\\b0\\par\n`;
    if (data.idType && data.idNumber) {
      rtf += `\\pard\\ql\\fs20 ${e(data.idType)}: ${e(data.idNumber)}\\fs24\\par\n`;
    }
    if (data.senderPhone) rtf += `\\pard\\ql\\fs20 Contact: ${e(data.senderPhone)}\\fs24\\par\n`;

    return rtf;
  };

  const handleDownloadDoc = async () => {
    try {
      let rtfBody: string;
      if (documentData && bodyTemplate) {
        rtfBody = await buildStructuredRtf();
      } else {
        const text = getPlainText();
        rtfBody = text.split('\n').map(line => {
          const t = line.trim();
          return t ? `\\pard\\ql ${rtfEscape(t)}\\par\n` : `\\pard\\par\n`;
        }).join('');
      }
      const rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0{\\fonttbl{\\f0\\fswiss\\fcharset0 Arial;}{\\f1\\fscript\\fcharset0 Segoe Script;}}{\\colortbl;\\red0\\green0\\blue0;\\red150\\green150\\blue150;}\\paperw12240\\paperh15840\\margl1440\\margr1440\\margt1080\\margb1080\\f0\\fs24\\cf1\n${rtfBody}}`;
      const blob = new Blob([rtfContent], { type: "application/msword" });
      await safeDownload(blob, `${title.replace(/\s+/g, "_")}.doc`);
    } catch (err) { console.error('[ShareActions] RTF download error:', err); }
  };

  const handleWhatsApp = () => {
    try {
      const text = getFormattedText();
      openWhatsApp(text);
    } catch (err) { console.error('[ShareActions] WhatsApp share error:', err); }
  };

  const handleEmail = () => {
    try {
      const text = getFormattedText();
      openMailto('Ravomix Document', text);
    } catch (err) { console.error('[ShareActions] Email share error:', err); }
  };

  const handleCopy = async () => {
    try {
      const text = getPlainText();
      const ok = await safeCopyToClipboard(text);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* silent */ }
  };

  const supportsNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleNativeShare = async () => {
    try {
      const safeName = title.replace(/\s+/g, "_").replace(/[^\w.-]+/g, "");
      const fileName = `${safeName}.pdf`;
      const pdfBlob = await captureElementAsPdf('document-preview');
      if (!pdfBlob) {
        toast.error(t('share.pdfFailed') || 'Could not generate PDF');
        return;
      }

      // Try sharing the PDF file via Web Share API (Chrome, Android TWA)
      try {
        if (typeof navigator.share === 'function' && typeof File !== 'undefined') {
          const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
          const canShare = !navigator.canShare || navigator.canShare({ files: [file] });
          if (canShare) {
            await navigator.share({ title, files: [file] });
            return;
          }
        }
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return;
        console.warn('[ShareActions] File share failed, falling back to download:', err);
      }

      // Fallback: auto-download the PDF and notify user
      const ok = await safeDownload(pdfBlob, fileName);
      if (ok) {
        toast.success(t('share.pdfSaved') || 'PDF saved to downloads');
      } else {
        toast.error(t('share.pdfFailed') || 'Could not save PDF');
      }
    } catch (err) {
      if ((err as DOMException)?.name !== 'AbortError') {
        console.error('[ShareActions] Native share error:', err);
      }
    }
  };

  const actions = [
    { label: t('share.print'), icon: <Printer className="h-4 w-4" />, onClick: () => runAction(handlePrint, false), color: "bg-primary text-primary-foreground" },
    { label: t('share.downloadRtf'), icon: <FileText className="h-4 w-4" />, onClick: () => runAction(handleDownloadDoc, false), color: "bg-blue-600 text-white" },
    ...(supportsNativeShare ? [{ label: t('share.nativeShare'), icon: <Share2 className="h-4 w-4" />, onClick: () => runAction(handleNativeShare, true), color: "bg-violet-600 text-white" }] : []),
    { label: t('share.whatsapp'), icon: <MessageCircle className="h-4 w-4" />, onClick: () => runAction(handleWhatsApp, true), color: "bg-green-600 text-white" },
    { label: t('share.email'), icon: <Mail className="h-4 w-4" />, onClick: () => runAction(handleEmail, false), color: "bg-orange-500 text-white" },
    { label: copied ? t('share.copied') : t('share.copy'), icon: copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />, onClick: handleCopy, color: "border border-border bg-card text-foreground" },
  ];

  if (!open) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
        >
          <Share2 className="h-4 w-4" /> {t('share.shareExport')}
        </button>
      </>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-3 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('share.exportShare')}</p>
          <button onClick={() => setOpen(false)} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`flex min-h-[48px] items-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-[0.98] ${action.color}`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShareActions;
