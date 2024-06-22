import { NumberRange } from "./number_range.ts";
import { SafeInteger } from "./safe_integer.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 24-bit unsigned integer.
 */
export type Uint24 = number;

const _BIT_LENGTH = 24;

const _INFO = UintN.infoOf<Uint24>(_BIT_LENGTH);

export namespace Uint24 {
  /**
   * The number of bits used to represent a 24-bit unsigned integer.
   */
  export const SIZE = _BIT_LENGTH;

  /**
   * The number of bytes used to represent a 24-bit unsigned integer.
   */
  export const BYTES = UintN.bytesOf(_BIT_LENGTH);

  /**
   * The minimum value of 24-bit unsigned integer.
   */
  export const MIN_VALUE = _INFO.min;

  /**
   * The maximum value of 24-bit unsigned integer.
   */
  export const MAX_VALUE = _INFO.max;

  /**
   * Determines whether the passed `test` is a 24-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 24-bit unsigned integer.
   */
  export function isUint24(test: unknown): boolean {
    return UintN.isUintN(_INFO, test);
  }

  export function bitwiseAnd(a: Uint24, b: Uint24): Uint24 {
    return UintN.bitwiseAnd(_INFO, a, b);
  }

  export function bitwiseOr(a: Uint24, b: Uint24): Uint24 {
    return UintN.bitwiseOr(_INFO, a, b);
  }

  export function bitwiseXOr(a: Uint24, b: Uint24): Uint24 {
    return UintN.bitwiseXOr(_INFO, a, b);
  }

  export function rotateLeft(source: Uint24, amount: SafeInteger): Uint24 {
    return UintN.rotateLeft(_INFO, source, amount);
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint24 {
    return UintN.saturateFromSafeInteger(_INFO, source);
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint24 {
    return UintN.truncateFromSafeInteger(_INFO, source);
  }

  // toBytes
}
