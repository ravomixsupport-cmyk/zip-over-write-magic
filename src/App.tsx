import { useState, useCallback, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLanguageProvider } from "@/contexts/AppLanguageContext";
import { CurrencyProvider } from "@/hooks/useLocale";
import NetworkGuard from "@/components/NetworkGuard";
import ExitConfirmation from "@/components/ExitConfirmation";
import InstallPrompt from "@/components/InstallPrompt";
import ScrollToTop from "@/components/ScrollToTop";
import WelcomeDisclaimer, { STORAGE_KEY } from "@/components/WelcomeDisclaimer";
import AnchorBannerAd from "@/components/ads/AnchorBannerAd";
import RewardedAdOverlay from "@/components/ads/RewardedAdOverlay";
import NotFound from "./pages/NotFound";

const lazyWithPreload = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => {
  const Component = lazy(factory);
  (Component as any).__preload = factory;
  return Component;
};

const Home = lazyWithPreload(() => import("./pages/Home"));
const Applications = lazyWithPreload(() => import("./pages/Applications"));
const ApplicationForm = lazyWithPreload(() => import("./pages/ApplicationForm"));
const Complaints = lazyWithPreload(() => import("./pages/Complaints"));
const ComplaintForm = lazyWithPreload(() => import("./pages/ComplaintForm"));
const SpinWheel = lazyWithPreload(() => import("./pages/SpinWheel"));
const About = lazyWithPreload(() => import("./pages/About"));
const Privacy = lazyWithPreload(() => import("./pages/Privacy"));
const TermsOfService = lazyWithPreload(() => import("./pages/TermsOfService"));
const Settings = lazyWithPreload(() => import("./pages/Settings"));
const Install = lazyWithPreload(() => import("./pages/Install"));
const PlayStoreAssets = lazyWithPreload(() => import("./pages/PlayStoreAssets"));
const DataDeletion = lazyWithPreload(() => import("./pages/DataDeletion"));
const Guide = lazyWithPreload(() => import("./pages/Guide"));
const GuideArticle = lazyWithPreload(() => import("./pages/GuideArticle"));
const Contact = lazyWithPreload(() => import("./pages/Contact"));
const FAQ = lazyWithPreload(() => import("./pages/FAQ"));
const CookiePolicy = lazyWithPreload(() => import("./pages/CookiePolicy"));
const DMCA = lazyWithPreload(() => import("./pages/DMCA"));
const Sitemap = lazyWithPreload(() => import("./pages/Sitemap"));
const SeoLanding = lazyWithPreload(() => import("./pages/SeoLanding"));

const toolsImport = () => import("./pages/Tools");
const ToolsList = lazyWithPreload(() => toolsImport().then((m) => ({ default: m.default })));
const ToolPage = lazyWithPreload(() => toolsImport().then((m) => ({ default: m.ToolPage })));

const queryClient = new QueryClient();

const getStoredDisclaimerAcceptance = () => {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const App = () => {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(
    getStoredDisclaimerAcceptance
  );
  const handleDisclaimerAccept = useCallback(() => setDisclaimerAccepted(true), []);

  return (
    <AppLanguageProvider>
      <CurrencyProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              {!disclaimerAccepted && <WelcomeDisclaimer onAccept={handleDisclaimerAccept} />}
              <NetworkGuard />
              <InstallPrompt />
              <ExitConfirmation />
              <ScrollToTop />
              <AnchorBannerAd />
              <RewardedAdOverlay />
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center bg-background">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/applications/:id" element={<ApplicationForm />} />
                  <Route path="/complaints" element={<Complaints />} />
                  <Route path="/complaints/:id" element={<ComplaintForm />} />
                  <Route path="/tools" element={<ToolsList />} />
                  <Route path="/tools/:id" element={<ToolPage />} />
                  <Route path="/spin" element={<SpinWheel />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/install" element={<Install />} />
                  <Route path="/playstore-assets" element={<PlayStoreAssets />} />
                  <Route path="/data-deletion" element={<DataDeletion />} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="/guide/:id" element={<GuideArticle />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="/dmca" element={<DMCA />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  {/* SEO-friendly slug landing pages */}
                  <Route path="/emi-calculator" element={<SeoLanding />} />
                  <Route path="/gst-calculator" element={<SeoLanding />} />
                  <Route path="/income-tax-calculator" element={<SeoLanding />} />
                  <Route path="/sip-calculator" element={<SeoLanding />} />
                  <Route path="/work-from-home-request-letter" element={<SeoLanding />} />
                  <Route path="/leave-application" element={<SeoLanding />} />
                  <Route path="/resignation-letter" element={<SeoLanding />} />
                  <Route path="/salary-increase-letter" element={<SeoLanding />} />
                  <Route path="/bank-complaint-letter" element={<SeoLanding />} />
                  <Route path="/cyber-fraud-complaint" element={<SeoLanding />} />
                  <Route path="/consumer-complaint" element={<SeoLanding />} />
                  <Route path="/rti-application" element={<SeoLanding />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CurrencyProvider>
    </AppLanguageProvider>
  );
};

export default App;