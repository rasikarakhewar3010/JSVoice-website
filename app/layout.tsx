import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";
import { GlobalVoiceProvider } from '@/components/providers/global-voice-provider';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL("https://jsvoice.dev"),
  title: {
    default: "JSVoice - Advanced Voice Control for Web",
    template: "%s | JSVoice",
  },
  description:
    "The most advanced JavaScript voice command library. Zero dependencies, 100% privacy-focused, TypeScript ready, and production proven. Build voice-enabled applications with ease.",
  keywords: [
    "voice commands",
    "speech recognition",
    "javascript voice library",
    "typescript voice control",
    "web speech api wrapper",
    "voice ui components",
    "jsvoice",
    "react voice control",
    "nextjs voice commands",
    "speech to text javascript",
    "voice automation web",
    "accessibility voice control",
  ],
  authors: [{ name: "JSVoice Team", url: "https://jsvoice.dev" }],
  creator: "JSVoice Team",
  publisher: "JSVoice",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsvoice.dev",
    title: "JSVoice - Advanced Voice Control for Web",
    description:
      "Modern, zero-dependency JavaScript voice command library. Create immersive voice-controlled web experiences in minutes.",
    siteName: "JSVoice",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSVoice - The Future of Web Voice Control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSVoice - Advanced Voice Control for Web",
    description:
      "Modern, zero-dependency JavaScript voice command library. Create immersive voice-controlled web experiences in minutes.",
    images: ["/og-image.png"],
    creator: "@jsvoice",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jsvoice.dev",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code", // Replace with actual code if available
  },
  category: "technology",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSVoice",
    "image": "https://jsvoice.dev/logo.png",
    "description": "Modern JavaScript voice command library.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "JSVoice Team",
      "url": "https://jsvoice.dev",
      "logo": "https://jsvoice.dev/logo.png"
    }
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>
          <ToastProvider>
            <GlobalVoiceProvider>
              <SplashCursor />
              <Navbar />
              {children}
            </GlobalVoiceProvider>
            <Footer />
          </ToastProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
