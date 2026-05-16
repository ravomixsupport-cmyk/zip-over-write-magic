import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useAppLang();
  useSEO({
    title: "Page Not Found — Ravomix",
    description: "The page you are looking for could not be found on Ravomix. Return to the home page to explore templates and tools.",
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 mb-5">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="mb-2 text-5xl font-extrabold text-foreground">404</h1>
        <p className="mb-2 text-lg font-semibold text-foreground">
          {lang === "hi" ? "पृष्ठ नहीं मिला" : "Page Not Found"}
        </p>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {lang === "hi"
            ? "क्षमा करें, यह पृष्ठ मौजूद नहीं है या स्थानांतरित कर दिया गया है।"
            : "Sorry, the page you are looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-95"
        >
          <Home className="h-4 w-4" />
          {lang === "hi" ? "होम पर जाएं" : "Return to Home"}
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
