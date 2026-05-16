import { useState } from "react";
import { ResultBox } from "./ToolShared";
import { useAppLang } from "@/contexts/AppLanguageContext";

const chars = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', nums: '0123456789', symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?' };

const PasswordGen = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [length, setLength] = useState(16);
  const [useUpper, setUpper] = useState(true);
  const [useLower, setLower] = useState(true);
  const [useNums, setNums] = useState(true);
  const [useSymbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let pool = '';
    if (useUpper) pool += chars.upper;
    if (useLower) pool += chars.lower;
    if (useNums) pool += chars.nums;
    if (useSymbols) pool += chars.symbols;
    if (!pool) pool = chars.lower;
    let pw = '';
    for (let i = 0; i < length; i++) pw += pool[Math.floor(Math.random() * pool.length)];
    setPassword(pw);
  };

  const copy = () => { navigator.clipboard.writeText(password); };

  const labels = hi
    ? [['बड़े अक्षर', useUpper, setUpper], ['छोटे अक्षर', useLower, setLower], ['संख्याएं', useNums, setNums], ['चिह्न', useSymbols, setSymbols]]
    : [['Uppercase', useUpper, setUpper], ['Lowercase', useLower, setLower], ['Numbers', useNums, setNums], ['Symbols', useSymbols, setSymbols]];

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">{hi ? 'लंबाई' : 'Length'}: {length}</label>
        <input type="range" min={6} max={64} value={length} onChange={e => setLength(+e.target.value)} className="w-full accent-primary" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {labels.map(([l, v, s]: any) => (
          <label key={l} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={v} onChange={() => s(!v)} className="accent-primary" /> {l}
          </label>
        ))}
      </div>
      <button onClick={generate} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98]">{hi ? 'पासवर्ड बनाएं' : 'Generate Password'}</button>
      {password && (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-center">
          <p className="text-sm font-mono break-all font-bold">{password}</p>
          <button onClick={copy} className="mt-2 text-xs text-primary font-semibold">{hi ? '📋 कॉपी' : '📋 Copy'}</button>
        </div>
      )}
    </div>
  );
};
export default PasswordGen;
