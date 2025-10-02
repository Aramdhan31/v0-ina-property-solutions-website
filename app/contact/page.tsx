import type { Metadata } from "next"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact INA Property Solutions - Professional Property Maintenance London | Get Quote",
  description:
    "Contact INA Property Solutions for professional property maintenance services in London. 24/7 emergency response, expert building maintenance, facilities management. Trusted by Soomdat Singh and property managers across London. Get your free quote today.",
  keywords: [
    "contact property maintenance London",
    "get property maintenance quote",
    "London property maintenance contact",
    "emergency property repairs contact",
    "building maintenance services contact",
    "facilities management London contact",
    "property maintenance company contact",
    "professional maintenance services London",
    "24/7 property emergency contact",
    "London building services contact",
    "property repair services contact",
    "maintenance contractors London contact",
    "commercial property maintenance contact",
    "residential maintenance London contact",
    "property management solutions contact",
    "building maintenance experts contact",
    "facilities maintenance services contact",
    "property maintenance specialists contact",
    "emergency building repairs London",
    "property services London contact",
    "building maintenance London contact",
    "maintenance service providers contact",
    "property facility management contact",
    "London property repairs contact",
    "maintenance solutions contact",
    "property maintenance team contact",
    "building services contractors contact",
    "Soomdat Singh property maintenance",
    "trusted property maintenance contact",
    "reliable building maintenance contact",
    "professional property care contact",
  ],
  openGraph: {
    title: "Contact INA Property Solutions - Professional Property Maintenance London",
    description:
      "Contact INA Property Solutions for professional property maintenance services in London. 24/7 emergency response, expert building maintenance, and facilities management services.",
    url: "https://ina-property-solutions.vercel.app/contact",
    siteName: "INA Property Solutions",
    images: [
      {
        url: "/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact INA Property Solutions - Professional Property Maintenance London",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact INA Property Solutions - Professional Property Maintenance London",
    description:
      "Contact INA Property Solutions for professional property maintenance services in London. 24/7 emergency response and expert building maintenance.",
    images: ["/contact-twitter-image.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return <ContactClient />
}
