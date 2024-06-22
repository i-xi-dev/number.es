import { SafeInteger } from "./safe_integer.ts";
import * as BigUintN from "./big_uint_n.ts";

/**
 * The type of 64-bit unsigned integer.
 */
export type BigUint64 = bigint;

const _BIT_LENGTH = 64;

const _MAX_VALUE = BigUintN.maxValueOf<BigUint64>(_BIT_LENGTH, true); // 0xFFFF_FFFF_FFFF_FFFFn;

export namespace BigUint64 {
  /**
   * The number of bits used to represent a 64-bit unsigned integer.
   */
  export const SIZE = _BIT_LENGTH;

  /**
   * The number of bytes used to represent a 64-bit unsigned integer.
   */
  export const BYTES = BigUintN.bytesOf(SIZE, true);

  /**
   * The minimum value of 64-bit unsigned integer.
   */
  export const MIN_VALUE = BigUintN.MIN_VALUE;

  /**
   * The maximum value of 64-bit unsigned integer.
   */
  export const MAX_VALUE = _MAX_VALUE;

  /**
   * Determines whether the passed `test` is a 64-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 64-bit unsigned integer.
   */
  export function isBigUint64(test: unknown): boolean {
    return BigUintN.isBigUintN(SIZE, test, true);
  }

  export function bitwiseAnd(a: BigUint64, b: BigUint64): BigUint64 {
    return BigUintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: BigUint64, b: BigUint64): BigUint64 {
    return BigUintN.bitwiseOr(SIZE, a, b, true);
  }

  export function bitwiseXOr(a: BigUint64, b: BigUint64): BigUint64 {
    return BigUintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(
    source: BigUint64,
    amount: SafeInteger,
  ): BigUint64 {
    return BigUintN.rotateLeft(SIZE, source, amount, true);
  }
}
