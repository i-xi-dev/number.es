import { normalizeNumber } from "./number.ts";
import { SafeInteger } from "./safe_integer.ts";
import { Uint8 } from "./uint8.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 32-bit unsigned integer.
 */
export type Uint32 = number;

const _buffer = new ArrayBuffer(96);
const _bufferUint32View = new Uint32Array(_buffer);
const _bufferUint16View = new Uint16Array(_buffer);

export namespace Uint32 {
  /**
   * The number of bits used to represent a 32-bit unsigned integer.
   */
  export const SIZE = 32;

  /**
   * The number of bytes used to represent a 32-bit unsigned integer.
   */
  export const BYTES = UintN.bytesOf(SIZE, true);

  /**
   * The minimum value of 32-bit unsigned integer.
   */
  export const MIN_VALUE = UintN.MIN_VALUE;

  /**
   * The maximum value of 32-bit unsigned integer.
   */
  export const MAX_VALUE = UintN.maxValueOf<Uint32>(SIZE, true); // 0xFFFF_FFFF

  /**
   * Determines whether the passed `test` is a 32-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is a 32-bit unsigned integer.
   */
  export function isUint32(test: unknown): boolean {
    return UintN.isUintN(SIZE, test, true);
  }

  export function bitwiseAnd(a: Uint32, b: Uint32): Uint32 {
    return UintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: Uint32, b: Uint32): Uint32 {
    return UintN.bitwiseOr(SIZE, a, b, true);
  }

  export function bitwiseXOr(a: Uint32, b: Uint32): Uint32 {
    return UintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint32, amount: SafeInteger): Uint32 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }

  export function saturateFromSafeInteger(source: SafeInteger): Uint32 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    if (source > MAX_VALUE) {
      return MAX_VALUE;
    } else if (source < MIN_VALUE) {
      return MIN_VALUE;
    }
    return normalizeNumber(source) as Uint32;
  }

  export function truncateFromSafeInteger(source: SafeInteger): Uint32 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    const count = 0x100000000;
    if (source === 0) {
      return 0;
    } else if (source > 0) {
      return (source % count) as Uint32;
    } else {
      return (count + (source % count)) as Uint32;
    }
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
