/** Every icon is drawn 20% larger than the size passed in. */
const SCALE = 1.2;

export type IconShape = "plain" | "square" | "diamond" | "ring";

/**
 * Gold line icon from the supplied set, shown in one of four frames so the
 * pages don't repeat one badge everywhere. Decorative; nearby text carries the meaning.
 */
export default function IconBadge({
  src,
  size = 72,
  shape = "plain",
  className = "",
}: {
  src: string;
  size?: number;
  shape?: IconShape;
  className?: string;
}) {
  const box = Math.round(size * SCALE);
  const glyph = shape === "plain" ? box : Math.round(box * 0.64);

  const frame: React.CSSProperties =
    shape === "square"
      ? { background: "var(--color-body)", border: "1px solid var(--color-accent)" }
      : shape === "ring"
        ? { border: "1px solid rgba(240,179,28,.55)", borderRadius: "50%" }
        : shape === "diamond"
          ? { background: "var(--color-body)", border: "1px solid var(--color-accent)", transform: "rotate(45deg)" }
          : {};

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        width: box,
        height: box,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...frame,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={glyph}
        height={glyph}
        draggable={false}
        style={{
          width: glyph,
          height: glyph,
          objectFit: "contain",
          transform: shape === "diamond" ? "rotate(-45deg)" : undefined,
        }}
      />
    </span>
  );
}
