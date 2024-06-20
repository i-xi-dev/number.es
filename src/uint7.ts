import { inRange } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";
import { Uint6 } from "./uint6.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 7-bit unsigned integer.
 */
export type Uint7 =
  | Uint6
  | 0x40
  | 0x41
  | 0x42
  | 0x43
  | 0x44
  | 0x45
  | 0x46
  | 0x47
  | 0x48
  | 0x49
  | 0x4A
  | 0x4B
  | 0x4C
  | 0x4D
  | 0x4E
  | 0x4F
  | 0x50
  | 0x51
  | 0x52
  | 0x53
  | 0x54
  | 0x55
  | 0x56
  | 0x57
  | 0x58
  | 0x59
  | 0x5A
  | 0x5B
  | 0x5C
  | 0x5D
  | 0x5E
  | 0x5F
  | 0x60
  | 0x61
  | 0x62
  | 0x63
  | 0x64
  | 0x65
  | 0x66
  | 0x67
  | 0x68
  | 0x69
  | 0x6A
  | 0x6B
  | 0x6C
  | 0x6D
  | 0x6E
  | 0x6F
  | 0x70
  | 0x71
  | 0x72
  | 0x73
  | 0x74
  | 0x75
  | 0x76
  | 0x77
  | 0x78
  | 0x79
  | 0x7A
  | 0x7B
  | 0x7C
  | 0x7D
  | 0x7E
  | 0x7F;

export namespace Uint7 {
  /**
   * The number of bits used to represent a 7-bit unsigned integer.
   */
  export const SIZE = 7;

  /**
   * The minimum value of 7-bit unsigned integer.
   */
  export const MIN_VALUE = UintN.MIN_VALUE;

  /**
   * The maximum value of 7-bit unsigned integer.
   */
  export const MAX_VALUE = UintN.maxValueOf<Uint7>(SIZE, true); // 0x7F;

  /**
   * Determines whether the passed `test` is a 7-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 7-bit unsigned integer.
   */
  export function isUint7(test: unknown): test is Uint7 {
    return UintN.isUintN(SIZE, test, true);
  }

  export function bitwiseAnd(a: Uint7, b: Uint7): Uint7 {
    return UintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: Uint7, b: Uint7): Uint7 {
    return UintN.bitwiseOr(SIZE, a, b, true);
  }

  export function bitwiseXOr(a: Uint7, b: Uint7): Uint7 {
    return UintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint7, amount: SafeInteger): Uint7 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }
}
