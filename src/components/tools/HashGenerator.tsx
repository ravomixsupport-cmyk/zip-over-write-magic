import { useState } from "react";
import { ResultBox } from "./ToolShared";

const HashGenerator = () => {
  const [text, setText] = useState("Hello World");
  
  // Simple hash functions (client-side, no API needed)
  const simpleHash = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
  };

  const djb2 = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  };

  const base64 = btoa(unescape(encodeURIComponent(text)));

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Enter Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={3}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" />
      </div>
      <div className="space-y-3">
        <ResultBox label="Hash (Murmur)" value={simpleHash(text)} />
        <ResultBox label="Hash (DJB2)" value={djb2(text)} />
        <ResultBox label="Base64" value={base64} />
      </div>
    </div>
  );
};
export default HashGenerator;
