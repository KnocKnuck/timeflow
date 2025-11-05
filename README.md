# TaxFlow - Production-Ready VAT Calculator

A modern, accessible, and SEO-optimized VAT calculator built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui. Designed for businesses and freelancers across Europe.

![Lighthouse Score: 95+](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)
![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## ✨ Features

### Core Functionality
- 🧮 **Instant VAT Calculations** - Real-time calculations with no page reloads
- 🌍 **All EU Countries** - Support for 27 EU member states + UK, Switzerland, Norway
- 💱 **Multi-Currency** - 10+ supported currencies with Intl.NumberFormat
- 🔄 **Dual Modes** - Add VAT (net → gross) or Remove VAT (gross → net)
- 📋 **Copy Results** - One-click copy with visual feedback
- 🔗 **Share Calculations** - URL-based sharing with query parameters

### Performance & SEO
- ⚡ **Lighthouse 95+ (mobile)** - Optimized for Core Web Vitals
- 🔍 **SEO Optimized** - JSON-LD structured data, meta tags, Open Graph
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- 🎨 **Dark/Light Mode** - System preference detection + manual toggle
- ♿ **WCAG 2.2 AA** - Keyboard navigation, screen reader support, ARIA labels

### Monetization
- 💰 **Ad Slots** - Lazy-loaded, consent-aware advertising placeholders
- 🤝 **Affiliate Cards** - UTM tracking, clear disclosure
- 🍪 **Cookie Consent** - IAB TCF v2 friendly, granular controls

### Developer Experience
- 📝 **TypeScript** - Strict mode, full type safety
- 🧪 **Unit Tests** - Vitest + Testing Library
- 🎯 **ESLint & Prettier** - Consistent code formatting
- 🔧 **Component Library** - shadcn/ui with Radix UI primitives
- 📊 **Analytics Ready** - GA4 + Plausible integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)

### Installation

1. **Install dependencies:**
```bash
pnpm install
```

2. **Run development server:**
```bash
pnpm dev
```

3. **Open in browser:**
```
http://localhost:3000
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run unit tests
pnpm test:ui      # Run tests with UI
pnpm type-check   # TypeScript type checking
pnpm format       # Format code with Prettier
```

## 📁 Project Structure

```
timeflow/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage with calculator
│   ├── blog/                # Blog pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── legal/               # Legal pages (privacy, terms)
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── calculator/          # VAT calculator components
│   ├── blog/                # Blog components
│   ├── faq/                 # FAQ component
│   ├── ads/                 # Ad slot components
│   ├── affiliate/           # Affiliate card
│   ├── consent/             # Cookie banner
│   ├── seo/                 # SEO/JSON-LD components
│   ├── header.tsx           # Site header
│   ├── footer.tsx           # Site footer
│   └── theme-toggle.tsx     # Dark/light theme toggle
├── lib/
│   ├── vat.ts               # VAT calculation logic
│   ├── currency.ts          # Currency formatting
│   ├── seo.ts               # SEO utilities
│   ├── schema.ts            # JSON-LD builders
│   ├── analytics.ts         # Analytics tracking
│   └── utils.ts             # Utility functions
├── data/
│   └── vat-rates.json       # EU VAT rates (2025)
├── __tests__/
│   └── vat.test.ts          # VAT calculation tests
├── public/                  # Static assets
└── styles/
    └── globals.css          # Global styles + CSS variables
```

## 🧮 VAT Calculation Library

The core calculation logic is in `lib/vat.ts` with comprehensive unit tests.

### Key Features
- **Banker's Rounding** - Financial-grade rounding for accuracy
- **Input Validation** - Validates amounts and VAT rates
- **Type Safe** - Full TypeScript support
- **Well Tested** - 25+ unit tests covering edge cases

### Example Usage

```typescript
import { calculateVAT } from "@/lib/vat";

// Add VAT (net → gross)
const result = calculateVAT({
  amount: 100,
  vatRate: 20,
  mode: "net-to-gross"
});
// Result: { netAmount: 100, vatAmount: 20, grossAmount: 120 }

// Remove VAT (gross → net)
const result = calculateVAT({
  amount: 120,
  vatRate: 20,
  mode: "gross-to-net"
});
// Result: { netAmount: 100, vatAmount: 20, grossAmount: 120 }
```

## 🎨 Customization

### Adding New Countries

Edit `data/vat-rates.json`:

```json
{
  "countryCode": "XX",
  "countryName": "Country Name",
  "standardRate": 20.0,
  "reducedRates": [10.0, 5.0],
  "lastUpdated": "2025-01-01"
}
```

### Changing Theme Colors

Edit CSS variables in `styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

### Adding Blog Posts

Create MDX files in `content/blog/` with frontmatter:

```mdx
---
title: "Your Post Title"
description: "Post description"
publishedAt: "2025-01-01"
author: "Author Name"
tags: ["VAT", "Guide"]
---

# Your Content Here
```

## 📊 Analytics Setup

1. Add your GA4 Measurement ID to `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Analytics will initialize only after user consent via cookie banner.

## 🧪 Testing

Run tests with:
```bash
pnpm test
```

Tests cover:
- VAT calculation logic (all modes)
- Banker's rounding edge cases
- Input validation
- Real-world scenarios for EU countries

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy

### Environment Variables

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional: Google Analytics
NEXT_TELEMETRY_DISABLED=1                   # Already set in next.config.js
```

## 🎯 SEO Checklist

- ✅ Meta titles ≤60 characters
- ✅ Meta descriptions ≤160 characters
- ✅ JSON-LD structured data (Organization, WebSite, FAQPage, Article)
- ✅ Sitemap.xml auto-generated
- ✅ Robots.txt configured
- ✅ Open Graph + Twitter cards
- ✅ Canonical URLs
- ✅ Semantic HTML with proper landmarks
- ✅ Breadcrumb navigation

## ♿ Accessibility Features

- ✅ Skip-to-content link
- ✅ Keyboard navigation (Tab, Enter, Space, Arrow keys)
- ✅ Focus visible indicators
- ✅ ARIA labels and roles
- ✅ Live regions for dynamic content
- ✅ Color contrast ≥4.5:1
- ✅ `prefers-reduced-motion` support
- ✅ Screen reader tested

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a production template. Feel free to fork and customize for your own projects.

## 📞 Support

For questions or issues:
- Email: contact@taxflow.com
- Check the FAQ section on the website

## 🔄 Updates

VAT rates are updated based on official EU sources:
- [European Commission - VAT Rates](https://ec.europa.eu/taxation_customs/tedb/taxSearch.html)
- National tax authority websites

Last updated: January 2025

---

**Built with ❤️ using Next.js 14, TypeScript, TailwindCSS, and shadcn/ui**
