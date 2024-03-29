import { inRange, normalizeNumber } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";
import { Uint8 } from "./uint8.ts";

/**
 * The type of 16-bit unsigned integer.
 */
export type Uint16 = number;

export namespace Uint16 {
  export const BYTES = 2;

  export const SIZE = 16;

  export const MIN_VALUE = 0x0;

  export const MAX_VALUE = 0xFFFF;

  export function isUint16(test: unknown): boolean {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }

  export function rotateLeft(source: Uint16, amount: SafeInteger): Uint16 {
    if (Uint16.isUint16(source) !== true) {
      throw new TypeError("source");
    }
    if (Number.isSafeInteger(amount) !== true) {
      throw new TypeError("amount");
    }

    let normalizedAmount = amount % SIZE;
    if (normalizedAmount < 0) {
      normalizedAmount = normalizedAmount + SIZE;
    }
    if (normalizedAmount === 0) {
      return source;
    }

    return (((source << normalizedAmount) |
      (source >> (SIZE - normalizedAmount))) &
      0b11111111_11111111) as Uint16;
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint16 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    if (source > MAX_VALUE) {
      return MAX_VALUE;
    } else if (source < MIN_VALUE) {
      return MIN_VALUE;
    }
    return normalizeNumber(source) as Uint16;
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint16 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    const count = 65536;
    if (source === 0) {
      return 0;
    } else if (source > 0) {
      return (source % count) as Uint16;
    } else {
      return (count + (source % count)) as Uint16;
    }
  }

  export function toBytes(
    source: Uint16,
    littleEndian = false,
  ): [Uint8, Uint8] {
    if (isUint16(source) !== true) {
      throw new TypeError("source");
    }

    const beBytes: [Uint8, Uint8] = [
      Math.trunc(source / 0x100) as Uint8,
      (source % 0x100) as Uint8,
    ];
    return (littleEndian === true)
      ? (beBytes.reverse() as [Uint8, Uint8])
      : beBytes;
  }
}
