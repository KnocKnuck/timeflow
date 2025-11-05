import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Percent, Calendar, CalendarDays, Coins } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const allTools = [
  {
    id: "vat",
    name: "VAT Calculator",
    description: "Calculate VAT for any EU country instantly",
    href: "/tools/vat-calculator",
    icon: Calculator,
  },
  {
    id: "percentage",
    name: "Percentage Calculator",
    description: "Find percentages, increases, and discounts",
    href: "/tools/percentage-calculator",
    icon: Percent,
  },
  {
    id: "age",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days",
    href: "/tools/age-calculator",
    icon: Calendar,
  },
  {
    id: "date-difference",
    name: "Date Difference Calculator",
    description: "Find days, weeks, or months between dates",
    href: "/tools/date-difference-calculator",
    icon: CalendarDays,
  },
  {
    id: "currency",
    name: "Currency Converter",
    description: "Convert between 150+ world currencies",
    href: "/tools/currency-converter",
    icon: Coins,
  },
];

interface RelatedToolsProps {
  currentTool: string;
  limit?: number;
}

export function RelatedTools({ currentTool, limit = 3 }: RelatedToolsProps) {
  const tools = allTools.filter((tool) => tool.id !== currentTool).slice(0, limit);

  const handleClick = (toolName: string) => {
    trackEvent({
      event: "tool_switch",
      from_tool: currentTool,
      to_tool: toolName,
    });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">More Calculators</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            onClick={() => handleClick(tool.id)}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
