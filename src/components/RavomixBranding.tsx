import { useAppLang } from "@/contexts/AppLanguageContext";

interface RavomixBrandingProps {
  showBranding: boolean;
  onRemoveBranding?: () => void;
}

const RavomixBranding = ({ showBranding }: RavomixBrandingProps) => {
  const { t } = useAppLang();
  if (!showBranding) return null;
  return (
    <div className="no-print mt-4">
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-center">
        <p className="text-[11px] font-medium text-muted-foreground">
          📄 {t('brand.generatedBy')} <span className="font-bold text-foreground">Ravomix</span>
        </p>
      </div>
    </div>
  );
};

export default RavomixBranding;
