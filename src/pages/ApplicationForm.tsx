import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import InlineAd from "@/components/ads/InlineAd";
import DocumentPreview from "@/components/DocumentPreview";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import SignaturePad from "@/components/SignaturePad";
import RavomixBranding from "@/components/RavomixBranding";
import { showRewardedAd } from "@/components/ads/RewardedAdOverlay";
import { applicationTemplates, ID_TYPES } from "@/data/applicationTemplates";
import { hiBodyTemplates } from "@/data/hindiTranslations";
import { hiTemplateTitles, hiFieldLabels, hiPlaceholders, hiSelectOptions } from "@/data/hindiTranslations";
import { getFieldPlaceholder } from "@/data/fieldPlaceholders";
import { type LangCode } from "@/data/languages";
import { ArrowLeft, Eye, Edit3, Share2, Sparkles } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import ShareBottomSheet from "@/components/ShareBottomSheet";
import useSEO from "@/hooks/useSEO";

const STORAGE_KEY_PREFIX = "ravomix_app_form_";

const ApplicationForm = () => {
  const { id } = useParams();
  const template = applicationTemplates.find((t) => t.id === id);
  const storageKey = `${STORAGE_KEY_PREFIX}${id}`;
  const { t, lang } = useAppLang();
  const isHi = lang === 'hi';
  const seoTitle = template ? `${template.title} — Free Format & Sample | Ravomix` : "Application Letter — Ravomix";
  useSEO({
    title: seoTitle.length > 70 ? `${template?.title ?? "Application"} | Ravomix` : seoTitle,
    description: template
      ? `Write a ${template.title.toLowerCase()} in minutes. Fill the form, preview, download or share the PDF. Free format with English & Hindi support.`
      : "Generate application letters instantly with Ravomix.",
    path: `/applications/${id ?? ""}`,
    ogType: "article",
  });

  const [data, setData] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [showPreview, setShowPreview] = useState(false);
  const [docLang, setDocLang] = useState<LangCode>('en-US');
  const [signature, setSignature] = useState('');
  const [showBranding, setShowBranding] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

  // Share button — gated by short rewarded ad (skippable after 5s)
  const handleShareClick = useCallback(async () => {
    await showRewardedAd({ reason: "Support Ravomix — watch a short ad" });
    setShareOpen(true);
  }, []);

  const handleShareClose = useCallback(() => {
    setShareOpen(false);
  }, []);

  // Remove branding via rewarded ad
  const handleRemoveBranding = useCallback(async () => {
    const ok = await showRewardedAd({ reason: "Watch a short ad to remove branding from your document" });
    if (ok) setShowBranding(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data, storageKey]);

  if (!template) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Template not found</p>
        </div>
      </Layout>
    );
  }

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const templateTitle = isHi ? (hiTemplateTitles[template.id] || template.title) : template.title;
  const getLabel = (label: string) => isHi ? (hiFieldLabels[label] || label) : label;
  const getPlaceholder = (key: string, ph?: string) => {
    if (ph) return isHi ? (hiPlaceholders[ph] || ph) : ph;
    return getFieldPlaceholder(key, isHi ? 'hi' : 'en');
  };
  const getOptionLabel = (label: string) => isHi ? (hiSelectOptions[label] || label) : label;

  const inlineFields = template.fields.filter(f => f.type !== "textarea");
  const textareaFields = template.fields.filter(f => f.type === "textarea");

  const renderField = (field: typeof template.fields[0]) => (
    <div key={field.key}>
      <label className="mb-1 block text-xs md:text-sm font-semibold text-muted-foreground">
        {getLabel(field.label)} {field.required && <span className="text-destructive">*</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          value={data[field.key] || ""}
          onChange={(e) => handleChange(field.key, e.target.value)}
          placeholder={getPlaceholder(field.key, field.placeholder)}
          rows={3}
          className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm md:text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      ) : field.type === "select" ? (
        <select
          value={data[field.key] || ""}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm md:text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{isHi ? 'चुनें...' : 'Select...'}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{getOptionLabel(opt.label)}</option>
          ))}
        </select>
      ) : field.type === "id-type" ? (
        <select
          value={data[field.key] || ""}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm md:text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{isHi ? 'पहचान पत्र प्रकार चुनें...' : 'Select ID Type...'}</option>
          {ID_TYPES.map((opt) => (
            <option key={opt.value} value={opt.label}>{getOptionLabel(opt.label)}</option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          value={data[field.key] || ""}
          onChange={(e) => handleChange(field.key, e.target.value)}
          placeholder={getPlaceholder(field.key, field.placeholder)}
          className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm md:text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      )}
    </div>
  );

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8">
        <div className="no-print mb-4 flex items-center gap-3">
          <Link to="/applications" className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-card shadow-sm border border-border">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg md:text-xl font-bold">{template.icon} {templateTitle}</h1>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs md:text-sm font-semibold text-primary-foreground shadow-sm active:scale-[0.97] transition"
          >
            {showPreview ? <Edit3 className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showPreview ? t('form.edit') : t('form.preview')}
          </button>
        </div>

        {showPreview && (
          <div className="no-print mb-3 flex justify-end">
            <LanguageSwitcher value={docLang} onChange={setDocLang} />
          </div>
        )}

        {showPreview ? (
          <div className="max-w-2xl mx-auto pb-4">
            <DocumentPreview data={data} title={docLang === 'hi' ? (hiTemplateTitles[template.id] || template.title) : template.title} bodyTemplate={docLang === 'hi' ? (hiBodyTemplates[template.id] || template.bodyTemplate) : template.bodyTemplate} lang={docLang} signatureDataUrl={signature} showBranding={showBranding} />
            <RavomixBranding showBranding={showBranding} />

            <div className="no-print mt-4 flex flex-col items-center gap-2">
              {showBranding && (
                <button
                  onClick={handleRemoveBranding}
                  className="flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground shadow-sm active:scale-[0.97] transition hover:bg-muted"
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  ✨ Remove Branding — Watch Ad
                </button>
              )}
              <button
                onClick={handleShareClick}
                className="flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm active:scale-[0.97] transition"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
            {shareOpen && (
              <ShareBottomSheet open={shareOpen} onClose={handleShareClose} documentTitle={templateTitle} />
            )}
          </div>
        ) : (
          <div className="pb-4 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {inlineFields.map(renderField)}
            </div>
            <div className="space-y-3 mt-3">
              {textareaFields.map(renderField)}
            </div>
            <div className="mt-3">
              <SignaturePad value={signature} onChange={setSignature} />
            </div>
          </div>
        )}
        <InlineAd />
        <div className="h-24" />
      </div>
    </Layout>
  );
};

export default ApplicationForm;
