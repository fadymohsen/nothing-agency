import Link from "next/link";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";

export default function NotFound() {
  return (
    <>
      <ParallaxTopShadow>404</ParallaxTopShadow>

      <section className="error-404 relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10 text-center">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <h1>404</h1>
            <h2>Oops! That page can&rsquo;t be found.</h2>
            <div className="mt-4">
              <p>
                Page you are looking for could not be found.
                <br />
                Search or back to{" "}
                <Link href="/" className="hover-target font-bold text-white">
                  home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
