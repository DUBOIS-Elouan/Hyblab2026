import Robot from './Robot';
import ResourceCard from './ResourceCard';
import DataIceberg from './DataIceberg';
import ScrollArrow from './ScrollArrow';
import data from '../data/data.json';

import prixSvg from '../data/pictogramme/prix.svg';
import articleSvg from '../data/pictogramme/article.svg';
import conferenceSvg from '../data/pictogramme/conference.svg';
import livreSvg from '../data/pictogramme/livre.svg';
import podcastSvg from '../data/pictogramme/podcast.svg';
import rechercheSvg from '../data/pictogramme/recherche.svg';

const PICTOGRAMMES = {
  prix: prixSvg, article: articleSvg, conference: conferenceSvg,
  livre: livreSvg, podcast: podcastSvg, recherche: rechercheSvg,
};

// ─── Adjust these positions to move cards on the iceberg ───────────────────
//  Positions from Figma (Calque_1 images, converted to absolute page coords)
//  left: horizontal px  |  top: vertical px  (waterline ≈ y 1939)
const CARD_POSITIONS = [
  { left:  459, top: 1406 }, // 1
  { left:  960, top: 1735 }, // 2
  { left:  212, top: 1884 }, // 3
  { left:  980, top: 1993 }, // 4
  { left:  268, top: 2126 }, // 5
  { left:  758, top: 2189 }, // 6
  { left: 1042, top: 2266 }, // 7
  { left: 1068, top: 2506 }, // 8
  { left:  583, top: 2508 }, // 9
  { left:  109, top: 2630 }, // 10
  { left:  338, top: 2780 }, // 11
  { left: 1070, top: 3061 }, // 12
  { left:  313, top: 3137 }, // 13
  { left:  800, top: 3482 }, // 14
  { left: 1037, top: 3731 }, // 15
];
// ───────────────────────────────────────────────────────────────────────────

const cardDocuments = data.researcher.documents.slice(0, 15);


export default function IcebergScene() {
  return (
    <>
      {/* Scroll down arrow — node 15:2: x=1032, y=853 → left=calc(50%+72px) */}
      <ScrollArrow direction="down" left="calc(50% + 72px)" top={853} translateX="-50%" />

      {/* Full iceberg: node 65:5 x=45, y=979, w=1832, h=3200 */}
      <div className="absolute left-[45px] top-[979px] w-[1832px] h-[3200px]">
        <DataIceberg className="w-full h-full" />
      </div>



      {/* Resource cards at increasing iceberg depths */}
      {cardDocuments.map((doc, i) => (
        <ResourceCard
          key={doc.id}
          pictogramme={PICTOGRAMMES[doc.category]}
          category={doc.category}
          title={doc.title}
          description={doc.description}
          {...CARD_POSITIONS[i]}
        />
      ))}
    </>
  );
}
