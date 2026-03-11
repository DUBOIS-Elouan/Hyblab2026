/**
 * DotPattern – decorative diamond grid of blue squares.
 * Used to flank the expert quote on both sides.
 *
 * The pattern is 5 rows × 2 dots arranged in a diamond / hourglass shape.
 * Each row's x-offset decreases then increases, forming the diamond outline.
 *
 * Props:
 *  dotSize – side length of each square in pixels (default 22)
 *  mirror  – when true the diamond opens right-to-left instead of left-to-right
 *  className – extra Tailwind classes for the wrapper
 */
export default function DotPattern({ dotSize = 22, mirror = false, className = '' }) {
  const rows = 5;
  const mid = Math.floor(rows / 2); // row index of widest point (row 2)
  const colGap = 3 * dotSize;       // gap between the two dots in a row

  const dots = [];
  for (let row = 0; row < rows; row++) {
    const spread = Math.abs(mid - row); // 2, 1, 0, 1, 2
    // normal : wide at extremes (rows 0 & 4), narrow in middle (row 2)
    // mirror : narrow at extremes,            wide in middle
    const leftX = mirror
      ? (mid - spread) * dotSize
      : spread * dotSize;
    const rightX = leftX + colGap;

    dots.push({ x: leftX,  y: row * dotSize });
    dots.push({ x: rightX, y: row * dotSize });
  }

  const totalWidth  = 5 * dotSize; // spread=2 means offset=2*dotSize, + 3*dotSize gap + 1 dotSize = 6 – but render box is rightX+dotSize at max
  const totalHeight = rows * dotSize;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: totalWidth + dotSize, height: totalHeight }}
    >
      {dots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: dot.x,
            top: dot.y,
            width: dotSize,
            height: dotSize,
            backgroundColor: '#3552ff',
          }}
        />
      ))}
    </div>
  );
}
