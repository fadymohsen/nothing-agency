"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import {
  SESSION_COOKIE,
  SESSION_SECONDS,
  createSessionToken,
  passwordMatches,
} from "@/lib/auth";
import { isAdmin } from "@/lib/session";
import { CONTENT_TAG, deleteContent, writeContent } from "@/lib/content/server";
import type { Content } from "@/lib/content/types";

export async function login(
  _prev: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const password = String(formData.get("password") ?? "");
  // slow down guessing
  await new Promise((r) => setTimeout(r, 700));
  if (!process.env.ADMIN_PASSWORD) return { error: "ADMIN_PASSWORD is not configured on the server." };
  if (!(await passwordMatches(password))) return { error: "Wrong password." };

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function refreshSite() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

export async function saveContent(content: Content): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdmin())) return { ok: false, error: "Not signed in." };
  const required = ["site", "contact", "seo", "dict", "portfolio", "pagesAr", "scenes", "projects", "clients"];
  if (!content || typeof content !== "object" || required.some((k) => !(k in content))) {
    return { ok: false, error: "Invalid content." };
  }
  try {
    await writeContent(content);
    refreshSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed." };
  }
}

export async function resetContent(): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdmin())) return { ok: false, error: "Not signed in." };
  try {
    await deleteContent();
    refreshSite();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Reset failed." };
  }
}
