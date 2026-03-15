import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TopicTitle from '../components/TopicTitle';
import ExpertQuote from '../components/ExpertQuote';
import ProgressBar from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';
import ScrollArrow from '../components/ScrollArrow';
import ResearcherFooter from "../components/ResearcherFooter";
import styles from './ResearcherPage.module.css';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 6000;
const WATER_SURFACE_TOP = 1750;
const UNDERWATER_TRIGGER = 1880;
const SCROLL_PROBE_RATIO = 0.45;
const UNDERWATER_PARTICLES = [
  { left: 124, top: 1960, size: 18, duration: 14, delay: -2, drift: 26 },
  { left: 336, top: 2320, size: 10, duration: 11, delay: -6, drift: -18 },
  { left: 522, top: 2700, size: 15, duration: 13, delay: -3, drift: 14 },
  { left: 714, top: 2140, size: 22, duration: 16, delay: -5, drift: 28 },
  { left: 936, top: 3030, size: 12, duration: 12, delay: -8, drift: -22 },
  { left: 1118, top: 2540, size: 16, duration: 15, delay: -4, drift: 24 },
  { left: 1328, top: 3410, size: 12, duration: 11, delay: -7, drift: -16 },
  { left: 1494, top: 2250, size: 20, duration: 17, delay: -1, drift: 20 },
  { left: 1668, top: 2860, size: 14, duration: 13, delay: -9, drift: -14 },
  { left: 1776, top: 3620, size: 18, duration: 18, delay: -10, drift: 18 },
];

export default function ResearcherPage({ scrollProgress = 0 }) {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);
  const [isUnderwater, setIsUnderwater] = useState(
    () => window.scrollY + (window.innerHeight * SCROLL_PROBE_RATIO) >= UNDERWATER_TRIGGER,
  );

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const syncUnderwaterState = () => {
      const probeY = window.scrollY + (window.innerHeight * SCROLL_PROBE_RATIO);
      setIsUnderwater(probeY >= UNDERWATER_TRIGGER);
    };

    syncUnderwaterState();
    window.addEventListener('scroll', syncUnderwaterState, { passive: true });
    window.addEventListener('resize', syncUnderwaterState);

    return () => {
      window.removeEventListener('scroll', syncUnderwaterState);
      window.removeEventListener('resize', syncUnderwaterState);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-[33px] left-[33px] pointer-events-none z-50" style={{ zoom: 0.6 }}>
        <ProgressBar level={scrollProgress} />
      </div>

      <div className="fixed bottom-[33px] right-[60px] z-50">
        <ScrollArrow direction="up" scale={0.5} />
      </div>

      <div
        className="relative font-sans"
        style={{
          zoom: scale,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[1750px]" style={{ background: 'linear-gradient(to bottom, white 0%, #fffbf5 44.231%, #feebc6 100%)' }} />
        <div className="absolute inset-x-0 top-[1750px] bottom-0 bg-gradient-to-b from-[rgba(196,204,255,0.38)] to-[#0e25ae]" />
        <div
          aria-hidden="true"
          className={`${styles.waterEffects} ${isUnderwater ? styles.waterEffectsVisible : ''}`}
        >
          <div className={styles.underwaterVeil} />
          <div className={styles.depthFade} />
          {UNDERWATER_PARTICLES.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}-${index}`}
              className={styles.particle}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                '--particle-drift': `${particle.drift}px`,
              }}
            />
          ))}
        </div>
        <Header />
        <TopicTitle />
        <ExpertQuote />
        <IcebergScene />
        <ResearcherFooter />
      </div>
    </>
  );
}
