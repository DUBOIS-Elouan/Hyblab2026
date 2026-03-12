import DotPattern from './DotPattern';

const portrait =
  'https://www.figma.com/api/mcp/asset/61a8702d-f0f7-460a-9cce-6d46a7b33186';
const portraitOverlay =
  'https://www.figma.com/api/mcp/asset/d855a28e-96f2-411b-b549-ffd2f431adf6';

export default function ExpertQuote() {
  return (
    <section className="absolute top-[292px] left-0 right-0">
      {/* Portrait (circular clipped) */}
      <div className="absolute left-[176px] top-0 w-[472px] h-[398px] overflow-hidden rounded-full">
        <img src={portrait} alt="Portrait de Colin de la Higuera" className="w-full h-full object-cover" />
      </div>

      {/* Colorful overlay on portrait */}
      <div className="absolute left-[149px] top-[204px] w-[523px] h-[307px] pointer-events-none">
        <img src={portraitOverlay} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Left decorative dot pattern */}
      <div className="absolute left-[583px] top-[24px]">
        <DotPattern dotSize={22} />
      </div>

      {/* Italic quote */}
      <p className="absolute left-[735px] top-[61px] w-[960px] italic text-black text-[36px] leading-snug font-[Inter,sans-serif]">
        «&thinsp;Je m&apos;en sors habituellement en observant que ce qu&apos;on
        entend par intelligence est mouvant et qu&apos;au fur du temps, des
        activités qu&apos;on tenait pour intelligentes ne le sont plus.&thinsp;»
      </p>

      {/* Attribution (right-aligned) */}
      <div className="absolute left-[735px] top-[282px] w-[943px] text-right text-black font-[Inter,sans-serif]">
        <p className="font-bold text-[36px]">Colin de la Higuera,</p>
        <p className="text-[32px]">Professeur à l&apos;Université de Nantes</p>
        <p className="text-[32px]">Titulaire de la Chaire UNESCO RELIA</p>
      </div>

      {/* Right decorative dot pattern (mirrored) */}
      <div className="absolute left-[1695px] top-[124px]">
        <DotPattern dotSize={24} mirror />
      </div>
    </section>
  );
}
