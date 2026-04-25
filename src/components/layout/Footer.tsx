import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <>
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
