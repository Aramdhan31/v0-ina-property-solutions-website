"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      // 1. Auto-reply to the visitor
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // 2. Notification to admin
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

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
