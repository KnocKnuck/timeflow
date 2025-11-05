import { Container } from "@/components/container";
import { PostList } from "@/components/blog/post-list";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "VAT Guides & Tax Articles",
  description:
    "Expert guides on VAT calculation, tax compliance, and accounting for businesses across Europe. Learn about EU VAT rates, reverse charge, and more.",
  canonical: "/blog",
});

// In production, these would be loaded from MDX files
const allPosts = [
  {
    slug: "calculate-vat-france-2025",
    title: "How to Calculate VAT in France (2025 Guide)",
    description:
      "Complete guide to French VAT rates, calculations, and requirements for businesses and freelancers in 2025.",
    publishedAt: "2025-01-15",
    readingTime: "5 min read",
    tags: ["France", "VAT Guide"],
  },
  {
    slug: "remove-vat-from-prices",
    title: "How to Remove VAT from Prices: Step-by-Step Guide",
    description:
      "Learn the exact formula and method to remove VAT from gross amounts, with examples for all EU countries.",
    publishedAt: "2025-01-10",
    readingTime: "4 min read",
    tags: ["Tutorial", "VAT Calculation"],
  },
  {
    slug: "reverse-charge-vat-explained",
    title: "Reverse Charge VAT Explained: EU Cross-Border Sales",
    description:
      "Everything you need to know about reverse charge VAT mechanism for B2B transactions in the European Union.",
    publishedAt: "2025-01-05",
    readingTime: "6 min read",
    tags: ["EU VAT", "Cross-Border"],
  },
];

export default function BlogPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1>VAT Guides & Tax Resources</h1>
        <p className="text-xl text-muted-foreground mt-4">
          Expert guides and tutorials on VAT calculation, tax compliance, and accounting for
          businesses across Europe.
        </p>
      </div>

      <PostList posts={allPosts} showAll />

      {allPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found.</p>
        </div>
      )}
    </Container>
  );
}
