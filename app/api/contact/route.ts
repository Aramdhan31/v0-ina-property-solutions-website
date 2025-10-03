import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "missing-fields" }, { status: 400 });
    }

    // 1. Auto-reply to visitor
    await resend.emails.send({
      from: "Ina Property Solutions <noreply@inaproperty.co.uk>",
      to: email,
      subject: "Thank you for contacting Ina Property Solutions",
      html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to us! We have received your request and will respond to you as soon as possible.</p>
              <br>
              <p>Best regards,<br><strong>INA Property Solutions</strong></p>
              <br>
              <img src="https://inaproperty.co.uk/ina-logo-corrected.png" alt="INA Property Solutions" style="height:80px;">
            </div>`,
    });

    // 2. Notification to admin
    await resend.emails.send({
      from: "Ina Property Solutions <noreply@inaproperty.co.uk>",
      to: "info@inaproperty.co.uk",
      reply_to: email,
      subject: "New Contact Form Submission",
      html: `<h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong><br>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[contact] send failed", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
