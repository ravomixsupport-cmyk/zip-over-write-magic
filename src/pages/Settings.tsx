import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Shield,
  Star,
  ChevronRight,
  Trash2,
  Bug,
  ToggleLeft,
  ToggleRight,
  Mail,
  Eye,
  Share2,
  Cookie,
  Copyright,
  HelpCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
const Capacitor = { getPlatform: () => "web" as const, isNativePlatform: () => false };
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const DEBUG_KEY = "ravomix_debug_mode";

const Settings = () => {
  const { toast } = useToast();
  const { t } = useAppLang();
  const navigate = useNavigate();
  useSEO({
    title: "Settings — Language, Theme & Account | Ravomix",
    description: "Manage your Ravomix preferences: language, theme, branding, and access privacy, terms and support links.",
    path: "/settings",
  });

  const [debugMode, setDebugMode] = useState(() => localStorage.getItem(DEBUG_KEY) === "true");
  const [debugTaps, setDebugTaps] = useState(0);
  const [showBranding, setShowBranding] = useState(() => localStorage.getItem("ravomix_show_branding") !== "false");
  const [mockAds, setMockAds] = useState(() => localStorage.getItem("ravomix_mock_ads") === "true");

  const debugTapsRef = useRef(0);
  const handleVersionTap = () => {
    debugTapsRef.current += 1;
    setDebugTaps(debugTapsRef.current);
    if (debugTapsRef.current >= 7) {
      if (!debugMode) {
        setDebugMode(true);
        localStorage.setItem(DEBUG_KEY, "true");
        toast({ title: "🛠️ Debug Mode Enabled", description: "Developer options are now visible." });
      }
      debugTapsRef.current = 0;
      setDebugTaps(0);
    }
  };

  const toggleBranding = () => {
    const next = !showBranding;
    setShowBranding(next);
    localStorage.setItem("ravomix_show_branding", String(next));
    toast({ title: `Branding ${next ? "Shown" : "Hidden"}` });
  };

  const toggleMockAds = () => {
    const next = !mockAds;
    setMockAds(next);
    localStorage.setItem("ravomix_mock_ads", String(next));
    toast({ title: `Mock Ads ${next ? "Enabled" : "Disabled"}` });
  };

  const handleRate = () => {
    const url = "https://play.google.com/store/apps/details?id=com.tapesh.ravomix";
    window.open(url, "_blank");
  };

  const handleShareApp = async () => {
    const shareData = {
      title: "Ravomix - Documents & Utility Tools",
      text: "Create applications, complaints & access utility tools – all free! Download Ravomix now.",
      url: "https://play.google.com/store/apps/details?id=com.tapesh.ravomix",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error — ignore
      }
    } else {
      const fallbackText = "Download Ravomix - Free Document Generator & Utility Tools app. 100% free! https://play.google.com/store/apps/details?id=com.tapesh.ravomix";
      try {
        await navigator.clipboard.writeText(fallbackText);
        toast({ title: "Link copied to clipboard!" });
      } catch {
        toast({ title: "Could not copy link", description: "Please share manually." });
      }
    }
  };

  const handleClearAll = () => {
    if (!confirm(t('settings.clearConfirm'))) return;
    localStorage.clear();
    toast({ title: t('settings.clearAll'), description: t('settings.clearDesc') });
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  );

  const ActionRow = ({
    icon: Icon,
    label,
    desc,
    onClick,
  }: {
    icon: typeof Star;
    label: string;
    desc: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
    </button>
  );

  return (
    <Layout>
      <div className="px-4 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 transition hover:bg-primary/20 active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground">{t('settings.title')}</h1>
            <p className="text-xs text-muted-foreground">{t('settings.subtitle')}</p>
          </div>
        </div>

        {/* Privacy & Legal */}
        <Section title={t('settings.privacyLegal')}>
          <Link to="/privacy" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.privacyPolicy')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.privacyDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <Link to="/about" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <User className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.aboutUs')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.aboutUsDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <Link to="/terms" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.tos')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.tosDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <Link to="/cookies" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Cookie className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.cookies')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.cookiesDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <Link to="/dmca" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Copyright className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.dmca')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.dmcaDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
        </Section>

        {/* App */}
        <Section title={t('settings.app')}>
          <ActionRow icon={Star} label={t('settings.rate')} desc={t('settings.rateDesc')} onClick={handleRate} />
          <Separator />
          <ActionRow icon={Share2} label={t('settings.share')} desc={t('settings.shareDesc')} onClick={handleShareApp} />
          <Separator />
          <Link to="/faq" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <HelpCircle className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.faq')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.faqDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <Link to="/contact" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.contact')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.contactDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <a href="mailto:Ravomixsupport@gmail.com?subject=Ravomix%20Support" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.contactSupport')}</p>
              <p className="text-xs text-muted-foreground truncate">Ravomixsupport@gmail.com</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </a>
          <Separator />
          <Link to="/data-deletion" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-muted active:scale-[0.98]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Trash2 className="h-4.5 w-4.5 text-primary icon-rotate-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t('settings.dataDeletion')}</p>
              <p className="text-xs text-muted-foreground truncate">{t('settings.dataDeletionDesc')}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
          </Link>
          <Separator />
          <ActionRow icon={Trash2} label={t('settings.clearAll')} desc={t('settings.clearDesc')} onClick={handleClearAll} />
        </Section>

        {/* Disclaimer */}
        <Section title={t('disclaimer.title')}>
          <div className="px-3 py-2">
            <p className="text-xs leading-relaxed text-muted-foreground">{t('disclaimer.text')}</p>
          </div>
        </Section>

        {/* Debug Mode (hidden until activated by 7 taps on version) */}
        {debugMode && (
          <Section title="🛠️ Developer / Debug">
            <div className="space-y-2">
              <button onClick={toggleBranding} className="flex w-full items-center justify-between rounded-xl px-3 py-3 hover:bg-muted transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Show Branding</p>
                    <p className="text-xs text-muted-foreground">Toggle Ravomix branding</p>
                  </div>
                </div>
                {showBranding ? <ToggleRight className="h-6 w-6 text-primary" /> : <ToggleLeft className="h-6 w-6 text-muted-foreground" />}
              </button>
              <Separator />
              <button onClick={toggleMockAds} className="flex w-full items-center justify-between rounded-xl px-3 py-3 hover:bg-muted transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <Bug className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Mock Ad Flow</p>
                    <p className="text-xs text-muted-foreground">Simulate ad loading in emulator</p>
                  </div>
                </div>
                {mockAds ? <ToggleRight className="h-6 w-6 text-primary" /> : <ToggleLeft className="h-6 w-6 text-muted-foreground" />}
              </button>
              <Separator />
              <button onClick={() => { setDebugMode(false); localStorage.setItem(DEBUG_KEY, "false"); toast({ title: "Debug Mode OFF" }); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 hover:bg-muted transition">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10">
                  <Bug className="h-4 w-4 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-destructive">Disable Debug Mode</p>
                  <p className="text-xs text-muted-foreground">Hide developer options</p>
                </div>
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-2">
              Platform: {Capacitor.getPlatform()} • Native: {Capacitor.isNativePlatform() ? "Yes" : "No"}
            </p>
          </Section>
        )}

        {/* Version - tap 7 times to enable debug */}
        <button onClick={handleVersionTap} className="w-full">
          <p className="text-center text-[11px] text-muted-foreground/50 pt-2">
            Ravomix v2.1.0 • {t('settings.madeInIndia')}
          </p>
          {debugTaps > 0 && debugTaps < 7 && (
            <p className="text-[9px] text-muted-foreground/30 mt-0.5 text-center">{7 - debugTaps} taps to developer mode</p>
          )}
        </button>
      </div>

      
    </Layout>
  );
};

export default Settings;
