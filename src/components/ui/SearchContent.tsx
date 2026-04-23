"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { blogPosts } from "@/data/blog";
import { portfolioItems } from "@/data/portfolio";

function SearchInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = query.trim()
    ? [
        ...blogPosts
          .filter(
            (p) =>
              p.title.toLowerCase().includes(query.toLowerCase()) ||
              p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
              p.tags.some((t) =>
                t.toLowerCase().includes(query.toLowerCase())
              )
          )
          .map((p) => ({
            title: p.title,
            excerpt: p.excerpt,
            href: `/blog/${p.slug}`,
            type: "Blog Post" as const,
          })),
        ...portfolioItems
          .filter(
            (p) =>
              p.title.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase())
          )
          .map((p) => ({
            title: p.title,
            excerpt: p.description,
            href: `/portfolio/${p.slug}`,
            type: "Portfolio" as const,
          })),
      ]
    : [];

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full max-w-[570px] px-5 py-4 bg-dark-3 text-white border-none outline-none text-[15px] tracking-wider font-normal"
        />
      </div>

      {query.trim() && (
        <div>
          {results.length > 0 ? (
            <ul className="list-none p-0 m-0">
              {results.map((result) => (
                <li key={result.href} className="mb-8">
                  <span className="text-xs uppercase tracking-wider text-white/40 mb-1 block">
                    {result.type}
                  </span>
                  <Link
                    href={result.href}
                    className="hover-target inline-block"
                  >
                    <h4 className="mb-2">{result.title}</h4>
                  </Link>
                  <p>{result.excerpt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Sorry, but nothing matched your search terms. Please try again
              with some different keywords.
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default function SearchContent() {
  return (
    <Suspense fallback={<div className="text-white/40">Loading...</div>}>
      <SearchInner />
    </Suspense>
  );
}
