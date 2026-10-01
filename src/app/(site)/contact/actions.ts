"use server";

import { contactRecipients, sendEmail } from "@/lib/email";

export type ContactPayload = {
  name: string;
  email: string;
  affiliation: string;
  subject: string;
  message: string;
};

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContact(
  input: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const name = input.name.trim();
  const email = input.email.trim();
  const affiliation = input.affiliation.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!name || !validEmail(email) || !subject || message.length < 20 || message.length > 1200) {
    return { ok: false, error: "Please fix the highlighted fields, then try again." };
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    affiliation ? `Affiliation: ${affiliation}` : "",
    `Subject: ${subject}`,
    "",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const html = `
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    ${affiliation ? `<p><strong>Affiliation:</strong> ${esc(affiliation)}</p>` : ""}
    <p><strong>Subject:</strong> ${esc(subject)}</p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
  `;

  return sendEmail({
    to: contactRecipients(),
    replyTo: email,
    subject: `Website contact: ${subject}`,
    html,
    text,
  });
}
