"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { logout, resetContent, saveContent } from "./actions";
import type { Content } from "@/lib/content/types";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type Path = (string | number)[];
type Meta = { w: number; h: number };

const TABS: { id: string; label: string; hint: string; path: Path }[] = [
  { id: "site", label: "Site & social links", hint: "Name, logos, footer, social media links and icons.", path: ["site"] },
  { id: "contact", label: "Contact page details", hint: "Phone, WhatsApp, Google Maps link, address, email and the icons next to them.", path: ["contact"] },
  { id: "mainPhotos", label: "Main photo of each page", hint: "The big photo at the top of every page, plus the home-slider photos.", path: ["portfolio"] },
  { id: "portfolio", label: "Pages (English)", hint: "Home slider photos and every page's English content, hero photo and text.", path: ["portfolio"] },
  { id: "pagesAr", label: "Pages (Arabic)", hint: "The Arabic version of every page.", path: ["pagesAr"] },
  { id: "scenes", label: "Page photos & scenes", hint: "Photos and badge icons used inside each page's scroll scenes.", path: ["scenes"] },
  { id: "projects", label: "Projects", hint: "Project cards: toggle visibility, title, category and images.", path: ["projects"] },
  { id: "clients", label: "Clients", hint: "Client logos shown on the home page.", path: ["clients"] },
  { id: "dictEn", label: "Menu & labels (English)", hint: "Navigation, buttons, form labels, headings of Contact / Projects / 404 pages.", path: ["dict", "en"] },
  { id: "dictAr", label: "Menu & labels (Arabic)", hint: "Same as above, in Arabic.", path: ["dict", "ar"] },
  { id: "seo", label: "SEO / search results", hint: "Page titles and descriptions for Google and social sharing.", path: ["seo"] },
];

const SOCIAL_NAMES = ["facebook", "instagram", "linkedin", "twitter", "youtube", "tiktok", "whatsapp", "telegram", "custom"];
const IMG_KEYS = /^(image|images|src|icon|file|logo|thumbnail|mobileImage|heroImage|ogImage|headerLogo|splashLogo|notFoundImage)$/;
const IMG_VALUE = /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i;

const isObj = (v: unknown): v is { [k: string]: Json } =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function setIn(root: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [k, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = root.slice();
    copy[k as number] = setIn(copy[k as number], rest, value);
    return copy;
  }
  const obj = { ...(root as { [k: string]: Json }) };
  obj[k as string] = setIn(obj[k as string], rest, value);
  return obj;
}

function getIn(root: Json, path: Path): Json {
  return path.reduce<Json>((acc, k) => (acc as never)?.[k as never] ?? null, root);
}

function blank(v: Json): Json {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return "";
}

const LABELS: Record<string, string> = {
  heroImage: "Page main photo (hero, top of the page)",
  image: "Home slider photo (desktop)",
  mobileImage: "Home slider photo (phones)",
  heroFocusMobile: "Main photo focus on phones (CSS position, e.g. 50% 30%)",
};

const humanize = (k: string | number) =>
  typeof k === "number"
    ? `Item ${k + 1}`
    : LABELS[k] ?? k
        .replace(/[-_]/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (c) => c.toUpperCase());

function itemTitle(v: Json, i: number): string {
  if (isObj(v)) {
    for (const k of ["title", "name", "label", "heading", "slug"]) {
      const x = v[k];
      if (typeof x === "string" && x) return x;
      if (isObj(x) && typeof x.en === "string" && x.en) return x.en;
    }
    for (const k of ["src", "file"]) {
      const x = v[k];
      if (typeof x === "string" && x) return x.split("/").pop() ?? x;
    }
  }
  if (typeof v === "string" && v) return v.split("/").pop() ?? v;
  return `Item ${i + 1}`;
}

function measure(file: File): Promise<Meta | undefined> {
  return createImageBitmap(file)
    .then((b) => ({ w: b.width, h: b.height }))
    .catch(() => undefined);
}

