import imgBande from '../assets/bande.svg';

/* ---------- Figma asset URLs ---------- */
const imgCalque1 =
  'https://www.figma.com/api/mcp/asset/e3b3c517-ec4f-4a6f-ba90-998f89667624'; // N-shape bottom-left
const imgCalque2 =
  'https://www.figma.com/api/mcp/asset/cd39dc93-d278-47b7-8bef-345d78168b09'; // N-shape top-center
const imgCalque3 =
  'https://www.figma.com/api/mcp/asset/08b55e8f-4a5e-48c3-9dea-cfdd3ccbd61d'; // C-shape bottom-right
const imgCalque4 =
  'https://www.figma.com/api/mcp/asset/543c1b75-44a5-40af-a95e-840c3a4aa340'; // small shape top-left
const imgCalque8 =
  'https://www.figma.com/api/mcp/asset/a0a6e4a2-fbf9-4a72-a0ff-9ed9cab2718f'; // rotated shape top-right
const imgVector1 =
  'https://www.figma.com/api/mcp/asset/66692520-20fa-4a4c-85da-ff1fe35bdcf1'; // wavy underline
/* ---------- Sub-components ---------- */

/** Small coloured pill rotated by `deg` degrees. */
function RotatedBar({ color, left, top, containerW, containerH, deg }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left, top, width: containerW, height: containerH }}
    >
      <div style={{ transform: `rotate(${deg}deg)` }}>
        <div style={{ background: color, width: 26, height: 56 }} />
      </div>
    </div>
  );
}

/** Image-based decorative shape with optional rotation / vertical flip. */
function CalqueDecor({ src, left, top, width, height, containerW, containerH, deg = 0, flipY = false }) {
  const transform = [
    deg !== 0 ? `rotate(${deg}deg)` : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const innerStyle = transform ? { transform } : {};

  if (containerW && containerH) {
    return (
      <div
        className="absolute flex items-center justify-center"
        style={{ left, top, width: containerW, height: containerH }}
      >
        <div style={{ ...innerStyle, width, height, position: 'relative' }}>
          <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute" style={{ left, top, width, height }}>
      <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
    </div>
  );
}

/* ---------- Main component ---------- */

export default function HeroSection() {
  return (
    <section>
      {/* ── Blue highlight rectangle behind "CHERCHEURS" ── */}
      <div
        className="absolute bg-[#3452ff]"
        style={{ left: 641, top: 476, width: 672, height: 112 }}
      />

      {/* ── Hero title ── */}
      <div
        className="absolute text-center whitespace-pre-wrap"
        style={{
          left: 0,
          right: 0,
          top: 374,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: 96,
          lineHeight: '106px',
          color: '#000',
        }}
      >
        <p style={{ margin: 0 }}>DÉCOUVREZ{'  '}L'UNIVERS</p>
        <p style={{ margin: 0 }}>
          DES <span style={{ color: '#fff' }}>CHERCHEURS</span> DE
        </p>
        <p style={{ margin: 0 }}>NANTES UNIVERSITÉ</p>
      </div>

      {/* ── Coloured rotating bars ── */}
      <RotatedBar color="#9c1ef1" left={1484} top={196}  containerW={61.662} containerH={49.121} deg={117.81} />
      <RotatedBar color="#ffcc02" left={178}  top={469}  containerW={56.953} containerH={58.892} deg={42.38}  />
      <RotatedBar color="#00c6fe" left={562}  top={806}  containerW={52.202} containerH={61.153} deg={-32.82} />
      <RotatedBar color="#02c15e" left={1618} top={611}  containerW={52.202} containerH={61.153} deg={-32.82} />

      {/* ── Calque image decorations ── */}
      <CalqueDecor src={imgCalque1} left={136}  top={709} width={136}    height={74}     containerW={152.963} containerH={115.42}  deg={19.65}  />
      <CalqueDecor src={imgCalque2} left={860}  top={214} width={122.949} height={67.289} containerW={134.477} containerH={91.979}  deg={167.68} />
      <CalqueDecor src={imgCalque3} left={1309} top={719} width={92.656}  height={50.711} containerW={105.542} containerH={86.635}  deg={153.59} />
      <CalqueDecor src={imgCalque4} left={235}  top={219} width={80}      height={61} />
      <CalqueDecor src={imgCalque8} left={1663} top={367} width={80}      height={61}     containerW={93.64}   containerH={100.035} deg={58.77}  />

      {/* ── Wavy underline below title ── */}
      <div
        className="absolute"
        style={{ left: 562, top: 708.5, width: 745, height: 27.5 }}
      >
        <div className="absolute" style={{ inset: '-9.09% 0 -9.08% 0' }}>
          <img alt="" src={imgVector1} className="block max-w-none w-full h-full" />
        </div>
      </div>

      {/* ── Wave band ── */}
      <div
        className="absolute"
        style={{ left: -450, top: 677, width: 2687, height: 543, transform: 'rotate(2.31deg)' }}
      >
        <img alt="" src={imgBande} className="block w-full h-full" />
      </div>
    </section>
  );
}
