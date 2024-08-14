import { _IntegerRange, _IntegerRangeBase } from "./_integer_range.ts";
import { IntegerRange } from "./integer_range.ts";
import { Radix } from "./radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

export const ZERO = 0n;

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isPositive(test: bigint): boolean {
  return (test > ZERO);
}

export function isNonNegative(test: bigint): boolean {
  return (test >= ZERO);
}

export function isNonPositive(test: bigint): boolean {
  return (test <= ZERO);
}

export function isNegative(test: bigint): boolean {
  return (test < ZERO);
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

export type FromOptions = {
  roundingMode?: RoundingMode;
  //XXX fallback?: "exception" | ...;
  //XXX clampRange?: Range;
};

//TODO fromNumber
export function fromInteger(source: number): bigint {//TODO options
  if (Number.isSafeInteger(source)) {
    return BigInt(source);
  }
  throw new TypeError("`source` must be a safe integer.");
}

export function fromString(source: string): bigint {//TODO options
  if (/^[0-9]$/.test(source)) {
    return BigInt(source);
  }
  throw new TypeError("TODO");
}

export function toString(source: bigint): string {
  if (isBigInt(source)) {
    return source.toString(Radix.DECIMAL);
  }
  throw new TypeError("TODO");
}

function _parseRangeLike(rangeLike: Range.Like): Range.Struct {
  return _IntegerRange.parse<bigint>(rangeLike, isBigInt);
}

export class Range extends _IntegerRangeBase<bigint>
  implements IntegerRange<bigint> {
  private constructor(min: bigint, max: bigint) {
    super(min, max);
  }

  protected override _checkType(test: unknown): test is bigint {
    return isBigInt(test);
  }

  static from(rangeLike: Range.Like): Range {
    const { min, max } = _parseRangeLike(rangeLike);
    return new Range(min, max);
  }

  static of(...args: Array<bigint>): Range {
    return this.from(args as Range.Tuple);
  }

  override rangeEquals(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeEquals(min, max);
    } catch {
      return false;
    }
  }

  override overlaps(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeOverlaps(min, max);
    } catch {
      return false;
    }
  }

  override isSuperrangeOf(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeContains(min, max);
    } catch {
      return false;
    }
  }

  override equals(other: unknown): boolean {
    if (other instanceof Range) {
      return this._rangeEquals(other.min, other.max);
    }
    return false;
  }
}

export namespace Range {
  export type Tuple = IntegerRange.Tuple<bigint>;
  export type Struct = IntegerRange.Struct<bigint>;
  export type Like = IntegerRange.Like<bigint>;
}
