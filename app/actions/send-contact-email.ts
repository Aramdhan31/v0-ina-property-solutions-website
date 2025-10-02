"use server"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const emailjs = await import("@emailjs/nodejs")

    const commonParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    }

    // 1) Send main template (to site owner or shared inbox)
    const mainRes = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID_ADMIN!,
      {
        ...commonParams,
        to_email: "info@inaproperty.co.uk",
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY, // optional, if using secret key
      },
    )

    // 2) Optional: confirmation email back to the user
    if (process.env.EMAILJS_CONFIRM_TEMPLATE_ID) {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_CONFIRM_TEMPLATE_ID!,
        {
          ...commonParams,
          to_email: formData.email,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY!,
          privateKey: process.env.EMAILJS_PRIVATE_KEY,
        },
      )
    }

    // EmailJS Node SDK resolves with `{status: 200, text: 'OK'}` on success
    if (mainRes.status === 200) {
      return { success: true }
    }

    return { success: false, error: mainRes.text ?? "Failed to send email" }
  } catch (error: any) {
    console.error("EmailJS error:", error)
    return { success: false, error: (error && error.text) || "Failed to send email" }
  }
}
