import { type LangCode, salutations, closings, subjectLabel, dateLabel, toLabel, formatDateByLang } from '@/data/languages';
import { useAppLang } from '@/contexts/AppLanguageContext';
import { fillTemplate, buildDynamicSubject } from '@/utils/templateEngine';

interface DocumentPreviewProps {
  data: Record<string, string>;
  title: string;
  bodyTemplate: string;
  lang?: LangCode;
  signatureDataUrl?: string;
  showBranding?: boolean;
}

const DocumentPreview = ({ data, title, bodyTemplate, lang = 'en-US', signatureDataUrl, showBranding = true }: DocumentPreviewProps) => {
  const today = formatDateByLang(new Date().toISOString(), lang);
  const body = fillTemplate(bodyTemplate, data, lang);
  const dynamicSubject = buildDynamicSubject(title, data);
  const { t } = useAppLang();

  const hasPhone = !!data.senderPhone?.trim();
  const hasEmail = !!data.senderEmail?.trim();
  const hasRecipientAddress = !!data.recipientAddress?.trim();
  const hasId = !!data.idType?.trim() && !!data.idNumber?.trim();

  return (
    <div className="mx-auto w-full max-w-[210mm] box-border overflow-visible rounded-2xl border border-border bg-card p-6 font-serif text-sm leading-relaxed shadow-sm break-words print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none sm:p-10" id="document-preview" data-print-root="true" style={{ overflowWrap: 'break-word', wordBreak: 'break-word', boxSizing: 'border-box', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any }}>
      <h2 className="mb-6 text-center text-lg font-bold uppercase tracking-wide text-foreground">
        {title}
      </h2>

      {/* Sender */}
      <div className="mb-1 text-right" data-pdf-section>
        <p className="font-semibold">{data.senderName || '[Your Name]'}</p>
        <p className="whitespace-pre-line text-muted-foreground text-xs">{data.senderAddress || '[Your Address]'}</p>
        {hasPhone && <p className="text-xs text-muted-foreground">{t('doc.phone')}: {data.senderPhone}</p>}
        {hasEmail && <p className="text-xs text-muted-foreground">{t('doc.email')}: {data.senderEmail}</p>}
      </div>

      <p className="mb-4 text-right text-xs text-muted-foreground" data-pdf-section>{dateLabel[lang]}: {today}</p>

      {/* Recipient */}
      <div className="mb-4" data-pdf-section>
        <p className="font-semibold">{toLabel[lang]}</p>
        <p>{data.recipientName || '[Recipient]'}</p>
        <p>{data.recipientOrg || '[Organization]'}</p>
        {hasRecipientAddress && <p className="whitespace-pre-line text-xs text-muted-foreground">{data.recipientAddress}</p>}
      </div>

      {/* Subject — dynamic */}
      <p className="mb-4" data-pdf-section>
        <span className="font-semibold">{subjectLabel[lang]}: </span>
        <span className="underline">{dynamicSubject}</span>
      </p>

      {/* Salutation */}
      <p className="mb-3" data-pdf-section>{salutations[lang]}</p>

      {/* Body */}
      <div className="mb-6 whitespace-pre-line" data-pdf-section>{body}</div>

      {/* Closing & Signature */}
      <div className="mt-6" data-pdf-section>
        <p className="mb-1">{closings[lang]}</p>
        {signatureDataUrl && (
          <div className="mt-1 mb-0" style={{ maxWidth: 200, overflow: 'hidden', position: 'relative' }}>
            <img
              src={signatureDataUrl}
              alt="Signature"
              className="h-12 object-contain object-left rounded bg-white"
              style={{ maxWidth: 200, width: '100%', height: 'auto', maxHeight: 60, backgroundColor: "#ffffff", display: 'block', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' as any }}
            />
            {showBranding && <p className="text-[9px] text-muted-foreground/50 mt-0.5">{t('doc.verifiedBy')}</p>}
          </div>
        )}
        <p className={`font-semibold ${signatureDataUrl ? 'mt-0' : 'mt-6'}`}>
          {data.senderName || '[Your Name]'}
        </p>
        {hasId && (
          <p className="text-xs text-muted-foreground">{data.idType}: {data.idNumber}</p>
        )}
        {hasPhone && <p className="text-xs text-muted-foreground">{t('doc.contact')}: {data.senderPhone}</p>}
      </div>

      {/* Branding watermark */}
      {showBranding && (
        <div className="mt-8 border-t border-border pt-3 text-center" data-pdf-section>
          <p className="text-[9px] text-muted-foreground/60">{t('doc.generatedBy')}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
