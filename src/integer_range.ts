import { isBigInt, numeric } from "./numeric.ts";

export interface IntegerRange<T extends numeric> {
  get min(): T;
  get max(): T;
  get size(): number;
  rangeEquals(otherRange: IntegerRange.Like<T>): boolean;
  overlaps(otherRange: IntegerRange.Like<T>): boolean;
  isSuperrangeOf(otherRange: IntegerRange.Like<T>): boolean;
  // isSubrangeOf(otherRange: IntegerRange.Like<T>): boolean;
  // touches(otherRange: IntegerRange.Like<T>): boolean;
  // disjoint(otherRange: IntegerRange.Like<T>): boolean;
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
//TODO 命名をSetのメソッド名に寄せる

export namespace IntegerRange {
  export type Tuple<T extends numeric> = [min: T, max: T] | [
    minmax: T,
  ];

  export type Struct<T extends numeric> = {
    min: T;
    max: T;
  };

  export type Like<T extends numeric> = Tuple<T> | Struct<T>;

  export function aEqualsB<T extends numeric>(a: Struct<T>, b: Struct<T>) {
    return (a.min === b.min) && (a.max === b.max);
  }

  export function aOverlapsB<T extends numeric>(a: Struct<T>, b: Struct<T>) {
    return (a.min <= b.max) || (a.max >= b.min);
  }

  export function aContainsB<T extends numeric>(a: Struct<T>, b: Struct<T>) {
    return (a.min <= b.min) && (a.max >= b.max);
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
        throw new TypeError("TODO");
      }

      if ((parsedMin as T) > (parsedMax as T)) {
        throw new RangeError(
          "`rangeLike[0]` must be less than or equal to `rangeLike[1]`",
        );
      }

      return {
        min: parsedMin as T,
        max: parsedMax as T,
      };
    }
  }
}
