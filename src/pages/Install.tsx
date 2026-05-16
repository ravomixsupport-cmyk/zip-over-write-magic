import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Download, Share2, CheckCircle2, Smartphone, ArrowLeft } from "lucide-react";
import useSEO from "@/hooks/useSEO";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  useSEO({
    title: "Install Ravomix App — Android & PWA Download",
    description: "Install Ravomix on your phone for offline access to 200+ document templates and 50+ tools. Available as Android app and Progressive Web App.",
    path: "/install",
  });
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8 pb-24">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/" className="rounded-xl bg-card p-2 shadow-sm border border-border active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Install App</h1>
        </div>

        <div className="flex flex-col items-center text-center gap-6 max-w-md mx-auto">
          {/* App Icon */}
          <div className="relative">
            <img src="/app-icon.png" alt="Ravomix" className="h-24 w-24 rounded-[1.5rem] shadow-xl object-contain" />
            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
              <Smartphone className="h-4 w-4" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Ravomix</h2>
            <p className="text-sm text-muted-foreground">
              Install Ravomix on your device for the best experience — works offline, launches instantly!
            </p>
          </div>

          {isInstalled ? (
            <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-6 py-4 text-primary">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-semibold">App is already installed!</span>
            </div>
          ) : deferredPrompt ? (
            <button
              onClick={handleInstall}
              className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg active:scale-95 transition-transform"
            >
              <Download className="h-5 w-5" />
              Install Ravomix
            </button>
          ) : isIOS ? (
            <div className="rounded-2xl border border-border bg-card p-5 text-left space-y-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                iOS pe install kaise karein:
              </p>
              <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Safari me neeche <strong>Share</strong> button tap karein (box with arrow icon)</li>
                <li>Scroll karein aur <strong>"Add to Home Screen"</strong> tap karein</li>
                <li><strong>"Add"</strong> tap karein</li>
              </ol>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-5 text-left space-y-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                Install kaise karein:
              </p>
              <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Browser menu open karein (3 dots ⋮)</li>
                <li><strong>"Install app"</strong> ya <strong>"Add to Home Screen"</strong> tap karein</li>
                <li><strong>"Install"</strong> tap karein</li>
              </ol>
            </div>
          )}

          {/* Features */}
          <div className="w-full grid grid-cols-1 gap-3 mt-4">
            {[
              { icon: "⚡", title: "Instant Launch", desc: "Opens like a native app" },
              { icon: "📴", title: "Works Offline", desc: "No internet needed for core features" },
              { icon: "🔒", title: "100% Private", desc: "All data stays on your device" },
              { icon: "🚀", title: "Faster & Lighter", desc: "No app store download needed" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <span className="text-2xl">{f.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Install;
