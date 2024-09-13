import { BIGINT_ZERO, isBigInt, isString } from "./utils.ts";
import { fromNumber as safeIntegerFromNumber } from "./safe_integer.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  REGEX,
  resolveRadix,
  ToStringOptions,
} from "./integer.ts";
import { inSafeIntegerRange } from "./numeric.ts";
import { IntegerRange } from "./integer_range.ts";
import { Radix } from "./radix.ts";

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

export class BigIntegerRange<T extends bigint> implements IntegerRange<T> {
  readonly #min: T;
  readonly #max: T;

  private constructor(min: T, max: T) {
    this.#min = min;
    this.#max = max;
  }

  get min(): T {
    return this.#min;
  }

  get max(): T {
    return this.#max;
  }

  get size(): number {
    const d = this.#max - this.#min;
    if (d > Number.MAX_SAFE_INTEGER) {
      throw new Error("TODO");
    }
    return Number(d) + 1;
  }

  static from<T extends bigint>(
    rangeLike: BigIntegerRange.Like<T>,
  ): BigIntegerRange<T> {
    const { min, max } = IntegerRange.Struct.fromRangeLike(rangeLike);
    return new BigIntegerRange(min, max);
  }

  static of<T extends bigint>(...args: Array<T>): BigIntegerRange<T> {
    return this.from(args as BigIntegerRange.Tuple<T>);
  }

  rangeEquals(otherRangeLike: BigIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.aEqualsB(this, otherRange);
    } catch {
      return false;
    }
  }

  overlaps(otherRangeLike: BigIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.aOverlapsB(this, otherRange);
    } catch {
      return false;
    }
  }

  isSuperrangeOf(otherRangeLike: BigIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.aContainsB(this, otherRange);
    } catch {
      return false;
    }
  }

  includes(test: bigint): test is T {
    return isBigInt(test) && (test >= this.#min) && (test <= this.#max);
  }

  clamp(input: bigint): T {
    if (isBigInt(input) !== true) {
      throw new TypeError(
        "The type of `input` does not match the type of range.",
      );
    }

    if (this.includes(input)) {
      return input;
    }

    if (input < this.#min) {
      return this.#min;
    } else { // if (input > this.#max) {
      return this.#max;
    }
  }

  equals(other: unknown): boolean {
    if (other instanceof BigIntegerRange) {
      return IntegerRange.aEqualsB(this, other);
    }
    return false;
  }

  [Symbol.iterator](): IterableIterator<T> {
    const min = this.min;
    const max = this.max;
    return (function* () {
      for (let i = min; i <= max; i++) {
        yield i;
      }
    })();
  }

  toArray(): Array<T> {
    return [...this[Symbol.iterator]()];
  }

  toSet(): Set<T> {
    return new Set(this[Symbol.iterator]());
  }
}

export namespace BigIntegerRange {
  export type Tuple<T extends bigint> = IntegerRange.Tuple<T>;
  export type Struct<T extends bigint> = IntegerRange.Struct<T>;
  export type Like<T extends bigint> = IntegerRange.Like<T>;
}
