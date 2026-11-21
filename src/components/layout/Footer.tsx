import { siteConfig } from "@/data/site";

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <>
      {/* Phones: tuck the fixed side labels to the edges and keep page text clear of them */}
      <style>{`@media (max-width: 767px) {
        .social-fixed { left: 8px !important; }
        .copyr { right: 8px !important; }
        .max-w-\\[1140px\\] { padding-left: 42px !important; padding-right: 42px !important; }
        .max-w-\\[1140px\\] .px-5 { padding-left: 0 !important; padding-right: 0 !important; }
      }`}</style>
      <div className="social-fixed">
        {siteConfig.socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            aria-label={social.name}
            className="hover-target"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialIcons[social.name]}
          </a>
        ))}
      </div>

      <div className="copyr">{siteConfig.copyright}</div>
    </>
  );
}
