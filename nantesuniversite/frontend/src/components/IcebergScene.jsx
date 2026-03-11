/**
 * IcebergScene – the large iceberg illustration with:
 *  - Iceberg outline + fill layers
 *  - Robot / AI figure on the waterline
 *  - Wavy "water surface" decoration
 *  - Scroll-down arrow
 *  - Three resource images at different iceberg depths
 *
 * All positions are on a 1920 px reference canvas.
 */

const icebergOutline =
  'https://www.figma.com/api/mcp/asset/ed280a18-c9a6-4b5b-b584-fe283d4e6e3b';
const icebergFill =
  'https://www.figma.com/api/mcp/asset/b53d0bd9-e34d-49d4-867c-6ea91180367f';
const icebergOutline2 =
  'https://www.figma.com/api/mcp/asset/97291215-22a8-4dfe-8173-94ba807df28f';
import Robot from './Robot';
import ResourceCard from './ResourceCard';
const wavyLine =
  'https://www.figma.com/api/mcp/asset/c0a9c643-0832-408a-a0c4-6ffc7a551fce';
const arrowDown =
  'https://www.figma.com/api/mcp/asset/b9e837d7-a221-4db8-9150-c194392122b4';

// Resource images placed at increasing depth on the iceberg
const image17 =
  'https://www.figma.com/api/mcp/asset/c8199dd4-7905-4ddc-b5f3-8f95bf9887b6';
const image12 =
  'https://www.figma.com/api/mcp/asset/b89bb61f-1c99-49a8-967c-f6500f6b4805';
const image14 =
  'https://www.figma.com/api/mcp/asset/b1408a78-8993-4bb9-9038-189f493955c8';

export default function IcebergScene() {
  return (
    <>
      {/* ── Scroll arrow (centred, above water line) ── */}
      <div
        className="absolute"
        style={{ left: '50%', top: 888, transform: 'translateX(-50%)' }}
      >
        <img src={arrowDown} alt="Défiler vers le bas" style={{ width: 34, height: 101 }} />
      </div>

      {/* ── Wavy water-surface lines ── */}
      {/* Right side */}
      <div
        className="absolute"
        style={{ left: 1678, top: 1488, width: 242, height: 9 }}
      >
        <img src={wavyLine} alt="" className="w-full h-full" />
      </div>
      {/* Left side (partially off-screen) */}
      <div
        className="absolute"
        style={{ left: -74, top: 1644, width: 242, height: 9 }}
      >
        <img src={wavyLine} alt="" className="w-full h-full" />
      </div>

      {/* ── Iceberg layers (positioned relative to page top) ── */}
      {/* Outer outline / silhouette */}
      <div
        className="absolute"
        style={{ left: 99, top: 844, width: 1589, height: 2256 }}
      >
        <img
          src={icebergOutline}
          alt="Iceberg"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Fill layer (underwater colour) */}
      <div
        className="absolute"
        style={{ left: 99, top: 844, width: 1589, height: 2256 }}
      >
        <img
          src={icebergFill}
          alt=""
          className="w-full h-full object-contain"
          aria-hidden
        />
      </div>

      {/* Second outline (border stroke) */}
      <div
        className="absolute"
        style={{ left: 99, top: 844, width: 1589, height: 2256 }}
      >
        <img
          src={icebergOutline2}
          alt=""
          className="w-full h-full object-contain"
          aria-hidden
        />
      </div>

      {/* ── Robot / AI figure on the waterline ── */}
      <Robot />

      {/* ── Resource cards overlaid on the iceberg (page-absolute coords) ── */}
      <ResourceCard src={image17} alt="Ressource – surface" left={227}  top={1394} width={617} height={189} />
      <ResourceCard src={image12} alt="Ressource – milieu"  left={1003} top={2150} />
      <ResourceCard src={image14} alt="Ressource – fond"    left={523}  top={2901} />

      {/* ── Bottom underline decoration ── */}
      <div
        className="absolute"
        style={{ left: '50%', transform: 'translateX(-50%)', top: 1036, width: 234, height: 20 }}
      >
        <img src={wavyLine} alt="" className="w-full h-full" aria-hidden />
      </div>
    </>
  );
}
