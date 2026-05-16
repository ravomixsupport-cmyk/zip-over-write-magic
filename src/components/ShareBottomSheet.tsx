import { useRef, useEffect, useState, useCallback } from "react";
import {
  Download,
  Printer,
  Copy,
  Share2,
  X,
  CheckCircle2,
  Loader2,
  Check,
  MessageCircle,
  Mail,
  Link as LinkIcon,
} from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import { toast } from "sonner";
import { captureElementAsPdf, getPrintEnvironment } from "@/utils/documentCapture";
import {
  safeDownload,
  safeCopyToClipboard,
  openWhatsApp,
  openMailto,
  openTelegram,
  openSMS,
  openFacebook,
  openTwitter,
  shareFileViaWebShare,
} from "@/utils/webviewCompat";
import { Send, MessageSquare, Facebook, Twitter } from "lucide-react";

/* ── helpers ─────────────────────────────────────────────────── */

/** Detect WebView */
const isWebView = (): boolean => {
  const ua = navigator.userAgent || "";
  if (ua.includes("Android") && (ua.includes("wv") || ua.includes("Version/")))
    return true;
  if (/iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua)) return true;
  return false;
};

/** Extract plain text from the document-preview element */
const extractPreviewText = (): string => {
  const el = document.getElementById("document-preview");
  if (!el) return "";
  return (el.innerText || el.textContent || "").trim();
};

/* ── component ───────────────────────────────────────────────── */

interface ShareBottomSheetProps {
  open: boolean;
  onClose: () => void;
  documentTitle: string;
  pdfBlob?: Blob | null;
  pdfBase64?: string | null;
  pdfReady?: boolean;
}

