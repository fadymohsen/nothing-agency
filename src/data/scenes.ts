/**
 * Scroll scenes per page. Every photo and icon comes from the supplied
 * "icons and photos" set; optimized copies live in public/site.
 */
const P = "/site/photos";
const I = "/site/glyphs";

export type IconName =
  | "report" | "calendar" | "cursor" | "growth-chart" | "idea" | "video" | "chat"
  | "audience" | "pricing" | "award" | "megaphone" | "network" | "report-2"
  | "handshake" | "growth" | "trophy" | "pie-chart" | "gift" | "bag" | "cart"
  | "hourglass" | "mail";

export const icon = (name: IconName) => `${I}/${name}.png`;

export interface SceneImage {
  src: string;
  /** CSS aspect-ratio of the file, so frames never crop the subject */
  ratio: string;
  /** Badge shown with this image (path from icon()) */
  icon?: string;
}

const img = (name: string, w: number, h: number, ic?: IconName): SceneImage => ({
  src: `${P}/${name}.jpg`,
  ratio: `${w} / ${h}`,
  icon: ic ? icon(ic) : undefined,
});

export type Scene =
  | { type: "values"; images: SceneImage[] }
  | { type: "services"; images: SceneImage[] }
  | { type: "steps"; images: SceneImage[] }
  | { type: "story"; images: SceneImage[] }
  | { type: "drafts"; images: SceneImage[]; final: SceneImage };

export const scenes: Record<string, Scene> = {
  "about-us": {
    type: "values",
    images: [
      img("val-method", 900, 1125, "idea"),
      img("val-results", 900, 1125, "trophy"),
      img("val-consistency", 900, 1125, "calendar"),
    ],
  },
  "what-we-do": {
    type: "services",
    images: [
      img("svc-campaign", 1100, 733, "megaphone"),
      img("svc-branding", 1100, 733, "award"),
      img("svc-content", 1100, 733, "report"),
      img("svc-social", 1100, 733, "network"),
    ],
  },
  manifesto: {
    type: "steps",
    images: [
      img("ph-discovery", 1000, 1000, "audience"),
      img("ph-engineering", 1000, 1000, "idea"),
      img("ph-shaping", 900, 900, "video"),
      img("ph-launch", 900, 900, "growth-chart"),
    ],
  },
  "from-nothing": {
    type: "story",
    images: [
      img("void-room", 900, 900, "hourglass"),
      img("void-road", 900, 900, "idea"),
      img("void-door", 900, 900, "growth"),
    ],
  },
  unseen: {
    type: "drafts",
    images: [
      img("draft-1", 955, 1194),
      img("draft-2", 1000, 1000),
      img("draft-3", 864, 1080),
      img("draft-4", 1300, 732),
      img("draft-5", 1000, 1250),
      img("draft-6", 1300, 729),
      img("draft-7", 900, 900),
      img("draft-8", 716, 896),
    ],
    final: img("draft-final", 720, 900, "hourglass"),
  },
};
