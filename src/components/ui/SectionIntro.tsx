import { ParallaxFadeTop } from "@/components/animations/ParallaxText";

interface SectionIntroProps {
  title: string;
  subtitle?: string;
}

export default function SectionIntro({ title, subtitle }: SectionIntroProps) {
  return (
    <div className="page-title px-5 xl:px-2">
      <div className="w-full">
        <ParallaxFadeTop>
          <h1>{title}</h1>
        </ParallaxFadeTop>
      </div>
      {subtitle && (
        <div className="w-11/12 ml-auto mt-2 sm:mt-3">
          <ParallaxFadeTop>
            <p>{subtitle}</p>
          </ParallaxFadeTop>
        </div>
      )}
    </div>
  );
}
