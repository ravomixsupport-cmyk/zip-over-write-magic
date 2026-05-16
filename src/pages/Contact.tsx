import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import { useToast } from "@/hooks/use-toast";
import useSEO from "@/hooks/useSEO";

const Contact = () => {
  const { t, lang } = useAppLang();
  const { toast } = useToast();
  useSEO({
    title: "Contact Ravomix — Support, Feedback & Partnerships",
    description: "Get in touch with the Ravomix team for support, feedback, partnerships or content suggestions. We reply within 1–2 business days.",
    path: "/contact",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: t("contact.required") });
      return;
    }
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const url = `mailto:ravomixsupport@gmail.com?subject=${encodeURIComponent(
      subject || "Ravomix Contact"
    )}&body=${encodeURIComponent(body)}`;
    try {
      window.location.href = url;
      toast({ title: t("contact.opened") });
    } catch {
      toast({ title: t("contact.failed") });
    }
  };

  return (
    <Layout>
      <div className="px-4 pt-4 pb-8">
        <div className="mb-4 flex items-center gap-3">
          <Link
            to="/settings"
            className="rounded-xl bg-card p-2 shadow-sm border border-border"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">{t("contact.title")}</h1>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <a
            href="mailto:ravomixsupport@gmail.com"
            className="flex items-center gap-3 rounded-xl bg-primary/10 p-3"
          >
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t("contact.email")}</p>
              <p className="text-sm font-semibold text-primary">
                ravomixsupport@gmail.com
              </p>
            </div>
          </a>
          <p className="text-xs text-muted-foreground">{t("contact.note")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-border bg-card p-5 space-y-4"
        >
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              {t("contact.name")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              placeholder={lang === "hi" ? "आपका नाम" : "Your full name"}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              {t("contact.emailField")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              {t("contact.subject")}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              placeholder={lang === "hi" ? "विषय" : "Subject"}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              {t("contact.message")}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none"
              placeholder={lang === "hi" ? "अपना संदेश लिखें..." : "Write your message..."}
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
          >
            <Send className="h-4 w-4" />
            {t("contact.send")}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
