"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogList() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <ul className="case-study-wrapper list-none p-0 m-0">
        {blogPosts.map((post, i) => (
          <li
            key={post.slug}
            className={`case-study-name mb-8 ${i === activeIndex ? "active" : ""}`}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="hover-target inline-block"
            >
              <h4 className="mb-3">{post.title}</h4>
            </Link>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2">
                <p className="mb-4">{post.excerpt}</p>
                <p className="text-[1.15rem] font-light pl-0 md:pl-12 mb-0">
                  <em>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em>
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover-target relative"
                >
                  <div className="go-to-post" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Background thumbnail images */}
      <ul className="case-study-images">
        {blogPosts.map((post, i) => (
          <li key={post.slug} className={i === activeIndex ? "show" : ""}>
            <div
              className="img-hero-background blog-back-image"
              style={{ backgroundImage: `url('${post.thumbnail}')` }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
