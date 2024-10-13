import { Type } from "../deps.ts";

export const NUMBER_ZERO = 0;

export const BIGINT_ZERO = 0n;

export function normalizeNumber<T extends number>(input: T): T {
  Type.assertNumber(input, "input");

  if (Number.isFinite(input) !== true) {
    return input;
  }

  // -0は0にする
  // asを使っているが、0がTの範囲外ならそもそも0が返ることは無い
  return (input === NUMBER_ZERO) ? (NUMBER_ZERO as T) : input;
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
  return normalizeNumber(input);
}

export type numeric = number | bigint;

function _isNumeric(test: unknown): test is numeric {
  return (Type.isNumber(test) && (Number.isNaN(test) !== true)) ||
    Type.isBigInt(test);
}

export function isPositive(test: numeric): boolean {
  return _isNumeric(test) && (test > NUMBER_ZERO);
}

export function isNonNegative(test: numeric): boolean {
  return _isNumeric(test) && (test >= NUMBER_ZERO);
}

export function isNonPositive(test: numeric): boolean {
  return _isNumeric(test) && (test <= NUMBER_ZERO);
}

export function isNegative(test: numeric): boolean {
  return _isNumeric(test) && (test < NUMBER_ZERO);
}

export function inSafeIntegerRange(test: numeric) {
  return _isNumeric(test) && (test >= Number.MIN_SAFE_INTEGER) &&
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
