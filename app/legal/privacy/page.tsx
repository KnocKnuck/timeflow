import { Container } from "@/components/container";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description: "TaxFlow privacy policy - How we collect, use, and protect your data.",
  canonical: "/legal/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <Container size="narrow" className="py-16">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 1, 2025</p>

        <h2>Introduction</h2>
        <p>
          TaxFlow ("we," "our," or "us") respects your privacy and is committed to protecting your
          personal data. This privacy policy explains how we collect, use, and safeguard your
          information when you use our VAT calculator website.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>
            <strong>Contact Information:</strong> When you contact us, we collect your name and
            email address.
          </li>
          <li>
            <strong>Calculation Data:</strong> We do not store your VAT calculations. All
            calculations are performed in your browser and are not transmitted to our servers.
          </li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Analytics Data:</strong> If you consent to analytics cookies, we collect data
            about your usage patterns, pages visited, and interaction with our calculator.
          </li>
          <li>
            <strong>Technical Data:</strong> We may collect IP addresses, browser type, device
            information, and referring URLs through our hosting provider's logs.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and improve our VAT calculator service</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Analyze usage patterns to improve user experience</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Cookies and Tracking</h2>
        <p>We use three categories of cookies:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for the website to function (e.g., cookie
            consent preferences)
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
            (Google Analytics, Plausible)
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Used to display relevant advertisements
          </li>
        </ul>
        <p>
          You can manage your cookie preferences through our cookie banner that appears on your
          first visit.
        </p>

        <h2>Data Sharing and Disclosure</h2>
        <p>We do not sell your personal data. We may share data with:</p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Analytics providers (Google Analytics), hosting
            providers (Vercel)
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required by law or to protect our rights
          </li>
        </ul>

        <h2>Your Rights (GDPR)</h2>
        <p>If you are in the European Economic Area, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain contact form submissions for 2 years. Analytics data is retained according to
          our analytics provider's policies (typically 26 months for Google Analytics).
        </p>

        <h2>Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your data,
          including HTTPS encryption, secure hosting, and access controls.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our service is not directed to children under 16. We do not knowingly collect data from
          children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of significant
          changes by posting a notice on our website.
        </p>

        <h2>Contact Us</h2>
        <p>
          For privacy-related questions or to exercise your rights, contact us at:
          <br />
          <a href="mailto:privacy@taxflow.com">privacy@taxflow.com</a>
        </p>
      </div>
    </Container>
  );
}
