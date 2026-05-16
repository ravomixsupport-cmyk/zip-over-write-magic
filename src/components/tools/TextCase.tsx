import { useState } from "react";
import { useAppLang } from "@/contexts/AppLanguageContext";

const TextCase = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [text, setText] = useState('');

  const conversions = [
    { label: 'UPPERCASE', value: text.toUpperCase() },
    { label: 'lowercase', value: text.toLowerCase() },
    { label: 'Title Case', value: text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()) },
    { label: 'camelCase', value: text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { label: 'snake_case', value: text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
    { label: 'kebab-case', value: text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
  ];

  const copy = (v: string) => navigator.clipboard.writeText(v);

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={hi ? 'टेक्स्ट टाइप या पेस्ट करें...' : 'Type or paste text...'} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" />
      <div className="space-y-2">
        {conversions.map(c => (
          <button key={c.label} onClick={() => copy(c.value)} className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-sm active:scale-[0.98]">
            <span className="text-xs font-semibold text-muted-foreground">{c.label}</span>
            <span className="font-mono text-xs truncate max-w-[60%] text-right">{c.value || '—'}</span>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">{hi ? 'कॉपी करने के लिए टैप करें' : 'Tap to copy'}</p>
    </div>
  );
};
export default TextCase;
