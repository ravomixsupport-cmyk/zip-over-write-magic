import { useEffect, useMemo, useRef, useState } from "react";
import { Share2, FileText, File, Printer, MessageCircle, Mail, X, Loader2 } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import { captureElementAsPdf, captureElementAsDoc } from "@/utils/documentCapture";
import { safeDownload, safePrint, isWebView as detectWebView, shareFileViaWebShare, safeOpenUrl } from "@/utils/webviewCompat";

interface ShareModalProps {
  elementId: string;
  fileName: string;
}

const ACTION_TIMEOUT_MS = 15000;

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs = ACTION_TIMEOUT_MS): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error("Action timed out")), timeoutMs);
    }),
  ]);
};

const ShareModal = ({ elementId, fileName }: ShareModalProps) => {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const { t } = useAppLang();
  const pdfBlobPromiseRef = useRef<Promise<Blob | null> | null>(null);

  const safeName = useMemo(() => fileName.replace(/\s+/g, "_").replace(/[^\w.-]+/g, ""), [fileName]);
  const shareTitle = useMemo(() => fileName.replace(/_/g, " "), [fileName]);
  const inWebView = useMemo(() => detectWebView(), []);

  const getPdfBlob = () => {
    if (!pdfBlobPromiseRef.current) {
      pdfBlobPromiseRef.current = withTimeout(captureElementAsPdf(elementId)).catch((err) => {
        console.error("[ShareModal] PDF generation error:", err);
        pdfBlobPromiseRef.current = null;
        return null;
      });
    }
    return pdfBlobPromiseRef.current;
  };

  useEffect(() => {
    if (!open) return;
    // Pre-generate PDF when modal opens
    const id = window.setTimeout(() => { void getPdfBlob(); }, 60);
    return () => window.clearTimeout(id);
  }, [open, elementId]);

  const runAction = async (id: string, action: () => Promise<void> | void) => {
    setBusy(id);
    try {
      await action();
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return;
      console.error(`[ShareModal] ${id} action error:`, err);
    } finally {
      setBusy(null);
    }
  };

  /** Download PDF - uses Web Share API in WebView for actual download */
  const handlePdf = () => runAction("pdf", async () => {
    const blob = await getPdfBlob();
    if (!blob) { alert("PDF generation failed. Please try again."); return; }
    const ok = await safeDownload(blob, `${safeName}.pdf`);
    if (!ok) alert("PDF download failed. Please try again.");
  });

  const handleDoc = () => runAction("doc", async () => {
    const blob = await withTimeout(captureElementAsDoc(elementId));
    if (!blob) { alert("DOC generation failed. Please try again."); return; }
    const ok = await safeDownload(blob, `${safeName}.doc`);
    if (!ok) alert("DOC download failed. Please try again.");
  });

  /** Print - opens proper print dialog with form content */
  const handlePrint = () => runAction("print", async () => {
    const ok = await safePrint(elementId);
    if (!ok) alert("Print could not be opened. Please try again.");
  });

  /** WhatsApp - share PDF file directly via Web Share API */
  const handleWhatsApp = () => runAction("whatsapp", async () => {
    const pdfBlob = await getPdfBlob();
    if (!pdfBlob) { alert("PDF generation failed. Please try again."); return; }

    // Try sharing PDF file directly via Web Share API (works in WebView)
    const pdfFile = new globalThis.File([pdfBlob], `${safeName}.pdf`, { type: 'application/pdf' });
    if (typeof navigator.share === 'function') {
      try {
        const canShare = navigator.canShare?.({ files: [pdfFile] });
        if (canShare) {
          await navigator.share({
            title: shareTitle,
            files: [pdfFile],
          });
          return; // Successfully shared
        }
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return;
        console.warn('[ShareModal] WhatsApp file share failed:', err);
      }
    }

    // Fallback: download PDF then open WhatsApp
    const ok = await safeDownload(pdfBlob, `${safeName}.pdf`);
    if (!ok) { alert("PDF could not be saved."); return; }
    alert(t("share.pdfSavedWhatsApp") || "PDF saved! Please attach in WhatsApp");
    const encoded = encodeURIComponent(shareTitle);
    safeOpenUrl(`https://api.whatsapp.com/send?text=${encoded}`);
  });

  /** Email - share PDF file directly via Web Share API */
  const handleEmail = () => runAction("email", async () => {
    const pdfBlob = await getPdfBlob();
    if (!pdfBlob) { alert("PDF generation failed. Please try again."); return; }

    // Try sharing via Web Share API first
    const shared = await shareFileViaWebShare(pdfBlob, `${safeName}.pdf`, shareTitle);
    if (shared) return;

    // Fallback: download then open mailto
    const ok = await safeDownload(pdfBlob, `${safeName}.pdf`);
    if (!ok) { alert("PDF could not be saved."); return; }
    alert(t("share.pdfSavedEmail") || "PDF saved! Please attach in your email");
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent("PDF has been saved. Please attach it to this email.");
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });

  /** Native share - share PDF file directly */
  const handleNativeShare = () => runAction("native", async () => {
    const pdfBlob = await getPdfBlob();
    if (!pdfBlob) { alert("PDF generation failed. Please try again."); return; }

    const shared = await shareFileViaWebShare(pdfBlob, `${safeName}.pdf`, shareTitle);
    if (shared) return;

    // Fallback: just download
    const ok = await safeDownload(pdfBlob, `${safeName}.pdf`);
    if (!ok) alert("PDF could not be saved.");
  });

  const actions = [
    { id: "pdf", label: t("share.downloadPdf") || "Share as PDF", icon: <FileText className="h-4 w-4" />, onClick: handlePdf, color: "bg-red-600 text-white" },
    { id: "doc", label: t("share.downloadRtf") || "Share as DOC", icon: <File className="h-4 w-4" />, onClick: handleDoc, color: "bg-blue-600 text-white" },
    { id: "print", label: t("share.print") || "Print", icon: <Printer className="h-4 w-4" />, onClick: handlePrint, color: "bg-primary text-primary-foreground" },
    { id: "whatsapp", label: t("share.whatsapp") || "WhatsApp", icon: <MessageCircle className="h-4 w-4" />, onClick: handleWhatsApp, color: "bg-green-600 text-white" },
    { id: "email", label: t("share.email") || "Email", icon: <Mail className="h-4 w-4" />, onClick: handleEmail, color: "bg-orange-500 text-white" },
    { id: "native", label: t("share.nativeShare") || "More Apps", icon: <Share2 className="h-4 w-4" />, onClick: handleNativeShare, color: "bg-violet-600 text-white" },
  ];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
      >
        <Share2 className="h-4 w-4" /> {t("share.shareExport") || "Share & Export"}
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("share.exportShare") || "Export & Share"}</p>
        <button
          onClick={() => setOpen(false)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={busy !== null}
            className={`flex min-h-[48px] items-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 ${action.color}`}
          >
            {busy === action.id ? <Loader2 className="h-4 w-4 animate-spin" /> : action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareModal;
