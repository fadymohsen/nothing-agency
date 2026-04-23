import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ParallaxTopShadow } from "@/components/animations/ParallaxText";
import FooterSection from "@/components/ui/FooterSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { blogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const post = blogPosts.find((p) => p.slug === slug);
    return { title: post ? `${post.title} - Nothing Agency` : "Not Found" };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const currentIndex = blogPosts.indexOf(post);
  const prevPost = blogPosts[currentIndex - 1];
  const nextPost = blogPosts[currentIndex + 1];

  return (
    <>
      <ParallaxTopShadow>Stories</ParallaxTopShadow>

      <section className="relative w-full block pt-[250px] pb-[100px] overflow-hidden z-10">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="page-title px-5 xl:px-2">
            <div className="w-full">
              <h1>{post.title}</h1>
            </div>
            <div className="w-11/12 ml-auto mt-2 sm:mt-3">
              <p>
                by {post.author},{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full block pb-[140px] z-10 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 z-[50]">
          <div className="px-5 xl:px-2">
            <ScrollReveal>
              <div className="rounded-[0.35rem] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.06)]">
                <div className="post-box bg-dark overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto block"
                  />
                  <div className="px-10 pt-8">
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="separator-wrap py-4">
                      <span className="separator">
                        <span className="separator-line dashed" />
                      </span>
                    </div>

                    {post.tags.length > 0 && (
                      <>
                        <div className="tag-list">
                          {post.tags.map((tag) => (
                            <Link key={tag} href={`/search?q=${tag}`}>
                              {tag}
                            </Link>
                          ))}
                        </div>
                        <div className="separator-wrap py-4">
                          <span className="separator">
                            <span className="separator-line dashed" />
                          </span>
                        </div>
                      </>
                    )}

                    <div className="author-wrap pb-4">
                      <p>
                        by{" "}
                        <strong className="text-white">{post.author}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FooterSection
        shadowText="Story"
        links={[
          ...(prevPost
            ? [{ label: "Older Post", href: `/blog/${prevPost.slug}` }]
            : []),
          ...(nextPost
            ? [{ label: "New Post", href: `/blog/${nextPost.slug}` }]
            : []),
        ]}
      />
    </>
  );
}
