import { BIGINT_ZERO, inSafeIntegerRange } from "./numeric.ts";
import {
  BigIntType,
  NumberType,
  SafeIntegerType,
  StringType,
} from "../deps.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  resolveRadix,
  roundNumber,
  stringToBigInt,
  ToStringOptions,
} from "./integer.ts";

export const ZERO = BIGINT_ZERO;

export function isPositive(test: bigint): test is bigint {
  return BigIntType.isPositive(test);
}

export function isNonNegative(test: bigint): test is bigint {
  return BigIntType.isNonNegative(test);
}

export function isNonPositive(test: bigint): test is bigint {
  return BigIntType.isNonPositive(test);
}

export function isNegative(test: bigint): test is bigint {
  return BigIntType.isNegative(test);
}

export function isOdd(test: bigint): test is bigint {
  return BigIntType.isOdd(test);
}

export function isEven(test: bigint): test is bigint {
  return BigIntType.isEven(test);
}

export function min<T extends bigint>(...args: T[]): T {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => BigIntType.isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

  return BigIntType.minOf(args[0], ...args.slice(1));
}

export function max<T extends bigint>(...args: T[]): T {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => BigIntType.isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

  return BigIntType.maxOf(args[0], ...args.slice(1));
}

//TODO isBigIntInRange

export function clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  BigIntType.assertBigInt(value, "value");
  BigIntType.assertBigInt(min, "min");
  BigIntType.assertBigInt(max, "max");

  if (max < min) {
    throw new RangeError("`min` must be less than or equal to `max`.");
  }

  return BigIntType.toClamped(value, min, max);
}

export function clampToPositive<T extends bigint>(value: T, max?: T): T {
  BigIntType.assertBigInt(value, "value");
  const min = 1n as T;
  if (BigIntType.isBigInt(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `1n`.");
    }
    return BigIntType.toClamped(value, min, max);
  }
  return BigIntType.maxOf(value, min);
}

export function clampToNonNegative<T extends bigint>(value: T, max?: T): T {
  BigIntType.assertBigInt(value, "value");
  const min = ZERO as T;
  if (BigIntType.isBigInt(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `0n`.");
    }
    return BigIntType.toClamped(value, min, max);
  }
  return BigIntType.maxOf(value, min);
}

export function clampToNonPositive<T extends bigint>(value: T, min?: T): T {
  BigIntType.assertBigInt(value, "value");
  const max = ZERO as T;
  if (BigIntType.isBigInt(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `0n`.");
    }
    return BigIntType.toClamped(value, min, max);
  }
  return BigIntType.minOf(value, max);
}

export function clampToNegative<T extends bigint>(value: T, min?: T): T {
  BigIntType.assertBigInt(value, "value");
  const max = -1n as T;
  if (BigIntType.isBigInt(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `-1n`.");
    }
    return BigIntType.toClamped(value, min, max);
  }
  return BigIntType.minOf(value, max);
}

export function fromNumber(
  value: number,
  options?: FromNumberOptions,
): bigint {
  NumberType.assertNumber(value, "value");
  //TODO bigintのときはFiniteでなければエラーで良いのでは

  if (Number.isNaN(value)) {
    throw new TypeError("`value` must not be `NaN`.");
  }

  let adjustedValue: number;
  if (value > Number.MAX_SAFE_INTEGER) {
    adjustedValue = Number.MAX_SAFE_INTEGER;
  } else if (value < Number.MIN_SAFE_INTEGER) {
    adjustedValue = Number.MIN_SAFE_INTEGER;
  } else {
    adjustedValue = value;
  }

  let valueAsInt: number;
  if (Number.isSafeInteger(adjustedValue)) {
    valueAsInt = adjustedValue;
  } else {
    valueAsInt = roundNumber(adjustedValue, options?.roundingMode);
  }

  return BigInt(valueAsInt);
}

export function toNumber(source: bigint): number {
  BigIntType.assertBigInt(source, "source");

  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError("`source` must be within the range of safe integer.");
  }
  return Number(source);
}

export function fromString(value: string, options?: FromStringOptions): bigint {
  StringType.assertString(value, "value");

  const radix = resolveRadix(options?.radix);
  const valueAsBigInt = stringToBigInt(value, radix);

  return valueAsBigInt;
}

export function toString(self: bigint, options?: ToStringOptions): string {
  BigIntType.assertBigInt(self, "self");

  const radix = resolveRadix(options?.radix);
  let result = self.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (SafeIntegerType.isPositive(minIntegralDigits)) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}
