import { notFound } from "next/navigation";
import Image from "next/image";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import FooterSection from "@/components/ui/FooterSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { portfolioItems } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const item = portfolioItems.find((p) => p.slug === slug);
    return { title: item ? `${item.title} - Nothing Agency` : "Not Found" };
  });
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) notFound();

  const currentIndex = portfolioItems.indexOf(item);
  const prevItem = portfolioItems[currentIndex - 1];
  const nextItem = portfolioItems[currentIndex + 1];

  return (
    <>
      <ParallaxTopShadow>{item.title}</ParallaxTopShadow>

      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <ScrollReveal>
            <div className="w-full">
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                className="w-full h-auto block"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative w-full block pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <ScrollReveal delay={0.2}>
            <div className="px-5 xl:px-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider">
                    Concept
                  </h3>
                  <p className="text-[1.15rem] font-light leading-relaxed mb-6">
                    {item.concept || item.description}
                  </p>
                </div>
                <div className="space-y-8">
                  {item.client && (
                    <div>
                      <h4 className="text-xs uppercase tracking-[2px] text-[var(--color-accent)] mb-2">
                        Client
                      </h4>
                      <p className="text-white text-lg">{item.client}</p>
                    </div>
                  )}
                  {item.agency && (
                    <div>
                      <h4 className="text-xs uppercase tracking-[2px] text-[var(--color-accent)] mb-2">
                        Agency
                      </h4>
                      <p className="text-white text-lg">{item.agency}</p>
                    </div>
                  )}
                  {item.creativeDirection && (
                    <div>
                      <h4 className="text-xs uppercase tracking-[2px] text-[var(--color-accent)] mb-2">
                        Creative Direction
                      </h4>
                      <p className="text-white text-lg">
                        {item.creativeDirection}
                      </p>
                    </div>
                  )}
                  {item.artDirection && (
                    <div>
                      <h4 className="text-xs uppercase tracking-[2px] text-[var(--color-accent)] mb-2">
                        Art Direction
                      </h4>
                      <p className="text-white text-lg">{item.artDirection}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs uppercase tracking-[2px] text-[var(--color-accent)] mb-2">
                      Category
                    </h4>
                    <p className="text-white text-lg">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      {item.images && item.images.length > 1 ? (
        item.images.slice(1).map((img, idx) => (
          <section
            key={idx}
            className="relative w-full block pb-[100px] overflow-hidden z-10"
          >
            <div className="max-w-[1140px] mx-auto px-4 z-[50]">
              <ScrollReveal delay={0.1 * (idx + 1)}>
                <div className="w-full">
                  <Image
                    src={img}
                    alt={`${item.title} ${idx + 2}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto block"
                  />
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))
      ) : (
        <section className="relative w-full block pb-[100px] overflow-hidden z-10">
          <div className="max-w-[1140px] mx-auto px-4 z-[50]">
            <ScrollReveal delay={0.3}>
              <div className="w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto block"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <FooterSection
        shadowText={item.title}
        links={[
          ...(prevItem
            ? [{ label: "Prev Project", href: `/portfolio/${prevItem.slug}` }]
            : []),
          ...(nextItem
            ? [{ label: "Next Project", href: `/portfolio/${nextItem.slug}` }]
            : []),
        ]}
      />
    </>
  );
}
