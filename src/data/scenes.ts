/**
 * Scroll scenes per page. Images are real project work and brand assets,
 * optimized copies live in public/pages/scenes.
 */
const S = "/pages/scenes";

export interface SceneImage {
  src: string;
  /** CSS aspect-ratio of the file, so frames never crop the subject */
  ratio: string;
}

const img = (name: string, w: number, h: number): SceneImage => ({
  src: `${S}/${name}.jpg`,
  ratio: `${w} / ${h}`,
});

export type Scene =
  | { type: "values"; images: SceneImage[] }
  | { type: "services"; images: SceneImage[] }
  | { type: "steps"; images: string[] }
  | { type: "story"; images: string[] }
  | { type: "drafts"; images: string[]; final: string };

export const scenes: Record<string, Scene> = {
  "about-us": {
    type: "values",
    images: [
      img("val-method", 529, 468),
      img("val-results", 967, 1242),
      img("val-consistency", 1356, 1500),
    ],
  },
  "what-we-do": {
    type: "services",
    images: [
      img("svc-campaign", 1153, 695),
      img("svc-branding", 1111, 828),
      img("svc-content", 930, 710),
      img("svc-social", 1198, 751),
    ],
  },
  manifesto: {
    type: "steps",
    images: [
      `${S}/ph-discovery.jpg`,
      `${S}/ph-engineering.jpg`,
      `${S}/ph-shaping.jpg`,
      `${S}/ph-launch.jpg`,
    ],
  },
  "from-nothing": {
    type: "story",
    images: [`${S}/void-portal.jpg`, `${S}/void-pedestal.jpg`, `${S}/void-sculpture.jpg`],
  },
  unseen: {
    type: "drafts",
    images: [
      `${S}/draft-collage.jpg`,
      `${S}/draft-pain.jpg`,
      `${S}/draft-lanyard.jpg`,
      `${S}/draft-gold.jpg`,
      `${S}/draft-battles.jpg`,
      `${S}/draft-sea.jpg`,
      `${S}/draft-happiness.jpg`,
      `${S}/draft-yellow-room.jpg`,
    ],
    final: `${S}/final-pepsi.jpg`,
  },
};
