import { inRange } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 6-bit unsigned integer.
 */
export type Uint6 =
  | 0x0
  | 0x1
  | 0x2
  | 0x3
  | 0x4
  | 0x5
  | 0x6
  | 0x7
  | 0x8
  | 0x9
  | 0xA
  | 0xB
  | 0xC
  | 0xD
  | 0xE
  | 0xF
  | 0x10
  | 0x11
  | 0x12
  | 0x13
  | 0x14
  | 0x15
  | 0x16
  | 0x17
  | 0x18
  | 0x19
  | 0x1A
  | 0x1B
  | 0x1C
  | 0x1D
  | 0x1E
  | 0x1F
  | 0x20
  | 0x21
  | 0x22
  | 0x23
  | 0x24
  | 0x25
  | 0x26
  | 0x27
  | 0x28
  | 0x29
  | 0x2A
  | 0x2B
  | 0x2C
  | 0x2D
  | 0x2E
  | 0x2F
  | 0x30
  | 0x31
  | 0x32
  | 0x33
  | 0x34
  | 0x35
  | 0x36
  | 0x37
  | 0x38
  | 0x39
  | 0x3A
  | 0x3B
  | 0x3C
  | 0x3D
  | 0x3E
  | 0x3F;

export namespace Uint6 {
  /**
   * The number of bits used to represent a 6-bit unsigned integer.
   */
  export const SIZE = 6;

  /**
   * The minimum value of 6-bit unsigned integer.
   */
  export const MIN_VALUE = UintN.MIN_VALUE;

  /**
   * The maximum value of 6-bit unsigned integer.
   */
  export const MAX_VALUE = UintN.maxValueOf<Uint6>(SIZE, true); // 0x3F;

  /**
   * Determines whether the passed `test` is a 6-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 6-bit unsigned integer.
   */
  export function isUint6(test: unknown): test is Uint6 {
    return UintN.isUintN(SIZE, test, true);
  }

  export function bitwiseAnd(a: Uint6, b: Uint6): Uint6 {
    return UintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: Uint6, b: Uint6): Uint6 {
    return UintN.bitwiseOr(SIZE, a, b, true);
  }

  export function bitwiseXOr(a: Uint6, b: Uint6): Uint6 {
    return UintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint6, amount: SafeInteger): Uint6 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }
}
