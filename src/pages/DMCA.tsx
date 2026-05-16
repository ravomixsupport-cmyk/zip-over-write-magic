import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Copyright, Mail } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const DMCA = () => {
  const { t } = useAppLang();
  const sectionKeys = Array.from({ length: 5 }, (_, i) => i + 1);
  useSEO({
    title: "DMCA & Copyright Policy — Ravomix",
    description: "DMCA takedown procedure and copyright policy for Ravomix templates and content. Submit a notice or counter-notice.",
    path: "/dmca",
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
            <Copyright className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">{t("dmca.title")}</h1>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed">
          <p className="text-xs text-muted-foreground">{t("dmca.updated")}</p>
          {sectionKeys.map((i) => (
            <div key={i}>
              <h3 className="font-bold text-foreground">{t(`dmca.h${i}`)}</h3>
              <p className="mt-1 text-muted-foreground whitespace-pre-line">
                {t(`dmca.p${i}`)}
              </p>
            </div>
          ))}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a
                href="mailto:ravomixsupport@gmail.com?subject=DMCA%20Notice"
                className="text-xs font-semibold text-primary"
              >
                ravomixsupport@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DMCA;
