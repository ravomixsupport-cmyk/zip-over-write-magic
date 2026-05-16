import { useMemo, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import InlineAd from "@/components/ads/InlineAd";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import { useAppLang } from "@/contexts/AppLanguageContext";
import { getSeoLanding, getTargetPath, slugMap, SeoLanding } from "@/data/seoLandings";

const SITE_URL = "https://ravomix.com";

const kindLabel = (l: SeoLanding) =>
  l.kind === "tool" ? "Open Tool" : l.kind === "application" ? "Open Application Form" : "Open Complaint Form";

const breadcrumbCrumbs = (l: SeoLanding) => {
  const parent =
    l.kind === "tool"
      ? { name: "Tools", path: "/tools" }
      : l.kind === "application"
      ? { name: "Applications", path: "/applications" }
      : { name: "Complaints", path: "/complaints" };
  return [
    { name: "Home", path: "/" },
    parent,
    { name: l.h1, path: `/${l.slug}` },
  ];
};

const SeoLandingPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+|\/+$/g, "");
  const landing = getSeoLanding(slug);
  const { lang } = useAppLang();
  const isHi = lang === "hi";
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Always call hooks unconditionally
  const jsonLd = useMemo(() => {
    if (!landing) return undefined;
    const crumbs = breadcrumbCrumbs(landing);
    return [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: landing.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path}`,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": landing.kind === "tool" ? "SoftwareApplication" : "HowTo",
        name: landing.h1,
        description: landing.description,
        url: `${SITE_URL}/${landing.slug}`,
        ...(landing.kind === "tool"
          ? {
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            }
          : {}),
      },
    ];
  }, [landing]);

  useSEO({
    title: landing?.title ?? "Ravomix",
    description: landing?.description ?? "Free Indian document templates and tools.",
    path: `/${slug}`,
    ogType: landing?.kind === "tool" ? "website" : "article",
    jsonLd,
  });

  if (!landing) return <Navigate to="/" replace />;

  const target = getTargetPath(landing);
  const related = (landing.related ?? []).map((s) => slugMap[s]).filter(Boolean);

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link
            to={landing.kind === "tool" ? "/tools" : landing.kind === "application" ? "/applications" : "/complaints"}
            className="hover:text-foreground capitalize"
          >
            {landing.kind === "tool" ? "Tools" : landing.kind === "application" ? "Applications" : "Complaints"}
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{landing.h1}</span>
        </nav>

        <div className="mb-4 flex items-center gap-3">
          <Link to="/" className="rounded-xl bg-card p-2 shadow-sm border border-border active:scale-95 transition-transform" aria-label="Back to home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{landing.h1}</h1>
          {landing.h1Hi && (
            <p className="mt-1 text-base text-muted-foreground">{landing.h1Hi}</p>
          )}
        </header>

        {/* CTA */}
        <Link
          to={target}
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm active:scale-[0.98] transition-transform"
        >
          {kindLabel(landing)} <ArrowRight className="h-4 w-4" />
        </Link>

        {/* Intro */}
        <section className="prose prose-sm md:prose-base max-w-none mb-6">
          <p className="text-sm md:text-base leading-relaxed text-foreground/90">
            {isHi && landing.introHi ? landing.introHi : landing.intro}
          </p>
          {!isHi && landing.introHi && (
            <p className="text-sm leading-relaxed text-muted-foreground mt-2">{landing.introHi}</p>
          )}
        </section>

        {/* Keywords */}
        {landing.keywords && landing.keywords.length > 0 && (
          <ul className="mb-6 flex flex-wrap gap-2" aria-label="Related keywords">
            {landing.keywords.map((k) => (
              <li key={k} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {k}
              </li>
            ))}
          </ul>
        )}

        <InlineAd />

        {/* FAQ */}
        <section className="mt-6" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-3 text-lg md:text-xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {landing.faqs.map((f, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-3 p-3 text-left"
                  >
                    <span className="text-sm md:text-base font-semibold">{f.q}</span>
                    {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {open && (
                    <div className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-8" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-3 text-lg font-bold">Related on Ravomix</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${r.slug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 text-sm hover:shadow-md transition"
                  >
                    <span className="font-semibold">{r.h1}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="h-24" />
      </div>
    </Layout>
  );
};

export default SeoLandingPage;
