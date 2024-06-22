import { NumberRange } from "./number_range.ts";
import { SafeInteger } from "./safe_integer.ts";
import { Uint8 } from "./uint8.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 32-bit unsigned integer.
 */
export type Uint32 = number;

const _BIT_LENGTH = 32;

const _INFO = UintN.infoOf<Uint32>(_BIT_LENGTH);

export namespace Uint32 {
  /**
   * The number of bits used to represent a 32-bit unsigned integer.
   */
  export const SIZE = _BIT_LENGTH;

  /**
   * The number of bytes used to represent a 32-bit unsigned integer.
   */
  export const BYTES = UintN.bytesOf(_BIT_LENGTH);

  /**
   * The minimum value of 32-bit unsigned integer.
   */
  export const MIN_VALUE = _INFO.min;

  /**
   * The maximum value of 32-bit unsigned integer.
   */
  export const MAX_VALUE = _INFO.max;

  /**
   * Determines whether the passed `test` is a 32-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 32-bit unsigned integer.
   */
  export function isUint32(test: unknown): boolean {
    return UintN.isUintN(_INFO, test);
  }

  export function bitwiseAnd(a: Uint32, b: Uint32): Uint32 {
    return UintN.bitwiseAnd(_INFO, a, b);
  }

  export function bitwiseOr(a: Uint32, b: Uint32): Uint32 {
    return UintN.bitwiseOr(_INFO, a, b);
  }

  export function bitwiseXOr(a: Uint32, b: Uint32): Uint32 {
    return UintN.bitwiseXOr(_INFO, a, b);
  }

  export function rotateLeft(source: Uint32, amount: SafeInteger): Uint32 {
    return UintN.rotateLeft(_INFO, source, amount);
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint32 {
    return UintN.saturateFromSafeInteger(_INFO, source);
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint32 {
    return UintN.truncateFromSafeInteger(_INFO, source);
  }

  export function toBytes(
    source: Uint32,
    littleEndian = false,
  ): [Uint8, Uint8, Uint8, Uint8] {
    _assertUint32(source, "source");

    const s2 = (source >= 0x1000000) ? (source % 0x1000000) : source;
    const s3 = (source >= 0x10000) ? (source % 0x10000) : source;
    const beBytes: [Uint8, Uint8, Uint8, Uint8] = [
      Math.trunc(source / 0x1000000) as Uint8,
      Math.trunc(s2 / 0x10000) as Uint8,
      Math.trunc(s3 / 0x100) as Uint8,
      (source % 0x100) as Uint8,
    ];
    return (littleEndian === true)
      ? (beBytes.reverse() as [Uint8, Uint8, Uint8, Uint8])
      : beBytes;
  }
}

function _assertUint32(test: unknown, label: string): void {
  if (Uint32.isUint32(test) !== true) {
    throw new TypeError(label);
  }
}
