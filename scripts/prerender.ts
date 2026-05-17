/**
 * Static prerenderer for the Ravomix SPA.
 *
 * Runs AFTER `vite build`. Reads dist/index.html as the shell, then for every
 * known route writes dist/{path}/index.html with route-specific <title>,
 * meta description, canonical, OG tags, JSON-LD, and SEO-visible <h1> + body
 * content rendered into #root. The SPA still hydrates normally for users
 * (createRoot replaces the placeholder content on JS load); Googlebot and
 * other crawlers see the full per-page content without executing JS.
 *
 * Run via: bun scripts/prerender.ts
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { applicationTemplates } from "../src/data/applicationTemplates";
import { complaintTemplates } from "../src/data/complaintTemplates";
import { toolsList } from "../src/data/tools";
import { seoLandings } from "../src/data/seoLandings";
import { guideArticles } from "../src/data/guideArticles";

const BASE_URL = "https://ravomix.com";
const DIST = join(process.cwd(), "dist");
const SHELL_PATH = join(DIST, "index.html");

if (!existsSync(SHELL_PATH)) {
  console.error("❌ dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const SHELL = readFileSync(SHELL_PATH, "utf8");

interface Page {
  path: string;          // e.g. "/tools/emi" (no trailing slash, "/" for home)
  title: string;
  description: string;
  h1: string;
  body: string;          // plain HTML body content for crawlers (inside #root)
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown>;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeAttr = escapeHtml;

const SHARED_NAV = `
    <nav aria-label="Primary">
      <a href="/">Home</a> ·
      <a href="/applications">Applications</a> ·
      <a href="/complaints">Complaints</a> ·
      <a href="/tools">Tools</a> ·
      <a href="/guide">Guide</a> ·
      <a href="/about">About</a> ·
      <a href="/contact">Contact</a> ·
      <a href="/privacy">Privacy</a>
    </nav>`;

const renderShell = (page: Page): string => {
  const url = `${BASE_URL}${page.path === "/" ? "/" : page.path}`;
  const title = escapeAttr(page.title);
  const desc = escapeAttr(page.description);
  const ogType = page.ogType ?? "website";

  const jsonLdScript = page.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`
    : "";

  // Crawler-visible content placed inside #root. React replaces it on hydration.
  const rootContent = `
    <main>
      <h1>${escapeHtml(page.h1)}</h1>
      ${page.body}
      ${SHARED_NAV}
      <p><small>Loading Ravomix… If the app doesn't load, please enable JavaScript.</small></p>
    </main>
  `;

  let html = SHELL;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // meta description (name=description)
  html = html.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${desc}">`,
  );

  // canonical
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${url}">`,
  );

  // hreflang alternates point to same URL
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="en"[^>]*>/i,
    `<link rel="alternate" hreflang="en" href="${url}">`,
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="hi"[^>]*>/i,
    `<link rel="alternate" hreflang="hi" href="${url}">`,
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*>/i,
    `<link rel="alternate" hreflang="x-default" href="${url}">`,
  );

  // og:url, og:type, og:title, og:description
  html = html.replace(
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${url}">`,
  );
  html = html.replace(
    /<meta\s+property="og:type"[^>]*>/i,
    `<meta property="og:type" content="${ogType}">`,
  );
  if (/<meta\s+property="og:title"/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${title}">`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `  <meta property="og:title" content="${title}">\n</head>`,
    );
  }
  if (/<meta\s+property="og:description"/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${desc}">`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `  <meta property="og:description" content="${desc}">\n</head>`,
    );
  }
  // twitter
  if (/<meta\s+name="twitter:title"/i.test(html)) {
    html = html.replace(
      /<meta\s+name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${title}">`,
    );
  }
  if (/<meta\s+name="twitter:description"/i.test(html)) {
    html = html.replace(
      /<meta\s+name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${desc}">`,
    );
  }

  // Inject JSON-LD before </head>
  if (jsonLdScript) {
    html = html.replace(/<\/head>/i, `${jsonLdScript}\n</head>`);
  }

  // Inject crawler-visible content into #root.
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${rootContent}</div>`,
  );

  return html;
};

const writePage = (page: Page) => {
  const html = renderShell(page);
  const outPath =
    page.path === "/"
      ? join(DIST, "index.html")
      : join(DIST, page.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
};

// ---------------- Page definitions ----------------

const pages: Page[] = [];

// Home
pages.push({
  path: "/",
  title:
    "Ravomix: Free Application Letters, Complaints & Legal Document Templates",
  description:
    "Ravomix — 200+ free application letters, leave applications, complaint formats, RTI applications, legal documents, bank forms, and 50+ utility tools (EMI, GST, Income Tax) in Hindi & English.",
  h1: "Ravomix — Free Document Templates & Utility Tools",
  body: `
    <p>Ravomix is a free Indian utility platform with <strong>200+ application & complaint templates</strong> and <strong>50+ everyday tools</strong> covering finance, tax, education, work and legal needs. Every document is generated locally in your browser — no login, no signup, no data ever leaves your device.</p>
    <h2>Popular categories</h2>
    <ul>
      <li><a href="/applications">Application Letters</a> — leave, resignation, work from home, salary increase, transfer, school & college letters.</li>
      <li><a href="/complaints">Complaint Letters</a> — bank, consumer, cyber crime, RTI, police, workplace harassment.</li>
      <li><a href="/tools">Utility Tools</a> — EMI, GST, Income Tax, SIP, BMI, Password Generator, Unit Converters.</li>
      <li><a href="/guide">Guides & Articles</a> — step-by-step help in Hindi & English.</li>
    </ul>
  `,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ravomix",
    url: `${BASE_URL}/`,
    inLanguage: ["en", "hi"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
});

// Core listing/static pages
const coreStatic: Array<Omit<Page, "body"> & { body?: string }> = [
  {
    path: "/applications",
    title: "200+ Free Application Letter Templates (Hindi & English) — Ravomix",
    description:
      "Browse 200+ free application letter templates: leave, resignation, work from home, transfer, school & office letters. Fill the form, download PDF instantly.",
    h1: "Application Letter Templates",
  },
  {
    path: "/complaints",
    title: "88+ Free Complaint Letter Formats (India) — Ravomix",
    description:
      "Free complaint letter formats for bank, consumer forum, cyber crime, RTI, police, workplace harassment and more. Generate PDF in seconds.",
    h1: "Complaint Letter Formats",
  },
  {
    path: "/tools",
    title: "50+ Free Online Tools & Calculators — Ravomix",
    description:
      "EMI, GST, Income Tax, SIP, BMI, password generator, unit converters and 40+ more free tools. Works offline, no signup required.",
    h1: "Free Online Tools & Calculators",
  },
  {
    path: "/guide",
    title: "Guides & How-to Articles — Ravomix",
    description:
      "Step-by-step guides for writing applications, filing complaints, and using everyday calculators in Hindi & English.",
    h1: "Ravomix Guides",
  },
  {
    path: "/about",
    title: "About Ravomix — Free Document & Tool Platform",
    description:
      "Ravomix is a free Indian platform offering 200+ document templates and 50+ tools. No login, no tracking, all processing local to your browser.",
    h1: "About Ravomix",
  },
  {
    path: "/contact",
    title: "Contact Ravomix — Support & Feedback",
    description:
      "Get in touch with Ravomix for support, feedback or template requests. Email: ravomixsupport@gmail.com.",
    h1: "Contact Us",
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions — Ravomix",
    description:
      "Answers to common questions about Ravomix templates, tools, privacy, downloads and supported languages.",
    h1: "Frequently Asked Questions",
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Ravomix",
    description:
      "How Ravomix handles your data: no accounts, no tracking of personal info, all documents generated locally in your browser.",
    h1: "Privacy Policy",
  },
  {
    path: "/terms",
    title: "Terms of Service — Ravomix",
    description:
      "Read the terms of service that govern your use of Ravomix templates, tools and content.",
    h1: "Terms of Service",
  },
  {
    path: "/cookies",
    title: "Cookie Policy — Ravomix",
    description:
      "Which cookies Ravomix uses, why we use them, and how to control them in your browser settings.",
    h1: "Cookie Policy",
  },
  {
    path: "/dmca",
    title: "DMCA Policy — Ravomix",
    description:
      "Ravomix DMCA copyright takedown policy and how to file a notice.",
    h1: "DMCA Policy",
  },
];

for (const p of coreStatic) {
  pages.push({
    ...p,
    body:
      p.body ??
      `<p>${escapeHtml(p.description)}</p><p><a href="/">Back to Home</a></p>`,
  });
}

// Tools
for (const t of toolsList) {
  pages.push({
    path: `/tools/${t.id}`,
    title: `${t.title} — Free Online Tool | Ravomix`,
    description: `${t.description}. Free, offline-friendly ${t.title.toLowerCase()} by Ravomix. No signup, works on mobile and desktop.`,
    h1: `${t.title} ${t.icon ?? ""}`.trim(),
    body: `
      <p>${escapeHtml(t.description)}. Use Ravomix's free <strong>${escapeHtml(t.title)}</strong> — runs entirely in your browser, no data is sent to any server.</p>
      <p><strong>Category:</strong> ${escapeHtml(t.category)}</p>
      <p><a href="/tools">← All Tools</a></p>
    `,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: t.title,
      description: t.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: `${BASE_URL}/tools/${t.id}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  });
}

// Applications
for (const a of applicationTemplates) {
  pages.push({
    path: `/applications/${a.id}`,
    title: `${a.title} — Free Format & Sample | Ravomix`,
    description: `Free ${a.title.toLowerCase()} format. Fill the form, preview, download as PDF. Available in Hindi and English on Ravomix.`,
    h1: a.title,
    body: `
      <p>Free <strong>${escapeHtml(a.title)}</strong> template. Fill in your details and Ravomix will generate a ready-to-print PDF — works offline, no signup.</p>
      <p><strong>Category:</strong> ${escapeHtml(a.category)}</p>
      <p><a href="/applications">← All Application Templates</a></p>
    `,
  });
}

// Complaints
for (const c of complaintTemplates) {
  pages.push({
    path: `/complaints/${c.id}`,
    title: `${c.title} — Free Complaint Letter Format | Ravomix`,
    description: `Free ${c.title.toLowerCase()} format. Fill the form, download as PDF. Hindi & English supported on Ravomix.`,
    h1: c.title,
    body: `
      <p>Free <strong>${escapeHtml(c.title)}</strong> format. Generate a professional complaint letter in seconds — fill in the details and download as PDF.</p>
      <p><strong>Category:</strong> ${escapeHtml(c.category)}</p>
      <p><a href="/complaints">← All Complaint Formats</a></p>
    `,
  });
}

// Guide articles
for (const g of guideArticles) {
  const en = g.title.en;
  const excerpt = (g.content.en ?? "")
    .replace(/[*#]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  pages.push({
    path: `/guide/${g.id}`,
    title: `${en} — Guide | Ravomix`,
    description: excerpt || `${en} — step-by-step guide on Ravomix.`,
    h1: en,
    ogType: "article",
    body: `
      <p>${escapeHtml(excerpt)}…</p>
      <p><a href="/guide">← All Guides</a></p>
    `,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: en,
      url: `${BASE_URL}/guide/${g.id}`,
      inLanguage: "en",
      publisher: { "@type": "Organization", name: "Ravomix" },
    },
  });
}

// SEO landings
for (const s of seoLandings) {
  pages.push({
    path: `/${s.slug}`,
    title: s.title,
    description: s.description,
    h1: s.h1,
    body: `
      <p>${escapeHtml(s.intro)}</p>
      ${s.faqs?.length ? `<h2>FAQs</h2>${s.faqs.map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`).join("")}` : ""}
    `,
    jsonLd: s.faqs?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : undefined,
  });
}

// ---------------- Write ----------------

let written = 0;
const seen = new Set<string>();
for (const p of pages) {
  if (seen.has(p.path)) continue;
  seen.add(p.path);
  try {
    writePage(p);
    written++;
  } catch (err) {
    console.error(`Failed to write ${p.path}:`, err);
  }
}

console.log(`✅ Prerendered ${written} pages into dist/`);
console.log({
  home: 1,
  coreStatic: coreStatic.length,
  tools: toolsList.length,
  applications: applicationTemplates.length,
  complaints: complaintTemplates.length,
  guides: guideArticles.length,
  seoLandings: seoLandings.length,
});
