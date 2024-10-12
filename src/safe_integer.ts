import { assertBigInt, assertSafeInteger, isString } from "./utils.ts";
import {
  FromStringOptions,
  RADIX_REGEX,
  resolveRadix,
  ToStringOptions,
} from "./integer.ts";
import { inSafeIntegerRange, normalizeNumber, NUMBER_ZERO } from "./numeric.ts";

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

export function clampToPositive(value: number): number {
  assertSafeInteger(value, "value");
  return Math.max(value, 1);
}

export function clampToNonNegative(value: number): number {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, ZERO));
}

export function clampToNonPositive(value: number): number {
  assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, ZERO));
}

export function clampToNegative(value: number): number {
  assertSafeInteger(value, "value");
  return Math.min(value, -1);
}

//XXX fromNumber

export function fromBigInt(
  source: bigint, /* , options?: FromBigIntOptions */
): number {
  assertBigInt(source, "source");

  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError(
      "`source` must be within the range of safe integer.",
    );
  }

  return Number(source);
}

export function toBigInt(source: number): bigint {
  assertSafeInteger(source, "source");
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
  const regex = RADIX_REGEX[radix];
  if (regex.test(source) !== true) {
    throw new RangeError("`source` must be a representation of a integer.");
  }

  return normalizeNumber(Number.parseInt(source, radix));
}

export function toString(source: number, options?: ToStringOptions): string {
  assertSafeInteger(source, "source");

  const radix = resolveRadix(options?.radix);
  return normalizeNumber(source).toString(radix);
}
