import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAppLang } from "@/contexts/AppLanguageContext";
import { guideArticles } from "@/data/guideArticles";
import { ArrowLeft } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const GuideArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useAppLang();
  const article = guideArticles.find((a) => a.id === id);

  const articleTitle = article ? article.title[lang] : "Guide article";
  const articleExcerpt = article
    ? article.content[lang].replace(/\*\*/g, "").replace(/\s+/g, " ").trim().slice(0, 155)
    : "Read this guide on Ravomix.";
  useSEO({
    title: `${articleTitle} | Ravomix Guide`,
    description: articleExcerpt,
    path: `/guide/${id ?? ""}`,
    ogType: "article",
    jsonLd: article
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title[lang],
          description: articleExcerpt,
          inLanguage: lang === "hi" ? "hi" : "en",
          author: { "@type": "Organization", name: "Ravomix" },
          publisher: {
            "@type": "Organization",
            name: "Ravomix",
            logo: { "@type": "ImageObject", url: "https://ravomix.com/apple-touch-icon.png" },
          },
          mainEntityOfPage: `https://ravomix.com/guide/${id}`,
        }
      : undefined,
  });

  if (!article) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Article not found.</p>
          <Link to="/guide" className="mt-4 inline-block text-primary underline">
            ← Back to Guide
          </Link>
        </div>
      </Layout>
    );
  }

  // Simple markdown-like rendering for bold and paragraphs
  const renderContent = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((p, i) => {
      const trimmed = p.trim();
      if (!trimmed) return null;

      // Render lines within paragraph
      const lines = trimmed.split("\n");
      return (
        <div key={i} className="mb-4">
          {lines.map((line, j) => {
            const l = line.trim();
            if (!l) return null;

            // Bold headers like **text**
            if (/^\*\*(.+)\*\*$/.test(l)) {
              const match = l.match(/^\*\*(.+)\*\*$/);
              return (
                <h3 key={j} className="mb-2 mt-6 text-lg font-bold text-foreground">
                  {match![1]}
                </h3>
              );
            }

            // List items
            if (l.startsWith("- ")) {
              return (
                <li key={j} className="ml-4 text-sm leading-relaxed text-muted-foreground list-disc">
                  {renderInlineBold(l.slice(2))}
                </li>
              );
            }

            // Numbered items
            const numMatch = l.match(/^(\d+)\.\s\*\*(.+?)\*\*:?\s*(.*)/);
            if (numMatch) {
              return (
                <p key={j} className="text-sm leading-relaxed text-muted-foreground ml-2">
                  <span className="font-semibold text-foreground">{numMatch[1]}. {numMatch[2]}</span>
                  {numMatch[3] ? `: ${numMatch[3]}` : ""}
                </p>
              );
            }

            const numMatch2 = l.match(/^(\d+)\.\s(.*)/);
            if (numMatch2) {
              return (
                <p key={j} className="text-sm leading-relaxed text-muted-foreground ml-2">
                  {numMatch2[1]}. {renderInlineBold(numMatch2[2])}
                </p>
              );
            }

            return (
              <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                {renderInlineBold(l)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const renderInlineBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 pb-28 pt-6">
        <Link
          to="/guide"
          className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {lang === "hi" ? "गाइड पर वापस" : "Back to Guide"}
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl">{article.icon}</span>
          <h1 className="text-xl font-bold text-foreground leading-tight">
            {article.title[lang]}
          </h1>
        </div>

        <article className="prose-sm">{renderContent(article.content[lang])}</article>
      </div>
    </Layout>
  );
};

export default GuideArticle;
