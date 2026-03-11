/**
 * ProgressBar – vertical sidebar indicator on the left edge of the page.
 *
 * Props:
 *   level – fill amount from 0 (empty) to 1 (full). Default: 0.
 */
const TRACK_HEIGHT = 427;
const FILL_WIDTH   = 27;
const TRACK_WIDTH  = 46;

export default function ProgressBar({ level = 0 }) {
  const clampedLevel = Math.min(1, Math.max(0, level));
  const fillHeight = Math.round(TRACK_HEIGHT * clampedLevel);

  return (
    <div style={{ position: 'relative', width: TRACK_WIDTH, height: TRACK_HEIGHT }}>
      {/* Grey track */}
      <div
        className="rounded-[23px] bg-[#d9d9d9]"
        style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT }}
      />

      {/* Gradient fill – grows from the bottom of the track upward */}
      <div
        className="absolute rounded-[23px]"
        style={{
          left: (TRACK_WIDTH - FILL_WIDTH) / 2,
          bottom: 0,
          width: FILL_WIDTH,
          height: fillHeight,
          background: 'linear-gradient(to bottom, #60cbeb 5%, #3452ff 33%)',
          transition: 'height 0.3s ease',
        }}
      />
    </div>
  );
}
