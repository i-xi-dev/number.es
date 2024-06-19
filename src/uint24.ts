import { SafeInteger } from "./safe_integer.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 24-bit unsigned integer.
 */
export type Uint24 = number;

export namespace Uint24 {
  /**
   * The number of bits used to represent a 24-bit unsigned integer.
   */
  export const SIZE = 24;

  /**
   * The number of bytes used to represent a 24-bit unsigned integer.
   */
  export const BYTES = UintN.bytesOf(SIZE, true);

  /**
   * The minimum value of 24-bit unsigned integer.
   */
  export const MIN_VALUE = UintN.MIN_VALUE;

  /**
   * The maximum value of 24-bit unsigned integer.
   */
  export const MAX_VALUE = UintN.maxValueOf<Uint24>(SIZE, true); // 0xFFFFFF

  /**
   * Determines whether the passed `test` is a 24-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 24-bit unsigned integer.
   */
  export function isUint24(test: unknown): boolean {
    return UintN.isUintN(SIZE, test, true);
  }

  export function bitwiseAnd(a: Uint24, b: Uint24): Uint24 {
    return UintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: Uint24, b: Uint24): Uint24 {
    return UintN.bitwiseOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint24, amount: SafeInteger): Uint24 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }

  // saturateFromSafeInteger

  // truncateFromSafeInteger

  // toBytes

  export function bitwiseXOr(a: Uint24, b: Uint24): Uint24 {
    _assertUint24(a, "a");
    _assertUint24(b, "b");

    return (a ^ b) & MAX_VALUE;
  }
}

function _assertUint24(test: unknown, label: string): void {
  if (Uint24.isUint24(test) !== true) {
    throw new TypeError(label);
  }
}
