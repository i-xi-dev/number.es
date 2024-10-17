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

function _clamp<T extends number>(value: T, min: T, max: T): T {
  return normalizeNumber(Math.min(Math.max(value, min), max)) as T;
}

export function clamp<T extends number>(value: T, min: T, max: T): T {
  Type.assertSafeInteger(value, "value");
  Type.assertSafeInteger(min, "min");
  Type.assertSafeInteger(max, "max");

  if (max < min) {
    throw new RangeError("`min` must be less than or equal to `max`.");
  }

  return _clamp(value, min, max);
}

export function clampToPositive<T extends number>(value: T, max?: T): T {
  Type.assertSafeInteger(value, "value");
  const min = 1 as T;
  if (Number.isSafeInteger(max)) {
    if ((max as T) < min) {
      throw new RangeError("`max` must be greater than or equal to `1`.");
    }
    return _clamp(value, min, max as T);
  }
  return normalizeNumber(Math.max(value, 1)) as T;
}

export function clampToNonNegative<T extends number>(value: T, max?: T): T {
  Type.assertSafeInteger(value, "value");
  const min = ZERO as T;
  if (Number.isSafeInteger(max)) {
    if ((max as T) < min) {
      throw new RangeError("`max` must be greater than or equal to `0`.");
    }
    return _clamp(value, min, max as T);
  }
  return normalizeNumber(Math.max(value, ZERO)) as T;
}

export function clampToNonPositive<T extends number>(value: T, min?: T): T {
  Type.assertSafeInteger(value, "value");
  const max = ZERO as T;
  if (Number.isSafeInteger(min)) {
    if (max < (min as T)) {
      throw new RangeError("`min` must be less than or equal to `0`.");
    }
    return _clamp(value, min as T, max);
  }
  return normalizeNumber(Math.min(value, ZERO)) as T;
}

export function clampToNegative<T extends number>(value: T, min?: T): T {
  Type.assertSafeInteger(value, "value");
  const max = -1 as T;
  if (Number.isSafeInteger(min)) {
    if (max < (min as T)) {
      throw new RangeError("`min` must be less than or equal to `-1`.");
    }
    return _clamp(value, min as T, max);
  }
  return normalizeNumber(Math.min(value, -1)) as T;
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
