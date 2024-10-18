import { BIGINT_ZERO, inSafeIntegerRange } from "./numeric.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  resolveRadix,
  roundNumber,
  stringToBigInt,
  ToStringOptions,
} from "./integer.ts";
import { isPositive as isPositiveSafeInteger } from "./safe_integer.ts";
import { Type } from "../deps.ts";

export const ZERO = BIGINT_ZERO;

export function isPositive(test: bigint): test is bigint {
  return Type.isPositiveBigInt(test);
}

export function isNonNegative(test: bigint): test is bigint {
  return Type.isNonNegativeBigInt(test);
}

export function isNonPositive(test: bigint): test is bigint {
  return Type.isNonPositiveBigInt(test);
}

export function isNegative(test: bigint): boolean {
  return Type.isBigInt(test) && (test < ZERO);
}

export function isOdd(test: bigint): boolean {
  return Type.isBigInt(test) && ((test % 2n) !== ZERO);
}

export function isEven(test: bigint): boolean {
  return Type.isBigInt(test) && ((test % 2n) === ZERO);
}

function _min<T extends bigint>(...args: T[]): T {
  let min = args[0];
  let tmp: T;
  for (let i = 1; i < args.length; i++) {
    tmp = args[i];
    if (tmp < min) {
      min = tmp;
    }
  }
  return min;
}

export function min<T extends bigint>(...args: T[]): T {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => Type.isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

  return _min(...args);
}

function _max<T extends bigint>(...args: T[]): T {
  let max = args[0];
  let tmp: T;
  for (let i = 1; i < args.length; i++) {
    tmp = args[i];
    if (tmp > max) {
      max = tmp;
    }
  }
  return max;
}

export function max<T extends bigint>(...args: T[]): T {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => Type.isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

  return _max(...args);
}

function _clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  return _min(_max(value, min), max) as T;
}

export function clamp<T extends bigint>(value: bigint, min: T, max: T): T {
  Type.assertBigInt(value, "value");
  Type.assertBigInt(min, "min");
  Type.assertBigInt(max, "max");

  if (max < min) {
    throw new RangeError("`min` must be less than or equal to `max`.");
  }

  return _clamp(value, min, max);
}

export function clampToPositive<T extends bigint>(value: T, max?: T): T {
  Type.assertBigInt(value, "value");
  const min = 1n as T;
  if (Type.isBigInt(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `1n`.");
    }
    return _clamp(value, min, max);
  }
  return _max(value, min);
}

export function clampToNonNegative<T extends bigint>(value: T, max?: T): T {
  Type.assertBigInt(value, "value");
  const min = ZERO as T;
  if (Type.isBigInt(max)) {
    if (max < min) {
      throw new RangeError("`max` must be greater than or equal to `0n`.");
    }
    return _clamp(value, min, max);
  }
  return _max(value, min);
}

export function clampToNonPositive<T extends bigint>(value: T, min?: T): T {
  Type.assertBigInt(value, "value");
  const max = ZERO as T;
  if (Type.isBigInt(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `0n`.");
    }
    return _clamp(value, min, max);
  }
  return _min(value, max);
}

export function clampToNegative<T extends bigint>(value: T, min?: T): T {
  Type.assertBigInt(value, "value");
  const max = -1n as T;
  if (Type.isBigInt(min)) {
    if (max < min) {
      throw new RangeError("`min` must be less than or equal to `-1n`.");
    }
    return _clamp(value, min, max);
  }
  return _min(value, max);
}

export function fromNumber(
  value: number,
  options?: FromNumberOptions,
): bigint {
  Type.assertNumber(value, "value");
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
  Type.assertBigInt(source, "source");

  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError("`source` must be within the range of safe integer.");
  }
  return Number(source);
}

export function fromString(value: string, options?: FromStringOptions): bigint {
  Type.assertString(value, "value");

  const radix = resolveRadix(options?.radix);
  const valueAsBigInt = stringToBigInt(value, radix);

  return valueAsBigInt;
}

export function toString(self: bigint, options?: ToStringOptions): string {
  Type.assertBigInt(self, "self");

  const radix = resolveRadix(options?.radix);
  let result = self.toString(radix);

  if (options?.lowerCase !== true) {
    result = result.toUpperCase();
  }

  const minIntegralDigits = options?.minIntegralDigits;
  if (
    Type.isNumber(minIntegralDigits) && isPositiveSafeInteger(minIntegralDigits)
  ) {
    result = result.padStart(minIntegralDigits, "0");
  }

  return result;
}
