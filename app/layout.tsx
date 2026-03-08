import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Experience",
  description: "A beautifully crafted Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <nav className="glass-nav">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold premium-gradient-text tracking-tight">
              AESTHETIC
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/" className="hover:text-brand-primary transition-colors font-medium">Home</Link>
              <Link href="/about" className="hover:text-brand-primary transition-colors font-medium">About</Link>
              <Link href="/meme-maker" className="hover:text-brand-primary transition-colors font-medium">Meme Maker</Link>
              <Link href="/contact" className="btn-premium">Contact</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
