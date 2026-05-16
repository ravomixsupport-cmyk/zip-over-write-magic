import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, ChevronDown, HelpCircle } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const FAQ = () => {
  const { t } = useAppLang();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = Array.from({ length: 10 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }));

  useSEO({
    title: "Frequently Asked Questions — Ravomix",
    description: "Answers to common questions about Ravomix free document templates, online tools, languages, offline use and the Android app.",
    path: "/faq",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
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
            <HelpCircle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">{t("faq.title")}</h1>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{t("faq.intro")}</p>

        <div className="space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-muted/40"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border/50 px-4 py-3">
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
