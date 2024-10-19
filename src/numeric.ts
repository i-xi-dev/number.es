import { Type } from "../deps.ts";

export const NUMBER_ZERO = 0;

export const BIGINT_ZERO = 0n;

export function normalizeNumber<T extends number>(input: T): T {
  Type.assertNumber(input, "input");
  return Type.toNormalizedNumber(input);
}

export function clampToSafeInteger(input: number): number {
  Type.assertNumber(input, "input");

  if (Number.isNaN(input)) {
    throw new RangeError("`input` must not be `Number.NaN`.");
  }

  if (input <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }
  if (input >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  return Type.toNormalizedNumber(input);
}

export type numeric = number | bigint;

export function isPositive(test: numeric): test is numeric {
  return Type.isPositiveNumber(test) || Type.isPositiveBigInt(test);
}

export function isNonNegative(test: numeric): test is numeric {
  return Type.isNonNegativeNumber(test) || Type.isNonNegativeBigInt(test);
}

export function isNonPositive(test: numeric): test is numeric {
  return Type.isNonPositiveNumber(test) || Type.isNonPositiveBigInt(test);
}

export function isNegative(test: numeric): test is numeric {
  return Type.isNegativeNumber(test) || Type.isNegativeBigInt(test);
}

//TODO inRange

export function inSafeIntegerRange(test: numeric): test is numeric {
  return (Type.isNumber(test) || Type.isBigInt(test)) &&
    (test >= Number.MIN_SAFE_INTEGER) &&
    (test <= Number.MAX_SAFE_INTEGER);
}

/**
 * 2, 8, 10, or 16.
 */
export const Radix = {
  BINARY: 2,
  DECIMAL: 10,
  HEXADECIMAL: 16,
  OCTAL: 8,
} as const;

export type Radix = typeof Radix[keyof typeof Radix];

export const RADIX_PREFIX = {
  [Radix.BINARY]: "0b",
  [Radix.OCTAL]: "0o",
  [Radix.DECIMAL]: "",
  [Radix.HEXADECIMAL]: "0x",
} as const;
