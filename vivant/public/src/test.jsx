import { motion } from "framer-motion";

const images = [
  "/plan_chemin.svg",
  "/plan_chemin.svg",
  "/plan_chemin.png",
  "/plan_chemin.svg",
];

const duplicatedImages = [...images, ...images];

const ImageCrawl = () => {
  return (
    <div className="relative h-screen w-full bg-slate-950 overflow-hidden flex justify-center [perspective:800px]">
      
      <div 
        className="relative w-full-screen" 
        style={{ 
          transform: "rotateX(20deg)",
          transformStyle: "preserve-3d" 
        }}
      >
        
        <motion.div 
          className="flex flex-col"
          initial={{ y: "0%" }}
          animate={{ y: "-50%" }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div 
              key={index}
              className="w-full h-80 rounded-lg border-2 border-white/10 overflow-hidden bg-slate-900"
            >
              <img 
                src={src} 
                alt={`Plan ${index}`} 
                className="w-full h-full object-contain p-4" 
              />
            </div>
          ))}
        </motion.div>
        
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950 via-transparent to-transparent h-1/2" />
      
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
};

export default ImageCrawl;