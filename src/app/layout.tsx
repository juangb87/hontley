import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hontley — AI Concierge Setup for Small Businesses",
  description:
    "We build custom AI assistants for small businesses — on WhatsApp, Telegram, or SMS. Ready in days, not months.",
  openGraph: {
    title: "Hontley — AI Concierge Setup for Small Businesses",
    description:
      "We build custom AI assistants for small businesses — on WhatsApp, Telegram, or SMS. Ready in days, not months.",
    url: "https://hontley.com",
    siteName: "Hontley",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
