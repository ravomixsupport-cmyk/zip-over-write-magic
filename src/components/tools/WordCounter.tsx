import { useState } from "react";
import { ResultBox } from "./ToolShared";
import { useAppLang } from "@/contexts/AppLanguageContext";

const WordCounter = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={hi ? 'यहाँ टेक्स्ट पेस्ट या टाइप करें...' : 'Paste or type your text here...'} rows={6} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Words" value={words.toString()} />
        <ResultBox label="Characters" value={characters.toString()} />
        <ResultBox label="Sentences" value={sentences.toString()} />
        <ResultBox label="Read Time" value={`${readTime} ${hi ? 'मिनट' : 'min'}`} />
      </div>
    </div>
  );
};
export default WordCounter;
