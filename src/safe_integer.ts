import {
  FromStringOptions,
  RADIX_REGEX,
  resolveRadix,
  ToStringOptions,
} from "./integer.ts";
import { inSafeIntegerRange, normalizeNumber, NUMBER_ZERO } from "./numeric.ts";
import { Type } from "../deps.ts";

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
  Type.assertSafeInteger(value, "value");
  return Math.max(value, 1);
}

export function clampToNonNegative(value: number): number {
  Type.assertSafeInteger(value, "value");
  return normalizeNumber(Math.max(value, ZERO));
}

export function clampToNonPositive(value: number): number {
  Type.assertSafeInteger(value, "value");
  return normalizeNumber(Math.min(value, ZERO));
}

export function clampToNegative(value: number): number {
  Type.assertSafeInteger(value, "value");
  return Math.min(value, -1);
}

//XXX fromNumber

export function fromBigInt(value: bigint): number {
  Type.assertBigInt(value, "value");

  if (inSafeIntegerRange(value) !== true) {
    throw new RangeError("`value` must be within the range of safe integer.");
  }

  return Number(value);
}

export function toBigInt(source: number): bigint {
  Type.assertSafeInteger(source, "source");
  return BigInt(source);
}

export function fromString(
  source: string,
  options?: FromStringOptions, //TODO  uintnのと統合する
): number {
  Type.assertString(source, "source");

  const radix = resolveRadix(options?.radix);
  const regex = RADIX_REGEX[radix];
  if (regex.test(source) !== true) {
    throw new RangeError("`source` must be a representation of a integer.");
  }

  return normalizeNumber(Number.parseInt(source, radix));
}

export function toString(self: number, options?: ToStringOptions): string {
  Type.assertSafeInteger(self, "self");

  const radix = resolveRadix(options?.radix);
  let result = self.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (Type.isNumber(minIntegralDigits) && isPositive(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}
