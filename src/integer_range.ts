export interface IntegerRange<T extends (number | bigint)> {
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
  export type Tuple<T extends (number | bigint)> = [min: T, max: T] | [
    minmax: T,
  ];

  export type Struct<T extends (number | bigint)> = {
    min: T;
    max: T;
  };

  export type Like<T extends (number | bigint)> = Tuple<T> | Struct<T>;
}
