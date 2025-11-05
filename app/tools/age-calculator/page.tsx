import { AgeCalculator } from "@/components/calculators/age/age-calculator";
import { CalculatorLayout } from "@/components/calculators/shared/calculator-layout";
import { RelatedTools } from "@/components/calculators/shared/related-tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { faqJsonLd, breadcrumbsJsonLd, organizationJsonLd } from "@/lib/schema";

export const metadata = generateSEOMetadata({
  title: "Age Calculator – Find Your Exact Age in Years, Months, Days",
  description:
    "Calculate your exact age in years, months, and days. Find out when your next birthday is and how many days old you are. Free online age calculator.",
  canonical: "/tools/age-calculator",
  keywords: [
    "age calculator",
    "calculate age",
    "how old am I",
    "age in days",
    "age in months",
    "birthday calculator",
    "days until birthday",
  ],
});

const faqItems = [
  {
    question: "How do I calculate my exact age?",
    answer:
      "Enter your date of birth in the calculator, and it will show your age in years, months, and days. The calculation accounts for leap years and varying month lengths for accuracy.",
  },
  {
    question: "How many days old am I?",
    answer:
      "The calculator shows your total age in days, counting from your birth date to today. This includes all calendar days, including leap days.",
  },
  {
    question: "When is my next birthday?",
    answer:
      "The calculator shows your next birthday date and how many days remain until then. If today is your birthday, it shows the date for next year.",
  },
  {
    question: "Does the calculator account for leap years?",
    answer:
      "Yes, the calculator automatically accounts for leap years (February 29th) when calculating your exact age and total days lived.",
  },
  {
    question: "Can I calculate someone else's age?",
    answer:
      "Yes, you can enter any birth date to calculate anyone's age. The calculator works for any date from 1900 onwards up to today.",
  },
];

export default function AgeCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools/vat-calculator" },
    { name: "Age Calculator", url: "/tools/age-calculator" },
  ];

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days. See when your next birthday is."
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
      relatedTools={<RelatedTools currentTool="age" />}
    >
      <AgeCalculator />
    </CalculatorLayout>
  );
}
