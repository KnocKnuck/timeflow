import { Container } from "@/components/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { CheckCircle2, Target, Users, Shield } from "lucide-react";

export const metadata = generateSEOMetadata({
  title: "About Us - VAT Calculator Experts",
  description:
    "Learn about TaxFlow, our mission to simplify VAT calculations for businesses across Europe, and our commitment to accuracy and transparency.",
  canonical: "/about",
});

const values = [
  {
    icon: Target,
    title: "Accuracy First",
    description:
      "We source VAT rates directly from official government sources and update them regularly to ensure accuracy.",
  },
  {
    icon: Users,
    title: "User-Focused",
    description:
      "Built by accountants and developers who understand the daily challenges of VAT calculations.",
  },
  {
    icon: Shield,
    title: "Privacy & Trust",
    description:
      "We don't store your calculations or personal data. Your information stays with you.",
  },
  {
    icon: CheckCircle2,
    title: "Always Free",
    description:
      "Our core calculator will always be free. No hidden fees, no premium tiers for basic features.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1>About TaxFlow</h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to make VAT calculations simple, accurate, and accessible for
            everyone.
          </p>
        </div>

        {/* Mission */}
        <section className="space-y-6">
          <h2>Our Mission</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              TaxFlow was created to solve a simple problem: calculating VAT shouldn't require
              complicated spreadsheets or expensive accounting software. We believe every business
              owner, freelancer, and entrepreneur should have access to fast, accurate VAT
              calculations—completely free.
            </p>
            <p>
              Our calculator supports all EU member states plus the UK, Switzerland, and Norway,
              with VAT rates updated for 2025. Whether you're adding VAT to your prices or removing
              it from invoices, we make the process instant and error-free.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <h2 className="text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="space-y-6">
          <h2>Our Methodology</h2>
          <Card>
            <CardHeader>
              <CardTitle>How We Ensure Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Official Sources</h3>
                  <p className="text-muted-foreground">
                    We source all VAT rates from official government tax authorities and the
                    European Commission.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Regular Updates</h3>
                  <p className="text-muted-foreground">
                    Our team monitors VAT rate changes across all supported countries and updates
                    our database immediately.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Transparent Calculations</h3>
                  <p className="text-muted-foreground">
                    We use banker's rounding for financial accuracy and show all calculation steps
                    in our documentation.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Peer Review</h3>
                  <p className="text-muted-foreground">
                    All content is reviewed by certified accountants familiar with EU VAT
                    regulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Disclaimer */}
        <section className="p-6 rounded-lg bg-muted/50 border">
          <h3 className="font-semibold mb-2">Important Disclaimer</h3>
          <p className="text-sm text-muted-foreground">
            TaxFlow provides tools and information for educational purposes. While we strive for
            accuracy, VAT regulations are complex and subject to change. Always consult with a
            qualified tax professional or your local tax authority for specific advice related to
            your situation. We are not responsible for any errors or omissions, or for any actions
            taken based on information from this site.
          </p>
        </section>
      </div>
    </Container>
  );
}
