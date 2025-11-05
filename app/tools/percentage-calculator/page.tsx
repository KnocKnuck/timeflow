import { PercentageCalculator } from "@/components/calculators/percentage/percentage-calculator";
import { CalculatorLayout } from "@/components/calculators/shared/calculator-layout";
import { RelatedTools } from "@/components/calculators/shared/related-tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { faqJsonLd, breadcrumbsJsonLd, organizationJsonLd } from "@/lib/schema";

export const metadata = generateSEOMetadata({
  title: "Percentage Calculator – Find Percent or Percent Change Online",
  description:
    "Easily calculate percentages, percent increases, discounts, and percent differences. Free online percentage calculator with instant results.",
  canonical: "/tools/percentage-calculator",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "calculate percentage",
    "percent of",
    "percent increase",
    "percent decrease",
    "percent change",
  ],
});

const faqItems = [
  {
    question: "How do I calculate what is X% of Y?",
    answer:
      "To find X% of Y, multiply Y by X and divide by 100. For example, to find 15% of 200: (15 × 200) ÷ 100 = 30. Use our calculator's '% of' mode for instant results.",
  },
  {
    question: "How do I calculate percent increase or decrease?",
    answer:
      "To calculate percent change: (New Value - Old Value) ÷ Old Value × 100. For example, from 100 to 150: (150 - 100) ÷ 100 × 100 = 50% increase. A negative result indicates a decrease.",
  },
  {
    question: "How do I find what percent one number is of another?",
    answer:
      "Divide the first number by the second, then multiply by 100. For example, 25 is what percent of 200? (25 ÷ 200) × 100 = 12.5%. Use our 'Is What %' mode.",
  },
  {
    question: "How do I increase or decrease a number by a percentage?",
    answer:
      "To increase by X%: multiply by (1 + X/100). To decrease by X%: multiply by (1 - X/100). For example, increase 200 by 15%: 200 × 1.15 = 230. Decrease 200 by 15%: 200 × 0.85 = 170.",
  },
  {
    question: "What's the difference between percentage and percentage points?",
    answer:
      "Percentage is a relative change, while percentage points measure absolute change. If a rate increases from 10% to 15%, that's a 5 percentage point increase, but a 50% relative increase.",
  },
];

export default function PercentageCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools/vat-calculator" },
    { name: "Percentage Calculator", url: "/tools/percentage-calculator" },
  ];

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, increases, decreases, and percent differences instantly"
      breadcrumbs={breadcrumbs}
      jsonLd={[
        organizationJsonLd(),
        breadcrumbsJsonLd(breadcrumbs),
        faqJsonLd(faqItems),
      ]}
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
      relatedTools={<RelatedTools currentTool="percentage" />}
    >
      <PercentageCalculator />
    </CalculatorLayout>
  );
}
