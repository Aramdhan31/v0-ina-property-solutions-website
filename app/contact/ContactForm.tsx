"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          e.currentTarget.reset();
        },
        (err) => {
          console.error(
            "EmailJS error:",
            err?.status ?? "no-status",
            err?.text ?? err
          );
          setStatus(
            `❌ Failed to send message. (${err?.text || "Unknown error"})`
          );
        }
      );
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
