"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/lib/lang";
import type { Content } from "./types";
import { dictOf } from "./utils";

const Ctx = createContext<Content | null>(null);

export function ContentProvider({
  content,
  children,
}: {
  content: Content;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={content}>{children}</Ctx.Provider>;
}

export function useContent(): Content {
  const c = useContext(Ctx);
  if (!c) throw new Error("ContentProvider is missing");
  return c;
}

export function useT(lang: Lang) {
  return dictOf(useContent(), lang);
}
