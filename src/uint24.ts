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

  export function bitwiseXOr(a: Uint24, b: Uint24): Uint24 {
    return UintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint24, amount: SafeInteger): Uint24 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint24 {
    return UintN.saturateFromSafeInteger(SIZE, source, true);
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint24 {
    return UintN.truncateFromSafeInteger(SIZE, source, true);
  }

  // toBytes
}
