import { Container } from "@/components/container";
import { FAQ } from "@/components/faq/faq";
import { PostList } from "@/components/blog/post-list";
import { AffiliateCard } from "@/components/affiliate/affiliate-card";
import { AdsSlot } from "@/components/ads/ads-slot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/schema";
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Calculator, Percent, Calendar, CalendarDays, Coins } from "lucide-react";
import Link from "next/link";

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
    description: "Real-time calculations with no page reloads",
  },
  {
    icon: Globe,
    title: "Multiple Tools",
    description: "VAT, percentage, age, date, and currency calculators",
  },
  {
    icon: Shield,
    title: "Accurate & Updated",
    description: "Rates and formulas updated for 2025",
  },
  {
    icon: CheckCircle2,
    title: "Free Forever",
    description: "No sign-up required, completely free to use",
  },
];

const calculatorTools = [
  {
    id: "vat",
    icon: Calculator,
    name: "VAT Calculator",
    description: "Calculate VAT for any EU country instantly with accurate 2025 rates",
    href: "/tools/vat-calculator",
    color: "text-blue-500",
  },
  {
    id: "percentage",
    icon: Percent,
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and percent differences",
    href: "/tools/percentage-calculator",
    color: "text-green-500",
  },
  {
    id: "age",
    icon: Calendar,
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days",
    href: "/tools/age-calculator",
    color: "text-purple-500",
  },
  {
    id: "date-difference",
    icon: CalendarDays,
    name: "Date Difference Calculator",
    description: "Find days, weeks, or months between two dates",
    href: "/tools/date-difference-calculator",
    color: "text-orange-500",
  },
  {
    id: "currency",
    icon: Coins,
    name: "Currency Converter",
    description: "Convert between 150+ world currencies with live rates",
    href: "/tools/currency-converter",
    color: "text-yellow-500",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                Free Online Calculators 2025
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Professional Calculators for Business & Finance
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Free, accurate, and instant calculations for VAT, percentages, dates, age, and currency. Built for professionals and freelancers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/tools/vat-calculator">
                  Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Browse Guides</Link>
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

      {/* Calculator Tools Section */}
      <section id="calculators" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2>Our Calculator Tools</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Professional-grade calculators for everyday business and finance tasks
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {calculatorTools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <tool.icon className={`h-6 w-6 ${tool.color}`} aria-hidden="true" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-primary/5">
                      Open Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Ad Slot */}
      <Container className="py-8">
        <AdsSlot slotId="home-tools-bottom" format="banner" />
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
              <h2>Latest Guides</h2>
              <p className="text-muted-foreground mt-2">
                Expert guides on calculations and compliance
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
