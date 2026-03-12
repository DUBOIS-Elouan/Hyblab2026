import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let instance = null;

export function getLenis() {
  return instance;
}

export function initLenis(onScroll) {
  instance = new Lenis({ lerp: 0.08 });

  instance.on('scroll', (e) => {
    ScrollTrigger.update();
    onScroll?.(e);
  });

  gsap.ticker.add((time) => instance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return instance;
}

export function destroyLenis() {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}
