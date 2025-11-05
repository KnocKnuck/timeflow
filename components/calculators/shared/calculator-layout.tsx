import { ReactNode } from "react";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "./breadcrumbs";

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLd?: object[];
  faq?: ReactNode;
  relatedTools?: ReactNode;
}

export function CalculatorLayout({
  children,
  title,
  description,
  breadcrumbs,
  jsonLd,
  faq,
  relatedTools,
}: CalculatorLayoutProps) {
  return (
    <>
      {jsonLd?.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}

      <Container className="py-8 md:py-12">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {children}
        </div>

        {faq && (
          <div className="max-w-4xl mx-auto mt-16">
            {faq}
          </div>
        )}

        {relatedTools && (
          <div className="mt-16">
            {relatedTools}
          </div>
        )}
      </Container>
    </>
  );
}
