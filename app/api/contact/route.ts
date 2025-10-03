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
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Thank you for contacting INA Property Solutions</title>
            </head>
            <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f9f9f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9f9f9; padding:20px 0;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="background:#b7950b; padding:20px; text-align:center;">
                          <img src="https://inaproperty.co.uk/ina-logo-corrected.png" alt="INA Property Solutions" width="120" style="display:block; margin:0 auto;" />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:30px; color:#333;">
                          <h2 style="margin-top:0; color:#333;">Thank you for contacting Ina Property Solutions</h2>
                          <p style="font-size:15px; line-height:1.6;">
                            Hi ${name},<br><br>
                            We’ve received your enquiry and a member of our team will get back to you as soon as possible.
                          </p>
                          <p style="font-size:15px; line-height:1.6;">
                            In the meantime, feel free to reply directly to this email if you have additional details you’d like to share.
                          </p>
                          <p style="margin:20px 0; font-size:15px; line-height:1.6;">Best regards,<br>
                            <strong>INA Property Solutions Team</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="background:#f1f1f1; padding:20px; font-size:12px; text-align:center; color:#777;">
                          <p style="margin:0;">
                            INA Property Solutions · London · +44 20 XXXX XXXX
                          </p>
                          <p style="margin:5px 0 0 0;">You are receiving this email because you contacted us via our website.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>`,
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
