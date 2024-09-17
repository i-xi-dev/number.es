import { IntegerRange } from "./integer_range.ts";
import { isBigInt } from "./numeric.ts";

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
      return IntegerRange.rangeEquals(this, otherRange);
    } catch {
      return false;
    }
  }

  overlaps(otherRangeLike: BigIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeOverlaps(this, otherRange);
    } catch {
      return false;
    }
  }

  isSuperrangeOf(otherRangeLike: BigIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.rangeCovers(this, otherRange);
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
      return IntegerRange.rangeEquals(this, other);
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
