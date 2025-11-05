import { Container } from "@/components/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Mail, MessageSquare } from "lucide-react";

export const metadata = generateSEOMetadata({
  title: "Contact Us - Get in Touch",
  description:
    "Have questions about VAT calculations or our tools? Get in touch with the TaxFlow team. We're here to help.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1>Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have a question or suggestion? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 24-48 hours
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>
                  For general inquiries and support
                  <br />
                  <a
                    href="mailto:contact@taxflow.com"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    contact@taxflow.com
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>
                  Found incorrect VAT rates or a bug?
                  <br />
                  <a
                    href="mailto:support@taxflow.com"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    support@taxflow.com
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Response Time</CardTitle>
                <CardDescription>
                  We aim to respond to all inquiries within 24-48 hours during business days.
                  Please note that we cannot provide personalized tax advice.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center p-6 rounded-lg bg-muted/50 border">
          <p className="text-muted-foreground">
            Looking for answers? Check out our{" "}
            <a href="/#faq-heading" className="text-primary hover:underline font-medium">
              Frequently Asked Questions
            </a>{" "}
            first.
          </p>
        </div>
      </div>
    </Container>
  );
}
