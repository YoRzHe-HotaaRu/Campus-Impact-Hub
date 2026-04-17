import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";

import { AppProviders } from "@/components/app-providers";
import { appUrl } from "@/lib/env";

import "./globals.css";

const bodyFont = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Campus Impact Hub MY",
    template: "%s | Campus Impact Hub MY",
  },
  description:
    "A bilingual Malaysian student opportunity hub for scholarships, volunteering, research, competitions and internships.",
  metadataBase: new URL(appUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppProviders clerkEnabled={clerkEnabled}>{children}</AppProviders>
      </body>
    </html>
  );
}
