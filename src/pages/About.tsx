import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Shield, Globe, FileText, Zap, Languages, Smartphone, ChevronRight, Mail, Calculator, AlertTriangle } from "lucide-react";
import ravomixIcon from "@/assets/ravomix-icon.png";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const About = () => {
  const { t } = useAppLang();
  useSEO({
    title: "About Ravomix — Free Document Templates & Tools for India",
    description: "Ravomix is a free toolkit with 200+ document templates and 50+ utility tools for students, professionals, and businesses in India. Hindi & English, no login.",
    path: "/about",
  });

  const features = [
    { icon: FileText, titleKey: 'about.feat1.title', descKey: 'about.feat1.desc' },
    { icon: Globe, titleKey: 'about.feat2.title', descKey: 'about.feat2.desc' },
    { icon: Shield, titleKey: 'about.feat3.title', descKey: 'about.feat3.desc' },
    { icon: Languages, titleKey: 'about.feat4.title', descKey: 'about.feat4.desc' },
    { icon: Zap, titleKey: 'about.feat5.title', descKey: 'about.feat5.desc' },
    { icon: Calculator, titleKey: 'about.feat6.title', descKey: 'about.feat6.desc' },
  ];

  const whoFor = [
    { emoji: "📚", titleKey: 'about.who1', descKey: 'about.who1.desc' },
    { emoji: "💼", titleKey: 'about.who2', descKey: 'about.who2.desc' },
    { emoji: "⚖️", titleKey: 'about.who3', descKey: 'about.who3.desc' },
    { emoji: "🌐", titleKey: 'about.who4', descKey: 'about.who4.desc' },
  ];

  return (
    <Layout>
      <div className="px-4 pt-4 pb-28">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/settings" className="rounded-xl bg-card p-2 shadow-sm border border-border">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">{t('about.title')}</h1>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-3">
            <img src={ravomixIcon} alt="Ravomix" className="h-10 w-10 object-contain drop-shadow-md" />
            Ravomix
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('about.desc')}
          </p>
          <p className="text-xs font-semibold text-primary">{t('about.madein')}</p>
        </div>

        {/* Key Features */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground">✨ {t('about.features')}</h3>
          <div className="space-y-3">
            {features.map((item) => (
              <div key={item.titleKey} className="flex gap-3 items-start">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t(item.titleKey)}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-foreground">👥 {t('about.whofor')}</h3>
          <div className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
            {whoFor.map((item) => (
              <p key={item.titleKey}>
                {item.emoji} <strong className="text-foreground">{t(item.titleKey)}</strong> — {t(item.descKey)}
              </p>
            ))}
          </div>
        </div>

        {/* What You Can Do */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-foreground">🏷️ {t('about.whatcando')}</h3>
          <div className="flex flex-wrap gap-1.5">
            {["Document Templates", "Application Forms", "Complaint Letters",
              "Advocate / Legal", "CA / Finance", "Postal / Courier", "Startup / Business",
              "School / College", "Office", "Bank", "Government",
              "Utility Tools", "PDF Export", "GST Calculator", "EMI Calculator",
              "Income Tax Calculator", "SIP Calculator", "Currency Converter",
              "Password Generator", "BMI Calculator", "Multi-Language", "No Login Required",
            ].map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-2 text-sm font-bold">⚠️ {t('about.disclaimer')}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t('about.disclaimer.text')}
          </p>
        </div>

        {/* Support Contact */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-foreground">{t('settings.contactSupport')}</h3>
          <a
            href="mailto:Ravomixsupport@gmail.com?subject=Ravomix%20Support"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 hover:bg-muted transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Ravomixsupport@gmail.com</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </a>
        </div>

        <p className="mt-4 text-center text-[10px] text-muted-foreground">Version 2.1.0 • {t('settings.madeInIndia')}</p>
      </div>
    </Layout>
  );
};

export default About;
