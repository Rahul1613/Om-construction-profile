import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OM Construction | Mechanical & Civil Contractor | Power Plants, Solar & Infrastructure",
  description:
    "OM Construction is a premier ISO 9001:2015 certified EPC civil and mechanical contractor based in Ratnagiri, Maharashtra. Specialists in power plant construction, 400KV substation civil works, solar park development, wind energy infrastructure, and large-scale industrial civil projects since 2000. Trusted by L&T, ABB India, TATA Projects, and Gammon India.",
  keywords: [
    "EPC contractor India",
    "civil contractor Maharashtra",
    "power plant construction",
    "solar park civil works",
    "substation foundation contractor",
    "cooling tower construction",
    "NDCT cooling tower",
    "400 KV substation civil",
    "wind energy civil contractor",
    "OM Construction Ratnagiri",
    "ISO 9001 construction company",
    "mechanical civil contractor India",
  ],
  openGraph: {
    title: "OM Construction | Premier EPC Contractor – Power, Solar & Civil Infrastructure",
    description:
      "26 years of precision engineering excellence. Delivering power plants, solar parks, substations and industrial civil works across India. ISO 9001:2015 Certified.",
    type: "website",
    locale: "en_IN",
    siteName: "OM Construction",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
