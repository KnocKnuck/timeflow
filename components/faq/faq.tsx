import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/schema";

export const faqItems = [
  {
    question: "How do I calculate VAT from a net amount?",
    answer:
      "To calculate VAT from a net (pre-tax) amount, multiply the net amount by the VAT rate as a decimal. For example, with a 20% VAT rate on €100: €100 × 0.20 = €20 VAT. The gross amount (total) would be €100 + €20 = €120. Use our calculator's 'Add VAT' mode for instant results.",
  },
  {
    question: "How do I remove VAT from a gross amount?",
    answer:
      "To remove VAT from a gross (total) amount, divide the gross amount by (1 + VAT rate). For example, with 20% VAT on €120: €120 ÷ 1.20 = €100 net amount. The VAT portion is €120 - €100 = €20. Select 'Remove VAT' mode in our calculator for automatic calculation.",
  },
  {
    question: "What is the standard VAT rate in EU countries?",
    answer:
      "Standard VAT rates vary across EU countries, ranging from 17% (Luxembourg) to 27% (Hungary). Common rates include: France 20%, Germany 19%, Spain 21%, Italy 22%, UK 20%. Our calculator includes all current EU VAT rates updated for 2025. Select your country to automatically load the correct rate.",
  },
  {
    question: "What's the difference between VAT, TVA, GST, and sales tax?",
    answer:
      "VAT (Value Added Tax) and TVA (Taxe sur la Valeur Ajoutée - French for VAT) are the same tax system used in the EU and 170+ countries. GST (Goods and Services Tax) is similar but used in countries like Australia, Canada, India. Sales tax is different - it's only charged at final sale (used in the US), while VAT is charged at each production stage with credits for tax already paid.",
  },
  {
    question: "How does reverse charge VAT work for cross-border sales?",
    answer:
      "Reverse charge VAT shifts the tax liability from the seller to the buyer in B2B cross-border transactions within the EU. When selling to a VAT-registered business in another EU country, you charge 0% VAT, and the buyer accounts for VAT in their own country. This simplifies cross-border trade. Both parties must have valid VAT numbers and report the transaction on EC Sales Lists.",
  },
  {
    question: "Can freelancers reclaim VAT?",
    answer:
      "Yes, VAT-registered freelancers and self-employed individuals can reclaim VAT on business purchases and expenses. You can deduct input VAT (VAT you paid) from output VAT (VAT you charged clients) when filing VAT returns. Keep all receipts and invoices. Common reclaimable expenses include equipment, software, office supplies, and professional services. Some countries have small business schemes with simplified rules.",
  },
  {
    question: "Which expenses are VAT exempt?",
    answer:
      "Common VAT-exempt goods and services in the EU include: financial services (banking, insurance), medical and dental care, education and training, postal services (in some countries), residential property rentals, and certain cultural services. VAT-exempt items don't have VAT charged, but you also can't reclaim VAT on related costs. This differs from zero-rated items (0% VAT) where you can reclaim input VAT.",
  },
];

export function FAQ() {
  return (
    <section aria-labelledby="faq-heading" className="py-16">
      <div className="text-center mb-12">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Common questions about VAT calculation and tax requirements
        </p>
      </div>

      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* JSON-LD for FAQ */}
      <JsonLd data={faqJsonLd(faqItems)} />
    </section>
  );
}
