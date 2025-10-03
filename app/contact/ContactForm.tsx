"use client";

import { useState } from "react";
// send via API route instead of EmailJS

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const fd = new FormData(form);
    console.log("DEBUG: form data", Object.fromEntries(fd.entries()));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });

      const data = await res.json();
      console.log("DEBUG: /api/contact response", data);

      if (data.success) {
        setStatus("✅ Message sent! You’ll get a confirmation email soon.");
        form.reset();
      } else {
        setStatus("❌ Error sending message: " + data.error);
      }
    } catch (err: any) {
      setStatus("❌ Network error: " + err.message);
    }
  };

  return (
    <form onSubmit={sendEmail} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
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
