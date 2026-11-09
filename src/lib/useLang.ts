"use client";

import { usePathname } from "next/navigation";
import { langFromPath, type Lang } from "./lang";

export function useLang(): Lang {
  return langFromPath(usePathname());
}
