import {
  inSafeIntegerRange,
  isBigInt,
  normalizeNumber,
  NUMBER_ZERO,
} from "./numeric.ts";
import {
  FromStringOptions,
  REGEX,
  resolveRadix,
  ToStringOptions,
} from "./integer.ts";
import { isString } from "./utils.ts";

export const ZERO = NUMBER_ZERO;

export function isPositive(test: number): boolean {
  return Number.isSafeInteger(test) && (test > ZERO);
}

export function isNonNegative(test: number): boolean {
  return Number.isSafeInteger(test) && (test >= ZERO);
}

export function isNonPositive(test: number): boolean {
  return Number.isSafeInteger(test) && (test <= ZERO);
}

export function isNegative(test: number): boolean {
  return Number.isSafeInteger(test) && (test < ZERO);
}

export function isOdd(test: number): boolean {
  return Number.isSafeInteger(test) && ((test % 2) !== ZERO);
}

export function isEven(test: number): boolean {
  return Number.isSafeInteger(test) && ((test % 2) === ZERO);
}

//XXX fromNumber

export function fromBigInt(
  source: bigint, /* , options?: FromBigIntOptions */
): number {
  if (isBigInt(source) !== true) {
    throw new TypeError("`source` must be a `bigint`.");
  }
  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError(
      "`source` must be within the range of safe integer.",
    );
  }

  return Number(source);
}

export function toBigInt(source: number): bigint {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("`source` must be a safe integer.");
  }
  return BigInt(source);
}

export function fromString(
  source: string,
  options?: FromStringOptions,
): number {
  if (isString(source) !== true) {
    throw new TypeError("`source` must be a `string`.");
  }

  const radix = resolveRadix(options?.radix);
  const regex = REGEX[radix];
  if (regex.test(source) !== true) {
    throw new RangeError("`source` must be a representation of a integer.");
  }

  return normalizeNumber(Number.parseInt(source, radix));
}

export function toString(source: number, options?: ToStringOptions): string {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("`source` must be a safe integer.");
  }

  const radix = resolveRadix(options?.radix);
  return normalizeNumber(source).toString(radix);
}
