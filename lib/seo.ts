/**
 * SEO utilities for meta tags and OpenGraph
 */

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export const DEFAULT_SEO: SEOConfig = {
  title: "TaxFlow - Free VAT Calculator for EU & UK | Instant Tax Calculation",
  description:
    "Calculate VAT instantly for any EU country. Add or remove VAT with our free online calculator. Supports all EU VAT rates for 2025. Perfect for businesses and freelancers.",
  ogImage: "/og-image.png",
  ogType: "website",
};

export const SITE_CONFIG = {
  name: "TaxFlow",
  url: "https://taxflow.com",
  description:
    "Professional VAT calculator for businesses and freelancers across Europe. Calculate VAT instantly with support for all EU countries.",
  author: "TaxFlow Team",
  keywords: [
    "VAT calculator",
    "TVA calculator",
    "calculate VAT",
    "remove VAT",
    "VAT France",
    "VAT Germany",
    "VAT UK",
    "tax calculator",
    "EU VAT rates",
    "reverse charge VAT",
  ],
};

/**
 * Generate meta tags for a page
 */
export function generateMetadata(config: Partial<SEOConfig>) {
  const mergedConfig = { ...DEFAULT_SEO, ...config };
  const fullTitle =
    config.title === DEFAULT_SEO.title
      ? config.title
      : `${config.title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description: mergedConfig.description,
    keywords: mergedConfig.keywords?.join(", "),
    authors: mergedConfig.author ? [{ name: mergedConfig.author }] : undefined,
    alternates: {
      canonical: mergedConfig.canonical,
    },
    robots: {
      index: !mergedConfig.noindex,
      follow: !mergedConfig.nofollow,
    },
    openGraph: {
      title: fullTitle,
      description: mergedConfig.description,
      url: mergedConfig.canonical,
      siteName: SITE_CONFIG.name,
      images: mergedConfig.ogImage
        ? [
            {
              url: mergedConfig.ogImage,
              width: 1200,
              height: 630,
              alt: fullTitle,
            },
          ]
        : undefined,
      type: mergedConfig.ogType,
      publishedTime: mergedConfig.publishedTime,
      modifiedTime: mergedConfig.modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: mergedConfig.description,
      images: mergedConfig.ogImage ? [mergedConfig.ogImage] : undefined,
    },
  };
}

/**
 * Generate breadcrumb segments for a path
 */
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [{ name: "Home", url: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    breadcrumbs.push({ name, url: currentPath });
  }

  return breadcrumbs;
}
