import "server-only";
import { unstable_cache } from "next/cache";
import { neon } from "@neondatabase/serverless";
import { defaultContent } from "./defaults";
import { mergeDefaults, withNewPages } from "./utils";
import type { Content } from "./types";

export const CONTENT_TAG = "site-content";

function sql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

async function readStored(): Promise<unknown | null> {
  await ensureTable();
  const db = sql();
  const rows = await db`SELECT value FROM site_content WHERE key = 'content' LIMIT 1`;
  return rows.length ? rows[0].value : null;
}

const readCached = unstable_cache(async () => (await readStored()) ?? null, ["site-content"], {
  tags: [CONTENT_TAG],
});

/** Cached content for the public site. Falls back to the built-in defaults if the database is unreachable. */
export async function getContent(): Promise<Content> {
  try {
    const stored = await readCached();
    return stored ? withNewPages(defaultContent, mergeDefaults(defaultContent, stored)) : defaultContent;
  } catch (e) {
    console.error("[content] falling back to defaults:", e instanceof Error ? e.message : e);
    return defaultContent;
  }
}

/** Uncached read for the admin editor. */
export async function getContentFresh(): Promise<Content> {
  try {
    const stored = await readStored();
    return stored ? withNewPages(defaultContent, mergeDefaults(defaultContent, stored)) : defaultContent;
  } catch (e) {
    console.error("[content] admin read failed:", e instanceof Error ? e.message : e);
    return defaultContent;
  }
}

async function ensureTable() {
  const db = sql();
  await db`CREATE TABLE IF NOT EXISTS site_content (
    key text PRIMARY KEY,
    value jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
}

export async function writeContent(content: Content) {
  await ensureTable();
  const db = sql();
  const json = JSON.stringify(content);
  await db`INSERT INTO site_content (key, value, updated_at)
    VALUES ('content', ${json}::jsonb, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
}

export async function deleteContent() {
  await ensureTable();
  const db = sql();
  await db`DELETE FROM site_content WHERE key = 'content'`;
}
