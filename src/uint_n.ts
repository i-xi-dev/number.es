import { inRange } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";

const Bits = [8, 16, 24, 32] as const;
type Bits = typeof Bits[number];

const _BITS_PER_BYTE = 8;

export function bytesOf(bits: Bits, _bitsTrusted = false): SafeInteger {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
  return bits / _BITS_PER_BYTE;
}

export const MIN_VALUE = 0;

export function maxValueOf<T extends SafeInteger>(
  bits: Bits,
  _bitsTrusted = false,
): T {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
  return (256 ** bytesOf(bits, true) - 1) as T;
}

export function isUintN(
  bits: Bits,
  test: unknown,
  _bitsTrusted = false,
): boolean {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
  return Number.isSafeInteger(test) &&
    inRange(test as number, [MIN_VALUE, maxValueOf(bits, true)]);
}

export function rotateLeft<T extends SafeInteger>(
  bits: Bits,
  source: T,
  amount: SafeInteger,
  _bitsTrusted = false,
): T {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
  if (bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    throw new RangeError("bits");
  }

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

  return (((source << normalizedAmount) |
    (source >> (bits - normalizedAmount))) & maxValueOf(bits, true)) as T;
}
