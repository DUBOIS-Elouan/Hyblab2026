import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TopicTitle from '../components/TopicTitle';
import ExpertQuote from '../components/ExpertQuote';
import ProgressBar from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';
import { ArrowDown, ArrowUp } from '../components/ScrollArrow';
import ResearcherFooter from "../components/ResearcherFooter";
import Coordonnees from '../components/Coordonnes';
import Tableau from '../components/Tableau';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 5420;
// Approximate height of the table when fully open (5 rows + header + pagination)
const TABLE_OPEN_HEIGHT = 420;

export default function ResearcherPage({ scrollProgress = 0 }) {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);
  const [scrollY, setScrollY] = useState(0);
  const [tableOpen, setTableOpen] = useState(true);
  const [tablePage, setTablePage] = useState(0);

  const offset = tableOpen ? TABLE_OPEN_HEIGHT : 0;

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-[33px] left-[33px] pointer-events-none z-50" style={{ zoom: 0.6 }}>
        <ProgressBar level={scrollProgress} />
      </div>

      <ArrowDown scale={scale} scrollY={scrollY} />
      <ArrowUp scrollY={scrollY} />

      <div
        className="relative font-sans"
        style={{
          zoom: scale,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT + offset,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[1939px]" style={{ background: 'linear-gradient(to bottom, white 0%, #fffbf5 44.231%, #feebc6 100%)' }} />
        <div className="absolute inset-x-0 top-[1700px] bottom-0" style={{ background: 'linear-gradient(to bottom, #c4cbff 0%, #0e25ae 24.922%, #0b0e20 100%)' }} />
        <Header />
        <TopicTitle />
        <ExpertQuote />
        <IcebergScene />

        {/* Flow section: Tableau + Coordonnees push each other naturally */}
        <div style={{ position: 'absolute', top: '3800px', left: 0, width: '1920px' }}>
          <Tableau
            open={tableOpen}
            onToggle={() => setTableOpen(p => !p)}
            page={tablePage}
            onPageChange={setTablePage}
          />
          <Coordonnees />
        </div>

        <ResearcherFooter offset={offset} />
      </div>
    </>
  );
}
