import { inRange } from "./main.ts";

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

    // numberのbit演算は31ビットまで
    const bs = BigInt(source);
    return Number(
      ((bs << BigInt(amount)) | (bs >> BigInt(SIZE - amount))) &
        0b11111111_11111111_11111111_11111111n,
    ) as Uint32;
  }
}