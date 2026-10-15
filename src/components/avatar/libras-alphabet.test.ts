import assert from 'node:assert/strict';
import {test} from 'node:test';
import {LIBRAS_ALPHABET, SIGN_DICTIONARY, toSymbols} from './libras-alphabet.ts';

const chars = (text: string) =>
  toSymbols(text).map(s => (s.kind === 'letter' ? s.char : s.kind === 'space' ? '_' : s.kind === 'pose' ? '#' : '.')).join('');

test('every letter A-Z has a hand shape', () => {
  for (const c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') assert.ok(LIBRAS_ALPHABET[c], c);
});

test('accents are stripped and punctuation skipped', () => {
  assert.equal(chars('Ação, café!'), 'ACAO_CAFE');
});

test('doubled letters get a rest pose between them', () => {
  assert.equal(chars('asa ss'), 'ASA_S.S');
});

test('agent tags, code and markdown are not signed', () => {
  assert.equal(chars('**ana** [GT_MEMORY_UPDATE: x] ```code```'), 'ANA');
});

test('dictionary words become poses and others are spelled', () => {
  assert.equal(chars('Olá ana'), '##_ANA');
  assert.equal(chars('Obrigado!'), '##');
  assert.equal(SIGN_DICTIONARY.TCHAU.length, 4);
});

test('output is bounded', () => {
  assert.ok(toSymbols('a'.repeat(5000)).length <= 400);
});
