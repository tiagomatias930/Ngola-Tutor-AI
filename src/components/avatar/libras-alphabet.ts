/**
 * Hand-shape descriptions for the Brazilian manual alphabet (LIBRAS
 * datilologia). Each letter is described by finger states instead of a bitmap
 * so one procedural SVG renders all of them.
 *
 * These are simplified approximations meant for fingerspelling names and
 * unknown words — not a full LIBRAS grammar translation.
 */
export type FingerState = 'up' | 'hook' | 'curl';
export type ThumbState = 'out' | 'up' | 'across' | 'tuck' | 'touch';
export type Orientation = 'up' | 'side' | 'down';
export type Motion = 'none' | 'j' | 'z';

export interface HandShapeSpec {
  /** index, middle, ring, pinky */
  fingers: [FingerState, FingerState, FingerState, FingerState];
  thumb: ThumbState;
  spread?: boolean;
  cross?: boolean;
  orient?: Orientation;
  motion?: Motion;
}

const U: FingerState = 'up';
const H: FingerState = 'hook';
const C: FingerState = 'curl';

export const REST_SHAPE: HandShapeSpec = {fingers: [H, H, H, H], thumb: 'across', orient: 'up'};

export const LIBRAS_ALPHABET: Record<string, HandShapeSpec> = {
  A: {fingers: [C, C, C, C], thumb: 'up'},
  B: {fingers: [U, U, U, U], thumb: 'across'},
  C: {fingers: [H, H, H, H], thumb: 'out', orient: 'side'},
  D: {fingers: [U, C, C, C], thumb: 'touch'},
  E: {fingers: [H, H, H, H], thumb: 'across'},
  F: {fingers: [C, U, U, U], thumb: 'touch', spread: true},
  G: {fingers: [U, C, C, C], thumb: 'out', orient: 'side'},
  H: {fingers: [U, U, C, C], thumb: 'across', orient: 'side'},
  I: {fingers: [C, C, C, U], thumb: 'across'},
  J: {fingers: [C, C, C, U], thumb: 'across', motion: 'j'},
  K: {fingers: [U, U, C, C], thumb: 'touch', spread: true},
  L: {fingers: [U, C, C, C], thumb: 'out'},
  M: {fingers: [C, C, C, C], thumb: 'tuck'},
  N: {fingers: [C, C, C, C], thumb: 'tuck', cross: true},
  O: {fingers: [H, H, H, H], thumb: 'touch'},
  P: {fingers: [U, U, C, C], thumb: 'touch', spread: true, orient: 'down'},
  Q: {fingers: [U, C, C, C], thumb: 'out', orient: 'down'},
  R: {fingers: [U, U, C, C], thumb: 'across', cross: true},
  S: {fingers: [C, C, C, C], thumb: 'across'},
  T: {fingers: [C, C, C, C], thumb: 'touch'},
  U: {fingers: [U, U, C, C], thumb: 'across'},
  V: {fingers: [U, U, C, C], thumb: 'across', spread: true},
  W: {fingers: [U, U, U, C], thumb: 'across', spread: true},
  X: {fingers: [H, C, C, C], thumb: 'across'},
  Y: {fingers: [C, C, C, U], thumb: 'out'},
  Z: {fingers: [U, C, C, C], thumb: 'across', motion: 'z'},
};

/** Where the signing hand sits relative to its resting position beside the body. */
export type Place = 'side' | 'forehead' | 'face' | 'chin' | 'chest' | 'out';

export type SignSymbol =
  | {kind: 'letter'; char: string}
  /** One keyframe of a whole-word sign from SIGN_DICTIONARY. */
  | {kind: 'pose'; shape: HandShapeSpec; at: Place; word: string}
  | {kind: 'space'}
  /** Brief neutral pose so a doubled letter ("SS") visibly re-forms. */
  | {kind: 'rest'};

const B: HandShapeSpec = LIBRAS_ALPHABET.B;
const FIST_THUMB_UP: HandShapeSpec = LIBRAS_ALPHABET.A;
const POINT: HandShapeSpec = {fingers: [U, C, C, C], thumb: 'touch'};

type Frame = [HandShapeSpec, Place];

/**
 * Small dictionary of very frequent words signed as a short sequence of
 * poses instead of being spelled. Keys are uppercase without accents.
 * Approximations: have them reviewed by a fluent LIBRAS signer before use.
 */
export const SIGN_DICTIONARY: Record<string, Frame[]> = {
  OLA: [[B, 'forehead'], [B, 'out']],
  OI: [[B, 'forehead'], [B, 'out']],
  TCHAU: [[B, 'face'], [B, 'out'], [B, 'face'], [B, 'out']],
  OBRIGADO: [[B, 'chin'], [B, 'out']],
  OBRIGADA: [[B, 'chin'], [B, 'out']],
  SIM: [[LIBRAS_ALPHABET.S, 'chest'], [LIBRAS_ALPHABET.S, 'side'], [LIBRAS_ALPHABET.S, 'chest']],
  NAO: [[POINT, 'face'], [POINT, 'out'], [POINT, 'face'], [POINT, 'out']],
  EU: [[POINT, 'chest']],
  VOCE: [[POINT, 'out']],
  BOM: [[FIST_THUMB_UP, 'chin'], [FIST_THUMB_UP, 'out']],
};

export const MAX_SYMBOLS = 400;

/** Strips agent tags and markdown so only speakable text is signed. */
export function cleanForSigning(text: string): string {
  return text
    .replace(/\[GT_[A-Z_]+:[^\]]*\]/g, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_~`>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toSymbols(text: string): SignSymbol[] {
  const normalized = cleanForSigning(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  const symbols: SignSymbol[] = [];
  for (const raw of normalized.split(/\s+/)) {
    if (symbols.length >= MAX_SYMBOLS) break;
    const word = raw.replace(/[^A-Z]/g, ''); // digits and punctuation have no sign
    if (!word) continue;
    if (symbols.length) symbols.push({kind: 'space'});
    const frames = SIGN_DICTIONARY[word];
    if (frames) {
      for (const [shape, at] of frames) symbols.push({kind: 'pose', shape, at, word});
      continue;
    }
    let previous: string | undefined;
    for (const char of word) {
      if (previous === char) symbols.push({kind: 'rest'});
      symbols.push({kind: 'letter', char});
      previous = char;
    }
  }
  return symbols.slice(0, MAX_SYMBOLS);
}
