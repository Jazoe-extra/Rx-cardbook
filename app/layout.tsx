import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="max-w-xl mx-auto p-4">{children}</body>
    </html>
  );
}
