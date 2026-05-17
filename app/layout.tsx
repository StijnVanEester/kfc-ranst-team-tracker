import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KFC Ranst Team Tracker",
  description: "Mobiele webapp voor voetbalteamregistratie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
