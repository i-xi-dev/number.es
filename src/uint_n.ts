import { inRange } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";

type Bits = 8 | 16 | 24 | 32;

const _BITS_PER_BYTE = 8;

export function bytesOf(bits: Bits): SafeInteger {
  return bits / _BITS_PER_BYTE;
}

export const MIN_VALUE = 0;

export function maxValueOf(bits: Bits): SafeInteger {
  return 256 ** bytesOf(bits) - 1;
}

export function isUintN(bits: Bits, test: unknown): boolean {
  return Number.isSafeInteger(test) &&
    inRange(test as number, [MIN_VALUE, maxValueOf(bits)]);
}
