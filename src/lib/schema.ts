import { site } from "@/config/site";
import { absoluteUrl, siteUrl } from "@/config/env";
import type { FAQ } from "@/content/types";
import { stripRich } from "@/lib/rich";

/** @id estáveis que conectam as entidades do site. */
export const ids = {
  org: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  page: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  service: (slug: string) => `${absoluteUrl(`/servicos/${slug}`)}#service`,
  faq: (path: string) => `${absoluteUrl(path)}#faq`,
  article: (path: string) => `${absoluteUrl(path)}#article`,
};

const sameAs = Object.values(site.social).filter(Boolean) as string[];

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: site.name,
    alternateName: site.alternateName,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-dx.png"), width: 150, height: 150 },
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      addressCountry: site.location.country,
      ...(site.location.streetAddress ? { streetAddress: site.location.streetAddress } : {}),
      ...(site.location.postalCode ? { postalCode: site.location.postalCode } : {}),
    },
    areaServed: { "@type": "Country", name: site.location.countryName },
    knowsAbout: [
      "Tráfego pago",
      "Google Ads",
      "Meta Ads",
      "Criativos para anúncios",
      "Landing pages",
      "Estruturação comercial",
      "Qualificação de leads",
      "CRM",
      "Automação de atendimento",
    ],
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: absoluteUrl("/"),
    name: site.name,
    alternateName: site.alternateName,
    inLanguage: "pt-BR",
    publisher: { "@id": ids.org },
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";

export function webPageNode(o: {
  path: string;
  name: string;
  description: string;
  type?: PageType | PageType[];
  breadcrumb?: boolean;
  about?: string;
  mainEntity?: string;
}) {
  return {
    "@type": o.type ?? "WebPage",
    "@id": ids.page(o.path),
    url: absoluteUrl(o.path),
    name: o.name,
    description: o.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.org },
    ...(o.breadcrumb !== false && o.path !== "/" ? { breadcrumb: { "@id": ids.breadcrumb(o.path) } } : {}),
    ...(o.about ? { about: { "@id": o.about } } : {}),
    ...(o.mainEntity ? { mainEntity: { "@id": o.mainEntity } } : {}),
  };
}

export function breadcrumbNode(path: string, items: { name: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb(path),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  };
}

export function serviceNode(o: { slug: string; name: string; description: string; audience?: string[] }) {
  return {
    "@type": "Service",
    "@id": ids.service(o.slug),
    name: o.name,
    description: o.description,
    url: absoluteUrl(`/servicos/${o.slug}`),
    serviceType: o.name,
    provider: { "@id": ids.org },
    areaServed: { "@type": "Country", name: site.location.countryName },
    ...(o.audience?.length
      ? { audience: o.audience.map((a) => ({ "@type": "BusinessAudience", name: a })) }
      : {}),
  };
}

/** Somente para perguntas e respostas visíveis na página. */
export function faqNode(path: string, faqs: FAQ[]) {
  return {
    "@type": "FAQPage",
    "@id": ids.faq(path),
    isPartOf: { "@id": ids.page(path) },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: stripRich(f.a) },
    })),
  };
}

export function articleNode(o: {
  path: string;
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  section?: string;
}) {
  return {
    "@type": "BlogPosting",
    "@id": ids.article(o.path),
    headline: o.title,
    description: o.description,
    url: absoluteUrl(o.path),
    mainEntityOfPage: { "@id": ids.page(o.path) },
    inLanguage: "pt-BR",
    author: { "@id": ids.org },
    publisher: { "@id": ids.org },
    image: absoluteUrl("/opengraph-image"),
    ...(o.section ? { articleSection: o.section } : {}),
    ...(o.publishedAt ? { datePublished: o.publishedAt } : {}),
    ...(o.updatedAt || o.publishedAt ? { dateModified: o.updatedAt ?? o.publishedAt } : {}),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
