import { normalize,ZERO } from "./numeric.ts";
import {Range}from "./safe_integer.ts";

// supported bits.
export const BITS = [1,2,3,4,5,6,7,8,16,24,32] as const;
export type BITS = typeof BITS[number];

export function rangeOf(bits: BITS): Range {
  if (BITS.includes(bits) !== true) {
    throw new RangeError("TODO");
  }

  const min = ZERO;
  const max = ((2 ** bits) - 1);

  return Range.of(min,max);
}

const _buffer = new ArrayBuffer(96);
const _bufferUint32View = new Uint32Array(_buffer);
const _bufferUint16View = new Uint16Array(_buffer);

export function bitwiseAnd<T extends number>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  a: T,// Tであることを保証して渡すこと
  b: T,// Tであることを保証して渡すこと
): T {
  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = ZERO;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 & b1;
    _bufferUint16View[5] = a2 & b2;
    return _bufferUint32View[2] as T;
  }
  else {
    return ((a & b) & range.max) as T;
  }
}

export function bitwiseOr<T extends number>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  a: T,// Tであることを保証して渡すこと
  b: T,// Tであることを保証して渡すこと
): T {
  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = ZERO;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 | b1;
    _bufferUint16View[5] = a2 | b2;
    return _bufferUint32View[2] as T;
  } else {
    return ((a | b) & range.max) as T;
  }
}

export function bitwiseXOr<T extends number>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  a: T,// Tであることを保証して渡すこと
  b: T,// Tであることを保証して渡すこと
): T {
  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = ZERO;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 ^ b1;
    _bufferUint16View[5] = a2 ^ b2;
    return _bufferUint32View[2] as T;
  } else {
    return ((a ^ b) & range.max) as T;
  }
}

export function rotateLeft<T extends number>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  source: T,// Tであることを保証して渡すこと
  amount: number,
): T {
  if (Number.isSafeInteger(amount) !== true) {
    throw new TypeError("TODO");
  }

  let normalizedAmount = amount % bits;
  if (normalizedAmount < ZERO) {
    normalizedAmount = normalizedAmount + bits;
  }
  if (normalizedAmount === ZERO) {
    return source;
  }

  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const bs = BigInt(source);
    return Number(
      ((bs << BigInt(normalizedAmount)) |
        (bs >> BigInt(bits - normalizedAmount))) & BigInt(range.max),
    ) as T;
  } else {
    return (((source << normalizedAmount) |
      (source >> (bits - normalizedAmount))) & range.max) as T;
  }
}

export function saturateFromSafeInteger<T extends number>(
  range: Range,
  source: number,
): T {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("source");
  }

  if (source > range.max) {
    return range.max as T;
  } else if (source < range.min) {
    return range.min as T;
  }
  return normalize(source) as T;
}

export function truncateFromSafeInteger<T extends number>(
  range: Range,
  source: number,
): T {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("source");
  }

  if (source === ZERO) {
    return ZERO as T;
  } else if (source > ZERO) {
    return (source % range.size) as T;
  } else {
    return (range.size + (source % range.size)) as T;
  }
}
