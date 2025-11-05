import Link from "next/link";
import { Container } from "./container";
import { Calculator } from "lucide-react";

const footerLinks = {
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Advertising Disclosure", href: "/legal/advertising" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40 mt-16">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
                <span>TaxFlow</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md">
                Professional VAT calculator for businesses and freelancers across Europe.
                Calculate VAT instantly with support for all EU countries.
              </p>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} TaxFlow. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                VAT rates are updated regularly. Always verify with official sources.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
