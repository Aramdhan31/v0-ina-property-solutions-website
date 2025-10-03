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

    // 1. Admin notification
    await resend.emails.send({
      from: "Ina Property Solutions <info@inaproperty.co.uk>",
      to: "info@inaproperty.co.uk",
      reply_to: email,
      subject: "New Contact Form Submission",
      html: `