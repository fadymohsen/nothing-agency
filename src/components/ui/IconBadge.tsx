/** Round gold badge from the supplied icon set. Decorative; the text beside it carries the meaning. */
/** Every badge is drawn 20% larger than the size passed in. */
const SCALE = 1.2;

export default function IconBadge({
  src,
  size = 72,
  className = "",
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  const px = Math.round(size * SCALE);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={px}
      height={px}
      draggable={false}
      className={className}
      style={{ width: px, height: px, flexShrink: 0 }}
    />
  );
}
