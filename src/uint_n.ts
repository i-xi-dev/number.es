import { inRange } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";

const Bits = [8, 16, 24, 32] as const;
type Bits = typeof Bits[number];

const _BITS_PER_BYTE = 8;

function _assertBits(bits: Bits, _bitsTrusted: boolean): void {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
}

export function bytesOf(bits: Bits, _bitsTrusted = false): SafeInteger {
  _assertBits(bits, _bitsTrusted);

  return bits / _BITS_PER_BYTE;
}

export const MIN_VALUE = 0;

export function maxValueOf<T extends SafeInteger>(
  bits: Bits,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  return (256 ** bytesOf(bits, true) - 1) as T;
}

export function isUintN(
  bits: Bits,
  test: unknown,
  _bitsTrusted = false,
): boolean {
  _assertBits(bits, _bitsTrusted);

  return Number.isSafeInteger(test) &&
    inRange(test as number, [MIN_VALUE, maxValueOf(bits, true)]);
}

const _buffer = new ArrayBuffer(96);
const _bufferUint32View = new Uint32Array(_buffer);
const _bufferUint16View = new Uint16Array(_buffer);

export function bitwiseAnd<T extends SafeInteger>(
  bits: Bits,
  a: T,
  b: T,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  if (isUintN(bits, a, true) !== true) {
    throw new TypeError("a");
  }
  if (isUintN(bits, b, true) !== true) {
    throw new TypeError("b");
  }

  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない

    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = 0;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 & b1;
    _bufferUint16View[5] = a2 & b2;
    return _bufferUint32View[2] as T;
  } else {
    return ((a & b) & maxValueOf(bits, true)) as T;
  }
}

export function rotateLeft<T extends SafeInteger>(
  bits: Bits,
  source: T,
  amount: SafeInteger,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  if (isUintN(bits, source, true) !== true) {
    throw new TypeError("source");
  }
  if (Number.isSafeInteger(amount) !== true) {
    throw new TypeError("amount");
  }

  let normalizedAmount = amount % bits;
  if (normalizedAmount < 0) {
    normalizedAmount = normalizedAmount + bits;
  }
  if (normalizedAmount === 0) {
    return source;
  }

  const max = maxValueOf(bits, true);
  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const bs = BigInt(source);
    return Number(
      ((bs << BigInt(normalizedAmount)) |
        (bs >> BigInt(bits - normalizedAmount))) & BigInt(max),
    ) as T;
  } else {
    return (((source << normalizedAmount) |
      (source >> (bits - normalizedAmount))) & max) as T;
  }
}