/* ───────────────────────── image field ───────────────────────── */

function ImageInput({ value, onChange }: { value: string; onChange: (v: string, meta?: Meta) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(file: File) {
    setBusy(true);
    setErr("");
    try {
      const meta = await measure(file);
      const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
      const blob = await upload(`uploads/${safe}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob",
      });
      onChange(blob.url, meta);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-start gap-3">
      <div className="h-20 w-20 shrink-0 rounded bg-[repeating-conic-gradient(#222_0_25%,#2c2c2c_0_50%)] bg-[length:14px_14px] border border-white/10 flex items-center justify-center overflow-hidden">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="text-white/30 text-xs">none</span>
        )}
      </div>
      <div className="flex-1 space-y-2 min-w-0">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Image URL or /path" dir="ltr" />
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center rounded bg-[#f0b31c] text-[#14171a] font-semibold px-3 py-1.5 text-xs">
            {busy ? "Uploading…" : "Upload new photo"}
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
                e.target.value = "";
              }}
            />
          </label>
          {value && (
            <button type="button" className="text-xs text-white/50 hover:text-red-400" onClick={() => onChange("")}>
              Clear
            </button>
          )}
          {err && <span className="text-xs text-red-400">{err}</span>}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── generic node ───────────────────────── */

interface Ctx {
  categories: string[];
}

function optionsFor(pathKey: string, ctx: Ctx): string[] | null {
  if (pathKey === "site.socials.*.name") return SOCIAL_NAMES;
  if (pathKey === "projects.*.category") return ctx.categories;
  return null;
}

const ADDABLE_OBJECTS = new Set(["dict.en.projects.categories", "dict.ar.projects.categories"]);

function IconBtn({ children, onClick, danger, disabled }: { children: React.ReactNode; onClick: () => void; danger?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-2 py-1 rounded text-xs border border-white/15 hover:border-white/40 disabled:opacity-30 ${danger ? "hover:text-red-400" : ""}`}
    >
      {children}
    </button>
  );
}

function Node({
  label,
  keyName,
  value,
  path,
  onChange,
  ctx,
}: {
  label: string;
  keyName: string;
  value: Json;
  path: Path;
  onChange: (v: Json, meta?: Meta) => void;
  ctx: Ctx;
}) {
  const pathKey = path.map((p) => (typeof p === "number" ? "*" : p)).join(".");
  const lab = <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">{label}</span>;

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <span>{label}</span>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div>
        {lab}
        <input type="number" step="any" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  }

  if (value === null || typeof value === "string") {
    const str = value ?? "";
    const opts = optionsFor(pathKey, ctx);
    if (opts) {
      const list = opts.includes(str) || !str ? opts : [...opts, str];
      return (
        <div>
          {lab}
          <select value={str} onChange={(e) => onChange(e.target.value)}>
            <option value="">—</option>
            {list.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      );
    }
    const isImg =
      IMG_KEYS.test(keyName) || /(^|\.)icons\.[a-zA-Z]+$/.test(pathKey) || (str !== "" && IMG_VALUE.test(str));
    if (isImg) {
      return (
        <div>
          {lab}
          <ImageInput value={str} onChange={(v, meta) => onChange(v, meta)} />
        </div>
      );
    }
    const long = str.length > 70 || str.includes("\n");
    return (
      <div>
        {lab}
        {long ? (
          <textarea
            dir="auto"
            value={str}
            rows={Math.min(14, Math.max(3, Math.ceil(str.length / 90) + str.split("\n").length - 1))}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input dir="auto" value={str} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    );
  }

  if (Array.isArray(value)) {
    const primitive = value.every((v) => typeof v !== "object" || v === null);
    const update = (next: Json[]) => onChange(next);
    const move = (i: number, d: number) => {
      const j = i + d;
      if (j < 0 || j >= value.length) return;
      const next = value.slice();
      [next[i], next[j]] = [next[j], next[i]];
      update(next);
    };
    const template = value.length ? blank(value[value.length - 1]) : "";
    return (
      <div className="rounded-lg border border-white/10 p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-white/50">
            {label} <span className="text-white/30">({value.length})</span>
          </span>
          <IconBtn onClick={() => update([...value, template])}>+ Add</IconBtn>
        </div>
        {value.map((item, i) => {
          const actions = (
            <div className="flex gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
              <IconBtn onClick={() => move(i, -1)} disabled={i === 0}>↑</IconBtn>
              <IconBtn onClick={() => move(i, 1)} disabled={i === value.length - 1}>↓</IconBtn>
              <IconBtn onClick={() => update([...value.slice(0, i + 1), JSON.parse(JSON.stringify(item)), ...value.slice(i + 1)])}>Duplicate</IconBtn>
              <IconBtn danger onClick={() => confirm("Remove this item?") && update(value.filter((_, x) => x !== i))}>Remove</IconBtn>
            </div>
          );
          if (primitive) {
            return (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <Node label={`${humanize(keyName)} ${i + 1}`} keyName={keyName} value={item} path={[...path, i]} ctx={ctx} onChange={(v) => update(value.map((x, xi) => (xi === i ? v : x)))} />
                </div>
                {actions}
              </div>
            );
          }
          return (
            <details key={i} className="rounded border border-white/10 bg-white/[0.02]">
              <summary className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="truncate font-medium text-white">
                  <span className="text-white/40 mr-2">{i + 1}.</span>
                  {itemTitle(item, i)}
                </span>
                {actions}
              </summary>
              <div className="p-3 border-t border-white/10">
                <Node label="" keyName={keyName} value={item} path={[...path, i]} ctx={ctx} onChange={(v) => update(value.map((x, xi) => (xi === i ? v : x)))} />
              </div>
            </details>
          );
        })}
      </div>
    );
  }

  // object
  const obj = value as { [k: string]: Json };
  const body = (
    <div className="space-y-4">
      {Object.entries(obj).map(([k, v]) => {
        const child = (nv: Json, meta?: Meta) => {
          const next: { [k: string]: Json } = { ...obj, [k]: nv };
          if (meta && (k === "src" || k === "file") && "ratio" in obj) {
            next.ratio = typeof obj.ratio === "number" ? Number((meta.w / meta.h).toFixed(4)) : `${meta.w} / ${meta.h}`;
          }
          onChange(next);
        };
        const nested = typeof v === "object" && v !== null && !Array.isArray(v);
        const removable = ADDABLE_OBJECTS.has(pathKey);
        const node = (
          <Node label={humanize(k)} keyName={k} value={v} path={[...path, k]} ctx={ctx} onChange={child} />
        );
        return nested ? (
          <details key={k} className="rounded border border-white/10 bg-white/[0.02]">
            <summary className="px-3 py-2 font-medium text-white">{humanize(k)}</summary>
            <div className="p-3 border-t border-white/10">
              <Node label="" keyName={k} value={v} path={[...path, k]} ctx={ctx} onChange={child} />
            </div>
          </details>
        ) : removable ? (
          <div key={k} className="flex items-end gap-2">
            <div className="flex-1">{node}</div>
            <IconBtn danger onClick={() => {
              const next = { ...obj };
              delete next[k];
              onChange(next);
            }}>Remove</IconBtn>
          </div>
        ) : (
          <div key={k}>{node}</div>
        );
      })}
      {ADDABLE_OBJECTS.has(pathKey) && (
        <IconBtn
          onClick={() => {
            const key = prompt("New key (lowercase letters, no spaces) e.g. printing")?.trim();
            if (key && /^[a-z][a-z0-9_-]*$/i.test(key) && !(key in obj)) onChange({ ...obj, [key]: "" });
          }}
        >
          + Add category
        </IconBtn>
      )}
    </div>
  );
  return body;
}

function MainPhotos({ items, onChange }: { items: Json[]; onChange: (v: Json) => void }) {
  const rows = items
    .map((it, i) => ({ it: it as { [k: string]: Json }, i }))
    .filter(({ it }) => it.page && !it.hidden);
  const set = (i: number, key: string, v: string) =>
    onChange(items.map((x, xi) => (xi === i ? { ...(x as { [k: string]: Json }), [key]: v } : x)));
  const fields: [string, string][] = [
    ["heroImage", "Page main photo (top of the page)"],
    ["image", "Home slider photo (desktop)"],
    ["mobileImage", "Home slider photo (phones)"],
  ];
  return (
    <div className="space-y-5">
      {rows.map(({ it, i }) => (
        <div key={i} className="rounded-lg border border-white/10 p-4 space-y-4">
          <div className="text-white font-semibold">{String(it.title)}</div>
          {fields.map(([key, label]) => (
            <div key={key}>
              <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">{label}</span>
              <ImageInput value={String(it[key] ?? "")} onChange={(v) => set(i, key, v)} />
            </div>
          ))}
          <div>
            <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">Main photo focus on phones (e.g. 50% 30%)</span>
            <input value={String(it.heroFocusMobile ?? "")} onChange={(e) => set(i, "heroFocusMobile", e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsManager({
  projects,
  hideProjectsPage,
  categories,
  onToggleHidePage,
  onChangeProjects,
}: {
  projects: Json[];
  hideProjectsPage: boolean;
  categories: string[];
  onToggleHidePage: (hide: boolean) => void;
  onChangeProjects: (next: Json[]) => void;
}) {
  const [filterTab, setFilterTab] = useState<"all" | "active" | "hidden">("all");
  const items = projects as { [k: string]: Json }[];
  const totalCount = items.length;
  const hiddenCount = items.filter((p) => Boolean(p.hidden)).length;
  const activeCount = totalCount - hiddenCount;
  const isAutoHidden = totalCount > 0 && activeCount === 0;
  const isPageHidden = hideProjectsPage || isAutoHidden;

  const updateItem = (index: number, nextVal: { [k: string]: Json }) => {
    const copy = [...items];
    copy[index] = nextVal;
    onChangeProjects(copy);
  };

  const toggleHidden = (index: number) => {
    const item = items[index];
    updateItem(index, { ...item, hidden: !item.hidden });
  };

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChangeProjects(copy);
  };

  const duplicate = (i: number) => {
    const item = JSON.parse(JSON.stringify(items[i])) as { [k: string]: Json };
    item.slug = `${item.slug || "project"}-copy`;
    const copy = [...items.slice(0, i + 1), item, ...items.slice(i + 1)];
    onChangeProjects(copy);
  };

  const remove = (i: number) => {
    if (confirm("Delete this project?")) {
      onChangeProjects(items.filter((_, idx) => idx !== i));
    }
  };

  const addNew = () => {
    const newProj: { [k: string]: Json } = {
      slug: `project-${Date.now().toString(36)}`,
      category: categories[0] || "campaigns",
      title: { en: "New Project", ar: "مشروع جديد" },
      images: [],
      hidden: false,
    };
    onChangeProjects([newProj, ...items]);
  };

  const filteredItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const isHid = Boolean(item.hidden);
      if (filterTab === "active") return !isHid;
      if (filterTab === "hidden") return isHid;
      return true;
    });

  return (
    <div className="space-y-6">
      {/* Master Toggle Card */}
      <div className="rounded-xl border border-white/10 bg-[#161a1d] p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold text-base flex items-center gap-2 flex-wrap">
              <span>Projects page status:</span>
              {isPageHidden ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PAGE HIDDEN
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PAGE VISIBLE
                </span>
              )}
            </div>
            <p className="text-white/60 text-xs mt-1">
              Toggle visibility for the whole Projects page and its menu link in English & Arabic.
            </p>
          </div>
          <label className="inline-flex items-center gap-3 cursor-pointer self-start sm:self-auto bg-[#1f2428] px-4 py-2 rounded-lg border border-white/15 hover:border-white/30 transition-colors">
            <input
              type="checkbox"
              checked={hideProjectsPage}
              onChange={(e) => onToggleHidePage(e.target.checked)}
              className="w-4 h-4 accent-[#f0b31c]"
            />
            <span className="text-sm font-semibold text-white">Hide Projects page</span>
          </label>
        </div>

        {hideProjectsPage ? (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-200/90 leading-relaxed">
            ⚠️ <strong>Projects page is hidden</strong> because the toggle is enabled. The <code>/projects</code> route and the navigation link are hidden.
          </div>
        ) : isAutoHidden ? (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-200/90 leading-relaxed">
            ⚠️ <strong>All projects are currently toggled hidden ({totalCount} of {totalCount})</strong>. The entire Projects page is automatically hidden from visitors until at least one project is visible.
          </div>
        ) : (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-200/90 leading-relaxed">
            ✓ <strong>Projects page is visible</strong> on the website with <strong>{activeCount}</strong> active project{activeCount === 1 ? "" : "s"}.
          </div>
        )}
      </div>

      {/* Filter Chips & Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filterTab === "all" ? "bg-white/20 text-white" : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("active")}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filterTab === "active" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            Visible ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("hidden")}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filterTab === "hidden" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            Hidden ({hiddenCount})
          </button>
        </div>

        <button
          type="button"
          onClick={addNew}
          className="rounded bg-[#f0b31c] text-[#14171a] font-bold px-4 py-2 text-xs hover:bg-[#e0a413] transition-colors"
        >
          + Add New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {filteredItems.map(({ item, index }) => {
          const isItemHidden = Boolean(item.hidden);
          const titleObj = (isObj(item.title) ? item.title : {}) as { [k: string]: Json };
          const titleEn = String(titleObj.en || "");
          const titleAr = String(titleObj.ar || "");
          const category = String(item.category || "");
          const slug = String(item.slug || "");
          const images = (Array.isArray(item.images) ? item.images : []) as string[];
          const cover = images[0] || "";

          return (
            <details
              key={index}
              className={`rounded-lg border transition-colors ${
                isItemHidden
                  ? "border-amber-500/30 bg-amber-500/[0.02]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-white/40 text-xs w-5">{index + 1}.</span>
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt=""
                      className="w-10 h-10 object-cover rounded bg-black/40 border border-white/10 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 shrink-0 flex items-center justify-center text-[10px] text-white/30">
                      No img
                    </div>
                  )}
                  <div className="min-w-0 truncate">
                    <div className="text-white font-medium text-sm truncate flex items-center gap-2">
                      <span className="truncate">{titleEn || titleAr || `Project ${index + 1}`}</span>
                      {titleAr && titleEn && (
                        <span className="text-white/40 text-xs font-normal truncate hidden sm:inline" dir="rtl">
                          ({titleAr})
                        </span>
                      )}
                    </div>
                    <div className="text-white/40 text-xs truncate">
                      {category} • {images.length} {images.length === 1 ? "image" : "images"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => toggleHidden(index)}
                    title={isItemHidden ? "Click to show on website" : "Click to hide from website"}
                    className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                      isItemHidden
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                    }`}
                  >
                    {isItemHidden ? "👁 Hidden" : "✓ Visible"}
                  </button>
                  <IconBtn onClick={() => move(index, -1)} disabled={index === 0}>
                    ↑
                  </IconBtn>
                  <IconBtn onClick={() => move(index, 1)} disabled={index === items.length - 1}>
                    ↓
                  </IconBtn>
                  <IconBtn onClick={() => duplicate(index)}>Duplicate</IconBtn>
                  <IconBtn danger onClick={() => remove(index)}>
                    Remove
                  </IconBtn>
                </div>
              </summary>

              <div className="p-4 border-t border-white/10 space-y-4 bg-[#14171a]/50">
                {/* Project visibility checkbox inside details */}
                <div className="rounded bg-white/[0.03] border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-xs">Project visibility</div>
                    <div className="text-white/50 text-xs">
                      {isItemHidden ? "This project is currently hidden from the website." : "This project is currently live on the website."}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={isItemHidden}
                      onChange={(e) => updateItem(index, { ...item, hidden: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span className={isItemHidden ? "text-amber-300" : "text-white"}>Hide project</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">Title (English)</span>
                    <input
                      value={titleEn}
                      onChange={(e) =>
                        updateItem(index, {
                          ...item,
                          title: { ...titleObj, en: e.target.value },
                        })
                      }
                      placeholder="e.g. Pepsi: Made to Win"
                    />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">Title (Arabic)</span>
                    <input
                      dir="rtl"
                      value={titleAr}
                      onChange={(e) =>
                        updateItem(index, {
                          ...item,
                          title: { ...titleObj, ar: e.target.value },
                        })
                      }
                      placeholder="e.g. بيبسي: Made to Win"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">Category</span>
                    <select
                      value={category}
                      onChange={(e) => updateItem(index, { ...item, category: e.target.value })}
                    >
                      <option value="">— Select Category —</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-white/50 mb-1">URL Slug (e.g. pepsi-made-to-win)</span>
                    <input
                      value={slug}
                      onChange={(e) => updateItem(index, { ...item, slug: e.target.value })}
                      placeholder="slug"
                    />
                  </div>
                </div>

                {/* Images list */}
                <div className="rounded border border-white/10 p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wide text-white/60 font-medium">
                        Project Images ({images.length})
                      </span>
                      <span className="text-white/40 text-xs block">
                        First image is used as the cover photo on the projects wall.
                      </span>
                    </div>
                    <IconBtn onClick={() => updateItem(index, { ...item, images: [...images, ""] })}>
                      + Add Image
                    </IconBtn>
                  </div>

                  {images.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="rounded border border-white/10 p-3 space-y-2 bg-white/[0.01]">
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>{imgIdx === 0 ? "Cover Photo (Primary)" : `Gallery Photo ${imgIdx + 1}`}</span>
                        <div className="flex items-center gap-1">
                          <IconBtn
                            disabled={imgIdx === 0}
                            onClick={() => {
                              const nextImgs = [...images];
                              [nextImgs[imgIdx], nextImgs[imgIdx - 1]] = [nextImgs[imgIdx - 1], nextImgs[imgIdx]];
                              updateItem(index, { ...item, images: nextImgs });
                            }}
                          >
                            ↑
                          </IconBtn>
                          <IconBtn
                            disabled={imgIdx === images.length - 1}
                            onClick={() => {
                              const nextImgs = [...images];
                              [nextImgs[imgIdx], nextImgs[imgIdx + 1]] = [nextImgs[imgIdx + 1], nextImgs[imgIdx]];
                              updateItem(index, { ...item, images: nextImgs });
                            }}
                          >
                            ↓
                          </IconBtn>
                          <IconBtn
                            danger
                            onClick={() =>
                              updateItem(index, {
                                ...item,
                                images: images.filter((_, idx) => idx !== imgIdx),
                              })
                            }
                          >
                            Remove
                          </IconBtn>
                        </div>
                      </div>
                      <ImageInput
                        value={imgUrl}
                        onChange={(v) => {
                          const nextImgs = [...images];
                          nextImgs[imgIdx] = v;
                          updateItem(index, { ...item, images: nextImgs });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── editor shell ───────────────────────── */

export default function Editor({ initial }: { initial: Content }) {
  const [content, setContent] = useState<Json>(initial as unknown as Json);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState(TABS[0].id);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson]);
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  const categories = Object.keys(
    ((getIn(content, ["dict", "en", "projects", "categories"]) as { [k: string]: Json }) ?? {})
  );

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  function save() {
    setMsg(null);
    start(async () => {
      const res = await saveContent(content as unknown as Content);
      if (res.ok) {
        setSavedJson(JSON.stringify(content));
        setMsg({ ok: true, text: "Saved. The website is updated." });
      } else {
        setMsg({ ok: false, text: res.error ?? "Save failed" });
      }
    });
  }

  function reset() {
    if (!confirm("Discard ALL saved edits and restore the original website content? This cannot be undone.")) return;
    start(async () => {
      const res = await resetContent();
      if (res.ok) {
        window.location.reload();
      } else {
        setMsg({ ok: false, text: res.error ?? "Reset failed" });
      }
    });
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-[#101316] p-4 flex flex-col gap-1 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-4">
          <div className="text-white font-bold text-lg">Admin panel</div>
          <div className="text-white/40 text-xs">Edit everything on the website</div>
        </div>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`text-left rounded px-3 py-2 ${tab === t.id ? "bg-[#f0b31c] text-[#14171a] font-semibold" : "hover:bg-white/5"}`}
          >
            {t.label}
          </button>
        ))}
        <div className="mt-auto pt-4 space-y-2 text-xs">
          <a href="/en" target="_blank" rel="noreferrer" className="block rounded border border-white/15 px-3 py-2 text-center hover:border-white/40">
            View website ↗
          </a>
          <button type="button" onClick={reset} className="w-full rounded border border-white/15 px-3 py-2 hover:text-red-400 hover:border-red-400/50">
            Restore original content
          </button>
          <form action={logout}>
            <button type="submit" className="w-full rounded border border-white/15 px-3 py-2 hover:border-white/40">
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#14171a]/95 backdrop-blur px-6 py-3">
          <div className="min-w-0">
            <div className="text-white font-semibold">{active.label}</div>
            <div className="text-white/45 text-xs truncate">{active.hint}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {msg && <span className={`text-xs ${msg.ok ? "text-emerald-400" : "text-red-400"}`}>{msg.text}</span>}
            {dirty && !pending && <span className="text-xs text-[#f0b31c]">Unsaved changes</span>}
            <button
              type="button"
              onClick={save}
              disabled={pending || !dirty}
              className="rounded bg-[#f0b31c] text-[#14171a] font-bold px-5 py-2 disabled:opacity-40"
            >
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        <div className="max-w-4xl p-6 pb-24">
          {active.id === "mainPhotos" ? (
            <MainPhotos
              items={getIn(content, ["portfolio"]) as Json[]}
              onChange={(v) => {
                setMsg(null);
                setContent((c) => setIn(c, ["portfolio"], v));
              }}
            />
          ) : active.id === "projects" ? (
            <ProjectsManager
              projects={(getIn(content, ["projects"]) as Json[]) || []}
              hideProjectsPage={Boolean((getIn(content, ["site", "hideProjectsPage"]) as boolean) || false)}
              categories={categories}
              onToggleHidePage={(hide) => {
                setMsg(null);
                setContent((c) => {
                  let updated = setIn(c, ["site", "hideProjectsPage"], hide);
                  const port = getIn(updated, ["portfolio"]) as { [k: string]: Json }[];
                  if (Array.isArray(port)) {
                    const nextPort = port.map((p) => (p.slug === "projects" ? { ...p, hidden: hide } : p));
                    updated = setIn(updated, ["portfolio"], nextPort);
                  }
                  return updated;
                });
              }}
              onChangeProjects={(v) => {
                setMsg(null);
                setContent((c) => setIn(c, ["projects"], v));
              }}
            />
          ) : (
          <Node
            key={active.id}
            label={active.label}
            keyName={String(active.path[active.path.length - 1])}
            value={getIn(content, active.path)}
            path={active.path}
            ctx={{ categories }}
            onChange={(v) => {
              setMsg(null);
              setContent((c) => setIn(c, active.path, v));
            }}
          />
          )}
        </div>
      </main>
    </div>
  );
}