const ShareBottomSheet = ({
  open,
  onClose,
  documentTitle,
  pdfBlob,
  pdfReady,
}: ShareBottomSheetProps) => {
  const pdfBlobRef = useRef<Blob | null>(pdfBlob ?? null);
  const pdfPromiseRef = useRef<Promise<Blob | null> | null>(null);
  const [pdfReadyState, setPdfReadyState] = useState(
    Boolean(pdfBlob || pdfReady)
  );
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const actionLockRef = useRef(false); // prevents double-tap

  const inWebView = isWebView();
  const { lang } = useAppLang();
  const isHi = lang === "hi";

  const safeFileName = documentTitle
    .replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 60);

  /* ── sync incoming blob ────────────────────────────────────── */
  useEffect(() => {
    if (pdfBlob) {
      pdfBlobRef.current = pdfBlob;
      setPdfReadyState(true);
    }
  }, [pdfBlob]);

  useEffect(() => {
    if (pdfReady) setPdfReadyState(true);
  }, [pdfReady]);

  /* ── pre-generate PDF when sheet opens ─────────────────────── */
  useEffect(() => {
    if (!open || pdfBlobRef.current || pdfPromiseRef.current) return;
    void ensurePdfBlob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const ensurePdfBlob = useCallback(async (): Promise<Blob | null> => {
    if (pdfBlobRef.current) return pdfBlobRef.current;
    if (pdfPromiseRef.current) return pdfPromiseRef.current;

    pdfPromiseRef.current = (async () => {
      try {
        // Wait a tick so the preview DOM is fully painted
        await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 80)));
        const blob = await captureElementAsPdf("document-preview");
        if (blob) {
          pdfBlobRef.current = blob;
          setPdfReadyState(true);
        }
        return blob;
      } catch (err) {
        console.error("[ShareBottomSheet] PDF generation failed:", err);
        return null;
      } finally {
        pdfPromiseRef.current = null;
      }
    })();

    return pdfPromiseRef.current;
  }, []);

  /* ── action runner with lock to prevent double-triggers ──── */
  const runAction = useCallback(
    async (id: string, action: () => Promise<void>) => {
      if (actionLockRef.current || busy) return; // already running
      actionLockRef.current = true;
      setBusy(id);
      try {
        await action();
      } catch (err) {
        console.error(`[ShareBottomSheet] ${id} error:`, err);
        toast.error(
          isHi
            ? "कुछ गड़बड़ हो गई, दोबारा कोशिश करें"
            : "Something went wrong, please try again"
        );
      } finally {
        setBusy(null);
        // small cooldown before unlocking to prevent rapid re-taps
        setTimeout(() => {
          actionLockRef.current = false;
        }, 400);
      }
    },
    [busy, isHi]
  );

  /* ── download PDF helper ───────────────────────────────────── */
  const downloadPdf = async (showToast = true): Promise<Blob | null> => {
    const blob = await ensurePdfBlob();
    if (!blob) {
      toast.error(isHi ? "PDF नहीं बन पाई" : "PDF generation failed");
      return null;
    }

    const saved = await safeDownload(blob, `${safeFileName}.pdf`);
    if (!saved) {
      toast.error(isHi ? "PDF save नहीं हो पाई" : "PDF could not be saved");
      return null;
    }

    if (showToast) {
      toast.success(
        inWebView
          ? isHi
            ? "PDF save हो गई। Downloads से attach/share करें"
            : "PDF saved. Attach/share it from Downloads"
          : isHi
            ? "PDF download हो गई!"
            : "PDF downloaded!"
      );
    }
    return blob;
  };

  /* ── try native Web Share with file ────────────────────────── */
  const tryShareFile = async (blob: Blob): Promise<boolean> => {
    return await shareFileViaWebShare(blob, `${safeFileName}.pdf`, documentTitle);
  };

  /* ── individual action handlers ────────────────────────────── */

  const handleWhatsApp = () =>
    runAction("whatsapp", async () => {
      const blob = await ensurePdfBlob();
      if (!blob) {
        toast.error(isHi ? "PDF नहीं बन पाई" : "PDF generation failed");
        return;
      }

      if (await shareFileViaWebShare(blob, `${safeFileName}.pdf`, documentTitle)) {
        onClose();
        return;
      }

      // Fallback: download PDF then open WhatsApp with text
      await downloadPdf(false);
      toast.success(
        isHi
          ? "PDF save हो गई! WhatsApp में attach करें"
          : "PDF saved! Please attach in WhatsApp"
      );
      openWhatsApp(documentTitle);
      onClose();
    });

  const handleShare = () =>
    runAction("share", async () => {
      // 1) Generate the PDF and share it as a FILE via Web Share API.
      //    This is the primary path — the user wants the PDF, not the URL.
      const blob = await ensurePdfBlob();
      console.log("[ShareBottomSheet] handleShare PDF blob:", blob ? { size: blob.size } : null);

      if (blob) {
        try {
          if (
            typeof navigator !== "undefined" &&
            typeof navigator.share === "function" &&
            typeof File !== "undefined"
          ) {
            const file = new File([blob], `${safeFileName}.pdf`, { type: "application/pdf" });
            const canShare = !navigator.canShare || navigator.canShare({ files: [file] });
            console.log("[ShareBottomSheet] navigator.canShare files?", canShare);
            if (canShare) {
              await navigator.share({ title: documentTitle, files: [file] });
              onClose();
              return;
            }
          }
        } catch (err) {
          if ((err as DOMException)?.name === "AbortError") {
            onClose();
            return;
          }
          console.warn("[ShareBottomSheet] file share failed, falling back:", err);
        }

        // 2) Fallback: download the PDF so the user can attach/share it manually
        const saved = await safeDownload(blob, `${safeFileName}.pdf`);
        if (saved) {
          toast.success(isHi ? "PDF save हो गई" : "PDF saved to downloads");
          onClose();
          return;
        }
      }

      // 3) Last resort: in-app share menu
      setShowShareMenu(true);
    });

  const shareViaWhatsApp = () =>
    runAction("share-wa", async () => {
      openWhatsApp(documentTitle + "\n" + window.location.href);
      onClose();
    });

  const shareViaTelegram = () =>
    runAction("share-tg", async () => {
      openTelegram(window.location.href, documentTitle);
      onClose();
    });

  const shareViaSMS = () =>
    runAction("share-sms", async () => {
      openSMS(documentTitle + "\n" + window.location.href);
      onClose();
    });

  const shareViaFacebook = () =>
    runAction("share-fb", async () => {
      openFacebook(window.location.href);
      onClose();
    });

  const shareViaTwitter = () =>
    runAction("share-tw", async () => {
      openTwitter(documentTitle, window.location.href);
      onClose();
    });

  const shareViaEmail = () =>
    runAction("share-email", async () => {
      openMailto(documentTitle, documentTitle + "\n\n" + window.location.href);
      onClose();
    });

  const shareCopyLink = () =>
    runAction("share-link", async () => {
      const ok = await safeCopyToClipboard(window.location.href);
      if (ok) {
        toast.success(isHi ? "लिंक कॉपी हो गया!" : "Link copied!");
        onClose();
      } else {
        toast.error(isHi ? "कॉपी नहीं हो पाया" : "Copy failed");
      }
    });

  const handleDownload = () =>
    runAction("download", async () => {
      const blob = await downloadPdf(true);
      if (blob) onClose();
    });

  const handleCopy = () =>
    runAction("copy", async () => {
      const text = extractPreviewText();
      if (!text) {
        toast.error(
          isHi ? "कॉपी करने के लिए कुछ नहीं है" : "Nothing to copy"
        );
        return;
      }
      const ok = await safeCopyToClipboard(text);
      if (ok) {
        setCopied(true);
        toast.success(isHi ? "टेक्स्ट कॉपी हो गया!" : "Text copied!");
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error(isHi ? "कॉपी नहीं हो पाया" : "Copy failed");
      }
    });

  const handlePrint = () =>
    runAction("print", async () => {
      const { isAndroidTWA, isWebView } = getPrintEnvironment();
      const shouldUseAndroidPrintFlow = isAndroidTWA || isWebView;

      if (shouldUseAndroidPrintFlow) {
        const blob = await ensurePdfBlob();
        if (!blob) {
          toast.error(isHi ? "PDF नहीं बन पाई" : "PDF generation failed");
          return;
        }

        try {
          if (typeof navigator.share === "function" && typeof File !== "undefined") {
            const file = new File([blob], `${safeFileName}.pdf`, {
              type: "application/pdf",
            });

            if (!navigator.canShare || navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: "Print Document",
              });
              onClose();
              return;
            }
          }
        } catch (error) {
          if ((error as DOMException)?.name === "AbortError") {
            onClose();
            return;
          }

          console.error("Print error:", error);
        }

        const saved = await safeDownload(blob, `${safeFileName}.pdf`);
        if (saved) {
          toast.info(
            isHi
              ? "PDF share करके print option चुनें"
              : "Share the PDF and choose the print option"
          );
          onClose();
          return;
        }

        toast.info(
          isHi
            ? "PDF share करके print option चुनें"
            : "Share the PDF and choose the print option"
        );
        return;
      }

      try {
        onClose();
        await new Promise((resolve) =>
          requestAnimationFrame(() => setTimeout(resolve, 120))
        );

        if (typeof window.print === "function") {
          window.print();
          return;
        }

        toast.error(
          isHi
            ? "प्रिंट नहीं हो पाया"
            : "Print failed. Try from browser menu."
        );
      } catch (error) {
        console.error("Print error:", error);
        toast.error(
          isHi
            ? "PDF share करें और print option चुनें"
            : "Share the PDF and choose the print option"
        );
      }
    });

  /* ── render ────────────────────────────────────────────────── */

  if (!open) return null;

  const options = [
    {
      id: "share",
      icon: Share2,
      label: isHi ? "शेयर" : "Share",
      color: "text-violet-500",
      bg: "bg-violet-100 dark:bg-violet-900/30",
      onClick: handleShare,
    },
    {
      id: "download",
      icon: Download,
      label: isHi ? "PDF" : "PDF",
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
      onClick: handleDownload,
    },
    {
      id: "copy",
      icon: copied ? Check : Copy,
      label: copied
        ? isHi
          ? "कॉपी ✓"
          : "Copied ✓"
        : isHi
          ? "कॉपी"
          : "Copy",
      color: "text-foreground",
      bg: "bg-muted",
      onClick: handleCopy,
    },
    {
      id: "print",
      icon: Printer,
      label: isHi ? "प्रिंट" : "Print",
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      onClick: handlePrint,
    },
  ];

  return (
    <div
      className="no-print fixed inset-0 z-[60] flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/55 backdrop-blur-[4px]" />
      <div
        className="relative w-full max-w-lg rounded-t-2xl bg-card border-t border-border p-5 pb-24 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-foreground">
              {isHi ? "शेयर करें" : "Share"}
            </h3>
            {pdfReadyState && (
              <span className="flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                PDF Ready
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {!showShareMenu && (
          <div className="grid grid-cols-4 gap-1">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={opt.onClick}
                disabled={busy !== null}
                className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl p-1.5 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${opt.bg}`}
                >
                  {busy === opt.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  ) : (
                    <opt.icon className={`h-5 w-5 ${opt.color}`} />
                  )}
                </div>
                <span className="block w-full truncate text-center text-[10px] font-semibold leading-tight text-foreground">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {showShareMenu && (
          <div>
            <button
              onClick={() => setShowShareMenu(false)}
              className="mb-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              ← {isHi ? "वापस" : "Back"}
            </button>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={shareViaWhatsApp}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-[10px] font-semibold">WhatsApp</span>
              </button>
              <button
                onClick={shareViaTelegram}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                  <Send className="h-5 w-5 text-sky-600" />
                </div>
                <span className="text-[10px] font-semibold">Telegram</span>
              </button>
              <button
                onClick={shareViaEmail}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <Mail className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-[10px] font-semibold">Email</span>
              </button>
              <button
                onClick={shareViaSMS}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-[10px] font-semibold">SMS</span>
              </button>
              <button
                onClick={shareViaFacebook}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-[10px] font-semibold">Facebook</span>
              </button>
              <button
                onClick={shareViaTwitter}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                  <Twitter className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                </div>
                <span className="text-[10px] font-semibold">Twitter / X</span>
              </button>
              <button
                onClick={shareCopyLink}
                disabled={busy !== null}
                className="flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <LinkIcon className="h-5 w-5 text-violet-600" />
                </div>
                <span className="text-[10px] font-semibold">{isHi ? "लिंक कॉपी" : "Copy Link"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareBottomSheet;
