'use server'

export async function sendMessage(_prev: any, formData: FormData) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 700))

  const name = String(formData.get("name") || "there")
  const email = String(formData.get("email") || "")
  const company = String(formData.get("company") || "")
  const message = String(formData.get("message") || "")

  // Here you could forward to an email/CRM provider.

  return {
    ok: true,
    message: `Thanks ${name}! We received your message${company ? ` from ${company}` : ""}. We'll reply to ${email || "your email"} soon.`,
    echo: { name, email, company, message },
  }
}
