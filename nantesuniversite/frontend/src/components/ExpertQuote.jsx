/**
 * ExpertQuote – displays the expert portrait, a pull-quote, and attribution.
 *
 * Layout (1920 px reference):
 *  ┌──portrait──┐ [dots] ┌──quote text──────────────────────────┐ [dots] attribution
 *  left:176      left:583  left:735                               left:1695 (right-aligned at ~left:735)
 */
import DotPattern from './DotPattern';

const portrait =
  'https://www.figma.com/api/mcp/asset/61a8702d-f0f7-460a-9cce-6d46a7b33186';
const portraitOverlay =
  'https://www.figma.com/api/mcp/asset/d855a28e-96f2-411b-b549-ffd2f431adf6';

export default function ExpertQuote() {
  return (
    <section
      className="absolute"
      style={{ top: 292, left: 0, right: 0 }}
    >
      {/* Portrait (circular clipped) */}
      <div
        className="absolute overflow-hidden rounded-full"
        style={{ left: 176, top: 0, width: 472, height: 398 }}
      >
        <img
          src={portrait}
          alt="Portrait de Colin de la Higuera"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Colorful overlay on portrait */}
      <div
        className="absolute pointer-events-none"
        style={{ left: 149, top: 204, width: 523, height: 307 }}
      >
        <img
          src={portraitOverlay}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left decorative dot pattern */}
      <div className="absolute" style={{ left: 583, top: 24 }}>
        <DotPattern dotSize={22} />
      </div>

      {/* Italic quote */}
      <p
        className="absolute italic text-black leading-snug"
        style={{
          left: 735,
          top: 61,
          width: 960,
          fontSize: 36,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        «&thinsp;Je m&apos;en sors habituellement en observant que ce qu&apos;on
        entend par intelligence est mouvant et qu&apos;au fur du temps, des
        activités qu&apos;on tenait pour intelligentes ne le sont plus.&thinsp;»
      </p>

      {/* Attribution (right-aligned, right side of quote) */}
      <div
        className="absolute text-right text-black"
        style={{
          left: 735,
          top: 282,
          width: 943,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <p className="font-bold" style={{ fontSize: 36 }}>
          Colin de la Higuera,
        </p>
        <p style={{ fontSize: 32 }}>Professeur à l&apos;Université de Nantes</p>
        <p style={{ fontSize: 32 }}>Titulaire de la Chaire UNESCO RELIA</p>
      </div>

      {/* Right decorative dot pattern (mirrored) */}
      <div className="absolute" style={{ left: 1695, top: 124 }}>
        <DotPattern dotSize={24} mirror />
      </div>
    </section>
  );
}
