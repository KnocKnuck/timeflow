import { DateDifferenceCalculator } from "@/components/calculators/date-difference/date-difference-calculator";
import { CalculatorLayout } from "@/components/calculators/shared/calculator-layout";
import { RelatedTools } from "@/components/calculators/shared/related-tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { faqJsonLd, breadcrumbsJsonLd, organizationJsonLd } from "@/lib/schema";

export const metadata = generateSEOMetadata({
  title: "Date Difference Calculator – Days Between Dates",
  description:
    "Calculate the difference between two dates in days, weeks, months, or years. Find out how many workdays or days until an event. Free date calculator.",
  canonical: "/tools/date-difference-calculator",
  keywords: [
    "date difference calculator",
    "days between dates",
    "date calculator",
    "days until",
    "workdays calculator",
    "business days calculator",
  ],
});

const faqItems = [
  {
    question: "How do I calculate days between two dates?",
    answer:
      "Enter your start date and end date in the calculator. It will instantly show the difference in days, weeks, months, and years. The calculator accounts for varying month lengths and leap years.",
  },
  {
    question: "How do I count only workdays (business days)?",
    answer:
      "Toggle the 'Show workdays/weekends breakdown' switch. The calculator will show you the total workdays (Monday-Friday) and weekend days separately.",
  },
  {
    question: "Does the calculator include both the start and end dates?",
    answer:
      "No, the calculator counts the days between the dates, excluding the start date itself. For example, from Jan 1 to Jan 3 is 2 days.",
  },
  {
    question: "Can I use this to calculate days until an event?",
    answer:
      "Yes! Set the start date to today and the end date to your event date. The calculator will show how many days remain until your event.",
  },
];

export default function DateDifferenceCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools/vat-calculator" },
    { name: "Date Difference Calculator", url: "/tools/date-difference-calculator" },
  ];

  return (
    <CalculatorLayout
      title="Date Difference Calculator"
      description="Calculate the days, weeks, or months between two dates"
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
      relatedTools={<RelatedTools currentTool="date-difference" />}
    >
      <DateDifferenceCalculator />
    </CalculatorLayout>
  );
}
