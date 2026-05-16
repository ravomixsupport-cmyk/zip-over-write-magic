export type LangCode = 'en-US' | 'en-GB' | 'hi';

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
];

export const salutations: Record<LangCode, string> = {
  'en-US': 'Dear Sir or Madam,',
  'en-GB': 'Dear Sir/Madam,',
  'hi': 'आदरणीय महोदय/महोदया,',
};

export const closings: Record<LangCode, string> = {
  'en-US': 'Sincerely,',
  'en-GB': 'Yours faithfully,',
  'hi': 'आपका विश्वासी,',
};

export const subjectLabel: Record<LangCode, string> = {
  'en-US': 'Subject',
  'en-GB': 'Subject',
  'hi': 'विषय',
};

export const dateLabel: Record<LangCode, string> = {
  'en-US': 'Date',
  'en-GB': 'Date',
  'hi': 'दिनांक',
};

export const toLabel: Record<LangCode, string> = {
  'en-US': 'To,',
  'en-GB': 'To,',
  'hi': 'सेवा में,',
};

/**
 * Format a date string according to the selected language/locale.
 * en-US: April 4, 2026
 * en-GB: 4 April 2026
 * hi:    4 अप्रैल 2026
 */
export const formatDateByLang = (d: string | undefined, lang: LangCode): string => {
  if (!d) return '';
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    switch (lang) {
      case 'en-US':
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      case 'en-GB':
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      case 'hi':
        return date.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      default:
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  } catch {
    return d;
  }
};
