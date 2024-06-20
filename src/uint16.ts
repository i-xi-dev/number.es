import { normalizeNumber } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";
import { Uint8 } from "./uint8.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 16-bit unsigned integer.
 */
export type Uint16 = number;

export namespace Uint16 {
  /**
   * The number of bits used to represent a 16-bit unsigned integer.
   */
  export const SIZE = 16;

  /**
   * The number of bytes used to represent a 16-bit unsigned integer.
   */
  export const BYTES = UintN.bytesOf(SIZE, true);

  /**
   * The minimum value of 16-bit unsigned integer.
   */
  export const MIN_VALUE = UintN.MIN_VALUE;

  /**
   * The maximum value of 16-bit unsigned integer.
   */
  export const MAX_VALUE = UintN.maxValueOf<Uint16>(SIZE, true); // 0xFFFF

  /**
   * Determines whether the passed `test` is a 16-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 16-bit unsigned integer.
   */
  export function isUint16(test: unknown): boolean {
    return UintN.isUintN(SIZE, test, true);
  }

  export function bitwiseAnd(a: Uint16, b: Uint16): Uint16 {
    return UintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: Uint16, b: Uint16): Uint16 {
    return UintN.bitwiseOr(SIZE, a, b, true);
  }

  export function bitwiseXOr(a: Uint16, b: Uint16): Uint16 {
    return UintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint16, amount: SafeInteger): Uint16 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint16 {
    return UintN.saturateFromSafeInteger(SIZE, source, true);
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint16 {
    return UintN.truncateFromSafeInteger(SIZE, source, true);
  }

  export function toBytes(
    source: Uint16,
    littleEndian = false,
  ): [Uint8, Uint8] {
    _assertUint16(source, "source");

    const beBytes: [Uint8, Uint8] = [
      Math.trunc(source / 0x100) as Uint8,
      (source % 0x100) as Uint8,
    ];
    return (littleEndian === true)
      ? (beBytes.reverse() as [Uint8, Uint8])
      : beBytes;
  }
}

function _assertUint16(test: unknown, label: string): void {
  if (Uint16.isUint16(test) !== true) {
    throw new TypeError(label);
  }
}
