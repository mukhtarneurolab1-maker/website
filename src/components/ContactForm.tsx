"use client";

import { FormEvent, useMemo, useState } from "react";
import { site } from "@/lib/site";

type FieldState = "is-valid" | "is-invalid" | null;

const SUBJECTS = [
  { label: "Collaboration", value: "Research collaboration" },
  { label: "Mentorship", value: "Student / mentorship inquiry" },
  { label: "Speaking", value: "Seminar or speaking invitation" },
  { label: "Outreach", value: "Media or outreach" },
] as const;

const MAX_LEN = 1200;

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = useState("#");

  const states = useMemo(() => {
    const nameState: FieldState = !touched.name && !name
      ? null
      : name.trim()
        ? "is-valid"
        : "is-invalid";
    const emailState: FieldState = !touched.email && !email
      ? null
      : !email.trim()
        ? "is-invalid"
        : validEmail(email.trim())
          ? "is-valid"
          : "is-invalid";
    const affiliationState: FieldState = affiliation.trim() ? "is-valid" : null;
    const subjectState: FieldState = !touched.subject && !subject
      ? null
      : subject.trim()
        ? "is-valid"
        : "is-invalid";
    const messageState: FieldState = !touched.message && !message
      ? null
      : message.trim().length >= 20
        ? "is-valid"
        : "is-invalid";
    return { nameState, emailState, affiliationState, subjectState, messageState };
  }, [name, email, affiliation, subject, message, touched]);

  const buildMailto = () => {
    const body =
      `Hello Dr. Mukhtar,\n\n${message.trim()}\n\n-\n${name.trim()}` +
      (affiliation.trim() ? `\n${affiliation.trim()}` : "") +
      `\n${email.trim()}`;
    return `mailto:${site.emailPrimary}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    setFormError(null);

    const ok =
      Boolean(name.trim()) &&
      validEmail(email.trim()) &&
      Boolean(subject.trim()) &&
      message.trim().length >= 20;

    if (!ok) {
      setFormError("Please fix the highlighted fields, then try again.");
      return;
    }

    const href = buildMailto();
    setMailtoHref(href);
    setLoading(true);
    window.setTimeout(() => {
      window.location.href = href;
      setSubmitted(true);
      setLoading(false);
    }, 450);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setAffiliation("");
    setSubject("");
    setMessage("");
    setTouched({});
    setFormError(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10 18.5l5 5 11-12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>Almost there</h3>
        <p>Your email draft is ready. If it didn’t open automatically, use the button below.</p>
        <div className="form-success-actions">
          <a className="btn btn-accent" href={mailtoHref}>
            Open email draft
          </a>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div
        className={`form-group${focused === "name" ? " is-focused" : ""}${states.nameState ? ` ${states.nameState}` : ""}`}
        data-field="name"
      >
        <label htmlFor="name">Full name</label>
        <div className="form-field">
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => {
              setFocused(null);
              setTouched((t) => ({ ...t, name: true }));
            }}
            aria-invalid={states.nameState === "is-invalid"}
            aria-describedby="name-error"
          />
          <span className="form-check" aria-hidden="true" />
        </div>
        {states.nameState === "is-invalid" && (
          <p className="form-error" id="name-error" role="alert">
            Please enter your name.
          </p>
        )}
      </div>

      <div
        className={`form-group${focused === "email" ? " is-focused" : ""}${states.emailState ? ` ${states.emailState}` : ""}`}
        data-field="email"
      >
        <label htmlFor="email">Email address</label>
        <div className="form-field">
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@institution.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => {
              setFocused(null);
              setTouched((t) => ({ ...t, email: true }));
            }}
            aria-invalid={states.emailState === "is-invalid"}
            aria-describedby="email-error"
          />
          <span className="form-check" aria-hidden="true" />
        </div>
        {states.emailState === "is-invalid" && (
          <p className="form-error" id="email-error" role="alert">
            {!email.trim() ? "Email is required." : "Enter a valid email address."}
          </p>
        )}
      </div>

      <div
        className={`form-group${focused === "affiliation" ? " is-focused" : ""}${states.affiliationState ? ` ${states.affiliationState}` : ""}`}
        data-field="affiliation"
      >
        <label htmlFor="affiliation">
          Affiliation / Institution <span className="form-optional">optional</span>
        </label>
        <div className="form-field">
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            autoComplete="organization"
            placeholder="University, lab, or organization"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            onFocus={() => setFocused("affiliation")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      <div
        className={`form-group${focused === "subject" ? " is-focused" : ""}${states.subjectState ? ` ${states.subjectState}` : ""}`}
        data-field="subject"
      >
        <label htmlFor="subject">Subject</label>
        <div className="subject-chips" role="group" aria-label="Quick subject options">
          {SUBJECTS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`subject-chip${subject === chip.value ? " is-active" : ""}`}
              onClick={() => {
                setSubject(chip.value);
                setTouched((t) => ({ ...t, subject: true }));
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="form-field">
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="What is this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onFocus={() => setFocused("subject")}
            onBlur={() => {
              setFocused(null);
              setTouched((t) => ({ ...t, subject: true }));
            }}
            aria-invalid={states.subjectState === "is-invalid"}
            aria-describedby="subject-error"
          />
          <span className="form-check" aria-hidden="true" />
        </div>
        {states.subjectState === "is-invalid" && (
          <p className="form-error" id="subject-error" role="alert">
            Please add a subject.
          </p>
        )}
      </div>

      <div
        className={`form-group${focused === "message" ? " is-focused" : ""}${states.messageState ? ` ${states.messageState}` : ""}`}
        data-field="message"
      >
        <div className="form-label-row">
          <label htmlFor="message">Message</label>
          <span
            className={`form-count${message.length >= MAX_LEN - 100 && message.length < MAX_LEN ? " is-near" : ""}${message.length >= MAX_LEN ? " is-full" : ""}`}
            aria-live="polite"
          >
            {message.length} / {MAX_LEN}
          </span>
        </div>
        <div className="form-field">
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            maxLength={MAX_LEN}
            placeholder="Share a short note about how we can connect…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused("message")}
            onBlur={() => {
              setFocused(null);
              setTouched((t) => ({ ...t, message: true }));
            }}
            aria-invalid={states.messageState === "is-invalid"}
            aria-describedby="message-error"
          />
        </div>
        {states.messageState === "is-invalid" && (
          <p className="form-error" id="message-error" role="alert">
            Please write a short message (at least 20 characters).
          </p>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className={`btn btn-accent${loading ? " is-loading" : ""}`}
          disabled={loading}
        >
          <span className="btn-label">Send message</span>
          <span className="btn-spinner" aria-hidden="true" />
        </button>
        <p className="form-hint">Opens your email app with the message ready to send.</p>
      </div>

      {formError && (
        <div className="form-status is-error" role="status">
          {formError}
        </div>
      )}
    </form>
  );
}
