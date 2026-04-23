import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface FooterSectionProps {
  shadowText?: string;
  links?: { label: string; href: string }[];
}

export default function FooterSection({ shadowText, links }: FooterSectionProps) {
  return (
    <section className="relative w-full block py-[100px] overflow-hidden z-10 bg-dark-3">
      {shadowText && (
        <ScrollReveal>
          <div className="shadow-on-footer">{shadowText}</div>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.4}>
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full text-center z-10 py-5">
              <div className="footer-lines">
                {links?.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="hover-target"
                  >
                    <h4>{link.label}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
