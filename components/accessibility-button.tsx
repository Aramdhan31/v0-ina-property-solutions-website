"use client"

import { useEffect } from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AccessibilityButton() {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [isReading, setIsReading] = useState(false)

  useEffect(() => {
    // Apply font size changes to the document
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    // Apply high contrast mode
    if (isHighContrast) {
      document.documentElement.classList.add("high-contrast")
      document.documentElement.style.filter = "contrast(150%) brightness(120%)"
    } else {
      document.documentElement.classList.remove("high-contrast")
      document.documentElement.style.filter = "none"
    }
  }, [isHighContrast])

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 150))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 80))
  }

  const resetFontSize = () => {
    setFontSize(100)
  }

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev)
  }

  const readPageAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      return
    }

    setIsReading(true)
    const textContent = document.body.innerText
    const utterance = new SpeechSynthesisUtterance(textContent)

    utterance.onend = () => {
      setIsReading(false)
    }

    utterance.onerror = () => {
      setIsReading(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      {/* Accessibility Button */}
      <div className="relative z-50">
        <Button
          onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-blue-300"
          aria-label="Open accessibility menu"
          title="Accessibility Options"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </Button>

        {/* Accessibility Menu */}
        {isAccessibilityOpen && (
          <div className="absolute top-14 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Accessibility Options</h3>
              <Button
                onClick={() => setIsAccessibilityOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 p-0"
                aria-label="Close accessibility menu"
              >
                ×
              </Button>
            </div>

            <div className="space-y-4">
              {/* Font Size Controls */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Text Size</h4>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={decreaseFontSize}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                    disabled={fontSize <= 80}
                  >
                    A-
                  </Button>
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">{fontSize}%</span>
                  <Button
                    onClick={increaseFontSize}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                    disabled={fontSize >= 150}
                  >
                    A+
                  </Button>
                  <Button
                    onClick={resetFontSize}
                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Display</h4>
                <Button
                  onClick={toggleHighContrast}
                  className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
                    isHighContrast
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {isHighContrast ? "Disable" : "Enable"} High Contrast
                </Button>
              </div>

              {/* Text-to-Speech */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Audio</h4>
                <Button
                  onClick={readPageAloud}
                  className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors ${
                    isReading ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isReading ? "Stop Reading" : "Read Page Aloud"}
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">Use these tools to customize your browsing experience</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isAccessibilityOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsAccessibilityOpen(false)} aria-hidden="true" />
      )}
    </>
  )
}
