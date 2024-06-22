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

const _BIT_LENGTH = 6;

const _INFO = UintN.infoOf<Uint6>(_BIT_LENGTH);

export namespace Uint6 {
  /**
   * The number of bits used to represent a 6-bit unsigned integer.
   */
  export const SIZE = _BIT_LENGTH;

  /**
   * The minimum value of 6-bit unsigned integer.
   */
  export const MIN_VALUE = _INFO.min;

  /**
   * The maximum value of 6-bit unsigned integer.
   */
  export const MAX_VALUE = _INFO.max;

  /**
   * Determines whether the passed `test` is a 6-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 6-bit unsigned integer.
   */
  export function isUint6(test: unknown): test is Uint6 {
    return UintN.isUintN(_INFO, test);
  }

  export function bitwiseAnd(a: Uint6, b: Uint6): Uint6 {
    return UintN.bitwiseAnd(_INFO, a, b);
  }

  export function bitwiseOr(a: Uint6, b: Uint6): Uint6 {
    return UintN.bitwiseOr(_INFO, a, b);
  }

  export function bitwiseXOr(a: Uint6, b: Uint6): Uint6 {
    return UintN.bitwiseXOr(_INFO, a, b);
  }

  export function rotateLeft(source: Uint6, amount: SafeInteger): Uint6 {
    return UintN.rotateLeft(_INFO, source, amount);
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint6 {
    return UintN.saturateFromSafeInteger(_INFO, source);
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint6 {
    return UintN.truncateFromSafeInteger(_INFO, source);
  }
}
