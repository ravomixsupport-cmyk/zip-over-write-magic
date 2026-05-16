import { useState } from "react";
import { useAppLang } from "@/contexts/AppLanguageContext";

const ColorPicker = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [hex, setHex] = useState('#3b82f6');

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copy = (text: string) => navigator.clipboard.writeText(text);

  const formats = [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="h-16 w-16 rounded-xl border-0 cursor-pointer" />
        <div className="flex-1 rounded-2xl border border-border" style={{ backgroundColor: hex, height: 64 }} />
      </div>
      <div className="space-y-2">
        {formats.map(f => (
          <button key={f.label} onClick={() => copy(f.value)} className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-sm active:scale-[0.98]">
            <span className="font-semibold text-muted-foreground">{f.label}</span>
            <span className="font-mono font-bold">{f.value}</span>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">{hi ? 'कॉपी करने के लिए टैप करें' : 'Tap a value to copy'}</p>
    </div>
  );
};
export default ColorPicker;
