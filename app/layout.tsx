import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import StoryblokProvider from "@/lib/storyblok-provider";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wilson Oware Addo",
  description: "Senior Product Designer",
  metadataBase: new URL("https://wilsonaddo.com/website"),
  openGraph: {
    title: "Wilson Oware Addo",
    description: "Senior Product Designer",
    url: "https://wilsonaddo.com/website",
    siteName: "Wilson Oware Addo",
    images: [
      {
        url: "https://wilsonaddo.com/website/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wilson Oware Addo - Senior Product Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilson Oware Addo",
    description: "Senior Product Designer",
    creator: "@wilsonaddo",
    images: ["https://wilsonaddo.com/website/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const hasVisited = (await cookieStore).has("has_visited");

  return (
    <StoryblokProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} antialiased`}
        >
          <ClientLayout hasVisited={hasVisited}>{children}</ClientLayout>
        </body>
      </html>
    </StoryblokProvider>
  );
}
