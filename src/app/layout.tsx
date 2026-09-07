import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "OM Construction - Mechanical & Civil Contractor | Power Plants, Solar, Wind Energy",
  description: "OM Construction is a premier Mechanical & Civil Contractor established in 2000, specializing in power plants, electrical substations, renewable energy projects, and heavy civil construction across India. 26+ years experience, 600+ workforce, 32+ completed projects.",
  keywords: "OM Construction, Mechanical Contractor, Civil Contractor, Power Plants, Electrical Substations, Solar Projects, Wind Energy, Industrial Civil Works, RCC Structures, Maharashtra, India, Construction Company",
  authors: [{ name: "OM Construction" }],
  creator: "OM Construction",
  publisher: "OM Construction",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "OM Construction - Mechanical & Civil Contractor",
    description: "Premier Mechanical & Civil Contractor specializing in power plants, electrical substations, renewable energy projects across India since 2000.",
    url: 'http://localhost:3000',
    siteName: 'OM Construction',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OM Construction - Mechanical & Civil Contractor',
    description: 'Premier Mechanical & Civil Contractor specializing in power plants, electrical substations, renewable energy projects across India since 2000.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-gray-800 font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
