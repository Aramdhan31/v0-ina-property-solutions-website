import { type NextRequest, NextResponse } from "next/server"

// Verify standard reCAPTCHA v2 / v3 tokens sent from the client.
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "missing-token" }, { status: 400 })
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) {
      return NextResponse.json({ success: false, error: "server-misconfigured" }, { status: 500 })
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    })

    const data = await verifyRes.json()

    if (!data.success) {
      return NextResponse.json({ success: false, error: data["error-codes"]?.[0] ?? "verification-failed" }, { status: 200 })
    }

    return NextResponse.json({ success: true, score: data.score })
  } catch (e) {
    console.error("[reCAPTCHA] server error:", e)
    return NextResponse.json({ success: false, error: "server-error" }, { status: 500 })
  }
}
