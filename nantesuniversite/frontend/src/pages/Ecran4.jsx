import { useState, useEffect } from 'react';
import Header       from '../components/Header';
import ExpertQuote  from '../components/ExpertQuote';
import ProgressBar  from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';

const DESIGN_WIDTH  = 1920;
const DESIGN_HEIGHT = 3200;

export default function Ecran4() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
    {/*
      Fixed overlay — sits above the scroll canvas, zoomed to match the design
      scale, so the ProgressBar keeps its design-space coordinates while
      remaining visible at all scroll positions.
    */}
    {/*
      Full-viewport overlay, vertically centres the ProgressBar.
      `marginLeft` uses real viewport px (33 design-px × scale) so it aligns
      with the left edge of the design canvas. `zoom` scales the bar itself.
    */}
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div style={{ marginLeft: 33 * scale, zoom: scale }}>
        <ProgressBar level={0.5} />
      </div>
    </div>

    {/* Scrolling design canvas */}
    <div
      style={{
        zoom: scale,
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        background: 'linear-gradient(to bottom, white 0%, white 35%, #3552ff 100%)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
      }}
    >
      <Header />
      <ExpertQuote />
      {/* ProgressBar is rendered in a fixed overlay below */}
      <IcebergScene />
    </div>
    </>
  );
}
