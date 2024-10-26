import {
  BigIntType,
  NumberType,
  NumericType,
  SafeIntegerType,
  StringType,
} from "../deps.ts";
import { FromStringOptions, ToStringOptions } from "./integer.ts";
import { inSafeIntegerRange, NUMBER_ZERO } from "./numeric.ts";

export const ZERO = NUMBER_ZERO;

export function isPositive(test: number): test is number {
  return SafeIntegerType.isPositive(test);
}

export function isNonNegative(test: number): test is number {
  return SafeIntegerType.isNonNegative(test);
}

export function isNonPositive(test: number): test is number {
  return SafeIntegerType.isNonPositive(test);
}

export function isNegative(test: number): test is number {
  return SafeIntegerType.isNegative(test);
}

export function isOdd(test: number): test is number {
  return SafeIntegerType.isOdd(test);
}

export function isEven(test: number): test is number {
  return SafeIntegerType.isEven(test);
}

// export function inRange(): boolean {
//TODO isSafeIntegerInRange
// }

export function clamp<T extends number>(value: number, min: T, max: T): T {
  SafeIntegerType.assertSafeInteger(value, "value");
  SafeIntegerType.assertSafeInteger(min, "min");
  SafeIntegerType.assertSafeInteger(max, "max");

  if (max < min) {
    throw new RangeError("`min` must be less than or equal to `max`.");
  }

  return NumberType.toClamped(value, min, max);
}

export function clampToPositive<T extends number>(value: T, max?: T): T {
  SafeIntegerType.assertSafeInteger(value, "value");
  const min = 1 as T;
  if (SafeIntegerType.isSafeInteger(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `1`.");
    }
    return NumberType.toClamped(value, min, max);
  }
  return NumberType.toNormalized(Math.max(value, 1)) as T;
}

export function clampToNonNegative<T extends number>(value: T, max?: T): T {
  SafeIntegerType.assertSafeInteger(value, "value");
  const min = ZERO as T;
  if (SafeIntegerType.isSafeInteger(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `0`.");
    }
    return NumberType.toClamped(value, min, max);
  }
  return NumberType.toNormalized(Math.max(value, ZERO)) as T;
}

export function clampToNonPositive<T extends number>(value: T, min?: T): T {
  SafeIntegerType.assertSafeInteger(value, "value");
  const max = ZERO as T;
  if (SafeIntegerType.isSafeInteger(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `0`.");
    }
    return NumberType.toClamped(value, min, max);
  }
  return NumberType.toNormalized(Math.min(value, ZERO)) as T;
}

export function clampToNegative<T extends number>(value: T, min?: T): T {
  SafeIntegerType.assertSafeInteger(value, "value");
  const max = -1 as T;
  if (SafeIntegerType.isSafeInteger(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `-1`.");
    }
    return NumberType.toClamped(value, min, max);
  }
  return NumberType.toNormalized(Math.min(value, -1)) as T;
}

//XXX fromNumber

export function fromBigInt(value: bigint): number {
  BigIntType.assertBigInt(value, "value");

  if (inSafeIntegerRange(value) !== true) {
    throw new RangeError("`value` must be within the range of safe integer.");
  }

  return Number(value);
}

export function toBigInt(source: number): bigint {
  SafeIntegerType.assertSafeInteger(source, "source");
  return BigInt(source);
}

export function fromString(value: string, options?: FromStringOptions): number {
  StringType.assertString(value, "value");
  const valueAsBigInt = BigIntType.fromString(value, options?.radix);
  return fromBigInt(valueAsBigInt);
}

export function toString(self: number, options?: ToStringOptions): string {
  SafeIntegerType.assertSafeInteger(self, "self");

  const radix = NumericType.radixPropertiesOf(options?.radix).radix;
  let result = self.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (NumberType.isPositive(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}
