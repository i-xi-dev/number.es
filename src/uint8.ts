import { normalizeNumber } from "./number.ts";
import { NumberRange } from "./number_range.ts";
import { Radix } from "./radix.ts";
import { RoundingMode } from "./rounding_mode.ts";
import { SafeInteger } from "./safe_integer.ts";
import { Uint7 } from "./uint7.ts";
import * as UintN from "./uint_n.ts";

/**
 * The type of 8-bit unsigned integer.
 */
export type Uint8 =
  | Uint7
  | 0x80
  | 0x81
  | 0x82
  | 0x83
  | 0x84
  | 0x85
  | 0x86
  | 0x87
  | 0x88
  | 0x89
  | 0x8A
  | 0x8B
  | 0x8C
  | 0x8D
  | 0x8E
  | 0x8F
  | 0x90
  | 0x91
  | 0x92
  | 0x93
  | 0x94
  | 0x95
  | 0x96
  | 0x97
  | 0x98
  | 0x99
  | 0x9A
  | 0x9B
  | 0x9C
  | 0x9D
  | 0x9E
  | 0x9F
  | 0xA0
  | 0xA1
  | 0xA2
  | 0xA3
  | 0xA4
  | 0xA5
  | 0xA6
  | 0xA7
  | 0xA8
  | 0xA9
  | 0xAA
  | 0xAB
  | 0xAC
  | 0xAD
  | 0xAE
  | 0xAF
  | 0xB0
  | 0xB1
  | 0xB2
  | 0xB3
  | 0xB4
  | 0xB5
  | 0xB6
  | 0xB7
  | 0xB8
  | 0xB9
  | 0xBA
  | 0xBB
  | 0xBC
  | 0xBD
  | 0xBE
  | 0xBF
  | 0xC0
  | 0xC1
  | 0xC2
  | 0xC3
  | 0xC4
  | 0xC5
  | 0xC6
  | 0xC7
  | 0xC8
  | 0xC9
  | 0xCA
  | 0xCB
  | 0xCC
  | 0xCD
  | 0xCE
  | 0xCF
  | 0xD0
  | 0xD1
  | 0xD2
  | 0xD3
  | 0xD4
  | 0xD5
  | 0xD6
  | 0xD7
  | 0xD8
  | 0xD9
  | 0xDA
  | 0xDB
  | 0xDC
  | 0xDD
  | 0xDE
  | 0xDF
  | 0xE0
  | 0xE1
  | 0xE2
  | 0xE3
  | 0xE4
  | 0xE5
  | 0xE6
  | 0xE7
  | 0xE8
  | 0xE9
  | 0xEA
  | 0xEB
  | 0xEC
  | 0xED
  | 0xEE
  | 0xEF
  | 0xF0
  | 0xF1
  | 0xF2
  | 0xF3
  | 0xF4
  | 0xF5
  | 0xF6
  | 0xF7
  | 0xF8
  | 0xF9
  | 0xFA
  | 0xFB
  | 0xFC
  | 0xFD
  | 0xFE
  | 0xFF;

function _toSafeIntegerFromOptions(
  options:
    unknown /* (Uint8.FromOptions | SafeInteger.FromOptions | SafeInteger.FromOptions.Resolved) */ =
      {},
): SafeInteger.FromOptions.Resolved {
  const clampRange = NumberRange.resolve(
    (options as SafeInteger.FromOptions.Resolved)?.clampRange,
  );
  clampRange[0] = Math.max(clampRange[0], Uint8.MIN_VALUE);
  clampRange[1] = Math.min(clampRange[1], Uint8.MAX_VALUE);

  return SafeInteger.FromOptions.resolve({
    ...(options as SafeInteger.FromOptions.Resolved),
    clampRange,
  });
}

export namespace Uint8 {
  /**
   * The number of bits used to represent an 8-bit unsigned integer.
   */
  export const SIZE = 8;

  /**
   * The number of bytes used to represent an 8-bit unsigned integer.
   */
  export const BYTES = UintN.bytesOf(SIZE, true);

  /**
   * The minimum value of 8-bit unsigned integer.
   */
  export const MIN_VALUE = UintN.MIN_VALUE;

  /**
   * The maximum value of 8-bit unsigned integer.
   */
  export const MAX_VALUE = UintN.maxValueOf<Uint8>(SIZE, true); // 0xFF

  /**
   * Determines whether the passed `test` is an 8-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is an 8-bit unsigned integer.
   */
  export function isUint8(test: unknown): test is Uint8 {
    return UintN.isUintN(SIZE, test, true);
  }

  export type FromOptions = {
    strict?: boolean; // doNotTreatFalsyAsZero & acceptsOnlyUint8s
    fallback?: Uint8;
    roundingMode?: RoundingMode;
  };

  export function fromNumber(source: number, options?: FromOptions): Uint8 {
    const resolvedOptions = _toSafeIntegerFromOptions(options);

    return SafeInteger.fromNumber(source, resolvedOptions) as Uint8;
  }

  export function fromBigInt(source: bigint, options?: FromOptions): Uint8 {
    const resolvedOptions = _toSafeIntegerFromOptions(options);

    return SafeInteger.fromBigInt(source, resolvedOptions) as Uint8;
  }

  export function toBigInt(source: Uint8): bigint {
    if (isUint8(source)) {
      return BigInt(source);
    }
    throw new TypeError("source");
  }

  export function fromString(source: string, options?: FromOptions): Uint8 {
    const resolvedOptions = _toSafeIntegerFromOptions(options);

    return SafeInteger.fromString(source, resolvedOptions) as Uint8;
  }

  export function toString(source: SafeInteger): string {
    if (isUint8(source)) {
      return normalizeNumber(source).toString(Radix.DECIMAL);
    }
    throw new TypeError("source");
  }

  export function bitwiseAnd(a: Uint8, b: Uint8): Uint8 {
    return UintN.bitwiseAnd(SIZE, a, b, true);
  }

  export function bitwiseOr(a: Uint8, b: Uint8): Uint8 {
    return UintN.bitwiseOr(SIZE, a, b, true);
  }

  export function bitwiseXOr(a: Uint8, b: Uint8): Uint8 {
    return UintN.bitwiseXOr(SIZE, a, b, true);
  }

  export function rotateLeft(source: Uint8, amount: SafeInteger): Uint8 {
    return UintN.rotateLeft(SIZE, source, amount, true);
  }

  // Uint8ClampedArrayにオーバーフローorアンダーフローする整数をセットしたのと同じ結果
  export function saturateFromSafeInteger(source: SafeInteger): Uint8 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    if (source > MAX_VALUE) {
      return MAX_VALUE;
    } else if (source < MIN_VALUE) {
      return MIN_VALUE;
    }
    return normalizeNumber(source) as Uint8;
  }

  // Uint8Arrayにオーバーフローorアンダーフローする整数をセットしたのと同じ結果
  export function truncateFromSafeInteger(source: SafeInteger): Uint8 {
    if (Number.isSafeInteger(source) !== true) {
      throw new TypeError("source");
    }

    const count = 256;
    if (source === 0) {
      return 0;
    } else if (source > 0) {
      return (source % count) as Uint8;
    } else {
      return (count + (source % count)) as Uint8;
    }
  }
}
