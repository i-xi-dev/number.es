import {
  FromStringOptions,
  resolveRadix,
  stringToBigInt,
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

export function fromString(value: string, options?: FromStringOptions): number {
  Type.assertString(value, "value");

  const radix = resolveRadix(options?.radix);
  const valueAsBigInt = stringToBigInt(value, radix);

  return fromBigInt(valueAsBigInt);
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
