import { isBigInt, numeric } from "./numeric.ts";

export interface IntegerRange<T extends numeric> {
  get min(): T;
  get max(): T;
  get size(): number;
  rangeEquals(otherRange: IntegerRange.Like<T>): boolean;
  overlaps(otherRange: IntegerRange.Like<T>): boolean;

  isSuperrangeOf(otherRange: IntegerRange.Like<T>): boolean; //covers
  // isSubrangeOf(otherRange: IntegerRange.Like<T>): boolean;//isCoveredBy
  // isAdjacentTo(otherRange: IntegerRange.Like<T>): boolean;
  // isDisjointFrom(otherRange: IntegerRange.Like<T>): boolean;
  // exceptWith(otherRange: IntegerRange.Like): IntegerRange;
  // intersectWith(otherRange: IntegerRange.Like): IntegerRange;
  // unionWith(otherRange: IntegerRange.Like): IntegerRange;
  // normalize(ranges)
  includes(test: T): boolean;
  clamp(input: T): T;
  equals(other: unknown): boolean;
  [Symbol.iterator](): IterableIterator<T>;
  toArray(): Array<T>;
  toSet(): Set<T>;
}

export namespace IntegerRange {
  export type Tuple<T extends numeric> = [min: T, max: T] | [
    minmax: T,
  ];

  export type Struct<T extends numeric> = {
    min: T;
    max: T;
  };

  export type Like<T extends numeric> = Tuple<T> | Struct<T>;

  export function rangeEquals<T extends numeric, U extends numeric>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((self.min as numeric) === (other.min as numeric)) &&
      ((self.max as numeric) === (other.max as numeric));
  }

  export function rangeOverlaps<T extends numeric, U extends numeric>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((typeof self.min) === (typeof self.max)) &&
      (self.min <= other.max) && (self.max >= other.min);
  }

  export function rangeCovers<T extends numeric, U extends numeric>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return ((typeof self.min) === (typeof self.max)) &&
      (self.min <= other.min) && (self.max >= other.max);
  }

  export function rangeIsDisjointFrom<T extends numeric, U extends numeric>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    return (rangeOverlaps(self, other) !== true);
  }

  // 図形のtouchesとは意味が異なる。disjointかつ隣接
  export function rangeIsAdjacentTo<T extends numeric, U extends numeric>(
    self: Struct<T>,
    other: Struct<U>,
  ) {
    if (rangeIsDisjointFrom(self, other) !== true) {
      return false;
    }

    const one = (isBigInt(self.min) ? 1n : 1) as T;
    if ((other.min - self.max) === one) {
      return true;
    } else if ((self.min - other.max) === one) {
      return true;
    }

    return false;
  }

  export namespace Struct {
    export function fromRangeLike<T extends numeric>(
      rangeLike: Like<T>,
    ): Struct<T> {
      let parsedMin: T | undefined;
      let parsedMax: T | undefined;

      if (Array.isArray(rangeLike)) {
        if (rangeLike.length > 0) {
          parsedMin = rangeLike[0];
          if (rangeLike.length > 1) {
            parsedMax = rangeLike[1];
          } else {
            parsedMax = rangeLike[0];
          }
        } else {
          throw new RangeError(
            "`rangeLike` array must have more than one element.",
          );
        }
      } else if (rangeLike && (typeof rangeLike === "object")) {
        parsedMin = ("min" in rangeLike) ? rangeLike.min : undefined;
        parsedMax = ("max" in rangeLike) ? rangeLike.max : undefined;
      } else {
        throw new TypeError("`rangeLike` must be a `IntegerRange.Like`.");
      }

      if (Number.isSafeInteger(parsedMin) && Number.isSafeInteger(parsedMax)) {
        // ok
      } else if (isBigInt(parsedMin) && isBigInt(parsedMax)) {
        // ok
      } else {
        throw new TypeError(
          "`rangeLike` must have the integers `min` and `max`.",
        );
      }

      if ((parsedMin as T) > (parsedMax as T)) {
        throw new RangeError(
          "`min` must be less than or equal to `max`.",
        );
      }

      return {
        min: parsedMin as T,
        max: parsedMax as T,
      };
    }
  }
}
