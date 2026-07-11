import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://swasthya.rautamai.gov.np"),
  title: {
    default: "स्वास्थ्य शाखा | रौतामाई गाउँपालिका",
    template: "%s | रौतामाई गाउँपालिका"
  },
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाको आधिकारिक वेबसाइट। यहाँबाट स्वास्थ्य संस्थाहरू, स्वास्थ्य सेवाहरू, सूचना, प्रतिवेदन, अनलाइन अपोइन्टमेन्ट र गुनासो दर्ता गर्न सकिन्छ।",
  keywords: [
    "रौतामाई गाउँपालिका",
    "रौतामाई",
    "स्वास्थ्य शाखा",
    "रौतामाई स्वास्थ्य",
    "रौतामाई गाउँपालिका स्वास्थ्य शाखा",
    "Rautamai",
    "Rautamai Health Branch",
    "Rautamai Rural Municipality",
    "Health Branch Rautamai",
    "Udayapur Health Services",
    "उदयपुर स्वास्थ्य सेवा",
    "nepal government health portal"
  ],
  authors: [{ name: "Rautamai Rural Municipality" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "स्वास्थ्य शाखा | रौतामाई गाउँपालिका",
    description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाको आधिकारिक अनलाइन सेवा पोर्टल।",
    url: "https://swasthya.rautamai.gov.np",
    siteName: "रौतामाई गाउँपालिका स्वास्थ्य शाखा",
    locale: "ne_NP",
    type: "website",
    images: [
      {
        url: "/emblem.png",
        width: 512,
        height: 512,
        alt: "Government Emblem of Nepal"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "स्वास्थ्य शाखा | रौतामाई गाउँपालिका",
    description: "रौतामाई गाउँपालिका स्वास्थ्य शाखाको आधिकारिक अनलाइन सेवा पोर्टल।",
    images: ["/emblem.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ne">
      <body>{children}</body>
    </html>
  );
}
