"use client";

import ClientsSection from "./ClientsSection";
import ContactCta from "./ContactCta";

export default function HomeSections() {
  return (
    <>
      <ClientsSection />
      <div className="relative z-10 bg-[var(--color-body)]">
        <ContactCta />
      </div>
    </>
  );
}
