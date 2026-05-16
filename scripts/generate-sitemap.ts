/**
 * Dynamic sitemap generator.
 * Reads route data from src/data and public/articles, writes public/sitemap.xml.
 * Run via: bun scripts/generate-sitemap.ts
 */
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { applicationTemplates } from "../src/data/applicationTemplates";
import { complaintTemplates } from "../src/data/complaintTemplates";
import { toolsList } from "../src/data/tools";
import { seoLandings } from "../src/data/seoLandings";
import { guideArticles } from "../src/data/guideArticles";

const BASE_URL = "https://ravomix.com";
const TODAY = new Date().toISOString().split("T")[0];

const EXCLUDED_PATHS = new Set<string>([
  "/spin",
  "/settings",
  "/data-deletion",
  "/install",
  "/playstore-assets",
  "/sitemap",
]);

type Entry = { path: string; changefreq: string; priority: string; lastmod?: string };

const corePages: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/applications", changefreq: "weekly", priority: "0.9" },
  { path: "/complaints", changefreq: "weekly", priority: "0.9" },
  { path: "/tools", changefreq: "weekly", priority: "0.9" },
  { path: "/guide", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "monthly", priority: "0.6" },
  { path: "/terms", changefreq: "monthly", priority: "0.6" },
  { path: "/cookies", changefreq: "monthly", priority: "0.6" },
  { path: "/dmca", changefreq: "monthly", priority: "0.5" },
];

const applicationPages: Entry[] = applicationTemplates.map((t) => ({
  path: `/applications/${t.id}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const complaintPages: Entry[] = complaintTemplates.map((t) => ({
  path: `/complaints/${t.id}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const toolPages: Entry[] = toolsList.map((t) => ({
  path: `/tools/${t.id}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const seoPages: Entry[] = seoLandings.map((s) => ({
  path: `/${s.slug}`,
  changefreq: "weekly",
  priority: "0.9",
}));

const guidePages: Entry[] = guideArticles.map((g) => ({
  path: `/guide/${g.id}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const articlesDir = join(process.cwd(), "public", "articles");
const articleFiles = readdirSync(articlesDir).filter(
  (f) => f.endsWith(".html") && f !== "index.html",
);
const articleHtmlPages: Entry[] = [
  { path: "/articles/", changefreq: "weekly", priority: "0.8" },
  ...articleFiles.map((f) => ({
    path: `/articles/${f}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const allEntries: Entry[] = [
  ...corePages,
  ...seoPages,
  ...applicationPages,
  ...complaintPages,
  ...toolPages,
  ...guidePages,
  ...articleHtmlPages,
];

// Dedupe + exclude
const seen = new Set<string>();
let excludedCount = 0;
const finalEntries: Entry[] = [];
for (const e of allEntries) {
  if (EXCLUDED_PATHS.has(e.path)) {
    excludedCount++;
    continue;
  }
  if (seen.has(e.path)) continue;
  seen.add(e.path);
  finalEntries.push({ ...e, lastmod: TODAY });
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...finalEntries.map(
    (e) =>
      `  <url><loc>${BASE_URL}${e.path}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
  ),
  `</urlset>`,
  "",
].join("\n");

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), xml);

const stats = {
  total: finalEntries.length,
  core: corePages.length,
  applications: applicationPages.length,
  complaints: complaintPages.length,
  tools: toolPages.length,
  seoLandings: seoPages.length,
  guides: guidePages.length,
  articles: articleHtmlPages.length,
  excludedAtFilter: excludedCount,
  excludedByPolicy: EXCLUDED_PATHS.size,
  excludedPaths: [...EXCLUDED_PATHS],
};

console.log("✅ sitemap.xml generated");
console.log(JSON.stringify(stats, null, 2));
