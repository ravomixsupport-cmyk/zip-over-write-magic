// Ravomix Home
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero3D from "@/components/Hero3D";
import FloatingParticles from "@/components/FloatingParticles";
import InlineAd from "@/components/ads/InlineAd";

import { applicationTemplates } from "@/data/applicationTemplates";
import { complaintTemplates } from "@/data/complaintTemplates";
import { toolsList } from "@/data/tools";
import { Search, ChevronRight, Globe, Sparkles, ScrollText, BadgeAlert, Blocks, BookOpen, type LucideIcon } from "lucide-react";

import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";


const Category3DIcon = ({ Icon, backColor, frontColor }: { Icon: LucideIcon; backColor: string; frontColor: string }) => (
  <span className="relative inline-flex h-7 w-7 items-center justify-center icon-rotate-slow">
    <Icon
      className="absolute translate-x-[2px] translate-y-[2px] opacity-70"
      strokeWidth={2.6}
      style={{ color: backColor }}
      aria-hidden
    />
    <Icon
      className="relative drop-shadow-[0_5px_8px_hsl(var(--background)/0.5)]"
      strokeWidth={2}
      style={{ color: frontColor }}
    />
  </span>
);

const Home = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<'all' | 'application' | 'complaint' | 'tool'>('all');
  const { lang, setLang, t } = useAppLang();
  useSEO({
    title: "Ravomix — Free Application & Complaint Letters, Legal Forms & Tools",
    description: "200+ free document templates and 50+ utility tools for India. Generate application letters, complaints, legal & finance forms in Hindi or English. No login.",
    path: "/",
  });

  const categories = [
    {
      title: t('cat.applications'),
      icon: <Category3DIcon Icon={ScrollText} backColor="rgba(255,200,100,0.7)" frontColor="#FFFFFF" />,
      path: "/applications",
      gradient: "from-[#FF6B00] via-[#FF8C00] to-[#FFB347]",
      iconBg: "bg-white/20 text-white",
      count: applicationTemplates.length,
      glare: "hsl(30, 100%, 55%)"
    },
    {
      title: t('cat.complaints'),
      icon: <Category3DIcon Icon={BadgeAlert} backColor="rgba(255,180,80,0.7)" frontColor="#FFFFFF" />,
      path: "/complaints",
      gradient: "from-[#E65100] via-[#FF6D00] to-[#FFA040]",
      iconBg: "bg-white/20 text-white",
      count: complaintTemplates.length,
      glare: "hsl(25, 100%, 50%)"
    },
    {
      title: t('cat.tools'),
      icon: <Category3DIcon Icon={Blocks} backColor="rgba(255,160,60,0.7)" frontColor="#FFFFFF" />,
      path: "/tools",
      gradient: "from-[#D84315] via-[#F4511E] to-[#FF8A65]",
      iconBg: "bg-white/20 text-white",
      count: toolsList.length,
      glare: "hsl(18, 100%, 52%)"
    },
  ];

  const quickLinks = [
    { title: lang === 'hi' ? 'गाइड' : 'Guide', icon: "📖", path: "/guide", desc: lang === 'hi' ? 'एप्लिकेशन, शिकायत लिखना और टूल्स का उपयोग सीखें' : 'Learn how to write applications, complaints & use tools' },
    { title: t('quick.spin'), icon: "🎡", path: "/spin" },
    { title: t('quick.settings'), icon: "⚙️", path: "/settings" },
  ];

  const allItems = [
    ...applicationTemplates.map((tpl) => ({ id: tpl.id, title: tpl.title, icon: tpl.icon, category: tpl.category, type: "application" as const, path: `/applications/${tpl.id}` })),
    ...complaintTemplates.map((tpl) => ({ id: tpl.id, title: tpl.title, icon: tpl.icon, category: tpl.category, type: "complaint" as const, path: `/complaints/${tpl.id}` })),
    ...toolsList.map((tpl) => ({ id: tpl.id, title: tpl.title, icon: tpl.icon, category: tpl.category, type: "tool" as const, path: `/tools/${tpl.id}` })),
  ];

  const filtered = search.trim()
    ? allItems.filter((i) => {
        const q = search.toLowerCase();
        const matchesText = i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
        const matchesFilter = filter === 'all' || i.type === filter;
        return matchesText && matchesFilter;
      })
    : [];

  const countByType = (type?: string) => {
    if (!search.trim()) return 0;
    const q = search.toLowerCase();
    return allItems.filter(i => (!type || i.type === type) && (i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q))).length;
  };

  const filterTabs = [
    { key: 'all' as const, label: t('filter.all'), count: countByType() },
    { key: 'application' as const, label: `📋 ${t('filter.apps')}`, count: countByType('application') },
    { key: 'complaint' as const, label: `📢 ${t('filter.complaints')}`, count: countByType('complaint') },
    { key: 'tool' as const, label: `🔧 ${t('filter.tools')}`, count: countByType('tool') },
  ];

  return (
    <Layout>
      <div className="relative px-4 pt-2 pb-4 md:px-6 lg:px-8 overflow-x-hidden">
        {/* Live animated background */}
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <FloatingParticles />
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30 animate-blob-1"
               style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.55), transparent 70%)" }} />
          <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25 animate-blob-2"
               style={{ background: "radial-gradient(circle, hsl(var(--secondary)/0.5), transparent 70%)" }} />
          <div className="absolute bottom-10 left-1/4 h-64 w-64 rounded-full blur-3xl opacity-20 animate-blob-3"
               style={{ background: "radial-gradient(circle, hsl(280 80% 60% / 0.5), transparent 70%)" }} />
        </div>

        {/* Header */}
        <div className="mb-6 flex items-start justify-between lg:hidden relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              <span className="inline-block text-[#FF8C00]">Ravo</span>
              <span className="inline-block text-primary">mix</span>
              <Sparkles className="h-5 w-5 text-secondary inline ml-1" />
            </h1>
            <p className="text-sm text-primary mt-0.5">
              {t('home.tagline')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="relative inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 text-xs font-semibold text-muted-foreground overflow-hidden select-none active:scale-95 transition-transform"
              aria-label="Switch language"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {lang === 'en' ? 'Hindi' : 'EN'}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop welcome */}
        <div className="hidden lg:block mb-6 relative z-10">
          <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-primary">{t('home.tagline')}</h2>
        </div>

        {/* 3D Hero Section */}
        <Hero3D />

        {/* Search */}
        <div className="relative mb-6 z-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('home.search')}
            className="w-full rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-md py-3.5 pl-11 pr-4 text-sm md:text-base shadow-lg shadow-primary/5 dark:shadow-primary/10 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-xl focus:shadow-primary/10 select-none"
          />
        </div>

        {/* Search Results */}
        {search.trim() && (
          <div className="mb-6 relative z-10">
            <div className="mb-3 flex gap-2 overflow-x-auto no-scrollbar">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all select-none ${
                    filter === tab.key ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {filtered.length === 0 && <p className="col-span-full text-center text-sm text-muted-foreground py-8">No results found</p>}
              {filtered.slice(0, 18).map((item) => (
                <Link key={item.id + item.type} to={item.path} className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm p-3.5 transition-all active:scale-[0.98] hover:shadow-md hover:border-primary/30">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.category} · <span className="capitalize">{item.type}</span></p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard */}
        {!search.trim() && (
          <>
            {/* Category Cards */}
            <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 relative z-10">
              {categories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className={`group relative flex flex-col gap-3 rounded-2xl overflow-hidden p-4 md:p-5 transition-all duration-300 active:scale-[0.97] shadow-lg hover:shadow-2xl bg-gradient-to-br ${cat.gradient} hover:brightness-110`}
                >
                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/25 pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl ${cat.iconBg} backdrop-blur-sm shadow-lg shadow-black/10`}>
                      {cat.icon}
                    </div>
                    <p className="text-[13px] md:text-base font-bold mt-3 text-white drop-shadow-sm text-center leading-tight">{cat.title}</p>
                  </div>

                  {/* Decorative rings */}
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                  <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
                </Link>
              ))}
            </div>

            {/* Stats Banner */}
            <div className="relative z-10 mb-6">
              <div className="rounded-2xl border border-border/40 bg-card/70 dark:bg-card/50 backdrop-blur-xl p-4 md:p-6 overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-20 dark:opacity-30"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), transparent 40%, hsl(var(--secondary) / 0.2))",
                  }}
                />
                <div className="relative flex items-center justify-around text-center">
                  {[
                    { value: applicationTemplates.length + complaintTemplates.length, label: t('home.forms'), color: "text-primary" },
                    { value: toolsList.length, label: t('home.tools'), color: "text-secondary" },
                    { value: "☁️", label: t('home.online'), color: "text-foreground" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={`text-2xl md:text-3xl font-extrabold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Templates */}
            <div className="mb-6 relative z-10">
              <h2 className="mb-3 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {t('home.popular')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {applicationTemplates.slice(0, 6).map((tpl, i) => {
                  const cardGradients = [
                    "from-[#1E3A5F] via-[#2563EB] to-[#3B82F6]",
                    "from-[#065F46] via-[#059669] to-[#10B981]",
                    "from-[#9F1239] via-[#E11D48] to-[#FB7185]",
                    "from-[#92400E] via-[#D97706] to-[#FBBF24]",
                    "from-[#581C87] via-[#9333EA] to-[#C084FC]",
                    "from-[#0C4A6E] via-[#0284C7] to-[#38BDF8]",
                  ];
                  return (
                    <Link
                      key={tpl.id}
                      to={`/applications/${tpl.id}`}
                      className={`group relative flex items-center gap-3 rounded-2xl overflow-hidden p-3.5 transition-all shadow-md hover:shadow-xl bg-gradient-to-r ${cardGradients[i % cardGradients.length]} active:scale-[0.98]`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
                      <span className="relative z-10 text-xl bg-white/20 backdrop-blur-sm rounded-xl h-10 w-10 flex items-center justify-center shadow-sm">
                        <span className="icon-rotate inline-block">{tpl.icon}</span>
                      </span>
                      <div className="flex-1 min-w-0 relative z-10">
                        <p className="text-sm font-semibold truncate text-white drop-shadow-sm">{t(`tpl.${tpl.id}`) !== `tpl.${tpl.id}` ? t(`tpl.${tpl.id}`) : tpl.title}</p>
                        <p className="text-xs text-white/70">{t('tplcat.school') !== 'tplcat.school' && tpl.category === 'School / College' ? t('tplcat.school') : tpl.category}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0 relative z-10 group-hover:text-white transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-6 relative z-10">
              <h2 className="mb-3 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {t('home.more')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {quickLinks.map((link, i) => {
                  const linkGradients = [
                    "from-[#7C3AED] via-[#A855F7] to-[#C084FC]",
                    "from-[#0369A1] via-[#0EA5E9] to-[#7DD3FC]",
                  ];
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`group relative flex items-center gap-3 rounded-2xl overflow-hidden p-3.5 transition-all shadow-md hover:shadow-xl bg-gradient-to-r ${linkGradients[i % linkGradients.length]} active:scale-[0.98]`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
                      <span className="relative z-10 text-xl bg-white/20 backdrop-blur-sm rounded-xl h-10 w-10 flex items-center justify-center shadow-sm">
                        <span className="icon-rotate inline-block">{link.icon}</span>
                      </span>
                      <div className="flex-1 min-w-0 relative z-10">
                        <p className="text-sm font-semibold truncate text-white drop-shadow-sm">{link.title}</p>
                        {link.desc && <p className="text-xs text-white/70 truncate">{link.desc}</p>}
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0 relative z-10 group-hover:text-white transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <InlineAd />
        {/* Bottom spacer for sticky banner */}
        <div className="h-24" />
      </div>
    </Layout>
  );
};

export default Home;