import { Resend } from "resend";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

function env(name: string) {
  let value = process.env[name]?.trim() || "";
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }
  return value;
}

export function isResendConfigured() {
  return Boolean(env("RESEND_API_KEY"));
}

export function contactRecipients() {
  const configured = env("EMAIL_TO")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return configured.length ? configured : ["mukhtarneurolab@gmail.com"];
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) {
    return { ok: false, error: "Email delivery is not configured yet." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: env("EMAIL_FROM") || "Mukhtar Lab <onboarding@resend.dev>",
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    replyTo: input.replyTo,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
