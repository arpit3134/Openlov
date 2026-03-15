import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'content discovery',
    'articles',
    'topics',
    'collections',
    'resources',
    'tools',
    'technology',
    'design',
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="noise-overlay">
        <Header />
        <main className="min-h-screen pt-16 md:pt-20">{children}</main>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'bg-background-surface border-white/10 text-foreground',
          }}
        />
      </body>
    </html>
  );
}
