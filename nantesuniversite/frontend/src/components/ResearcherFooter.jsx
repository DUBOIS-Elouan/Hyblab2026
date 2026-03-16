import LinkedResearcherCard from './LinkedResearcherCard';
import portraitPhilippeMoreau from '../assets/Philippe-Moreau.png';
import portraitMargotDelon from '../assets/MargotDelon.jpg';
import portraitPierreAntoineGourraud from '../assets/PierreAntoineGourraud.jpg';
import paroleExpertLogo from '../assets/paroleExpertByNantesLogo.svg';

// Figma asset URLs (expire after 7 days — replace with permanent assets when available)
const imgLogoWhite = 'https://www.figma.com/api/mcp/asset/6474731b-6109-4b99-b268-103ea120a50d';
const imgFacebook  = 'https://www.figma.com/api/mcp/asset/adffdc41-103b-49c3-b8ac-bcab99a197e3';
const imgInstagram = 'https://www.figma.com/api/mcp/asset/58a7eb6b-128e-49f3-9cab-2a0806b78398';
const imgLinkedin  = 'https://www.figma.com/api/mcp/asset/64407574-731e-4d03-9bfd-537baf9cb6b0';

const LINKED_RESEARCHERS = [
  {
    top: 4835,
    name: "Philippe Moreau",
    role: "Classé parmi les chercheurs les plus cités au monde, il transforme la lutte contre le myélome multiple grâce à l'excellence clinique nantaise.",
    url: "https://www.chu-nantes.fr/nantes-philippe-moreau-parmi-les-chercheurs-les-plus-cites-du-monde-1",
    portrait: portraitPhilippeMoreau,
  },
  {
    top: 4835 + 146,
    name: 'Margot Delon',
    role: "Sociologue au CNRS, elle explore « l'autre histoire des inégalités urbaines » à travers le parcours des enfants des bidonvilles.",
    url: 'https://bu.univ-nantes.fr/animations-culturelles/chercheurs-a-la-bu-lettres',
    portrait: portraitMargotDelon,
  },
  {
    top: 4835 + 146 * 2,
    name: 'Pierre-Antoine Gourraud',
    role: "« L'utilisation de nos données médicales pourrait permettre aux médecins de nous guérir plus efficacement et de prévenir l'apparition de maladies. »",
    url: 'https://fondation.univ-nantes.fr/accueil/big-data-en-sante-a-nantes-les-chercheurs-utilisent-nos-donnees-pour-proposer-un-meilleur-traitement-aux-patients',
    portrait: portraitPierreAntoineGourraud,
  },
];

export default function ResearcherFooter() {
  return (
    <>
      {/* ── Right column: "CHERCHEURS À LA UNE" ──────────────────────────── */}
      <p
        className="absolute not-italic m-0 text-[#f9f9f9] text-[36px] leading-normal"
        style={{
          left: '1050px',
          top: '4760px',
          fontFamily: "'Massilia', Inter, sans-serif",
          fontWeight: 700,
        }}
      >
        CHERCHEURS À LA UNE
      </p>

      {LINKED_RESEARCHERS.map((researcher, i) => (
        <LinkedResearcherCard key={i} {...researcher} />
      ))}

      {/* ── Left column: large title block ───────────────────────────────── */}
      <p
        className="absolute not-italic m-0 text-white whitespace-pre-wrap"
        style={{
          left: '135px',
          top: '4850px',
          width: '780px',
          fontSize: '128px',
          lineHeight: '1',
          fontFamily: "'Poppins', Inter, sans-serif",
          fontWeight: 800,
          textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        {`DANS LA MÊME THÉMATIQUE`}
      </p>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      {/* Separator line */}
      <div
        className="absolute bg-white opacity-30"
        style={{ left: '94px', top: '5480px', width: '1732px', height: '1px' }}
      />

      {/* Parole d'expert logo (left) */}
      <img
        src={paroleExpertLogo}
        alt="Parole d'Expert"
        className="absolute"
        style={{
          left: '94px',
          top: '5500px',
          width: '382px',
          height: '77px',
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Social media icons */}
      <div className="absolute flex gap-[20px]" style={{ left: '126px', top: '5620px' }}>
        <img src={imgFacebook}  alt="Facebook"  className="w-[62px] h-[62px]" />
        <img src={imgInstagram} alt="Instagram" className="w-[62px] h-[62px]" />
        <img src={imgLinkedin}  alt="LinkedIn"  className="w-[62px] h-[62px]" />
      </div>

      {/* Legal text (center) */}
      <div
        className="absolute text-white whitespace-pre-wrap"
        style={{
          left: '799px',
          top: '5500px',
          width: '951px',
          fontFamily: "'Massilia', Inter, sans-serif",
          fontSize: '24px',
          lineHeight: '1.4',
        }}
      >
        <p className="m-0 font-bold">Mentions légales</p>
        <p className="m-0 mt-[12px] font-normal">Crédits et aspects légaux</p>
        <p className="m-0 font-normal">Cookies</p>
        <p className="m-0 font-normal">Plan du site</p>
        <p className="m-0 font-normal">Accessibilité : partiellement conforme</p>
      </div>

      {/* Nantes Université white logo (right) */}
      <img
        src={imgLogoWhite}
        alt="Nantes Université"
        className="absolute"
        style={{ left: '1535px', top: '5500px', width: '201px', height: '148px', objectFit: 'contain' }}
      />
    </>
  );
}
