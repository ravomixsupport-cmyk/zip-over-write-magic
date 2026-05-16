import { useState, useEffect } from "react";
import { useAppLang } from "@/contexts/AppLanguageContext";

const WorldClock = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const zones = [
    { label: hi ? "भारत (IST)" : "India (IST)", tz: "Asia/Kolkata" },
    { label: hi ? "न्यूयॉर्क (EST)" : "New York (EST)", tz: "America/New_York" },
    { label: hi ? "लंदन (GMT)" : "London (GMT)", tz: "Europe/London" },
    { label: hi ? "दुबई (GST)" : "Dubai (GST)", tz: "Asia/Dubai" },
    { label: hi ? "टोक्यो (JST)" : "Tokyo (JST)", tz: "Asia/Tokyo" },
    { label: hi ? "सिडनी (AEST)" : "Sydney (AEST)", tz: "Australia/Sydney" },
  ];

  return (
    <div className="space-y-3">
      {zones.map(z => (
        <div key={z.tz} className="rounded-2xl bg-primary/5 border border-primary/10 p-3 flex items-center justify-between">
          <p className="text-sm font-semibold">{z.label}</p>
          <p className="text-lg font-extrabold text-primary tabular-nums">
            {now.toLocaleTimeString("en-US", { timeZone: z.tz, hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
        </div>
      ))}
    </div>
  );
};
export default WorldClock;
