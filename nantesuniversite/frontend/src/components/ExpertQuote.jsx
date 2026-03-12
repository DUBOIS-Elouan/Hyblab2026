import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotPattern from './DotPattern';

gsap.registerPlugin(ScrollTrigger);

const portrait =
  'https://www.figma.com/api/mcp/asset/0b03e29e-1713-4b7d-85d3-8e3dd7d58636';
const portraitOverlay =
  'https://www.figma.com/api/mcp/asset/9b81ea1f-2ec9-4bb4-ac89-6d588af65991';


// Section starts at absolute top=300; child positions are section-relative.
export default function ExpertQuote() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const quoteRef = useRef(null);
  const attributionRef = useRef(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' };

    gsap.from(portraitRef.current, { ...trigger, x: -60, opacity: 0, duration: 0.8, ease: 'power2.out' });
    gsap.from(quoteRef.current,    { ...trigger, x:  60, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 });
    gsap.from(attributionRef.current, { ...trigger, y: 30, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="absolute top-[300px] left-0 right-0">
      {/* Portrait + overlay – slide in from left */}
      <div ref={portraitRef}>
        <div className="absolute left-[158px] top-[12px] w-[442px] h-[373px] overflow-hidden">
          <img src={portrait} alt="Portrait de Colin de la Higuera" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-[134px] top-[214px] w-[479px] h-[281px] pointer-events-none">
          <img src={portraitOverlay} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Left decorative dot pattern */}
      <div className="absolute left-[583px] top-[72px]">
        <DotPattern dotSize={22} />
      </div>

      {/* Quote – slide in from right */}
      <p ref={quoteRef} className="absolute left-[736px] top-[110px] w-[925px] h-[135px] italic text-black text-[36px] leading-normal font-sans">
        &thinsp;Je m&apos;en sors habituellement en observant que ce qu&apos;on
        entend par intelligence est mouvant et qu&apos;au fur du temps, des
        activités qu&apos;on tenait pour intelligentes ne le sont plus.&thinsp;
      </p>

      {/* Attribution – fade up */}
      <div ref={attributionRef}>
        <div className="absolute left-[1270px] top-[364px] w-[24px] h-[24px] bg-[#3552ff]" />
        <div className="absolute left-[696px] top-[350px] w-[943px] text-right text-black font-sans">
          <p className="font-bold text-[36px] mb-0">Colin de la Higuera</p>
          <p className="text-[30px] underline mb-0">Professeur à l&apos;Université de Nantes</p>
          <p className="text-[30px] underline">Titulaire de la Chaire UNESCO RELIA</p>
        </div>
      </div>

      <div className="absolute left-[1673px] top-[161px]">
        <DotPattern dotSize={22} mirror />
      </div>

    </section>
  );
}
