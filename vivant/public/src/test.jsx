import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import path1Raw from '/paths/1.svg?raw';
import path2Raw from '/paths/2.svg?raw';
import path3Raw from '/paths/3.svg?raw';

const dicoPaths = {
  path1 : { raw: path1Raw, svg: '/paths/1.svg' },
  path2 :{ raw: path2Raw, svg: '/paths/2.svg' },
  path3 :{ raw: path3Raw, svg: '/paths/3.svg' }
}

const pathList = [
  dicoPaths.path1,
  dicoPaths.path2,
  dicoPaths.path3,
  dicoPaths.path2,
  dicoPaths.path1,
  dicoPaths.path3
];

const InfinitePath = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathRefs = useRef([]);
  const [pathsData, setPathsData] = useState([]);
  
  const [cyclistX, setCyclistX] = useState("50%");
  const pathY = useMotionValue("calc(85vh - 100%)");

  const SPEED_DESKTOP = 2700;
  const SPEED_MOBILE = 1300;

  const dynamicHeight = useMemo(() => {
    const speed = isMobile ? SPEED_MOBILE : SPEED_DESKTOP;
    // adapt nb de chemins
    const multiplier = Math.max(1, pathList.length / 2);
    return `${multiplier * speed}vh`;
  }, [isMobile, pathList.length]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const parser = new DOMParser();
    const extracted = pathList.map(pathObj => {
      const doc = parser.parseFromString(pathObj.raw, "image/svg+xml");
      const path = doc.getElementById("cyclist-path");
      const svgTag = doc.querySelector("svg");
      const viewBox = svgTag?.getAttribute("viewBox")?.split(" ") || [0, 0, 767.25, 7337.6];
      return {
        d: path?.getAttribute("d"),
        width: parseFloat(viewBox[2]),
        height: parseFloat(viewBox[3])
      };
    });
    setPathsData(extracted);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 3,
    restDelta: 0.000001,
    restSpeed: 0.000001
  });

  const activeProgress = isMobile ? scrollYProgress : smoothProgress;
  const latestCyclistX = useRef(null)
  const [cyclistSvgPos, setCyclistSvgPos] = useState("/mr_patate/up_right.svg")

  const updateCyclistPos = (currentCyclistX) => {
    console.log(currentCyclistX, latestCyclistX)
    latestCyclistX.current = currentCyclistX
  }

  useEffect(() => {
    const unsubscribe = activeProgress.on("change", (latest) => {
    
      if (pathsData.length === 0) return;

      const totalSegments = pathList.length;
      const globalPos = latest * totalSegments;

      const maxIndex = Math.max(0, pathList.length - 1);
      const index = Math.min(Math.floor(globalPos), maxIndex);

      const localProgress = globalPos - index;

      const pathEl = pathRefs.current[index];
      const data = pathsData[index];
      if (!pathEl || !data) return;

      const length = pathEl.getTotalLength();
      
      // On regarde où sont le tout premier point et le tout dernier point de la ligne
      const pStart = pathEl.getPointAtLength(0);
      const pEnd = pathEl.getPointAtLength(length);
      
      // Si le point de départ a un Y plus grand que le point de fin, la ligne monte.
      const isDrawnBottomToTop = pStart.y > pEnd.y;

      // On force t pour qu'il aille TOUJOURS du point le plus bas vers le point le plus haut !
      const t = isDrawnBottomToTop ? localProgress : 1 - localProgress;
      
      const point = pathEl.getPointAtLength(t * length);
      
      updateCyclistPos(point.x)

      // 1. POSITION X DU CYCLISTE
      const xPercent = (point.x / data.width) * 100;
      setCyclistX(`${xPercent}%`);

      // 2. POSITION Y DU DÉCOR
      const N = pathList.length;
      const percentY = ((N - 1 - index) + (point.y / data.height)) / N * 100;
      
      pathY.set(`calc(85vh - ${percentY}%)`);
    });

    return () => unsubscribe();
  }, [activeProgress, pathsData, pathList.length]);

  return (
    <div ref={containerRef} className="relative" style={{ height: dynamicHeight }}>
      <div className="sticky top-0 mask-y-from-75% mask-y-to-90% h-screen overflow-hidden flex justify-center [perspective:1200px]">
        <div
          className="xl:w-[50vw] relative w-[110vw] flex-none"
          style={{ transform: "rotateX(50deg)", transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="flex flex-col-reverse w-full will-change-transform"
            style={{ y: pathY }}
          >
            {pathList.map((pathObj, i) => (
              <div key={i} className="relative w-full">
                <img
                  src={pathObj.svg}
                  className="w-full h-full object-cover -mt-1"
                  alt={`Path ${i}`}
                />
                {pathsData[i] && (
                  <svg
                    viewBox={`0 0 ${pathsData[i].width} ${pathsData[i].height}`}
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full z-10"
                  >
                    <path
                      ref={el => (pathRefs.current[i] = el)}
                      d={pathsData[i].d}
                      fill="none"
                      style={{ opacity: 0 }}
                    />
                  </svg>
                )}
              </div>
            ))}
          </motion.div>

          {/* VÉLO */}
          <motion.div
            className="absolute bottom-[10%] z-50 w-24 h-24 pointer-events-none"
            style={{
              left: cyclistX,
              transform: "translateX(-50%) translateZ(20px) rotateX(-50deg)",
              transformOrigin: "bottom center"
            }}
          >
            <img src={cyclistSvgPos} className="w-full h-full object-contain relative z-10" alt="vélo" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfinitePath;