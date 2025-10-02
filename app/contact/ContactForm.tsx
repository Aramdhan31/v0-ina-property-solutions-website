"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // DEBUG: log form values and env
    const fd = new FormData(form);
    console.log("DEBUG: form data", {
      user_name: fd.get("user_name"),
      user_email: fd.get("user_email"),
      message: fd.get("message"),
    });
    console.log("DEBUG: env", {
      SERVICE: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      USER_TEMPLATE: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      ADMIN_TEMPLATE: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN,
      PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    });

    try {
      // 1. Notification to admin
      const adminRes = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      console.log("DEBUG: admin response", adminRes);

      // 2. Auto-reply to the visitor
      const userRes = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      console.log("DEBUG: user response", userRes);

      console.log("EmailJS: both templates sent OK");
      setStatus("✅ Message sent successfully!");
      form.reset();
    } catch (err: any) {
      console.error(
        "EmailJS error:",
        err?.status ?? "no-status",
        err?.text ?? err
      );
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={sendEmail} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        className="w-full border p-2 rounded"
        rows={5}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
      {status && <p className="text-center">{status}</p>}
    </form>
  );
}
