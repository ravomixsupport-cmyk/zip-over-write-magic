import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Map } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const Sitemap = () => {
  const { t, lang } = useAppLang();
  useSEO({
    title: "Sitemap — All Pages, Templates & Tools | Ravomix",
    description: "Browse every section of Ravomix: applications, complaints, tools, guides and policies — all in one place.",
    path: "/sitemap",
  });

  const groups = [
    {
      title: lang === "hi" ? "मुख्य" : "Main",
      links: [
        { to: "/", label: t("nav.home") },
        { to: "/applications", label: t("page.applications") },
        { to: "/complaints", label: t("page.complaints") },
        { to: "/tools", label: t("nav.tools") },
        { to: "/guide", label: lang === "hi" ? "गाइड" : "Guide" },
        { to: "/spin", label: t("quick.spin") },
      ],
    },
    {
      title: lang === "hi" ? "कानूनी और गोपनीयता" : "Legal & Privacy",
      links: [
        { to: "/privacy", label: t("privacy.title") },
        { to: "/terms", label: t("settings.tos") },
        { to: "/cookies", label: t("cookies.title") },
        { to: "/dmca", label: t("dmca.title") },
        { to: "/data-deletion", label: t("dataDeletion.title") },
      ],
    },
    {
      title: lang === "hi" ? "सहायता और अधिक" : "Help & More",
      links: [
        { to: "/contact", label: t("contact.title") },
        { to: "/faq", label: t("faq.title") },
        { to: "/about", label: t("settings.aboutUs") },
        { to: "/settings", label: t("settings.title") },
      ],
    },
  ];

  return (
    <Layout>
      <div className="px-4 pt-4 pb-8">
        <div className="mb-4 flex items-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-card p-2 shadow-sm border border-border"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">{t("sitemap.title")}</h1>
          </div>
        </div>

        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group.title}
              </h2>
              <ul className="space-y-2">
                {group.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
