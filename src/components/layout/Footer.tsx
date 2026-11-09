import { siteConfig } from "@/data/site";

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
            className="hover-target"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.name}
          </a>
        ))}
      </div>

      <div className="copyr">{siteConfig.copyright}</div>
    </>
  );
}
