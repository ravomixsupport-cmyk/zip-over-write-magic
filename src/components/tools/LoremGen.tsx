import { useState } from "react";
import { InputField, SelectField } from "./ToolShared";
import { useAppLang } from "@/contexts/AppLanguageContext";

const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur"];

const LoremGen = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');

  const genSentence = () => {
    const len = 8 + Math.floor(Math.random() * 12);
    const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const genParagraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, genSentence).join(' ');

  let output = '';
  if (type === 'paragraphs') output = Array.from({ length: count }, genParagraph).join('\n\n');
  else if (type === 'sentences') output = Array.from({ length: count }, genSentence).join(' ');
  else output = Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ');

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Count" value={count} onChange={setCount} min={1} max={50} />
        <SelectField label="Type" value={type} onChange={setType}>
          <option value="paragraphs">{hi ? 'अनुच्छेद' : 'Paragraphs'}</option>
          <option value="sentences">{hi ? 'वाक्य' : 'Sentences'}</option>
          <option value="words">{hi ? 'शब्द' : 'Words'}</option>
        </SelectField>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 max-h-64 overflow-y-auto">
        <p className="text-sm text-foreground whitespace-pre-wrap">{output}</p>
      </div>
      <button onClick={copy} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98]">{hi ? '📋 टेक्स्ट कॉपी करें' : '📋 Copy Text'}</button>
    </div>
  );
};
export default LoremGen;
