/**
 * Captures the document preview element as PDF or DOC (RTF) file.
 * Optimized for speed: lower scale, JPEG compression, minimal wait.
 */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_X_MM = 20;
const MARGIN_Y_MM = 20;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_X_MM * 2;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - MARGIN_Y_MM * 2;
const EXPORT_WIDTH_PX = 800;
const HTML2CANVAS_OPTIONS = {
  scale: 1.5,
  useCORS: true,
  backgroundColor: "#ffffff",
  logging: false,
  windowWidth: EXPORT_WIDTH_PX,
  scrollX: 0,
  scrollY: 0,
  imageTimeout: 3000,
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getPrintEnvironment = () => {
  if (typeof navigator === "undefined") {
    return { isAndroid: false, isAndroidTWA: false, isWebView: false };
  }

  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);

  return {
    isAndroid,
    isAndroidTWA: isAndroid && !ua.includes("Chrome/"),
    isWebView: isAndroid,
  };
};

const createCanvasSlice = (source: HTMLCanvasElement, startY: number, height: number) => {
  const slice = document.createElement("canvas");
  slice.width = source.width;
  slice.height = Math.max(1, Math.ceil(height));
  const ctx = slice.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, slice.width, slice.height);
  ctx.drawImage(source, 0, startY, source.width, slice.height, 0, 0, source.width, slice.height);
  return slice;
};

const createExportClone = (source: HTMLElement) => {
  const stage = document.createElement("div");
  stage.style.cssText = `position:fixed;top:0;left:0;width:${EXPORT_WIDTH_PX}px;margin:0;background:#ffffff;pointer-events:none;opacity:0;z-index:-9999;box-sizing:border-box;overflow:visible`;
  stage.setAttribute("aria-hidden", "true");

  const exportStyles = document.createElement("style");
  exportStyles.textContent = `
    .doc-pdf-export,
    .doc-pdf-export * {
      box-sizing: border-box !important;
      color: #000000 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      opacity: 1 !important;
    }
    .doc-pdf-export {
      overflow: visible !important;
      overflow-wrap: anywhere !important;
      word-wrap: break-word !important;
      word-break: break-word !important;
      white-space: pre-wrap !important;
      font-size: 14px !important;
      line-height: 1.7 !important;
      padding: 40px !important;
      max-width: 100% !important;
      width: 100% !important;
      margin: 0 auto !important;
      background: #ffffff !important;
    }
    .doc-pdf-export .text-right,
    .doc-pdf-export [style*="text-align: right"],
    .doc-pdf-export [style*="text-align:right"] {
      max-width: 100% !important;
      padding-right: 0 !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      text-overflow: clip !important;
      white-space: pre-wrap !important;
    }
    .doc-pdf-export p,
    .doc-pdf-export span,
    .doc-pdf-export div,
    .doc-pdf-export td,
    .doc-pdf-export th,
    .doc-pdf-export li,
    .doc-pdf-export h1,
    .doc-pdf-export h2,
    .doc-pdf-export h3,
    .doc-pdf-export h4,
    .doc-pdf-export h5,
    .doc-pdf-export h6,
    .doc-pdf-export label,
    .doc-pdf-export strong,
    .doc-pdf-export b,
    .doc-pdf-export em,
    .doc-pdf-export a {
      color: #000000 !important;
      max-width: 100% !important;
      overflow: visible !important;
      overflow-wrap: anywhere !important;
      word-wrap: break-word !important;
      word-break: break-word !important;
      white-space: pre-wrap !important;
      opacity: 1 !important;
    }
    .doc-pdf-export .whitespace-pre-line {
      white-space: pre-line !important;
    }
    .doc-pdf-export img {
      max-width: 100% !important;
      height: auto !important;
    }
    .doc-pdf-export img[alt="Signature"] {
      max-width: 200px !important;
      max-height: 60px !important;
      width: auto !important;
      height: auto !important;
      object-fit: contain !important;
      overflow: hidden !important;
      display: block !important;
      background-color: #ffffff !important;
    }
  `;

  const clone = source.cloneNode(true) as HTMLElement;
  clone.id = "";
  clone.classList.add("doc-pdf-export");
  clone.style.cssText = "width:100%;max-width:100%;margin:0 auto;box-sizing:border-box;overflow:visible;word-wrap:break-word;overflow-wrap:anywhere;word-break:break-word;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#000000;background:#ffffff";

  stage.appendChild(exportStyles);
  stage.appendChild(clone);
  document.body.appendChild(stage);
  return { stage, clone };
};

const renderExportCanvas = (clone: HTMLElement) => html2canvas(clone, HTML2CANVAS_OPTIONS);

