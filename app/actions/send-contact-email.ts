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
    const emailjs = await import("emailjs-com")

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_email: "info@inaproperty.co.uk",
    }

    const result = await emailjs.default.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.EMAILJS_PUBLIC_KEY!,
    )

    if (result.status === 200) {
      return { success: true }
    } else {
      return { success: false, error: "Failed to send email" }
    }
  } catch (error) {
    console.error("EmailJS error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
