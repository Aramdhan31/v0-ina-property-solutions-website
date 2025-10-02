"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Script from "next/script"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef } from "react"

// Declare global grecaptcha
declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad: any
  }
}

export default function ContactClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  // ---------- Simple Arithmetic CAPTCHA ----------

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState("")
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // previous rendering effect removed; now handled in script onload

  // Script load handled by <Script> tag below

  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset()
    }
    setRecaptchaToken(null)
    setRecaptchaError("")
  }

  // Auto-reset token after 5 minutes
  useEffect(() => {
    if (recaptchaToken) {
      const timer = setTimeout(() => {
        resetRecaptcha()
      }, 300000) // 5 minutes
      return () => clearTimeout(timer)
    }
  }, [recaptchaToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = window.grecaptcha?.getResponse() || ""
    if (!token) {
      setRecaptchaError("Please verify that you're not a robot.")
      return
    }
    setRecaptchaToken(token)

    setIsSubmitting(true)

    try {
      // Send the email via EmailJS using browser SDK
      const emailRes = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN!,
        e.currentTarget as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      if (emailRes.status === 200) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        // after submit success reset widget
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
        setRecaptchaToken(null)
      } else {
        setSubmitStatus("error")
        setRecaptchaError("Failed to send message. Please try again.")
        setRecaptchaToken(null)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setRecaptchaError("Failed to send message. Please try again.")
      setRecaptchaToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Google reCAPTCHA v2 script */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
        onLoad={() => setScriptLoaded(true)}
      />
      {/* Structured Data JSON-LD */}
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact INA Property Solutions",
            description:
              "Contact page for INA Property Solutions - Professional property maintenance services in London",
            url: "https://ina-property-solutions.vercel.app/contact",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "INA Property Solutions",
              description:
                "Professional property maintenance and building solutions company serving London's most prestigious developments",
              address: {
                "@type": "PostalAddress",
                addressLocality: "London",
                addressCountry: "GB",
                addressRegion: "Greater London",
              },
              email: "info@inaproperty.co.uk",
              telephone: "+44-20-XXXX-XXXX",
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
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+44-20-XXXX-XXXX",
                  contactType: "customer service",
                  email: "info@inaproperty.co.uk",
                  availableLanguage: "English",
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    opens: "00:00",
                    closes: "23:59",
                  },
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+44-20-XXXX-XXXX",
                  contactType: "emergency",
                  email: "info@inaproperty.co.uk",
                  availableLanguage: "English",
                  hoursAvailable: "24/7",
                },
              ],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://ina-property-solutions.vercel.app",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Contact",
                  item: "https://ina-property-solutions.vercel.app/contact",
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-stone-50">
        {/* Header Section - Mobile Optimised */}
        <header className="w-full px-3 sm:px-6 py-4 sm:py-12 bg-gradient-to-b from-slate-800 to-slate-900 text-center border-b border-slate-700">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-2 sm:mb-4">
              <Link href="https://inaproperty.co.uk/" className="inline-block hover:opacity-80 transition-opacity">
                <img
                  src="/ina-logo-corrected.png"
                  alt="INA Property Solutions"
                  className="h-24 sm:h-32 md:h-48 lg:h-60 w-auto cursor-pointer"
                />
              </Link>
            </div>

            <p className="text-white/80 font-bold tracking-wide mb-3 sm:mb-8 text-xs sm:text-sm uppercase">
              Professional Maintenance Company
            </p>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <a
                href="/"
                className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
              >
                Home
              </a>
              <a
                href="/#services"
                className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
              >
                Services
              </a>
              <a
                href="/#about"
                className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-amber-200 font-semibold text-base tracking-wide border-b-2 border-amber-200"
              >
                Contact Us
              </a>
            </nav>

            {/* Mobile Navigation Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-amber-200 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
                  ></span>
                </div>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <nav className="md:hidden mt-4 py-4 border-t border-slate-600">
                <div className="flex flex-col space-y-3">
                  <a
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide py-2"
                  >
                    Home
                  </a>
                  <a
                    href="/#services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide py-2"
                  >
                    Services
                  </a>
                  <a
                    href="/#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide py-2"
                  >
                    About Us
                  </a>
                  <a
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-amber-200 font-semibold text-base tracking-wide py-2"
                  >
                    Contact Us
                  </a>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Contact Hero Section - Mobile Optimised */}
        <section className="relative px-3 sm:px-6 py-12 sm:py-20 bg-gradient-to-r from-slate-900/95 to-slate-800/95 text-white">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700"></div>
          </div>
          <div className="relative max-w-6xl mx-auto text-center z-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-6 tracking-tight text-balance">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light text-pretty">
              Ready to discuss your property needs? Our expert team is here to help with professional solutions tailored
              to your requirements.
            </p>
          </div>
        </section>

        {/* Contact Information & Form Section - Mobile Optimised */}
        <section className="px-3 sm:px-6 py-12 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
              {/* Contact Information */}
              <div className="order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-slate-800 mb-6 sm:mb-8 tracking-wide text-balance">
                  Contact Information
                </h2>

                <div className="mb-6 sm:mb-8 p-6 bg-gradient-to-br from-slate-50 to-stone-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-center w-16 h-16 bg-slate-800 rounded-xl mx-auto mb-4">
                    <span className="text-white text-2xl">🏢</span>
                  </div>
                  <h3 className="text-center font-semibold text-slate-900 mb-2">Professional Property Solutions</h3>
                  <p className="text-center text-slate-600 text-sm">Serving London's most prestigious developments</p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg sm:text-xl">📧</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Email Us</h3>
                      <a
                        href="mailto:info@inaproperty.co.uk"
                        className="text-slate-700 hover:text-slate-900 transition-colors hover:underline text-sm sm:text-base break-all"
                      >
                        info@inaproperty.co.uk
                      </a>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">
                        A company you can trust since our founding
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg sm:text-xl">🏢</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Service Area</h3>
                      <p className="text-slate-700 text-sm sm:text-base">Greater London</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">
                        Serving all London boroughs and surrounding areas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg sm:text-xl">⏰</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Availability</h3>
                      <p className="text-slate-700 text-sm sm:text-base">24/7 Emergency Response</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">
                        Regular hours: Monday - Friday, 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg sm:text-xl">🛡️</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Credentials</h3>
                      <p className="text-slate-700 text-sm sm:text-base">Fully Licensed & Insured</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">
                        A company you can trust since our founding
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-stone-50 rounded-2xl">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Emergency Services</h3>
                  <div className="w-full h-20 sm:h-24 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg mb-3 sm:mb-4 flex items-center justify-center border border-red-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">🚨</span>
                      </div>
                      <div>
                        <p className="font-semibold text-red-800 text-sm">24/7 Emergency Response</p>
                        <p className="text-red-600 text-xs">Immediate assistance available</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                    For urgent property emergencies requiring immediate attention, please contact us directly via email
                    with "EMERGENCY" in the subject line.
                  </p>
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm font-medium">Available 24/7 for emergency response</span>
                  </div>
                </div>
              </div>

              {/* Contact Form - Mobile Optimised */}
              <div className="order-1 lg:order-2">
                <div className="lg:sticky lg:top-8">
                  <Card className="w-full shadow-2xl border-0 bg-white overflow-hidden">
                    <CardHeader className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden p-4 sm:p-6">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
                      </div>

                      <div className="relative z-10 space-y-3 sm:space-y-4 text-center flex flex-col items-center">
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm sm:text-lg">✉️</span>
                          </div>
                          <span className="text-balance">Send us a message</span>
                        </CardTitle>

                        <div className="flex items-center gap-2 text-slate-200">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                          <p className="text-sm sm:text-base font-medium">We'll get back to you within 24 hours</p>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                          Professional property solutions tailored to your needs
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      {submitStatus === "success" && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center gap-2 sm:gap-3 text-green-800">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs sm:text-sm">✓</span>
                            </div>
                            <span className="font-medium text-sm sm:text-base">Message sent successfully!</span>
                          </div>
                          <p className="text-green-700 text-xs sm:text-sm mt-2 ml-7 sm:ml-9">
                            Thank you for contacting us. We'll respond within 24 hours.
                          </p>
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                          <div className="flex items-center gap-2 sm:gap-3 text-red-800">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs sm:text-sm">!</span>
                            </div>
                            <span className="font-medium text-sm sm:text-base">Failed to send message</span>
                          </div>
                          <p className="text-red-700 text-xs sm:text-sm mt-2 ml-7 sm:ml-9">
                            Please try again or contact us directly via email.
                          </p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3 md:gap-4">
                          <div className="space-y-1 sm:space-y-2">
                            <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-slate-700">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="h-10 sm:h-12 border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg text-sm sm:text-base"
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-slate-700">
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="h-10 sm:h-12 border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg text-sm sm:text-base"
                              placeholder="Your phone number"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-slate-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-10 sm:h-12 border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg text-sm sm:text-base"
                            placeholder="info@inaproperty.co.uk"
                          />
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-slate-700">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="h-10 sm:h-12 border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-lg text-sm sm:text-base"
                            placeholder="What can we help you with?"
                          />
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-slate-700">
                            Message <span className="text-red-500">*</span>
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="border-slate-300 focus:border-slate-500 focus:ring-slate-500 resize-none rounded-lg text-sm sm:text-base leading-relaxed"
                            placeholder="Please describe your property needs, including any specific requirements or questions you may have..."
                          />
                        </div>

                        {/* reCAPTCHA checkbox */}
                        <div className="g-recaptcha flex justify-center" data-sitekey={SITE_KEY}></div>

                        {recaptchaError && (
                          <p className="text-red-600 text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                            <span className="text-red-500">⚠️</span>
                            {recaptchaError}
                          </p>
                        )}

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2 sm:gap-3">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Sending Message...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <span>Send Message</span>
                              <span className="text-base sm:text-lg">→</span>
                            </div>
                          )}
                        </Button>

                        <div className="text-center pt-1 sm:pt-2">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="text-red-500">*</span> Required fields. We respect your privacy and will
                            never share your information.
                          </p>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview - Mobile Optimised */}
        <section className="px-3 sm:px-6 py-12 sm:py-20 bg-stone-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-slate-800 mb-6 sm:mb-8 tracking-wide text-balance">
              How We Can Help
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: "🏢",
                  title: "Building Maintenance",
                  desc: "Comprehensive upkeep services",
                  bgColor: "from-blue-50 to-indigo-50",
                  borderColor: "border-blue-100",
                },
                {
                  icon: "✨",
                  title: "Professional Cleaning",
                  desc: "Commercial-grade cleaning",
                  bgColor: "from-green-50 to-emerald-50",
                  borderColor: "border-green-100",
                },
                {
                  icon: "🔧",
                  title: "Plumbing & Electrical",
                  desc: "Expert technical services",
                  bgColor: "from-orange-50 to-amber-50",
                  borderColor: "border-orange-100",
                },
                {
                  icon: "🏠",
                  title: "Maintenance Services",
                  desc: "Complete maintenance solutions",
                  bgColor: "from-purple-50 to-violet-50",
                  borderColor: "border-purple-100",
                },
              ].map((service, i) => (
                <div key={i} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className={`w-full h-24 sm:h-32 bg-gradient-to-br ${service.bgColor} rounded-lg mb-3 sm:mb-4 flex items-center justify-center border ${service.borderColor}`}
                  >
                    <div className="text-3xl sm:text-4xl">{service.icon}</div>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">{service.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer - Mobile Optimised */}
        <footer className="bg-gradient-to-b from-slate-800 to-slate-900 border-t-2 border-slate-700 px-3 sm:px-6 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <Link href="https://inaproperty.co.uk/" className="inline-block hover:opacity-80 transition-opacity">
                <img
                  src="/ina-logo-corrected.png"
                  alt="INA Property Solutions"
                  className="h-16 sm:h-20 w-auto cursor-pointer"
                />
              </Link>
            </div>
            <p className="text-white/80 mb-6 sm:mb-8 leading-relaxed font-light text-sm sm:text-base">
              Professional property solutions - a company you can trust.
            </p>
            <div className="border-t border-slate-600 pt-4 sm:pt-6 text-center">
              <p className="text-white/70 font-light text-xs sm:text-sm mb-0">
                &copy; 2025 INA Property Solutions. All rights reserved. | London's Trusted Property Experts
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
