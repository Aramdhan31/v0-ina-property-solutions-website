import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Ina Property Solution - Professional Property Maintenance Services London",
    template: "%s | Ina Property Solution",
  },
  description:
    "Leading property maintenance company in London offering comprehensive building solutions, emergency repairs, facilities management, and professional property services. Trusted by Soomdat Singh and property managers across prestigious London developments. 24/7 emergency response, expert maintenance teams, and guaranteed client satisfaction.",
  keywords: [
    "property maintenance London",
    "building maintenance services",
    "facilities management London",
    "emergency property repairs",
    "commercial property maintenance",
    "residential property services",
    "London property management",
    "building solutions London",
    "property maintenance company",
    "professional maintenance services",
    "24/7 emergency repairs London",
    "property facilities management",
    "building repair services",
    "maintenance contractors London",
    "property service providers",
    "commercial building maintenance",
    "residential maintenance London",
    "property management solutions",
    "building maintenance contractors",
    "London facilities services",
    "property repair specialists",
    "maintenance service company",
    "building services London",
    "property maintenance experts",
    "facilities maintenance London",
    "emergency building repairs",
    "property maintenance professionals",
    "building management services",
    "London property repairs",
    "maintenance and repairs London",
    "property services London",
    "building maintenance London",
    "facilities management services",
    "property maintenance solutions",
    "commercial maintenance London",
    "residential building maintenance",
    "property maintenance specialists",
    "building repair contractors",
    "maintenance service providers",
    "London building services",
    "property facility management",
    "maintenance company London",
    "building maintenance experts",
    "property repair services",
    "facilities maintenance services",
    "emergency maintenance London",
    "property maintenance team",
    "building services contractors",
    "maintenance solutions London",
    "property management services",
    "building facility management",
    "Soomdat Singh property services",
    "trusted property maintenance",
    "reliable building maintenance",
    "professional property care",
    "Ina Property Solution",
    "Ina Property Solution London",
    "Ina property services",
  ],
  authors: [{ name: "Ina Property Solution", url: "https://inaproperty.co.uk" }],
  creator: "Ina Property Solution",
  publisher: "Ina Property Solution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://inaproperty.co.uk"),
  alternates: {
    canonical: "https://inaproperty.co.uk",
  },
  openGraph: {
    title: "Ina Property Solution",
    description:
      "Leading property maintenance company in London offering comprehensive building solutions, emergency repairs, facilities management, and professional property services. Trusted by Soomdat Singh and property managers across prestigious London developments. 24/7 emergency response, expert maintenance teams, and guaranteed client satisfaction.",
    url: "https://inaproperty.co.uk",
    siteName: "Ina Property Solution",
    images: [
      {
        url: "https://inaproperty.co.uk/preview.png",
        width: 1200,
        height: 630,
        alt: "Ina Property Solution - Professional Property Maintenance London",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ina Property Solution",
    description:
      "Leading property maintenance company in London offering comprehensive building solutions, emergency repairs, facilities management, and professional property services. Trusted by Soomdat Singh and property managers across prestigious London developments. 24/7 emergency response, expert maintenance teams, and guaranteed client satisfaction.",
    images: ["https://inaproperty.co.uk/preview.png"],
    creator: "@INAPropertySolutions",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
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
  verification: {
    google: "2e27a3e5c5a1320f",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Property Maintenance Services",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <link rel="canonical" href="https://inaproperty.co.uk" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="generator" content="inaproperty.co.uk" />

        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ina Property Solution" />
        <meta name="application-name" content="Ina Property Solution" />
        <meta name="msapplication-tooltip" content="Professional Property Maintenance Services London" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="mobile-web-app-capable" content="yes" />

        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Ina Property Solution",
            alternateName: "INA Property Maintenance",
            url: "https://inaproperty.co.uk",
            logo: "https://inaproperty.co.uk/ina-logo-corrected.png",
            description:
              "Professional property maintenance and building solutions company serving London's most prestigious developments. Expert facilities management, emergency repairs, and comprehensive property services.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "London",
              addressCountry: "GB",
              addressRegion: "Greater London",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 51.5074,
              longitude: -0.1278,
            },
            telephone: "+44-20-XXXX-XXXX",
            email: "info@inaproperty.co.uk",
            openingHours: "Mo-Su 00:00-23:59",
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 51.5074,
                longitude: -0.1278,
              },
              geoRadius: "50000",
            },
            priceRange: "££",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
              bestRating: "5",
              worstRating: "1",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Property Maintenance Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Emergency Property Repairs",
                    description: "24/7 emergency repair services for residential and commercial properties",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Facilities Management",
                    description: "Comprehensive facilities management for commercial and residential buildings",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Building Maintenance",
                    description: "Regular building maintenance and upkeep services",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Property Management",
                    description: "Complete property management solutions for landlords and property owners",
                  },
                },
              ],
            },
          })}
        </Script>

        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://inaproperty.co.uk",
            name: "Ina Property Solution",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://inaproperty.co.uk/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            description:
              "Professional property maintenance and building solutions company serving London's most prestigious developments with expert facilities management and emergency repair services.",
          })}
        </Script>

        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        <Script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={`${inter.className} font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
