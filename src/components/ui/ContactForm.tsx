"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-dark-3 rounded-[0.35rem] p-10 text-center">
        <h4 className="text-white mb-4">Thank you!</h4>
        <p>Your message has been sent. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="ajax-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="YOUR NAME"
          required
        />
        <input
          type="email"
          placeholder="YOUR EMAIL"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="SUBJECT"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="YOUR MESSAGE"
          required
        />
      </div>
      <button type="submit" className="hover-target">
        <span>SEND MESSAGE</span>
      </button>
    </form>
  );
}
