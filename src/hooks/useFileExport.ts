/**
 * useFileExport - Web-only version (no Capacitor dependency)
 */

type ExportOptions = {
  fileName: string;
  content: string;
  mimeType?: string;
};

export function useFileExport() {
  const isNative = false;

  const exportAsFile = async ({ fileName, content, mimeType = 'text/plain' }: ExportOptions) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return { success: true, path: fileName };
  };

  const printToPdf = () => {
    window.print();
  };

  return { isNative, exportAsFile, printToPdf };
}
