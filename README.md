This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Refrax-frontend

## Particle Background (HeroBackground)

The project includes a reusable full-screen particle network background component built with `@tsparticles/react` and `@tsparticles/slim`.

### Install

```bash
npm install @tsparticles/react @tsparticles/slim
```

### Component

File: `components/ui/HeroBackground.tsx`

Props:
- `position`: "fixed" | "absolute" (default: "fixed")
- `backgroundColor`: CSS color string (default: "#0a0a0a")
- `className`: Tailwind classes for the wrapper

### Usage (Global on Homepage)

```tsx
// app/page.tsx
import HeroBackground from "@/components/ui/HeroBackground";

export default function Home() {
  return (
    <main className="relative bg-transparent">
      <HeroBackground position="fixed" backgroundColor="#0a0a0a" className="z-0 mix-blend-screen" />
      <div className="relative z-20">
        {/* content above particles */}
      </div>
    </main>
  );
}
```

### Usage (Inside a Section)

```tsx
// components/sections/hero/default.tsx
import HeroBackground from "@/components/ui/HeroBackground";

// ... inside JSX
<div className="absolute inset-0 z-[1] pointer-events-none">
  <HeroBackground position="absolute" backgroundColor="transparent" />
<\/div>
```

### Troubleshooting
- If you see `engine.checkVersion is not a function`, ensure you're using `@tsparticles/react` and `@tsparticles/slim` and not the deprecated `react-tsparticles`.
- Particles hidden behind backgrounds: verify z-index stacking. Keep particles below content but above decorative glows.
- Safari perf: keep particle count ~80–120, reduce link distance/width if needed.
