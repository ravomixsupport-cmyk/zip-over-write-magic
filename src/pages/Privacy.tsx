import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Mail } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const Privacy = () => {
  const { t } = useAppLang();
  useSEO({
    title: "Privacy Policy — Ravomix",
    description: "How Ravomix handles your data: no accounts, no tracking of personal info, all documents generated locally in your browser. Read the full privacy policy.",
    path: "/privacy",
  });

  const sectionKeys = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <Layout>
      <div className="px-4 pt-4 pb-28">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/settings" className="rounded-xl bg-card p-2 shadow-sm border border-border">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">{t('privacy.title')}</h1>
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed">
          <p className="text-xs text-muted-foreground">{t('privacy.updated')}</p>
          {sectionKeys.map((i) => (
            <div key={i}>
              <h3 className="font-bold">{t(`privacy.h${i}`)}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{t(`privacy.p${i}`)}</p>
            </div>
          ))}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-xs">{t('settings.contactSupport')}: <a href="mailto:Ravomixsupport@gmail.com?subject=Ravomix%20Privacy" className="text-primary font-semibold">Ravomixsupport@gmail.com</a></span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
