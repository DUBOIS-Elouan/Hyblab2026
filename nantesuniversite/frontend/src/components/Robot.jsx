import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Robot.module.css';

import robot1Head from '../assets/robot/robot1-head.png';
import robot1Body from '../assets/robot/robot1-body.png';
import robot1Wheel from '../assets/robot/robot1-wheel.png';

import robot2Head from '../assets/robot/robot2-head.png';
import robot2UpperBody from '../assets/robot/robot2-upper-body.png';
import robot2LowerBody from '../assets/robot/robot2-lower-body.png';
import robot2ArmBack from '../assets/robot/robot2-arm-back.png';
import robot2ArmFront from '../assets/robot/robot2-arm-front.png';

import robot3Head from '../assets/robot/robot3-head.png';
import robot3Body from '../assets/robot/robot3-body.png';
import robot3ArmBackA from '../assets/robot/robot3-arm-back.png';
import robot3ArmBackB from '../assets/robot/robot3-arm-back(1).png';
import robot3LegBackA from '../assets/robot/robot3-leg1-back.png';
import robot3LegBackB from '../assets/robot/robot3-leg2-back.png';
import robot3LegFront from '../assets/robot/robot3-leg-front.png';

const DEFAULT_RANGES = {
  general: { start: 1130, end: 1820, center: 1475 },
  journalistique: { start: 1880, end: 2760, center: 2320 },
  expert: { start: 2870, end: 3370, center: 3120 },
};

const ROBOT_SIZE = { width: 206, height: 252 };
const ROBOT_STAGES = ['robot1', 'robot2', 'robot3'];

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function lerp(start, end, t) {
  return start + ((end - start) * t);
}

function cubicBezierPoint(p0, p1, p2, p3, t) {
  const inv = 1 - t;
  const invSquared = inv * inv;
  const tSquared = t * t;

  return {
    x: (invSquared * inv * p0.x)
      + (3 * invSquared * t * p1.x)
      + (3 * inv * tSquared * p2.x)
      + (tSquared * t * p3.x),
    y: (invSquared * inv * p0.y)
      + (3 * invSquared * t * p1.y)
      + (3 * inv * tSquared * p2.y)
      + (tSquared * t * p3.y),
  };
}

function mixWeights(fromVariant, toVariant, progress) {
  const weights = { robot1: 0, robot2: 0, robot3: 0 };
  weights[fromVariant] = 1 - progress;
  weights[toVariant] = progress;
  return weights;
}

function getAnchorPoints(ranges) {
  return {
    start: { x: 432, y: 804 },
    generalStop: { x: 1460, y: ranges.general.center - 40 },
    journalisticStop: { x: 240, y: ranges.journalistique.center - 30 },
    expertStop: { x: 1160, y: ranges.expert.center - 60 },
  };
}

function getRobotState(scrollProbeY, ranges) {
  const anchors = getAnchorPoints(ranges);

  if (scrollProbeY <= ranges.general.start) {
    return {
      position: anchors.start,
      weights: { robot1: 1, robot2: 0, robot3: 0 },
      stage: 0,
    };
  }

  if (scrollProbeY <= ranges.general.end) {
    const t = clamp01((scrollProbeY - ranges.general.start) / Math.max(1, ranges.general.end - ranges.general.start));
    return {
      position: cubicBezierPoint(
        anchors.start,
        { x: anchors.start.x + 220, y: anchors.start.y + 140 },
        { x: anchors.generalStop.x - 260, y: anchors.generalStop.y - 160 },
        anchors.generalStop,
        t,
      ),
      weights: { robot1: 1, robot2: 0, robot3: 0 },
      stage: 0,
    };
  }

  if (scrollProbeY <= ranges.journalistique.start) {
    const t = clamp01((scrollProbeY - ranges.general.end) / Math.max(1, ranges.journalistique.start - ranges.general.end));
    return {
      position: cubicBezierPoint(
        anchors.generalStop,
        { x: anchors.generalStop.x - 100, y: anchors.generalStop.y + 260 },
        { x: anchors.journalisticStop.x + 320, y: anchors.journalisticStop.y - 180 },
        anchors.journalisticStop,
        t,
      ),
      weights: mixWeights('robot1', 'robot2', t),
      stage: t < 0.5 ? 0 : 1,
    };
  }

  if (scrollProbeY <= ranges.journalistique.end) {
    return {
      position: anchors.journalisticStop,
      weights: { robot1: 0, robot2: 1, robot3: 0 },
      stage: 1,
    };
  }

  if (scrollProbeY <= ranges.expert.start) {
    const t = clamp01((scrollProbeY - ranges.journalistique.end) / Math.max(1, ranges.expert.start - ranges.journalistique.end));
    return {
      position: cubicBezierPoint(
        anchors.journalisticStop,
        { x: anchors.journalisticStop.x + 160, y: anchors.journalisticStop.y + 320 },
        { x: anchors.expertStop.x - 260, y: anchors.expertStop.y - 120 },
        anchors.expertStop,
        t,
      ),
      weights: mixWeights('robot2', 'robot3', t),
      stage: t < 0.5 ? 1 : 2,
    };
  }

  return {
    position: anchors.expertStop,
    weights: { robot1: 0, robot2: 0, robot3: 1 },
    stage: 2,
  };
}

