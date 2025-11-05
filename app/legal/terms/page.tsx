import { Container } from "@/components/container";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Terms of Service",
  description: "TaxFlow terms of service - Rules and guidelines for using our VAT calculator.",
  canonical: "/legal/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <Container size="narrow" className="py-16">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 1, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using TaxFlow ("the Service"), you accept and agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          TaxFlow provides a free online VAT calculator tool for businesses and individuals. The
          Service includes:
        </p>
        <ul>
          <li>VAT calculation tools (add/remove VAT)</li>
          <li>Educational content about VAT and taxation</li>
          <li>Information about VAT rates in EU countries</li>
        </ul>

        <h2>3. Use of Service</h2>
        <h3>Permitted Use</h3>
        <p>You may use the Service for lawful purposes only, including:</p>
        <ul>
          <li>Calculating VAT for business or personal purposes</li>
          <li>Accessing educational content</li>
          <li>Sharing calculation results</li>
        </ul>

        <h3>Prohibited Use</h3>
        <p>You must not:</p>
        <ul>
          <li>Use the Service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper functioning of the Service</li>
          <li>Scrape or systematically extract data from the Service</li>
          <li>Misrepresent your affiliation with TaxFlow</li>
        </ul>

        <h2>4. Accuracy and Disclaimer</h2>
        <p>
          <strong>IMPORTANT:</strong> While we strive for accuracy, TaxFlow is provided for
          informational and educational purposes only. We make no guarantees about:
        </p>
        <ul>
          <li>The accuracy, completeness, or timeliness of VAT rates</li>
          <li>The suitability of calculations for your specific situation</li>
          <li>Compliance with tax regulations in your jurisdiction</li>
        </ul>
        <p>
          <strong>Always consult with a qualified tax professional</strong> for advice specific to
          your situation. We are not responsible for any financial losses or tax penalties
          resulting from use of this Service.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, design, code, and trademarks on TaxFlow are owned by us or our licensors.
          You may not copy, reproduce, or distribute our content without permission, except for:
        </p>
        <ul>
          <li>Personal, non-commercial use</li>
          <li>Sharing links to our content</li>
          <li>Brief quotations with proper attribution</li>
        </ul>

        <h2>6. Limitation of Liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, TAXFLOW AND ITS OPERATORS SHALL NOT BE LIABLE
          FOR:
        </p>
        <ul>
          <li>Any direct, indirect, incidental, or consequential damages</li>
          <li>Loss of profits, revenue, data, or business opportunities</li>
          <li>Tax penalties or interest charges</li>
          <li>Errors or omissions in our content or calculations</li>
        </ul>
        <p>Your use of the Service is at your own risk.</p>

        <h2>7. Third-Party Links and Affiliates</h2>
        <p>
          The Service may contain links to third-party websites and affiliate partnerships. We are
          not responsible for the content, accuracy, or practices of third-party sites. Affiliate
          relationships are disclosed where applicable.
        </p>

        <h2>8. Advertising</h2>
        <p>
          We display advertisements on the Service. We do not control the content of ads and are
          not responsible for advertiser claims.
        </p>

        <h2>9. Changes to Service</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time without
          notice. We are not liable for any modification, suspension, or discontinuation.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Continued use of the Service
          after changes constitutes acceptance of the new terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These terms are governed by the laws of the European Union and the jurisdiction where
          TaxFlow is registered, without regard to conflict of law provisions.
        </p>

        <h2>12. Contact</h2>
        <p>
          For questions about these Terms of Service, contact us at:
          <br />
          <a href="mailto:legal@taxflow.com">legal@taxflow.com</a>
        </p>
      </div>
    </Container>
  );
}
