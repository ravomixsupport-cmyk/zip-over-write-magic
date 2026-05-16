import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Cookie } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const CookiePolicy = () => {
  const { t } = useAppLang();
  const sectionKeys = Array.from({ length: 6 }, (_, i) => i + 1);
  useSEO({
    title: "Cookie Policy — Ravomix",
    description: "Which cookies Ravomix uses, why we use them, and how to control them in your browser settings.",
    path: "/cookies",
  });

  return (
    <Layout>
      <div className="px-4 pt-4 pb-8">
        <div className="mb-4 flex items-center gap-3">
          <Link
            to="/settings"
            className="rounded-xl bg-card p-2 shadow-sm border border-border"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">{t("cookies.title")}</h1>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed">
          <p className="text-xs text-muted-foreground">{t("cookies.updated")}</p>
          {sectionKeys.map((i) => (
            <div key={i}>
              <h3 className="font-bold text-foreground">{t(`cookies.h${i}`)}</h3>
              <p className="mt-1 text-muted-foreground whitespace-pre-line">
                {t(`cookies.p${i}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
