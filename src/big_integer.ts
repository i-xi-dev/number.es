import { BIGINT_ZERO, inSafeIntegerRange, isBigInt, Radix } from "./numeric.ts";
import { isString } from "./utils.ts";
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

export function min<T extends bigint>(...args: T[]): T {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

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

export function max<T extends bigint>(...args: T[]): T {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => isBigInt(i))) !== true
  ) {
    throw new TypeError("`args` must be one or more `bigint`s.");
  }

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

export function fromNumber(source: number): bigint {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("`source` must be a safe integer.");
  }

  return BigInt(source);
}

export function toNumber(source: bigint): number {
  if (isBigInt(source) !== true) {
    throw new TypeError("`source` must be a `bigint`.");
  }
  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError("`source` must be within the range of safe integer.");
  }
  return Number(source);
}

export function fromString(
  source: string,
  //XXX options?: FromStringOptions, 依存ゼロの方針で行くなら10進以外のパーサの自作が必要
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
  if (isBigInt(source) !== true) {
    throw new TypeError("`source` must be a `bigint`.");
  }

  const radix = resolveRadix(options?.radix);
  return Number(source).toString(radix);
}
