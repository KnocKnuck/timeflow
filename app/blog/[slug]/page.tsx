import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { articleJsonLd, breadcrumbsJsonLd } from "@/lib/schema";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// In production, you would:
// 1. Read MDX files from content/blog directory
// 2. Use gray-matter to parse frontmatter
// 3. Use next-mdx-remote to render content

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  readingTime: string;
  tags: string[];
}

// Mock function - replace with actual MDX loading
async function getPost(slug: string): Promise<BlogPost | null> {
  const posts: Record<string, BlogPost> = {
    "calculate-vat-france-2025": {
      slug: "calculate-vat-france-2025",
      title: "How to Calculate VAT in France (2025 Guide)",
      description:
        "Complete guide to French VAT rates, calculations, and requirements for businesses and freelancers in 2025.",
      content: `
# How to Calculate VAT in France (2025 Guide)

France operates a comprehensive VAT (TVA - Taxe sur la Valeur Ajoutée) system with multiple rates. This guide covers everything you need to know about calculating VAT in France for 2025.

## French VAT Rates 2025

France has four VAT rates:

- **Standard Rate: 20%** - Applies to most goods and services
- **Reduced Rate: 10%** - Restaurant meals, passenger transport, some construction work
- **Super-Reduced Rate: 5.5%** - Food products, books, energy for residential use
- **Special Rate: 2.1%** - Medicines, newspapers, TV license fee

## How to Calculate VAT

### Adding VAT (Net to Gross)

To add VAT to a net amount:
\`\`\`
Gross Amount = Net Amount × (1 + VAT Rate)
\`\`\`

**Example:** €100 net with 20% VAT
- Calculation: €100 × 1.20 = €120
- VAT Amount: €20
- Gross Amount: €120

### Removing VAT (Gross to Net)

To remove VAT from a gross amount:
\`\`\`
Net Amount = Gross Amount ÷ (1 + VAT Rate)
\`\`\`

**Example:** €120 gross with 20% VAT
- Calculation: €120 ÷ 1.20 = €100
- Net Amount: €100
- VAT Amount: €20

## VAT Registration in France

Businesses must register for VAT in France if:
- Annual turnover exceeds €85,000 (standard threshold)
- They are established in France and make taxable supplies
- They make intra-EU acquisitions exceeding €10,000

## Filing VAT Returns

VAT returns in France must be filed:
- **Monthly** for large businesses (turnover > €4M)
- **Quarterly** for medium businesses
- **Annually** for small businesses (under certain thresholds)

Returns must be submitted electronically through the French tax portal.

## Conclusion

Understanding French VAT is crucial for businesses operating in France. Use our [VAT calculator](/) for instant calculations with French rates.

For official information, visit the [French Tax Authority (Direction Générale des Finances Publiques)](https://www.impots.gouv.fr/).
      `,
      publishedAt: "2025-01-15",
      modifiedAt: "2025-01-15",
      author: "TaxFlow Editorial Team",
      readingTime: "5 min read",
      tags: ["France", "VAT Guide", "2025"],
    },
  };

  return posts[slug] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.description,
    canonical: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt,
    author: post.author,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />

      <article>
        {/* Article Header */}
        <header className="bg-muted/40 py-16">
          <Container size="narrow">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold">{post.title}</h1>

              <p className="text-xl text-muted-foreground">{post.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Tax & Accounting Expert</p>
                </div>
              </div>
            </div>
          </Container>
        </header>

        {/* Article Content */}
        <Container size="narrow" className="py-16">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {/* In production, render MDX content here */}
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
          </div>

          {/* Updated timestamp */}
          {post.modifiedAt && post.modifiedAt !== post.publishedAt && (
            <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
              Last updated:{" "}
              {new Date(post.modifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </Container>

        {/* Related Posts */}
        <section className="py-16 bg-muted/40">
          <Container size="narrow">
            <h2 className="mb-8">Related Articles</h2>
            <div className="space-y-4">
              <Link
                href="/blog/remove-vat-from-prices"
                className="block p-4 rounded-lg border bg-background hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold">How to Remove VAT from Prices: Step-by-Step Guide</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Learn the exact formula and method to remove VAT from gross amounts.
                </p>
              </Link>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
