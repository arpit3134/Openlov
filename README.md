
# Signal — Modern Discovery Platform

A clean, production-ready React application for discovering articles, tools, resources, and insights across topics that matter. Built with Vite, TypeScript, Tailwind CSS, and Framer Motion — with all Lovable-specific dependencies removed.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Routes](#available-routes)
- [Features](#features)
- [Components](#components)
- [Data Layer](#data-layer)
- [Theming](#theming)
- [Customisation](#customisation)

---

## Overview

Signal is a content discovery platform with:

- Editorial articles across 12 topic categories
- Curated tool & resource directory (60+ tools)
- 50+ free online calculators (Finance, Health, Tax, Math, Developer)
- Full-text search across articles, news, and resources
- Dark / light theme with localStorage persistence
- Fully responsive layout for mobile and desktop

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| TypeScript | 5.8 | Type safety |
| Vite | 5.4 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| React Router | 6.30 | Client-side routing |
| Framer Motion | 12.0 | Animations |
| TanStack Query | 5.83 | Data/state management layer |
| Lucide React | 0.462 | Icons |
| Sonner | 1.7 | Toast notifications |
| clsx + tailwind-merge | latest | Conditional class merging |

---

## Project Structure

```
signal-app/
├── index.html                  # HTML entry point
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                # React root — wraps ThemeProvider + App
    ├── App.tsx                 # Router + QueryClient setup
    ├── index.css               # Tailwind directives + CSS variables
    ├── context/
    │   └── ThemeContext.tsx    # Dark/light theme context
    ├── lib/
    │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
    ├── data/
    │   ├── types.ts            # Shared TypeScript interfaces
    │   ├── mockData.ts         # Articles, news, resources, collections, topics
    │   ├── tools.ts            # Tools directory data (60+ tools)
    │   └── calculators.ts      # 50+ calculators with full calculation logic
    ├── components/
    │   ├── StickyHeader.tsx    # Sticky nav with mobile menu + search trigger
    │   ├── DiscoveryHero.tsx   # Hero section with animated search bar
    │   ├── SearchOverlay.tsx   # Full-screen search overlay (Escape to close)
    │   ├── TopicExplorer.tsx   # Topic grid with icons
    │   ├── EditorialCard.tsx   # Article card (feature / standard / compact)
    │   ├── CollectionCard.tsx  # Collection card with cover image overlay
    │   ├── ResourceCard.tsx    # Tool/resource card
    │   ├── NewsCard.tsx        # News item row with external link
    │   ├── NewsletterCTA.tsx   # Email subscribe section
    │   ├── RichFooter.tsx      # Multi-column footer with links
    │   ├── SectionHeader.tsx   # Section title + "View all" link
    │   ├── TopicChip.tsx       # Topic badge (clickable or static)
    │   ├── BookmarkButton.tsx  # Toggle bookmark button
    │   ├── ThemeToggle.tsx     # Sun/Moon theme switcher
    │   └── calculator/
    │       └── CalculatorCard.tsx  # Calculator listing card
    └── pages/
        ├── Index.tsx           # Home page
        ├── Discover.tsx        # Discover / explore page
        ├── Articles.tsx        # Articles listing
        ├── ArticleDetail.tsx   # Full article view
        ├── Topics.tsx          # All topics grid
        ├── TopicDetail.tsx     # Topic page (articles + news + resources)
        ├── Collections.tsx     # Collections listing
        ├── CollectionDetail.tsx# Collection detail with articles + resources
        ├── Resources.tsx       # Tools directory with category filters
        ├── ResourceDetail.tsx  # Tool detail page
        ├── Calculators.tsx     # Calculator directory with search + filters
        ├── CalculatorDetail.tsx# Live calculator with inputs + results
        ├── SearchResults.tsx   # Search results (articles + news + resources)
        ├── Trending.tsx        # Trending content
        ├── About.tsx           # About Signal
        ├── Contact.tsx         # Contact form
        └── NotFound.tsx        # 404 page
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher (or pnpm / bun)

### Installation

```bash
# 1. Unzip and enter the project
unzip signal-app.zip
cd signal-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Available Routes

| Route | Page |
|---|---|
| `/` | Home — hero search + topic grid |
| `/discover` | Discover — same as home, standalone |
| `/articles` | Articles listing |
| `/articles/:slug` | Article detail with related articles |
| `/topics` | All topics grid |
| `/topics/:slug` | Topic detail — articles, news, resources |
| `/collections` | Collections listing |
| `/collections/:slug` | Collection detail |
| `/resources` | Tools directory with category filters |
| `/resources/:slug` | Tool detail page |
| `/calculators` | Calculator directory |
| `/calculators/:slug` | Live interactive calculator |
| `/search?q=...` | Search results |
| `/trending` | Trending content |
| `/about` | About page |
| `/contact` | Contact form |

---

## Features

### Search
- Animated hero search bar with rotating placeholder text
- Full-screen search overlay (triggered from header or hero)
- Keyboard shortcut: `Escape` closes overlay
- Results page shows matched articles, news items, and resources

### Calculators
50+ calculators across 6 categories, all running client-side with zero data sent to any server:

| Category | Examples |
|---|---|
| Finance | EMI, SIP, FD, RD, PPF, CAGR, ROI, Retirement, Inflation |
| Tax & Salary | Income Tax, GST, In-hand Salary, HRA |
| Health | BMI, BMR, Calorie, Water Intake, Ideal Weight |
| Date & Time | Age, Date Difference, Countdown, Time Difference |
| Math & Utility | Percentage, Discount, Tip, Fuel Cost, Unit Converter |
| Developer | JSON Formatter, Base64, URL Encoder, Word Counter, Case Converter |

### Tools Directory
60+ curated tools across AI, Developer, Design, Productivity, and Finance categories with search and filter support.

### Theme
- Dark mode by default
- Toggleable via the Sun/Moon button in the header
- Theme persisted to `localStorage`

### Responsive Design
- Mobile-first layout
- Hamburger menu with nested submenu on mobile
- Adaptive grid layouts (1 → 2 → 3 → 4 columns)

---

## Components

### EditorialCard

Three variants for flexible article presentation:

```tsx
// Large hero card with image overlay
<EditorialCard article={article} variant="feature" />

// Standard card with image + metadata
<EditorialCard article={article} variant="standard" />

// Compact horizontal card for sidebars/related
<EditorialCard article={article} variant="compact" />
```

### TopicChip

```tsx
// Static badge
<TopicChip topic="ai" />

// Smaller badge
<TopicChip topic="design" size="sm" />

// Clickable link to topic page
<TopicChip topic="startups" clickable />
```

### SectionHeader

```tsx
<SectionHeader
  title="Featured Articles"
  subtitle="Hand-picked by the editorial team"
  href="/articles"
  linkLabel="View all"
/>
```

---

## Data Layer

All data lives in `src/data/` as TypeScript constants — no external API required.

| File | Contents |
|---|---|
| `types.ts` | Interfaces: `Topic`, `Article`, `NewsItem`, `Resource`, `Collection`, `Author` |
| `mockData.ts` | 12 topics, 10 articles, 6 news items, 6 resources, 5 collections |
| `tools.ts` | 60+ tools with category, tags, and external URL |
| `calculators.ts` | 50+ calculators with typed inputs and pure `calculate()` functions |

To connect a real backend, replace the mock imports in pages with API calls wrapped in TanStack Query's `useQuery`.

---

## Theming

CSS custom properties are defined in `src/index.css` for both light and dark modes:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 220 20% 10%;
  --primary: 221 100% 50%;
  /* ... */
}

.dark {
  --background: 222 20% 6%;
  --foreground: 220 14% 96%;
  --primary: 221 100% 60%;
  /* ... */
}
```

All Tailwind colour utilities (`bg-background`, `text-foreground`, `text-primary`, etc.) reference these variables, so the entire UI switches automatically when the `dark` class is applied to `<html>`.

### Typography

| Usage | Font |
|---|---|
| Headlines (`h1`–`h4`, `.font-editorial`) | Newsreader (Google Fonts, serif) |
| Body / UI | Inter, system sans-serif fallback |

---

## Customisation

### Add a new topic
Edit `src/data/mockData.ts` and append to the `topics` array:

```ts
{
  name: "Climate",
  slug: "climate",
  description: "Science, policy, and solutions for a changing planet",
  icon: "🌱",
  featured: true,
  color: "hsl(145, 60%, 40%)",
  articleCount: 8,
}
```

### Add a new calculator
Append to the `calculators` array in `src/data/calculators.ts`:

```ts
{
  id: "my-calc",
  name: "My Calculator",
  slug: "my-calculator",
  description: "Does something useful",
  category: "math-utility", // finance | tax-salary | health | date-time | math-utility | developer
  inputs: [
    { key: "value", label: "Enter a number", type: "number", default: 100 },
  ],
  calculate: (v) => [
    { label: "Result", value: String(+v.value * 2), highlight: true },
  ],
}
```

### Add a new tool
Append to the `tools` array in `src/data/tools.ts`:

```ts
{
  id: "my-tool",
  name: "My Tool",
  slug: "my-tool",
  description: "A short description of what this tool does.",
  websiteUrl: "https://example.com",
  category: "developer", // ai | developer | design | productivity | finance
  tags: ["tag1", "tag2"],
  featured: true,
}
```

---

## License

MIT — free to use and modify for personal or commercial projects.