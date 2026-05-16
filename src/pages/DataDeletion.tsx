import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Trash2, Shield, Mail } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

const DataDeletion = () => {
  const { t } = useAppLang();
  useSEO({
    title: "Data Deletion — Clear Local Data | Ravomix",
    description: "Clear all locally stored Ravomix data from your browser or device. Ravomix stores form drafts only on your device.",
    path: "/data-deletion",
  });

  const handleClearData = () => {
    if (!confirm(t('dataDeletion.confirm'))) return;
    localStorage.clear();
    sessionStorage.clear();
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
    }
    alert(t('dataDeletion.success'));
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="px-4 pt-4 pb-28">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/settings" className="rounded-xl bg-card p-2 shadow-sm border border-border">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">{t('dataDeletion.title')}</h1>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-foreground">{t('dataDeletion.yourData')}</h3>
            </div>
            <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>{t('dataDeletion.info1')}</p>
              <p>{t('dataDeletion.info2')}</p>
              <p>{t('dataDeletion.info3')}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <h3 className="font-bold text-foreground">{t('dataDeletion.whatDeleted')}</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li className="flex gap-2"><span className="text-destructive">•</span> {t('dataDeletion.item1')}</li>
              <li className="flex gap-2"><span className="text-destructive">•</span> {t('dataDeletion.item2')}</li>
              <li className="flex gap-2"><span className="text-destructive">•</span> {t('dataDeletion.item3')}</li>
              <li className="flex gap-2"><span className="text-destructive">•</span> {t('dataDeletion.item4')}</li>
              <li className="flex gap-2"><span className="text-destructive">•</span> {t('dataDeletion.item5')}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <h3 className="font-bold text-foreground">{t('dataDeletion.altMethods')}</h3>
            <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p><strong className="text-foreground">Android:</strong> {t('dataDeletion.android')}</p>
              <p><strong className="text-foreground">Browser:</strong> {t('dataDeletion.browser')}</p>
              <p><strong className="text-foreground">In-App:</strong> {t('dataDeletion.inApp')}</p>
            </div>
          </div>

          <button
            onClick={handleClearData}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-destructive py-4 text-sm font-bold text-destructive-foreground shadow-lg transition active:scale-[0.98]"
          >
            <Trash2 className="h-4 w-4" />
            {t('dataDeletion.deleteBtn')}
          </button>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-xs">
                {t('dataDeletion.contactLabel')}: <a href="mailto:Ravomixsupport@gmail.com?subject=Ravomix%20Data%20Deletion%20Request" className="text-primary font-semibold">Ravomixsupport@gmail.com</a>
              </span>
            </div>
          </div>

          <p className="text-center text-[10px] text-muted-foreground">
            {t('dataDeletion.compliance')}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DataDeletion;
