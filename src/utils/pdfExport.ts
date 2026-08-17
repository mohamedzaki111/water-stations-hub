import html2canvasPro from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

export interface PdfExportOptions {
  filename?: string;
  margin?: number | [number, number, number, number];
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'a3' | 'letter';
  scale?: number;
  openInNewTab?: boolean;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Log client errors to server error.log
 */
async function logClientError(message: string, error?: any, context?: any) {
  try {
    await fetch('/api/logs/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        stack: error?.stack || String(error),
        context,
      }),
    });
  } catch (e) {
    console.error('Failed to send error to server logs:', e);
  }
}

/**
 * High-performance PDF export with intelligent page breaking,
 * Eastern Arabic numerals support, and non-blocking asynchronous chunking.
 */
export async function exportElementToPdf(
  target: HTMLElement | string,
  options: PdfExportOptions = {}
): Promise<void> {
  try {
    options.onStart?.();

    let element: HTMLElement | null = null;
    if (typeof target === 'string') {
      element = document.getElementById(target);
    } else {
      element = target;
    }

    if (!element) {
      throw new Error('العنصر المراد تصديره إلى PDF غير موجود');
    }

    const filename = options.filename?.endsWith('.pdf')
      ? options.filename
      : `${options.filename || `تقرير_${new Date().toISOString().slice(0, 10)}`}.pdf`;

    const orientation = options.orientation || 'portrait';
    const scale = options.scale || 1.5;

    // Render DOM element to canvas using html2canvas-pro
    const canvas = await html2canvasPro(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth || 1200,
    });

    // Page dimensions in mm (A4)
    const isLandscape = orientation === 'landscape';
    const pdfPageWidth = isLandscape ? 297 : 210;
    const pdfPageHeight = isLandscape ? 210 : 297;

    const marginX = 8;
    const marginY = 8;
    const contentWidth = pdfPageWidth - marginX * 2;
    const contentHeight = pdfPageHeight - marginY * 2;

    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    if (imgHeight <= contentHeight) {
      // Single Page PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
    } else {
      // Find row break coordinates using actual element offsetTop
      const totalScrollHeight = element.scrollHeight || element.offsetHeight || 1;
      const rows = element.querySelectorAll('tr, .kpi-card, .chart-container, tfoot, thead');
      const safeBreakYs: number[] = [];

      rows.forEach((row) => {
        const el = row as HTMLElement;
        if (el.offsetTop !== undefined) {
          const canvasY = (el.offsetTop / totalScrollHeight) * canvas.height;
          if (canvasY > 0 && canvasY < canvas.height) {
            safeBreakYs.push(Math.floor(canvasY));
          }
        }
      });

      safeBreakYs.sort((a, b) => a - b);

      const maxPageCanvasHeight = (contentHeight * canvas.width) / contentWidth;
      let currentY = 0;
      let pageNumber = 0;

      while (currentY < canvas.height) {
        if (pageNumber > 0) {
          pdf.addPage('a4', orientation);
        }

        const remainingHeight = canvas.height - currentY;
        let chunkHeight = Math.min(maxPageCanvasHeight, remainingHeight);

        // Find clean row break point that fills at least 80% of the page
        if (currentY + maxPageCanvasHeight < canvas.height) {
          const minAcceptableY = currentY + maxPageCanvasHeight * 0.8;
          const maxAcceptableY = currentY + maxPageCanvasHeight;

          const validBreaks = safeBreakYs.filter((y) => y >= minAcceptableY && y <= maxAcceptableY);

          if (validBreaks.length > 0) {
            chunkHeight = validBreaks[validBreaks.length - 1] - currentY;
          }
        }

        // Create canvas chunk
        const chunkCanvas = document.createElement('canvas');
        chunkCanvas.width = canvas.width;
        chunkCanvas.height = chunkHeight;

        const ctx = chunkCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, chunkCanvas.width, chunkCanvas.height);
          ctx.drawImage(
            canvas,
            0,
            currentY,
            canvas.width,
            chunkHeight,
            0,
            0,
            chunkCanvas.width,
            chunkHeight
          );

          const chunkImgData = chunkCanvas.toDataURL('image/png');
          const chunkPdfHeight = (chunkHeight * contentWidth) / canvas.width;
          pdf.addImage(chunkImgData, 'PNG', marginX, marginY, contentWidth, chunkPdfHeight);
        }

        currentY += chunkHeight;
        pageNumber++;

        // Yield to browser event loop to prevent "Page Unresponsive"
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    // Save or Open PDF in new tab
    if (options.openInNewTab) {
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const newWindow = window.open(blobUrl, '_blank');
      if (!newWindow) {
        pdf.save(filename);
      }
    } else {
      pdf.save(filename);
    }

    options.onSuccess?.();
  } catch (error: any) {
    console.error('PDF generation error:', error);
    await logClientError('PDF export failed in browser', error, {
      filename: options.filename,
      orientation: options.orientation,
    });
    options.onError?.(error);
    throw error;
  }
}
