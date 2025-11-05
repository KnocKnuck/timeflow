"use client";

import Link from "next/link";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Calculator } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools/vat-calculator" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a href="#main-content" className="skip-to-content focus:translate-y-0">
        Skip to content
      </a>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
              <span>TaxFlow</span>
            </Link>

            <nav aria-label="Main navigation" className="hidden md:block">
              <ul className="flex items-center gap-6">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary focus-ring rounded-sm px-1 py-1",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Future: Language switcher placeholder */}
          </div>
        </div>
      </Container>
    </header>
  );
}
