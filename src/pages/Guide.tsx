import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAppLang } from "@/contexts/AppLanguageContext";
import { guideArticles } from "@/data/guideArticles";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight, BookOpen } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const Guide = () => {
  const { lang } = useAppLang();
  useSEO({
    title: "Guides — How to Write Applications, Complaints & Legal Letters | Ravomix",
    description: `Step-by-step guides on writing leave applications, complaints, legal notices, RTI, rent agreements and more. ${guideArticles.length}+ articles in English & Hindi.`,
    path: "/guide",
  });

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 pb-28 pt-6">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            {lang === "hi" ? "गाइड" : "Guide"}
          </h1>
        </div>

        {/* Intro Section */}
        <div className="mb-6 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {lang === "hi"
              ? "इस गाइड सेक्शन में आपको विस्तृत लेख मिलेंगे जो आपको आवेदन पत्र, शिकायत पत्र, प्रमाणपत्र अनुरोध और कानूनी नोटिस लिखने में मदद करेंगे। साथ ही, GST कैलकुलेटर, EMI कैलकुलेटर और इनकम टैक्स कैलकुलेटर जैसे उपयोगी टूल्स का उपयोग करना भी सीखें। प्रत्येक लेख चरण-दर-चरण निर्देश और उदाहरणों के साथ आता है।"
              : "This Guide section contains detailed articles to help you write professional applications, complaint letters, certificate requests and legal notices. You'll also find step-by-step tutorials on using utility tools like the GST Calculator, EMI Calculator and Income Tax Calculator. Each article includes clear instructions, tips and real-world examples to make the process simple and easy."}
          </p>
        </div>
        <div className="space-y-3">
          {guideArticles.map((article) => (
            <Link key={article.id} to={`/guide/${article.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader className="flex-row items-center gap-3 p-4">
                  <span className="text-2xl">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold leading-snug">
                      {article.title[lang]}
                    </CardTitle>
                    <CardDescription className="mt-0.5 text-xs">
                      {lang === "hi" ? "पढ़ें →" : "Read article →"}
                    </CardDescription>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
