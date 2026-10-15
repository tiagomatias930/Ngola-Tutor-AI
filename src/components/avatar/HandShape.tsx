import React from 'react';
import type {FingerState, HandShapeSpec, ThumbState} from './libras-alphabet';

const SKIN = '#e0ac7e';
const SKIN_SHADE = '#c98f5f';

const FINGER_X = [31, 42, 53, 64];
const FINGER_W = 10;
const FINGER_LEN = [40, 46, 42, 33];
const PALM = {x: 28, y: 54, w: 48, h: 46};
const stroke = {fill: SKIN, stroke: SKIN_SHADE, strokeWidth: 1};

const Finger: React.FC<{i: number; state: FingerState; spread?: boolean; cross?: boolean}> = ({i, state, spread, cross}) => {
  const x = FINGER_X[i];
  const len = FINGER_LEN[i];
  const tilt = spread ? (i - 1.5) * 9 : 0;
  const crossTilt = cross && i === 0 ? 8 : cross && i === 1 ? -8 : 0;
  const pivot = `${x + FINGER_W / 2} ${PALM.y}`;
  if (state === 'up') {
    return <rect x={x} y={PALM.y - len} width={FINGER_W} height={len + 6} rx={5} {...stroke} transform={`rotate(${tilt + crossTilt} ${pivot})`} />;
  }
  if (state === 'hook') {
    const half = len * 0.55;
    return (
      <g transform={`rotate(${tilt} ${pivot})`}>
        <rect x={x} y={PALM.y - half} width={FINGER_W} height={half + 6} rx={5} {...stroke} />
        <rect x={x} y={PALM.y - half} width={len * 0.45} height={FINGER_W} rx={5} {...stroke} />
      </g>
    );
  }
  // curl: folded over the palm
  return <rect x={x - 1} y={PALM.y - 2} width={FINGER_W + 2} height={20} rx={6} {...stroke} />;
};

function Thumb({state}: {state: ThumbState}) {
  switch (state) {
    case 'out':
      return <rect x={4} y={62} width={34} height={11} rx={5.5} transform="rotate(-25 38 68)" {...stroke} />;
    case 'up':
      return <rect x={20} y={40} width={11} height={40} rx={5.5} {...stroke} />;
    case 'across':
      return <rect x={30} y={78} width={40} height={11} rx={5.5} {...stroke} />;
    case 'tuck':
      return <rect x={40} y={60} width={14} height={18} rx={6} {...stroke} />;
    case 'touch':
      return <rect x={24} y={46} width={11} height={36} rx={5.5} transform="rotate(25 30 80)" {...stroke} />;
  }
}

const ROTATION = {up: 0, side: 90, down: 180} as const;

/** Procedural SVG hand. Coordinate space 100×120, wrist at the bottom centre. */
export const HandShape: React.FC<{spec: HandShapeSpec; className?: string}> = ({spec, className}) => (
  <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
    <g transform={`rotate(${ROTATION[spec.orient ?? 'up']} 50 100)`}>
      <rect x={PALM.x} y={PALM.y} width={PALM.w} height={PALM.h} rx={12} {...stroke} />
      {spec.fingers.map((state, i) => (
        <Finger key={i} i={i} state={state} spread={spec.spread} cross={spec.cross} />
      ))}
      <Thumb state={spec.thumb} />
      <rect x={36} y={98} width={32} height={20} rx={4} fill={SKIN} />
    </g>
  </svg>
);