export default function Robot({ levelRanges = DEFAULT_RANGES }) {
  const [stageIndex, setStageIndex] = useState(0);

  const rootRef = useRef(null);
  const shadowRef = useRef(null);
  const motionRef = useRef(null);

  const robot1FormRef = useRef(null);
  const robot1HeadRef = useRef(null);
  const robot1BodyRef = useRef(null);
  const robot1WheelRef = useRef(null);

  const robot2FormRef = useRef(null);
  const robot2HeadRef = useRef(null);
  const robot2BodyRef = useRef(null);
  const robot2ArmBackRef = useRef(null);
  const robot2ArmFrontRef = useRef(null);

  const robot3FormRef = useRef(null);
  const robot3HeadRef = useRef(null);
  const robot3BodyRef = useRef(null);
  const robot3ArmBackARef = useRef(null);
  const robot3ArmBackBRef = useRef(null);
  const robot3LegBackRef = useRef(null);
  const robot3LegFrontRef = useRef(null);

  useLayoutEffect(() => {
    const shadow = shadowRef.current;
    const motion = motionRef.current;

    if (!shadow || !motion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const forms = [robot1FormRef.current, robot2FormRef.current, robot3FormRef.current].filter(Boolean);
      gsap.set(forms, { autoAlpha: 0, scale: 0.96, y: 8 });
      gsap.set(robot1FormRef.current, { autoAlpha: 1, scale: 1, y: 0 });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(motion, { y: -8, duration: 2.8 })
        .to(motion, { y: 3, duration: 2.8 });

      gsap.to(shadow, {
        scaleX: 0.84,
        opacity: 0.18,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(robot1HeadRef.current, { transformOrigin: '50% 84%' });
      gsap.set(robot1BodyRef.current, { transformOrigin: '50% 54%' });
      gsap.set(robot1WheelRef.current, { transformOrigin: '50% 50%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(robot1FormRef.current, { y: -8, rotate: 2.2, duration: 1.35 })
        .to(robot1FormRef.current, { y: 6, rotate: -1.9, duration: 1.35 });

      gsap.to(robot1HeadRef.current, {
        rotate: 9,
        y: -10,
        x: 3,
        duration: 0.95,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot1BodyRef.current, {
        scaleY: 1.03,
        scaleX: 0.985,
        duration: 1.35,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot1WheelRef.current, {
        rotate: 16,
        y: 3,
        duration: 0.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(robot2HeadRef.current, { transformOrigin: '43% 19%' });
      gsap.set(robot2ArmBackRef.current, { transformOrigin: '58% 31%' });
      gsap.set(robot2ArmFrontRef.current, { transformOrigin: '48% 41%' });
      gsap.set(robot2BodyRef.current, { transformOrigin: '50% 55%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(robot2FormRef.current, { y: -10, rotate: 1.1, duration: 2.15 })
        .to(robot2FormRef.current, { y: 4, rotate: -0.9, duration: 2.15 });

      gsap.to(robot2HeadRef.current, {
        rotate: -4,
        y: -6,
        x: -1,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot2ArmBackRef.current, {
        rotate: 2.5,
        x: -2,
        y: 2,
        duration: 1.95,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot2ArmFrontRef.current, {
        rotate: 3.5,
        x: 3,
        y: -1,
        duration: 1.65,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot2BodyRef.current, {
        scaleY: 1.014,
        scaleX: 0.992,
        duration: 2.15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(robot3HeadRef.current, { transformOrigin: '50% 78%' });
      gsap.set(robot3BodyRef.current, { transformOrigin: '50% 52%' });
      gsap.set(robot3ArmBackARef.current, { transformOrigin: '72% 24%' });
      gsap.set(robot3ArmBackBRef.current, { transformOrigin: '69% 36%' });
      gsap.set(robot3LegBackRef.current, { transformOrigin: '41% 21%' });
      gsap.set(robot3LegFrontRef.current, { transformOrigin: '26% 26%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(robot3FormRef.current, { y: -6, rotate: 0.55, duration: 3.1 })
        .to(robot3FormRef.current, { y: 2, rotate: -0.45, duration: 3.1 });

      gsap.to(robot3HeadRef.current, {
        rotate: -2,
        y: -4,
        duration: 2.25,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3BodyRef.current, {
        scaleY: 1.01,
        scaleX: 0.996,
        duration: 3.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3ArmBackARef.current, {
        rotate: -3,
        x: -2,
        duration: 2.35,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3ArmBackBRef.current, {
        rotate: 2.4,
        x: 2,
        duration: 2.65,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3LegBackRef.current, {
        rotate: 3.5,
        y: 2,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3LegFrontRef.current, {
        rotate: -2.5,
        x: 2,
        y: 1,
        duration: 2.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const formRefs = {
      robot1: robot1FormRef.current,
      robot2: robot2FormRef.current,
      robot3: robot3FormRef.current,
    };

    if (!root) {
      return undefined;
    }

    const xTo = gsap.quickTo(root, 'x', { duration: 0.55, ease: 'power2.out' });
    const yTo = gsap.quickTo(root, 'y', { duration: 0.55, ease: 'power2.out' });

    let rafId = 0;

    function applyRobotState() {
      rafId = 0;
      const probeY = window.scrollY + (window.innerHeight * 0.45);
      const state = getRobotState(probeY, { ...DEFAULT_RANGES, ...levelRanges });

      xTo(state.position.x);
      yTo(state.position.y);

      ROBOT_STAGES.forEach((variant) => {
        const form = formRefs[variant];
        if (!form) {
          return;
        }

        const weight = state.weights[variant];
        gsap.set(form, {
          autoAlpha: weight,
          scale: lerp(0.96, 1, weight),
          y: lerp(10, 0, weight),
        });
      });

      setStageIndex(state.stage);
    }

    function requestUpdate() {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(applyRobotState);
    }

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [levelRanges]);

  return (
    <div
      ref={rootRef}
      className="absolute left-0 top-0"
      style={{ width: ROBOT_SIZE.width, height: ROBOT_SIZE.height }}
    >
      <div className={`${styles.robotShell} ${styles[`robotShellStage${stageIndex}`] ?? ''}`}>
        <div ref={shadowRef} className={styles.robotShellShadow} />
        <div className={styles.robotShellHalo} />
        <div className={`${styles.robotShellRing} ${styles.robotShellRingInner}`} />
        <div className={`${styles.robotShellRing} ${styles.robotShellRingOuter}`} />

        <div ref={motionRef} className={styles.robotShellMotion}>
          <div ref={robot1FormRef} className={styles.robotShellForm}>
            <img ref={robot1BodyRef} src={robot1Body} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot1WheelRef} src={robot1Wheel} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot1HeadRef} src={robot1Head} alt="Robot 1" className={styles.robotShellPart} />
          </div>

          <div ref={robot2FormRef} className={styles.robotShellForm}>
            <img ref={robot2ArmBackRef} src={robot2ArmBack} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot2BodyRef} src={robot2LowerBody} alt="" aria-hidden className={styles.robotShellPart} />
            <img src={robot2UpperBody} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot2ArmFrontRef} src={robot2ArmFront} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot2HeadRef} src={robot2Head} alt="Robot 2" className={styles.robotShellPart} />
          </div>

          <div ref={robot3FormRef} className={styles.robotShellForm}>
            <img ref={robot3ArmBackARef} src={robot3ArmBackA} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot3ArmBackBRef} src={robot3ArmBackB} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot3LegBackRef} src={robot3LegBackB} alt="" aria-hidden className={styles.robotShellPart} />
            <img src={robot3LegBackA} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot3BodyRef} src={robot3Body} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot3LegFrontRef} src={robot3LegFront} alt="" aria-hidden className={styles.robotShellPart} />
            <img ref={robot3HeadRef} src={robot3Head} alt="Robot 3" className={styles.robotShellPart} />
          </div>
        </div>
      </div>
    </div>
  );
}
