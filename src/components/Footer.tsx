import { Link } from "react-router-dom";
import { useAppLang } from "@/contexts/AppLanguageContext";

const Footer = () => {
  const { t, lang } = useAppLang();

  const links = [
    { to: "/privacy", label: t("footer.privacy") },
    { to: "/terms", label: t("footer.terms") },
    { to: "/cookies", label: t("footer.cookies") },
    { to: "/dmca", label: t("footer.dmca") },
    { to: "/contact", label: t("footer.contact") },
    { to: "/faq", label: t("footer.faq") },
    { to: "/sitemap", label: t("footer.sitemap") },
  ];

  return (
    <footer className="no-print mt-8 border-t border-border/40 bg-card/40 px-4 py-5 text-center">
      <nav className="mb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        {links.map((l, i) => (
          <span key={l.to} className="flex items-center gap-3">
            <Link
              to={l.to}
              className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
            {i < links.length - 1 && (
              <span className="text-[10px] text-muted-foreground/30">|</span>
            )}
          </span>
        ))}
      </nav>
      <p className="text-[10px] leading-relaxed text-muted-foreground/70">
        {lang === "hi"
          ? "© 2026 रावोमिक्स. सर्वाधिकार सुरक्षित."
          : "© 2026 Ravomix. All Rights Reserved."}
      </p>
    </footer>
  );
};

export default Footer;
