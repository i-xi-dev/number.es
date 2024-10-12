import {
  assertBigInt,
  assertSafeInteger,
  isBigInt,
  isString,
} from "./utils.ts";
import { BIGINT_ZERO, inSafeIntegerRange, Radix } from "./numeric.ts";
import { RADIX_REGEX, resolveRadix, ToStringOptions } from "./integer.ts";

export const ZERO = BIGINT_ZERO;

export function isPositive(test: bigint): boolean {
  return isBigInt(test) && (test > ZERO);
}

export function isNonNegative(test: bigint): boolean {
  return isBigInt(test) && (test >= ZERO);
}

export function isNonPositive(test: bigint): boolean {
  return isBigInt(test) && (test <= ZERO);
}

export function isNegative(test: bigint): boolean {
  return isBigInt(test) && (test < ZERO);
}

export function isOdd(test: bigint): boolean {
  return isBigInt(test) && ((test % 2n) !== ZERO);
}

export function isEven(test: bigint): boolean {
  return isBigInt(test) && ((test % 2n) === ZERO);
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
      args.every((i) => isBigInt(i))) !== true
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
      args.every((i) => isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

  return _max(...args);
}

export function clampToPositive(value: bigint): bigint {
  assertBigInt(value, "value");
  return _max(value, 1n);
}

export function clampToNonNegative(value: bigint): bigint {
  assertBigInt(value, "value");
  return _max(value, ZERO);
}

export function clampToNonPositive(value: bigint): bigint {
  assertBigInt(value, "value");
  return _min(value, ZERO);
}

export function clampToNegative(value: bigint): bigint {
  assertBigInt(value, "value");
  return _min(value, -1n);
}

export function fromNumber(source: number): bigint {
  assertSafeInteger(source, "source");

  return BigInt(source);
}

export function toNumber(source: bigint): number {
  assertBigInt(source, "source");

  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError("`source` must be within the range of safe integer.");
  }
  return Number(source);
}

export function fromString(
  source: string,
  //TODO options?: FromStringOptions,
): bigint {
  if (isString(source) !== true) {
    throw new TypeError("`source` must be a `string`.");
  }

  // const radix = resolveRadix(options?.radix);
  // const regex = REGEX[radix];
  const regex = RADIX_REGEX[Radix.DECIMAL];
  if (regex.test(source) !== true) {
    throw new RangeError("`source` must be a representation of a integer.");
  }

  // if (radix === Radix.DECIMAL) {
  return BigInt(source);
  // } else {
  //   //XXX
  // }
}

export function toString(source: bigint, options?: ToStringOptions): string {
  assertBigInt(source, "source");

  const radix = resolveRadix(options?.radix);
  return Number(source).toString(radix);
}
