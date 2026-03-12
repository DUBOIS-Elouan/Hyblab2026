import Robot from './Robot';
import ResourceCard from './ResourceCard';

const icebergOutline =
  'https://www.figma.com/api/mcp/asset/ed280a18-c9a6-4b5b-b584-fe283d4e6e3b';
const icebergFill =
  'https://www.figma.com/api/mcp/asset/b53d0bd9-e34d-49d4-867c-6ea91180367f';
const icebergOutline2 =
  'https://www.figma.com/api/mcp/asset/97291215-22a8-4dfe-8173-94ba807df28f';
const wavyLine =
  'https://www.figma.com/api/mcp/asset/c0a9c643-0832-408a-a0c4-6ffc7a551fce';
const arrowDown =
  'https://www.figma.com/api/mcp/asset/b9e837d7-a221-4db8-9150-c194392122b4';

const image17 =
  'https://www.figma.com/api/mcp/asset/c8199dd4-7905-4ddc-b5f3-8f95bf9887b6';
const image12 =
  'https://www.figma.com/api/mcp/asset/b89bb61f-1c99-49a8-967c-f6500f6b4805';
const image14 =
  'https://www.figma.com/api/mcp/asset/b1408a78-8993-4bb9-9038-189f493955c8';

export default function IcebergScene() {
  return (
    <>
      {/* Scroll arrow */}
      <div className="absolute left-1/2 top-[888px] -translate-x-1/2">
        <img src={arrowDown} alt="Défiler vers le bas" className="w-[34px] h-[101px]" />
      </div>

      {/* Wavy water-surface lines */}
      <div className="absolute left-[1678px] top-[1488px] w-[242px] h-[9px]">
        <img src={wavyLine} alt="" className="w-full h-full" aria-hidden />
      </div>
      <div className="absolute left-[-74px] top-[1644px] w-[242px] h-[9px]">
        <img src={wavyLine} alt="" className="w-full h-full" aria-hidden />
      </div>

      {/* Iceberg layers */}
      <div className="absolute left-[99px] top-[844px] w-[1589px] h-[2256px]">
        <img src={icebergOutline} alt="Iceberg" className="w-full h-full object-contain" />
      </div>
      <div className="absolute left-[99px] top-[844px] w-[1589px] h-[2256px]">
        <img src={icebergFill} alt="" className="w-full h-full object-contain" aria-hidden />
      </div>
      <div className="absolute left-[99px] top-[844px] w-[1589px] h-[2256px]">
        <img src={icebergOutline2} alt="" className="w-full h-full object-contain" aria-hidden />
      </div>

      {/* Robot on the waterline */}
      <Robot />

      {/* Resource cards at increasing iceberg depths */}
      <ResourceCard src={image17} alt="Ressource – surface" left={227}  top={1394} width={617} height={189} />
      <ResourceCard src={image12} alt="Ressource – milieu"  left={1003} top={2150} />
      <ResourceCard src={image14} alt="Ressource – fond"    left={523}  top={2901} />

      {/* Bottom wavy decoration */}
      <div className="absolute left-1/2 top-[1036px] -translate-x-1/2 w-[234px] h-[20px]">
        <img src={wavyLine} alt="" className="w-full h-full" aria-hidden />
      </div>
    </>
  );
}
