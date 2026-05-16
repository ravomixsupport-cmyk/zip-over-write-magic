import { LANGUAGES, type LangCode } from '@/data/languages';

interface LanguageSwitcherProps {
  value: LangCode;
  onChange: (lang: LangCode) => void;
}

const LanguageSwitcher = ({ value, onChange }: LanguageSwitcherProps) => (
  <div className="no-print flex gap-1 rounded-xl border border-border bg-muted p-0.5">
    {LANGUAGES.map((lang) => (
      <button
        key={lang.code}
        onClick={() => onChange(lang.code)}
        className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
          value === lang.code
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {lang.flag} {lang.label}
      </button>
    ))}
  </div>
);

export default LanguageSwitcher;
