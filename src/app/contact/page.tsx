import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import SectionIntro from "@/components/ui/SectionIntro";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FooterSection from "@/components/ui/FooterSection";
import ContactForm from "@/components/ui/ContactForm";

export const metadata = {
  title: "Contact - Nothing Agency",
};

export default function ContactPage() {
  return (
    <>
      <ParallaxTopShadow>Hola</ParallaxTopShadow>

      {/* Page Title */}
      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <SectionIntro title="Say Hello" subtitle="get in touch" />
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="relative w-full block pb-[140px] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <ContactForm />
                </ScrollReveal>
              </div>

              {/* Sidebar Info */}
              <div>
                <ScrollReveal delay={0.2}>
                  <div className="bg-dark-3 rounded-[0.35rem] p-10">
                    <h6 className="mb-3">Call Us</h6>
                    <p className="mb-6">+1 234 567 890</p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <h6 className="mb-3">Visit Us</h6>
                    <p className="mb-6">
                      123 Creative Street
                      <br />
                      Design District
                      <br />
                      New York, NY 10001
                    </p>

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    <h6 className="mb-3">Email Us</h6>
                    <p>
                      <a
                        href="mailto:hello@nothingagency.com"
                        className="hover-target text-body-text hover:text-white transition-colors"
                      >
                        hello@nothingagency.com
                      </a>
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full block overflow-hidden z-10">
        <ScrollReveal>
          <div className="contact-map h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <h5 className="text-white mb-4">
                  123 Creative Street, New York
                </h5>
                <a
                  href="#"
                  className="hover-target text-white/60 hover:text-white text-sm tracking-wider uppercase transition-colors"
                >
                  Find us on map
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FooterSection
        shadowText="Hello"
        links={[{ label: "hello@nothingagency.com", href: "mailto:hello@nothingagency.com" }]}
      />
    </>
  );
}
