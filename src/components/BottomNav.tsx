import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { House, FileText, MessageSquareWarning, Wrench, BookOpen } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";

const BottomNav = () => {
  const location = useLocation();
  const { t, lang } = useAppLang();

  const navItems = [
    { path: "/", label: t('nav.home'), icon: House },
    { path: "/applications", label: t('nav.apps'), icon: FileText },
    { path: "/complaints", label: t('nav.complaints'), icon: MessageSquareWarning },
    { path: "/tools", label: t('nav.tools'), icon: Wrench },
    { path: "/guide", label: lang === 'hi' ? 'गाइड' : 'Guide', icon: BookOpen },
  ];

  return (
    <nav className="no-print fixed bottom-0 left-0 right-0 z-50 safe-area-bottom lg:hidden">
      <div className="mx-3 mb-2 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/30">
        <div className="flex items-center justify-around px-1 py-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 select-none active:scale-90 transition-transform touch-manipulation"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 rounded-xl bg-primary/15 dark:bg-primary/20"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <motion.div
                  className="relative z-10"
                  animate={isActive ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </motion.div>
                <motion.span
                  className={`relative z-10 text-[10px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  animate={isActive ? { y: -1 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {item.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary shadow-sm shadow-primary/50"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
