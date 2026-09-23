/**
 * Email helpers, ready for future Resend / SMTP use.
 * Not used by the contact form yet (mailto draft only).
 */

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(_input: SendEmailInput): Promise<{ ok: true } | { ok: false; error: string }> {
  // Future: wire Resend (or SMTP) here when ready.
  // if (process.env.RESEND_API_KEY) { const resend = new Resend(...); ... }
  return {
    ok: false,
    error: "Email delivery is not enabled yet. Contact form uses mailto for now.",
  };
}
