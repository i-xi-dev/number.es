import { inRange } from "./bigint.ts";

/**
 * The type of 64-bit unsigned integer.
 */
export type BigUint64 = bigint;

export namespace BigUint64 {
  /**
   * The number of bytes used to represent a 64-bit unsigned integer.
   */
  export const BYTES = 8;

  /**
   * The number of bits used to represent a 64-bit unsigned integer.
   */
  export const SIZE = 64;

  /**
   * The minimum value of 64-bit unsigned integer.
   */
  export const MIN_VALUE = 0x0n;

  /**
   * The maximum value of 64-bit unsigned integer.
   */
  export const MAX_VALUE = 0xFFFF_FFFF_FFFF_FFFFn;

  /**
   * Determines whether the passed `test` is a 64-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 64-bit unsigned integer.
   */
  export function isBigUint64(test: unknown): boolean {
    return (typeof test === "bigint") && inRange(test, [MIN_VALUE, MAX_VALUE]);
  }
}
