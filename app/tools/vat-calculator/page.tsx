import { VATCalculator } from "@/components/calculator/vat-calculator";
import { CalculatorLayout } from "@/components/calculators/shared/calculator-layout";
import { RelatedTools } from "@/components/calculators/shared/related-tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { faqJsonLd, breadcrumbsJsonLd, organizationJsonLd } from "@/lib/schema";
import { faqItems } from "@/components/faq/faq";

export const metadata = generateSEOMetadata({
  title: "VAT Calculator - Calculate VAT for EU Countries",
  description:
    "Free VAT calculator for all EU countries. Add or remove VAT instantly with accurate rates for 2025. Perfect for businesses and freelancers.",
  canonical: "/tools/vat-calculator",
  keywords: [
    "VAT calculator",
    "TVA calculator",
    "calculate VAT",
    "VAT France",
    "VAT Germany",
    "remove VAT",
    "EU VAT rates",
  ],
});

export default function VATCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools/vat-calculator" },
    { name: "VAT Calculator", url: "/tools/vat-calculator" },
  ];

  return (
    <CalculatorLayout
      title="VAT Calculator"
      description="Calculate VAT instantly for any EU country with accurate 2025 rates"
      breadcrumbs={breadcrumbs}
      jsonLd={[organizationJsonLd(), breadcrumbsJsonLd(breadcrumbs), faqJsonLd(faqItems)]}
      faq={
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      }
      relatedTools={<RelatedTools currentTool="vat" />}
    >
      <VATCalculator />
    </CalculatorLayout>
  );
}
