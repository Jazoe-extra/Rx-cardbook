import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cardbook",
  description: "Daily sales book for branch pharmacies — replaces paper, catches mistakes the same day.",
  manifest: "/manifest.webmanifest",
  themeColor: "#0B4EA2"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0B4EA2" />
        <link rel="icon" href="/icons/icon.svg" />
      </head>
      <body className="max-w-xl mx-auto p-4">{children}
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}` }} />
      </body>
    </html>
  );
}
