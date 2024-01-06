import { inRange, normalizeNumber, Radix, Range } from "./main.ts";
import { RoundingMode } from "./rounding_mode.ts";
import { SafeInteger } from "./safe_integer.ts";

/**
 * The type of 8-bit unsigned integer.
 */
export type Uint8 =
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
  | 0x3F
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
  | 0x7F
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
  const clampRange = Range.resolve(
    (options as SafeInteger.FromOptions.Resolved)?.clampRange,
  );
  clampRange[0] = Math.max(clampRange[0], Uint8.MIN_VALUE);
  clampRange[1] = Math.min(clampRange[1], Uint8.MAX_VALUE);

  return SafeInteger.FromOptions.resolve({
    ...(options as SafeInteger.FromOptions.Resolved),
    clampRange,
  });
}

const _RotateAmounts = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type _RotateAmount = typeof _RotateAmounts[number];

export namespace Uint8 {
  export const BYTES = 1;

  export const SIZE = 8;

  /**
   * The minimum value of 8-bit unsigned integer.
   */
  export const MIN_VALUE = 0x0;

  /**
   * The maximum value of 8-bit unsigned integer.
   */
  export const MAX_VALUE = 0xFF;

  /**
   * Determines whether the passed `test` is an 8-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is an 8-bit unsigned integer.
   */
  export function isUint8(test: unknown): test is Uint8 {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
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

  export function rotateLeft(source: Uint8, amount: _RotateAmount): Uint8 {
    if (Uint8.isUint8(source) !== true) {
      throw new TypeError("source");
    }
    if (_RotateAmounts.includes(amount) !== true) {
      throw new TypeError("amount");
    }

    return (((source << amount) | (source >> (SIZE - amount))) &
      0b11111111) as Uint8;
  }

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
}
