import { useEffect } from "react";

const SITE_URL = "https://ravomix.com";

export interface SEOOptions {
  title: string;
  description: string;
  /** Path beginning with '/' — used to build canonical & og:url. Defaults to current location. */
  path?: string;
  ogType?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const JSONLD_ID = "page-jsonld";
const upsertJsonLd = (data: SEOOptions["jsonLd"]) => {
  // Remove previous
  document.querySelectorAll(`script[data-seo-id="${JSONLD_ID}"]`).forEach((n) => n.remove());
  if (!data) return;
  const items = Array.isArray(data) ? data : [data];
  items.forEach((d) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-seo-id", JSONLD_ID);
    s.text = JSON.stringify(d);
    document.head.appendChild(s);
  });
};

export const useSEO = ({ title, description, path, ogType = "website", jsonLd }: SEOOptions) => {
  useEffect(() => {
    const finalPath = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
    const url = `${SITE_URL}${finalPath}`;

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:type"]', "property", "og:type", ogType);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertCanonical(url);
    upsertJsonLd(jsonLd);
  }, [title, description, path, ogType, JSON.stringify(jsonLd)]);
};

export default useSEO;
