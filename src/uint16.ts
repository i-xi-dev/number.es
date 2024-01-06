import { inRange } from "./main.ts";

/**
 * The type of 16-bit unsigned integer.
 */
export type Uint16 = number;

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
] as const;
type _RotateAmount = typeof _RotateAmounts[number];

export namespace Uint16 {
  export const BYTES = 2;

  export const SIZE = 16;

  export const MIN_VALUE = 0x0;

  export const MAX_VALUE = 0xFFFF;

  export function isUint16(test: unknown): test is Uint16 {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }

  export function rotateLeft(source: Uint16, amount: _RotateAmount): Uint16 {
    if (Uint16.isUint16(source) !== true) {
      throw new TypeError("source");
    }
    if (_RotateAmounts.includes(amount) !== true) {
      throw new TypeError("amount");
    }

    return (((source << amount) | (source >> (SIZE - amount))) &
      0b11111111_11111111) as Uint16;
  }
}
