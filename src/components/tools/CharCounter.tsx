import { useState } from "react";
import { ResultBox } from "./ToolShared";
import { useAppLang } from "@/contexts/AppLanguageContext";

const CharCounter = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [text, setText] = useState("");
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const vowels = (text.match(/[aeiouAEIOU]/g) || []).length;
  const consonants = (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">{hi ? 'टेक्स्ट दर्ज करें' : 'Enter Text'}</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" placeholder={hi ? 'टेक्स्ट टाइप या पेस्ट करें...' : 'Type or paste text here...'} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Characters" value={chars.toString()} />
        <ResultBox label="No Spaces" value={charsNoSpace.toString()} />
        <ResultBox label="Vowels" value={vowels.toString()} />
        <ResultBox label="Consonants" value={consonants.toString()} />
      </div>
    </div>
  );
};
export default CharCounter;
