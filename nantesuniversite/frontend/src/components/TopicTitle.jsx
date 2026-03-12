import tete from "../assets/tete.svg"
export default function TopicTitle() {
  return (
    <>
     {/*ICI J4AI CHANGE LE WIDTH ET L EHEIGHT*/}
      <div className="absolute left-[71px] absolute top-[202px] w-[100px] h-[60px]">
        <img src={tete} alt="Tete de robot" className="w-full h-full object-cover" />
      </div>
        {/* Trait vertical bleu */}

      <div className="absolute left-[153px] absolute top-[200px] w-[4px] h-[50px] bg-blue-600"></div>
    
      <p className="absolute left-[172px] top-[195px] text-brand-blue text-[29px] font-bold">
      <span>Intelligence</span>
      <span className="absolute top-[29px] left-0">Artificielle</span>
    </p>
      <p className="absolute left-[959px] top-[130px] w-[865px] h-[88px] text-brand-blue text-[80px] font-extrabold whitespace-nowrap"
>       {`COLIN DE LA HAGUERA`}
      </p>

      <p
        className="absolute left-[910px] top-[250px] w-[914px] h-[51px] text-brand-blue text-[32px] leading-normal not-italic whitespace-nowrap"
        style={{ fontFamily: " sans-serif" }}
      >
        {`ACCOMPAGNER LE DÉPLOIEMENT DE L'IA DANS L'ÉDUCATION`}
      </p>
    </>
  );
}
