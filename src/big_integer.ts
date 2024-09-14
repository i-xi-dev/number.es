import { BIGINT_ZERO, inSafeIntegerRange, isBigInt, Radix } from "./numeric.ts";
import { isString } from "./utils.ts";
import { fromNumber as safeIntegerFromNumber } from "./safe_integer.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  REGEX,
  resolveRadix,
  ToStringOptions,
} from "./integer.ts";

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

export function fromNumber(
  source: number,
  options?: FromNumberOptions,
): bigint {
  return BigInt(safeIntegerFromNumber(source, options));
}

export function toNumber(input: bigint): number {
  if (isBigInt(input) !== true) {
    throw new TypeError("TODO");
  }
  if (inSafeIntegerRange(input) !== true) {
    throw new RangeError("TODO");
  }
  return Number(input);
}

export function fromString(
  source: string,
  options?: FromStringOptions,
): bigint {
  if (isString(source) !== true) {
    throw new TypeError("`source` must be a string.");
  }

  const radix = resolveRadix(options?.radix);
  const regex = REGEX[radix];
  if (regex.test(source) !== true) {
    throw new RangeError("`source` must be a representation of a integer.");
  }

  if (radix === Radix.DECIMAL) {
    return BigInt(source);
  } else {
    throw new Error("not implemented"); //TODO 10進に変換しないと
  }
}

export function toString(source: bigint, options?: ToStringOptions): string {
  if (isBigInt(source) !== true) {
    throw new TypeError("`source` must be a `bigint`.");
  }

  const radix = resolveRadix(options?.radix);
  return Number(source).toString(radix);
}
