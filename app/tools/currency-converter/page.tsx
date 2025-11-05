import { CurrencyConverter } from "@/components/calculators/currency/currency-converter";
import { CalculatorLayout } from "@/components/calculators/shared/calculator-layout";
import { RelatedTools } from "@/components/calculators/shared/related-tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { faqJsonLd, breadcrumbsJsonLd, organizationJsonLd } from "@/lib/schema";

export const metadata = generateSEOMetadata({
  title: "Currency Converter – Convert EUR, USD, GBP & 150+ Currencies",
  description:
    "Free online currency converter with live exchange rates. Convert between EUR, USD, GBP, and 150+ world currencies. Updated daily with accurate rates.",
  canonical: "/tools/currency-converter",
  keywords: [
    "currency converter",
    "exchange rate",
    "convert EUR to USD",
    "convert GBP to EUR",
    "currency calculator",
    "forex converter",
    "money converter",
  ],
});

const faqItems = [
  {
    question: "How accurate are the exchange rates?",
    answer:
      "Our rates are updated daily from reliable financial data sources. However, actual rates may vary depending on your bank or exchange service. Always verify rates with your financial institution for transactions.",
  },
  {
    question: "How do I convert EUR to USD?",
    answer:
      "Enter your amount in euros, select EUR as the 'from' currency and USD as the 'to' currency. The converter will instantly show the amount in US dollars using the current exchange rate.",
  },
  {
    question: "What is the inverse exchange rate?",
    answer:
      "The inverse rate shows how much of the original currency equals one unit of the target currency. For example, if 1 EUR = 1.09 USD, then 1 USD = 0.92 EUR (inverse rate).",
  },
  {
    question: "Can I use this for travel money calculations?",
    answer:
      "Yes, this calculator is perfect for estimating travel expenses. However, exchange rates at airports and currency exchanges may differ from the rates shown here. Always check with your provider.",
  },
  {
    question: "How often are the rates updated?",
    answer:
      "Exchange rates are updated daily to reflect current market rates. The last update date is shown with your conversion result.",
  },
];

export default function CurrencyConverterPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools/vat-calculator" },
    { name: "Currency Converter", url: "/tools/currency-converter" },
  ];

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between 150+ world currencies with live exchange rates"
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
      relatedTools={<RelatedTools currentTool="currency" />}
    >
      <CurrencyConverter />
    </CalculatorLayout>
  );
}
