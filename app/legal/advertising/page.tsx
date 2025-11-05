import { Container } from "@/components/container";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Advertising Disclosure",
  description:
    "TaxFlow advertising and affiliate disclosure - How we generate revenue and our commitment to transparency.",
  canonical: "/legal/advertising",
  noindex: true,
});

export default function AdvertisingPage() {
  return (
    <Container size="narrow" className="py-16">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Advertising Disclosure</h1>
        <p className="text-muted-foreground">Last updated: January 1, 2025</p>

        <h2>Our Commitment to Transparency</h2>
        <p>
          TaxFlow is committed to providing accurate, helpful information about VAT calculations
          and tax compliance. To keep our core calculator free, we generate revenue through
          advertising and affiliate partnerships. This page explains how we monetize our service
          and our commitment to editorial independence.
        </p>

        <h2>How We Generate Revenue</h2>

        <h3>1. Display Advertising</h3>
        <p>
          We display advertisements on our website through third-party advertising networks. These
          ads may be:
        </p>
        <ul>
          <li>Banner ads in designated advertising slots</li>
          <li>Contextual ads related to business, accounting, or finance</li>
          <li>Personalized ads based on your browsing history (with your consent)</li>
        </ul>
        <p>
          All advertising placements are clearly labeled as "Advertisement" or "Sponsored" to
          distinguish them from our editorial content.
        </p>

        <h3>2. Affiliate Partnerships</h3>
        <p>
          We participate in affiliate marketing programs with accounting software companies, tax
          service providers, and business tool vendors. When you click on an affiliate link and
          make a purchase, we may earn a commission at no additional cost to you.
        </p>
        <p>Affiliate links are marked with:</p>
        <ul>
          <li>"Sponsored" labels</li>
          <li>Disclosure text: "We may earn a commission"</li>
          <li>
            <code>rel="sponsored"</code> HTML attributes
          </li>
        </ul>

        <h2>Editorial Independence</h2>
        <p>We maintain strict editorial independence:</p>
        <ul>
          <li>
            <strong>No Pay-to-Play:</strong> Advertising and affiliate relationships do not
            influence our calculator functionality or VAT rate data.
          </li>
          <li>
            <strong>Honest Reviews:</strong> We only recommend products and services we believe
            provide value to our users.
          </li>
          <li>
            <strong>Accurate Information:</strong> VAT rates and calculation methods are sourced
            from official government sources, not advertisers.
          </li>
          <li>
            <strong>Clear Separation:</strong> Editorial content is always separated from
            advertising content.
          </li>
        </ul>

        <h2>Current Advertising Partners</h2>
        <p>We currently work with or may work with:</p>
        <ul>
          <li>Google AdSense (display advertising)</li>
          <li>Accounting software companies (affiliate programs)</li>
          <li>Invoice and billing platforms (affiliate programs)</li>
          <li>Tax compliance services (affiliate programs)</li>
          <li>Business banking providers (affiliate programs)</li>
        </ul>

        <h2>Your Control and Privacy</h2>
        <p>You have control over advertising through:</p>
        <ul>
          <li>
            <strong>Cookie Preferences:</strong> Use our cookie banner to opt out of personalized
            advertising
          </li>
          <li>
            <strong>Ad Blockers:</strong> We respect your choice to use ad blocking software
          </li>
          <li>
            <strong>Privacy Settings:</strong> Manage tracking preferences in our privacy settings
          </li>
        </ul>

        <h2>Advertising Standards</h2>
        <p>We adhere to advertising standards set by:</p>
        <ul>
          <li>FTC Guidelines on Native Advertising and Endorsements</li>
          <li>IAB Europe Transparency & Consent Framework</li>
          <li>Google Ad Policies</li>
        </ul>

        <h2>Prohibited Advertising</h2>
        <p>We do not display ads for:</p>
        <ul>
          <li>Illegal products or services</li>
          <li>Misleading financial schemes</li>
          <li>Adult or explicit content</li>
          <li>Discriminatory products or services</li>
        </ul>

        <h2>Questions About Advertising</h2>
        <p>
          If you have questions about our advertising practices or would like to report an
          inappropriate ad, please contact us at:
          <br />
          <a href="mailto:advertising@taxflow.com">advertising@taxflow.com</a>
        </p>

        <h2>FTC Disclosure</h2>
        <p className="bg-muted p-4 rounded-lg text-sm">
          <strong>Important:</strong> In compliance with FTC guidelines, we disclose that TaxFlow
          may earn revenue through advertising and affiliate commissions. Some links on this site
          are affiliate links, and we may receive compensation when you click or make purchases
          through these links. This does not affect the price you pay or influence our editorial
          content.
        </p>
      </div>
    </Container>
  );
}
