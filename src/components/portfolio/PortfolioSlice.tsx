import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioSlice() {
  return (
    <div className="px-5 xl:px-2">
      {portfolioItems.map((item, i) => {
        const offsetClass =
          i % 4 === 1
            ? "md:ml-[25%]"
            : i % 4 === 3
              ? "md:ml-[50%]"
              : "";

        return (
          <ScrollReveal key={item.slug} delay={0.1 * (i % 3)}>
            <div
              className={`${offsetClass} md:w-1/2 mb-8 overflow-hidden relative`}
            >
              <Link
                href={`/portfolio/${item.slug}`}
                className="hover-target hover-portfolio-box block relative"
              >
                <div
                  className="scroll-img relative"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <p>{item.category}</p>
                <h4>{item.title}</h4>
              </Link>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
