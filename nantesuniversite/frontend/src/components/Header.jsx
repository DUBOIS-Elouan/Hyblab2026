const paroleExpertLogo =
  'https://www.figma.com/api/mcp/asset/fefc7487-e522-4e09-91a7-cfaaaa37824d';
const nantesLogo =
  'https://www.figma.com/api/mcp/asset/c40bc5a9-c9b9-4e26-885e-353f57d9ee1d';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 flex items-start justify-between px-[61px] pt-[15px] z-10">
      <div className="w-[180px] h-[54px]">
        <img src={paroleExpertLogo} alt="Parole d'Expert" className="block w-full h-full object-contain" />
      </div>

      <div className="w-[245px] h-[82px]">
        <img src={nantesLogo} alt="Nantes Université" className="block w-full h-full object-contain" />
      </div>
    </header>
  );
}
