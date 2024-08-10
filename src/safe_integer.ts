import { _IntegerRangeBase, _IntegerRange } from "./_integer_range.ts";
import { normalize,ZERO } from "./numeric.ts";
import { Radix } from "./radix.ts";

export function isOdd(test: number): boolean {
  return Number.isSafeInteger(test) && ((test % 2) !== ZERO);
}

export function isEven(test: number): boolean {
  return Number.isSafeInteger(test) && ((test % 2) === ZERO);
}

export function toBigInt(source: number): bigint {
  if (Number.isSafeInteger(source)) {
    return BigInt(source);
  }
  throw new TypeError("`source` must be a safe integer.");
}

export function toString(source: number): string {
  if (Number.isSafeInteger(source)) {
    return normalize(source).toString(Radix.DECIMAL);
  }
  throw new TypeError("source");
}

function _parseRangeLike(rangeLike: Range.Like): Range.Struct {
  return _IntegerRange.parse<number>(rangeLike, Number.isSafeInteger as (test: unknown) => test is number);
}

export class Range extends _IntegerRangeBase<number> implements _IntegerRange<number> {
  private constructor(min: number, max: number) {
    super(min, max);
  }

  protected override _checkType(test: unknown): test is number {
    return Number.isSafeInteger(test);
  }

  static from(rangeLike: Range.Like): Range {
    const { min, max } = _parseRangeLike(rangeLike);
    return new Range(min, max);
  }

  static of(...args: Array<number>): Range {
    return this.from(args as _IntegerRange.Tuple<number>);
  }

  override rangeEquals(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeEquals(min, max);
    }
    catch {
      return false;
    }
  }

  override overlaps(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeOverlaps(min, max);
    }
    catch {
      return false;
    }
  }

  override isSuperrangeOf(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeContains(min, max);
    }
    catch {
      return false;
    }
  }
  
  override equals(other: unknown): boolean {
    if (other instanceof Range) {
      return this._rangeEquals(other.min, other.max);
    }
    return false;
  }

  override clamp(input: number): number {
    return normalize(super.clamp(input));
  }

}

export namespace Range {
  export type Tuple = _IntegerRange.Tuple<number>;
  export type Struct = _IntegerRange.Struct<number>;
  export type Like = _IntegerRange.Like<number>;
}
