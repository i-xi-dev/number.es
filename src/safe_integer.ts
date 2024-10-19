import {
  FromStringOptions,
  resolveRadix,
  stringToBigInt,
  ToStringOptions,
} from "./integer.ts";
import { inSafeIntegerRange, NUMBER_ZERO } from "./numeric.ts";
import { Type } from "../deps.ts";

export const ZERO = NUMBER_ZERO;

export function isPositive(test: number): test is number {
  return Type.isPositiveSafeInteger(test);
}

export function isNonNegative(test: number): test is number {
  return Type.isNonNegativeSafeInteger(test);
}

export function isNonPositive(test: number): test is number {
  return Type.isNonPositiveSafeInteger(test);
}

export function isNegative(test: number): test is number {
  return Type.isNegativeSafeInteger(test);
}

export function isOdd(test: number): test is number {
  return Type.isOddSafeInteger(test);
}

export function isEven(test: number): test is number {
  return Type.isEvenSafeInteger(test);
}

// export function inRange(): boolean {
//TODO isSafeIntegerInRange
// }

export function clamp<T extends number>(value: number, min: T, max: T): T {
  Type.assertSafeInteger(value, "value");
  Type.assertSafeInteger(min, "min");
  Type.assertSafeInteger(max, "max");

  if (max < min) {
    throw new RangeError("`min` must be less than or equal to `max`.");
  }

  return Type.toClampedNumber(value, min, max);
}

export function clampToPositive<T extends number>(value: T, max?: T): T {
  Type.assertSafeInteger(value, "value");
  const min = 1 as T;
  if (Type.isSafeInteger(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `1`.");
    }
    return Type.toClampedNumber(value, min, max);
  }
  return Type.toNormalizedNumber(Math.max(value, 1)) as T;
}

export function clampToNonNegative<T extends number>(value: T, max?: T): T {
  Type.assertSafeInteger(value, "value");
  const min = ZERO as T;
  if (Type.isSafeInteger(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `0`.");
    }
    return Type.toClampedNumber(value, min, max);
  }
  return Type.toNormalizedNumber(Math.max(value, ZERO)) as T;
}

export function clampToNonPositive<T extends number>(value: T, min?: T): T {
  Type.assertSafeInteger(value, "value");
  const max = ZERO as T;
  if (Type.isSafeInteger(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `0`.");
    }
    return Type.toClampedNumber(value, min, max);
  }
  return Type.toNormalizedNumber(Math.min(value, ZERO)) as T;
}

export function clampToNegative<T extends number>(value: T, min?: T): T {
  Type.assertSafeInteger(value, "value");
  const max = -1 as T;
  if (Type.isSafeInteger(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `-1`.");
    }
    return Type.toClampedNumber(value, min, max);
  }
  return Type.toNormalizedNumber(Math.min(value, -1)) as T;
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
  if (Type.isPositiveNumber(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}
