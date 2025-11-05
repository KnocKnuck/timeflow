import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Blog posts (in production, these would be dynamically loaded from MDX files)
  const blogPosts = [
    {
      url: `${baseUrl}/blog/calculate-vat-france-2025`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/remove-vat-from-prices`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/reverse-charge-vat-explained`,
      lastModified: new Date("2025-01-05"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...blogPosts];
}
