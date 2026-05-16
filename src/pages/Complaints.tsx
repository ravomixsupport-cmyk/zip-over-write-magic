import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { complaintTemplates } from "@/data/complaintTemplates";
import { hiCategories, hiTemplateTitles } from "@/data/hindiTranslations";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const Complaints = () => {
  const categories = [...new Set(complaintTemplates.map((t) => t.category))];
  const { t, lang } = useAppLang();
  const isHi = lang === 'hi';
  useSEO({
    title: "Complaint Letter Templates — Bank, Consumer, Housing & Police | Ravomix",
    description: `Browse ${complaintTemplates.length}+ professional complaint letter formats for bank, consumer, housing, police, travel and workplace issues. Free templates in Hindi & English.`,
    path: "/complaints",
  });

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/" className="rounded-xl bg-card p-2 shadow-sm border border-border">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">{t('page.complaints')}</h1>
        </div>

        {categories.map((cat, idx) => {
          const CatIcon = getCategoryIcon(cat, 'complaint');
          return (
            <div key={cat}>
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                  <CatIcon className="h-4 w-4 text-primary icon-rotate-slow" strokeWidth={2} />
                  <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {isHi ? (hiCategories[cat] || cat) : cat}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                  {complaintTemplates
                    .filter((tmpl) => tmpl.category === cat)
                    .map((tmpl, i) => (
                      <motion.div
                        key={tmpl.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link
                          to={`/complaints/${tmpl.id}`}
                          className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 md:p-4 transition hover:shadow-md"
                        >
                          <span className="text-xl icon-rotate">{tmpl.icon}</span>
                          <p className="flex-1 text-sm md:text-base font-semibold">
                            {isHi ? (hiTemplateTitles[tmpl.id] || tmpl.title) : tmpl.title}
                          </p>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="h-24" />
      </div>
    </Layout>
  );
};

export default Complaints;
