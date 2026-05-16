import { Link, useLocation } from "react-router-dom";
import { House, FileText, MessageSquareWarning, Wrench, Dices, Settings, Info, ShieldCheck, Globe, Smartphone, BookOpen, Mail, HelpCircle, Cookie, Copyright, Map } from "lucide-react";

import { useAppLang } from "@/contexts/AppLanguageContext";

const DesktopNav = () => {
  const location = useLocation();
  const { lang, setLang, t } = useAppLang();

  const navItems = [
    { path: "/", label: t('nav.home'), icon: House },
    { path: "/applications", label: t('nav.apps'), icon: FileText },
    { path: "/complaints", label: t('nav.complaints'), icon: MessageSquareWarning },
    { path: "/tools", label: t('nav.tools'), icon: Wrench },
  ];

  const secondaryItems = [
    { path: "/guide", label: lang === 'hi' ? 'गाइड' : 'Guide', icon: BookOpen },
    { path: "/spin", label: t('quick.spin'), icon: Dices },
    { path: "/contact", label: t('contact.title'), icon: Mail },
    { path: "/faq", label: t('faq.title'), icon: HelpCircle },
    { path: "/about", label: t('settings.aboutUs'), icon: Info },
    { path: "/privacy", label: t('privacy.title'), icon: ShieldCheck },
    { path: "/terms", label: t('settings.tos'), icon: ShieldCheck },
    { path: "/cookies", label: t('cookies.title'), icon: Cookie },
    { path: "/dmca", label: t('dmca.title'), icon: Copyright },
    { path: "/sitemap", label: t('sitemap.title'), icon: Map },
    { path: "/settings", label: t('settings.title'), icon: Settings },
    { path: "/playstore-assets", label: "Play Store", icon: Smartphone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden lg:flex flex-col w-60 xl:w-64 border-r border-border bg-card/50 backdrop-blur-sm h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <Link to="/" className="block">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span style={{ color: "#FF8C00" }}>Ravo</span><span className="text-primary">mix</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Document & Utility Toolkit</p>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4.5 w-4.5 flex-shrink-0" strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">More</p>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0" strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-4 pt-2 border-t border-border space-y-2">
        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === 'en' ? 'Hindi' : 'EN'}
          </button>
          
        </div>
      </div>
    </aside>
  );
};

export default DesktopNav;
