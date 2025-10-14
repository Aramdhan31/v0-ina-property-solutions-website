"use client"

import { useState } from "react"
import Link from "next/link"
import AccessibilityButton from "@/components/accessibility-button"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="bg-stone-50">
      <header className="w-full px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-b from-slate-800 to-slate-900 text-center border-b border-slate-700">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute top-0 right-0">
            <AccessibilityButton />
          </div>

          <div className="flex justify-center mb-4 sm:mb-4">
            <Link href="https://inaproperty.co.uk/" className="inline-block hover:opacity-80 transition-opacity">
              <img
                src="/ina-logo-corrected.png"
                alt="INA Property Solutions"
                className="h-28 sm:h-32 md:h-48 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <p className="text-white/80 font-bold tracking-wide mb-6 sm:mb-6 text-sm sm:text-sm uppercase">
            Professional Maintenance Company
          </p>

          <nav className="hidden md:flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <a
              href="#services"
              className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
            >
              About Us
            </a>
            <a
              href="#experience"
              className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
            >
              Our Experience
            </a>
            <a
              href="/contact"
              className="text-white hover:text-amber-200 transition-colors font-medium text-base tracking-wide hover:scale-105 transform transition-all duration-200"
            >
              Contact Us
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-4 sm:p-3 text-white hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-lg min-w-[48px] min-h-[48px]"
              aria-label="Toggle mobile menu"
            >
              <div className="w-7 h-7 flex flex-col justify-center items-center">
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm my-0.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
                ></span>
              </div>
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden mt-6 sm:mt-4 py-8 sm:py-6 border-t border-slate-600 bg-slate-700/80 backdrop-blur-sm rounded-lg mx-4 shadow-lg">
              <div className="flex flex-col space-y-2 sm:space-y-1">
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-amber-200 hover:bg-slate-600 transition-all font-medium text-xl sm:text-lg tracking-wide py-5 sm:py-4 px-6 rounded-lg mx-2 min-h-[56px] flex items-center"
                >
                  Services
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-amber-200 hover:bg-slate-600 transition-all font-medium text-xl sm:text-lg tracking-wide py-5 sm:py-4 px-6 rounded-lg mx-2 min-h-[56px] flex items-center"
                >
                  About Us
                </a>
                <a
                  href="#experience"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-amber-200 hover:bg-slate-600 transition-all font-medium text-xl sm:text-lg tracking-wide py-5 sm:py-4 px-6 rounded-lg mx-2 min-h-[56px] flex items-center"
                >
                  Our Experience
                </a>
                <a
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-amber-200 hover:bg-slate-600 transition-all font-medium text-xl sm:text-lg tracking-wide py-5 sm:py-4 px-6 rounded-lg mx-2 min-h-[56px] flex items-center"
                >
                  Contact Us
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section id="services" className="px-6 sm:px-6 py-16 sm:py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-3xl md:text-5xl font-light text-navy-800 mb-6 sm:mb-6 tracking-wide">
              Our Services
            </h2>
            <p className="text-lg sm:text-lg md:text-xl text-navy-600 font-light max-w-3xl mx-auto leading-relaxed px-4 sm:px-2">
              Comprehensive property solutions tailored to meet the unique needs of residential and commercial
              properties across London.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
            {[
              {
                title: "Building Maintenance",
                description:
                  "Comprehensive building upkeep including preventive maintenance, repairs, and facility management with certified professionals.",
                icon: "🏢",
              },
              {
                title: "Professional Cleaning",
                description:
                  "Commercial-grade cleaning services with flexible scheduling, eco-friendly products, and quality assurance.",
                icon: "✨",
              },
              {
                title: "Concierge Services",
                description:
                  "Premium concierge solutions for residential and commercial properties with 24/7 professional support.",
                icon: "🎩",
              },
              {
                title: "Plumbing & Drainage",
                description:
                  "Expert plumbing installations, emergency repairs, and comprehensive drainage solutions by certified engineers.",
                icon: "🔧",
              },
              {
                title: "Electrical Services",
                description:
                  "Certified electrical installations, safety inspections, and emergency repairs with full compliance certification.",
                icon: "⚡",
              },
              {
                title: "Maintenance Services",
                description:
                  "Complete property maintenance solutions, preventive care programs, and comprehensive building upkeep services.",
                icon: "🏠",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-stone-200 group"
              >
                <div className="text-4xl sm:text-3xl lg:text-4xl mb-4 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-lg lg:text-xl font-semibold text-navy-800 mb-3 sm:mb-3 lg:mb-4 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-navy-600 font-light leading-relaxed text-base sm:text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 sm:px-6 py-20 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-4xl md:text-5xl font-light text-navy-800 mb-8 sm:mb-8 tracking-wide">
                About INA Property Solutions
              </h2>
              <div className="space-y-6 sm:space-y-6 text-navy-700 leading-relaxed">
                <p className="text-lg sm:text-lg font-light">
                  INA Property Solutions has been London's trusted partner for comprehensive property maintenance
                  services. We are a company you can trust and specialize in delivering exceptional results for
                  residential and commercial properties across the capital.
                </p>
                <p className="text-lg sm:text-lg font-light">
                  Our expertise spans all aspects of property maintenance, from routine cleaning and gardening to
                  complex technical services including plumbing, electrical work, and major refurbishment projects. We
                  pride ourselves on our commitment to quality, reliability, and customer satisfaction.
                </p>
                {/* Removed feature badges */}
              </div>
            </div>
            <div className="relative">
              <img
                src="/professional-ina-property-solutions-team-photo-in-.jpg"
                alt="INA Property Solutions professional team"
                className="w-full h-[450px] sm:h-[500px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 sm:p-4 rounded-xl shadow-lg border border-stone-200">
                <div className="text-3xl sm:text-2xl font-light text-navy-800">Trust</div>
                <div className="text-base sm:text-sm text-navy-600">You Can Trust</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 sm:px-6 py-20 sm:py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-light text-navy-800 mb-6 sm:mb-6 tracking-wide">
              Our Experience
            </h2>
            <p className="text-lg sm:text-lg md:text-xl text-navy-600 font-light max-w-3xl mx-auto leading-relaxed px-4 sm:px-2">
              Dedicated service delivering exceptional property solutions across London's residential and commercial
              developments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-12 mb-16">
            {[
              {
                icon: "🏢",
                label: "Professional Service",
                description: "Serving London properties",
              },
              {
                icon: "🔧",
                label: "Comprehensive Solutions",
                description: "Residential & commercial",
              },
              {
                icon: "⚡",
                label: "Emergency Response",
                description: "Always available",
              },
              {
                icon: "🤝",
                label: "Client Focused",
                description: "Trusted by our clients",
              },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl sm:text-6xl mb-4">{stat.icon}</div>
                <div className="text-lg sm:text-xl font-semibold text-navy-800 mb-2">{stat.label}</div>
                <div className="text-navy-600 font-light text-sm">{stat.description}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-light text-navy-800 mb-6 tracking-wide">
              Why Choose INA Property Solutions?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-navy-800 mb-2">Precision & Quality</h4>
                <p className="text-navy-600 font-light text-sm">
                  Every project completed to the highest standards with attention to detail.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-navy-800 mb-2">Rapid Response</h4>
                <p className="text-navy-600 font-light text-sm">
                  Quick turnaround times for all maintenance and emergency services.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h4 className="font-semibold text-navy-800 mb-2">Trusted Partnership</h4>
                <p className="text-navy-600 font-light text-sm">
                  Building long-term relationships with property owners and managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="bg-gradient-to-b from-slate-800 to-slate-900 border-t-2 border-slate-700 px-6 sm:px-6 py-16 sm:py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-light text-white mb-6 sm:mb-4 tracking-wide">
              Get In Touch
            </h2>
            <p className="text-white/80 font-light text-base sm:text-base md:text-lg">
              Ready to discuss your property needs? Contact our expert team today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 mb-16 sm:mb-16">
            <div className="text-center">
              <div
                className="w-16 sm:w-14 lg:w-16 h-16 sm:h-14 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-6"
                style={{ backgroundColor: "#d0a452" }}
              >
                <span className="text-white text-2xl sm:text-xl lg:text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-white mb-3 sm:mb-2 text-base sm:text-base">London Office</h3>
              <p className="text-white/80 font-light text-base sm:text-sm md:text-base">
                Serving properties across
                <br />
                Greater London
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 sm:w-14 lg:w-16 h-16 sm:h-14 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-6"
                style={{ backgroundColor: "#d0a452" }}
              >
                <span className="text-white text-2xl sm:text-xl lg:text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-white mb-3 sm:mb-2 text-base sm:text-base">Email Us</h3>
              <a
                href="mailto:info@inaproperty.co.uk"
                className="text-white/80 font-light transition-colors hover:underline text-base sm:text-sm md:text-base break-all"
                style={{ "--tw-text-opacity": "0.8" }}
                onMouseEnter={(e) => (e.target.style.color = "#d0a452")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.8)")}
              >
                info@inaproperty.co.uk
              </a>
            </div>

            <div className="text-center">
              <div
                className="w-16 sm:w-14 lg:w-16 h-16 sm:h-14 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-6"
                style={{ backgroundColor: "#d0a452" }}
              >
                <span className="text-white text-2xl sm:text-xl lg:text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-white mb-3 sm:mb-2 text-base sm:text-base">24/7 Support</h3>
              <p className="text-white/80 font-light text-base sm:text-sm md:text-base">
                Emergency services
                <br />
                always available
              </p>
            </div>
          </div>

          <div className="border-t border-slate-600 pt-8 text-center">
            <p className="text-white/70 font-light text-sm sm:text-sm mb-0">
              &copy; 2025 INA Property Solutions. All rights reserved. | London's Trusted Property Experts
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
