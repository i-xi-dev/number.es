import { inRange, normalizeNumber } from "./main.ts";
import { SafeInteger } from "./safe_integer.ts";

/**
 * The type of 32-bit unsigned integer.
 */
export type Uint32 = number;

const _RotateAmounts = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
] as const;
type _RotateAmount = typeof _RotateAmounts[number];

export namespace Uint32 {
  export const BYTES = 4;

  export const SIZE = 32;

  export const MIN_VALUE = 0x0;

  export const MAX_VALUE = 0xFFFFFFFF;

  export function isUint32(test: unknown): test is Uint32 {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }

  export function rotateLeft(source: Uint32, amount: _RotateAmount): Uint32 {
    if (Uint32.isUint32(source) !== true) {
      throw new TypeError("source");
    }
    if (_RotateAmounts.includes(amount) !== true) {
      throw new TypeError("amount");
    }

    if (amount === 0 || amount === SIZE) {
      return source;
    }

    const bs = BigInt(source);
    return Number(
      ((bs << BigInt(amount)) | (bs >> BigInt(SIZE - amount))) &
        0b11111111_11111111_11111111_11111111n,
    ) as Uint32;
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint32 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    if (source > MAX_VALUE) {
      return MAX_VALUE;
    } else if (source < MIN_VALUE) {
      return MIN_VALUE;
    }
    return normalizeNumber(source) as Uint32;
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint32 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    const count = 0x100000000;
    if (source === 0) {
      return 0;
    } else if (source > 0) {
      return (source % count) as Uint32;
    } else {
      return (count + (source % count)) as Uint32;
    }
  }
}
