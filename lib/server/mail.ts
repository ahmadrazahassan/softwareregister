import "server-only";

export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.DISPATCH_FROM);
}

/**
 * Sends through Resend when RESEND_API_KEY and DISPATCH_FROM are set. When they
 * are not, nothing is sent and the caller falls back to recording consent at
 * the moment of subscription.
 */
export async function sendMail(to: string, subject: string, text: string): Promise<boolean> {
  if (!mailConfigured()) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.DISPATCH_FROM, to, subject, text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