const buildPdfFromCanvas = (canvas: HTMLCanvasElement) => {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const mmPerPx = CONTENT_WIDTH_MM / canvas.width;
  const totalHeightMm = canvas.height * mmPerPx;

  if (totalHeightMm <= CONTENT_HEIGHT_MM) {
    const imgData = canvas.toDataURL("image/jpeg", 0.85);
    pdf.addImage(imgData, "JPEG", MARGIN_X_MM, MARGIN_Y_MM, CONTENT_WIDTH_MM, totalHeightMm, undefined, "FAST");
    return pdf;
  }

  const sliceHeightPx = Math.floor(CONTENT_HEIGHT_MM / mmPerPx);
  let offsetY = 0;
  let isFirstPage = true;

  while (offsetY < canvas.height) {
    if (!isFirstPage) pdf.addPage();
    const remaining = canvas.height - offsetY;
    const sliceH = Math.min(sliceHeightPx, remaining);
    const sliceCanvas = createCanvasSlice(canvas, offsetY, sliceH);
    const sliceMm = sliceCanvas.height * mmPerPx;
    const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.85);
    pdf.addImage(sliceData, "JPEG", MARGIN_X_MM, MARGIN_Y_MM, CONTENT_WIDTH_MM, sliceMm, undefined, "FAST");
    offsetY += sliceH;
    isFirstPage = false;
  }

  return pdf;
};

export const captureElementAsPdf = async (elementId: string): Promise<Blob | null> => {
  const source = document.getElementById(elementId);
  console.log("[documentCapture] captureElementAsPdf →", { elementId, found: !!source });
  if (!source) {
    console.error(`[documentCapture] Element with id="${elementId}" not found in DOM`);
    return null;
  }

  let stage: HTMLDivElement | null = null;
  try {
    const exp = createExportClone(source);
    stage = exp.stage;
    await wait(50);
    const canvas = await renderExportCanvas(exp.clone);
    console.log("[documentCapture] html2canvas captured", { width: canvas.width, height: canvas.height });
    const pdf = buildPdfFromCanvas(canvas);
    const blob = pdf.output("blob");
    console.log("[documentCapture] PDF generated", { size: blob.size });
    return blob;
  } catch (err) {
    console.error("[documentCapture] PDF generation failed:", err);
    return null;
  } finally {
    if (stage?.parentNode) stage.parentNode.removeChild(stage);
  }
};

/**
 * Same as captureElementAsPdf but returns a base64 data URI string.
 * This avoids blob URLs which fail in Android WebViews / APKs.
 */
export const captureElementAsPdfBase64 = async (elementId: string): Promise<string | null> => {
  const source = document.getElementById(elementId);
  if (!source) return null;

  let stage: HTMLDivElement | null = null;
  try {
    const exp = createExportClone(source);
    stage = exp.stage;
    await wait(50);
    const canvas = await renderExportCanvas(exp.clone);
    const pdf = buildPdfFromCanvas(canvas);
    return pdf.output("datauristring");
  } catch (err) {
    console.error("[documentCapture] PDF generation failed:", err);
    return null;
  } finally {
    if (stage?.parentNode) stage.parentNode.removeChild(stage);
  }
};

export const captureElementAsPdfFile = async (
  elementId: string,
  fileName = "document.pdf"
): Promise<File | null> => {
  const blob = await captureElementAsPdf(elementId);
  if (!blob || typeof File === "undefined") return null;

  return new File([blob], fileName, { type: "application/pdf" });
};

export const captureElementAsDoc = async (elementId: string): Promise<Blob | null> => {
  const source = document.getElementById(elementId);
  if (!source) return null;

  let stage: HTMLDivElement | null = null;
  try {
    const exp = createExportClone(source);
    stage = exp.stage;
    await wait(50);

    const canvas = await html2canvas(exp.clone, {
      scale: 1.5, useCORS: true, backgroundColor: "#ffffff", logging: false,
      windowWidth: EXPORT_WIDTH_PX, scrollX: 0, scrollY: 0, imageTimeout: 3000,
    });

    const imgDataUrl = canvas.toDataURL("image/jpeg", 0.85);
    const aspectRatio = canvas.height / canvas.width;
    const imgWidthIn = 6.3;
    const imgHeightIn = imgWidthIn * aspectRatio;

    const htmlDoc = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="UTF-8" />
  <title>Document Export</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page { size: A4; margin: 20mm 15mm; }
    html, body { margin: 0; padding: 0; background: #ffffff; font-family: Arial, sans-serif; }
    body { padding: 0; color: #000000; }
    .doc-content { text-align: center; }
    .doc-content img { display: block; margin: 0 auto; max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <div class="doc-content">
    <img src="${imgDataUrl}" width="${Math.round(imgWidthIn * 96)}" height="${Math.round(imgHeightIn * 96)}" alt="Document" />
  </div>
</body>
</html>`;

    return new Blob([htmlDoc], { type: "application/msword" });
  } catch (err) {
    console.error("[documentCapture] DOC generation failed:", err);
    return null;
  } finally {
    if (stage?.parentNode) stage.parentNode.removeChild(stage);
  }
};
