import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "स्वास्थ्य शाखा | रौतामाई गाउँपालिका",
  description: "Rautamai Rural Municipality Health Branch website and admin panel"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ne">
      <body>{children}</body>
    </html>
  );
}
