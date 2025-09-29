import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "missing-token" }, { status: 400 })
    }

    const apiKey = process.env.RECAPTCHA_SECRET_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "server-misconfigured" }, { status: 500 })
    }

    const projectId = "regal-center-454409-k6"
    const siteKey = "6LfMB9QrAAAAAIPSn1rGwHJE2ZrsNYgUy6UQUc2L"

    const verifyRes = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: token,
            expectedAction: "CONTACT_FORM",
            siteKey: siteKey,
          },
        }),
      },
    )

    const data = await verifyRes.json()

    if (!data.tokenProperties?.valid) {
      return NextResponse.json(
        {
          success: false,
          error: data.tokenProperties?.invalidReason ?? "verification-failed",
        },
        { status: 200 },
      )
    }

    // Check if the action matches what we expect
    if (data.tokenProperties?.action !== "CONTACT_FORM") {
      return NextResponse.json(
        {
          success: false,
          error: "action-mismatch",
        },
        { status: 200 },
      )
    }

    // Optional: Check risk score (0.0 = very likely legitimate, 1.0 = very likely bot)
    const riskScore = data.riskAnalysis?.score ?? 0.5
    if (riskScore > 0.7) {
      return NextResponse.json(
        {
          success: false,
          error: "high-risk-score",
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ success: true, score: riskScore })
  } catch (e) {
    console.error("[reCAPTCHA Enterprise] server error:", e)
    return NextResponse.json({ success: false, error: "server-error" }, { status: 500 })
  }
}
