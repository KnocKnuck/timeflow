import { Container } from "@/components/container";
import { VATCalculator } from "@/components/calculator/vat-calculator";
import { FAQ } from "@/components/faq/faq";
import { PostList } from "@/components/blog/post-list";
import { AffiliateCard } from "@/components/affiliate/affiliate-card";
import { AdsSlot } from "@/components/ads/ads-slot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationJsonLd,
  websiteJsonLd,
  calculatorJsonLd,
} from "@/lib/schema";
import { ArrowRight, CheckCircle2, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

// Sample blog posts (in production, these would come from MDX files)
const recentPosts = [
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

const trustFeatures = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "Real-time VAT calculations with no page reloads",
  },
  {
    icon: Globe,
    title: "All EU Countries",
    description: "Support for all 27 EU member states plus UK, Switzerland, Norway",
  },
  {
    icon: Shield,
    title: "Accurate Rates",
    description: "VAT rates updated for 2025 based on official sources",
  },
  {
    icon: CheckCircle2,
    title: "Free Forever",
    description: "No sign-up required, completely free to use",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={calculatorJsonLd()} />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                Free VAT Calculator 2025
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Instant VAT Calculator for Businesses & Freelancers
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Calculate VAT instantly for any EU country. Add or remove VAT with our free online
                calculator. Supports all EU VAT rates for 2025.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#calculator">
                  Start Calculating <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Browse VAT Guides</Link>
              </Button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {trustFeatures.map((feature) => (
                <div key={feature.title} className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16">
        <Container>
          <VATCalculator />
        </Container>
      </section>

      {/* Ad Slot - After Calculator */}
      <Container className="py-8">
        <AdsSlot slotId="home-calculator-bottom" format="banner" />
      </Container>

      {/* Affiliate Cards */}
      <section className="py-16 bg-muted/40">
        <Container>
          <div className="text-center mb-12">
            <h2>Recommended Accounting Tools</h2>
            <p className="text-muted-foreground mt-4">
              Professional tools to manage your VAT and accounting
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <AffiliateCard
              partnerId="accounting-software-1"
              title="Cloud Accounting Pro"
              description="Automated VAT tracking and filing for EU businesses. 30-day free trial."
              ctaText="Try Free"
              ctaUrl="https://example.com/accounting"
            />
            <AffiliateCard
              partnerId="invoicing-tool-1"
              title="Invoice Maker Plus"
              description="Create professional invoices with automatic VAT calculations."
              ctaText="Get Started"
              ctaUrl="https://example.com/invoicing"
            />
            <AffiliateCard
              partnerId="tax-service-1"
              title="EU Tax Compliance"
              description="Expert VAT registration and compliance services across EU."
              ctaText="Learn More"
              ctaUrl="https://example.com/tax-service"
            />
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <Container>
        <FAQ />
      </Container>

      {/* Blog Preview */}
      <section className="py-16 bg-muted/40">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2>Latest VAT Guides</h2>
              <p className="text-muted-foreground mt-2">
                Expert guides on VAT calculation and compliance
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <PostList posts={recentPosts} />
        </Container>
      </section>
    </>
  );
}
