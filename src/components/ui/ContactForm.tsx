"use client";

import { useState, FormEvent } from "react";
import { useT } from "@/lib/content/client";
import { useLang } from "@/lib/useLang";

export default function ContactForm() {
  const lang = useLang();
  const f = useT(lang).form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          lang,
          _hp: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || (lang === "ar" ? "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى." : "Failed to send message. Please try again."));
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : (lang === "ar" ? "حدث خطأ غير متوقع." : "An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-dark-3 rounded-[0.35rem] p-8 md:p-10 text-center border border-white/10">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/40 flex items-center justify-center text-[var(--color-accent)] text-xl font-bold">
          ✓
        </div>
        <h4 className="text-white mb-3 text-xl md:text-2xl font-bold">{f.thanksTitle}</h4>
        <p className="text-white/80 max-w-[480px] mx-auto text-sm md:text-base leading-relaxed mb-6">
          {f.thanksText}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="hover-target text-xs uppercase tracking-[2px] font-bold text-[var(--color-accent)] hover:text-white transition-colors"
        >
          {lang === "ar" ? "إرسال رسالة أخرى ←" : "Send another message →"}
        </button>
      </div>
    );
  }

  return (
    <form className="ajax-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot anti-spam field */}
      <input
        type="text"
        name="_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder={f.name}
          required
          disabled={loading}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder={f.email}
          required
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={f.subject}
          disabled={loading}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder={f.message}
          required
          rows={5}
          disabled={loading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/15 border border-red-500/30 text-red-300 text-xs leading-relaxed">
          {error}
        </div>
      )}

      <button type="submit" className="hover-target disabled:opacity-50" disabled={loading}>
        <span>
          {loading
            ? (lang === "ar" ? "جاري الإرسال..." : "SENDING...")
            : f.send}
        </span>
      </button>
    </form>
  );
}
