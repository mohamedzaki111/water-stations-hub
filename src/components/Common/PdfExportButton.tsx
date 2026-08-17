import React, { useState } from 'react';
import { FileDown, ExternalLink, Loader2 } from 'lucide-react';
import { exportElementToPdf, PdfExportOptions } from '../../utils/pdfExport';

interface PdfExportButtonProps {
  targetId?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  filename?: string;
  options?: Omit<PdfExportOptions, 'filename'>;
  label?: string;
  className?: string;
  iconOnly?: boolean;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  openInNewTabDefault?: boolean;
  showBothOptions?: boolean;
  onExportStart?: () => void;
  onExportComplete?: () => void;
}

export const PdfExportButton: React.FC<PdfExportButtonProps> = ({
  targetId,
  targetRef,
  filename = 'تقرير',
  options,
  label = 'فتح التقرير PDF',
  className = '',
  iconOnly = false,
  variant = 'primary',
  size = 'md',
  title = 'فتح ومعاينة التقرير في تبويب جديد كملف PDF',
  openInNewTabDefault = true,
  showBothOptions = true,
  onExportStart,
  onExportComplete,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [activeAction, setActiveAction] = useState<'preview' | 'download' | null>(null);

  const handleExport = async (e: React.MouseEvent, inNewTab: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    const target = targetRef?.current || (targetId ? document.getElementById(targetId) : null);
    if (!target) {
      alert('لم يتم العثور على محتوى التقرير للتصدير');
      return;
    }

    try {
      setIsExporting(true);
      setActiveAction(inNewTab ? 'preview' : 'download');
      onExportStart?.();

      await exportElementToPdf(target, {
        ...options,
        filename,
        openInNewTab: inNewTab,
      });

      onExportComplete?.();
    } catch (err: any) {
      console.error('PDF export error:', err);
      alert(`حدث خطأ أثناء تصدير ملف PDF: ${err?.message || 'يرجى المحاولة مرة أخرى'}`);
    } finally {
      setIsExporting(false);
      setActiveAction(null);
    }
  };

  // Variant Styles
  const variantStyles = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs',
  };

  // Size Styles
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-3 py-2 text-xs font-bold rounded-xl gap-2',
    lg: 'px-4 py-2.5 text-sm font-bold rounded-xl gap-2.5',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  if (showBothOptions) {
    return (
      <div className="inline-flex items-center gap-1.5">
        {/* Open in New Tab Button */}
        <button
          type="button"
          onClick={(e) => handleExport(e, true)}
          disabled={isExporting}
          title="فتح ومعاينة التقرير في تبويب جديد (New Tab)"
          className={`inline-flex items-center justify-center transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
          {isExporting && activeAction === 'preview' ? (
            <Loader2 size={iconSizes[size]} className="animate-spin text-current" />
          ) : (
            <ExternalLink size={iconSizes[size]} className="text-current" />
          )}
          {!iconOnly && (
            <span>
              {isExporting && activeAction === 'preview' ? 'جاري الفتح...' : label || 'فتح في تبويب جديد'}
            </span>
          )}
        </button>

        {/* Download PDF Button */}
        <button
          type="button"
          onClick={(e) => handleExport(e, false)}
          disabled={isExporting}
          title="تنزيل ملف PDF مباشرة على جهازك"
          className={`inline-flex items-center justify-center transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 ${sizeStyles[size]}`}
        >
          {isExporting && activeAction === 'download' ? (
            <Loader2 size={iconSizes[size]} className="animate-spin text-current" />
          ) : (
            <FileDown size={iconSizes[size]} className="text-current" />
          )}
          <span className="hidden sm:inline">
            {isExporting && activeAction === 'download' ? 'جاري التنزيل...' : 'تنزيل PDF'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => handleExport(e, openInNewTabDefault)}
      disabled={isExporting}
      title={title}
      className={`inline-flex items-center justify-center transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {isExporting ? (
        <Loader2 size={iconSizes[size]} className="animate-spin text-current" />
      ) : openInNewTabDefault ? (
        <ExternalLink size={iconSizes[size]} className="text-current" />
      ) : (
        <FileDown size={iconSizes[size]} className="text-current" />
      )}
      {!iconOnly && (
        <span>
          {isExporting
            ? 'جاري المعالجة...'
            : label || (openInNewTabDefault ? 'فتح في تبويب جديد' : 'تنزيل PDF')}
        </span>
      )}
    </button>
  );
};
