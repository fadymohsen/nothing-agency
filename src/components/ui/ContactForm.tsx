"use client";

import { useState, FormEvent } from "react";
import { t } from "@/data/dictionary";
import { useLang } from "@/lib/useLang";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const f = t(useLang()).form;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-dark-3 rounded-[0.35rem] p-10 text-center">
        <h4 className="text-white mb-4">{f.thanksTitle}</h4>
        <p>{f.thanksText}</p>
      </div>
    );
  }

  return (
    <form className="ajax-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder={f.name} required />
        <input type="email" placeholder={f.email} required />
      </div>
      <div className="mb-4">
        <input type="text" placeholder={f.subject} />
      </div>
      <div className="mb-4">
        <textarea placeholder={f.message} required />
      </div>
      <button type="submit" className="hover-target">
        <span>{f.send}</span>
      </button>
    </form>
  );
}
