import { IntegerRange } from "./integer_range.ts";
import { normalizeNumber } from "./numeric.ts";

export class SafeIntegerRange<T extends number> implements IntegerRange<T> {
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
    return (this.#max - this.#min) + 1;
  }

  static from<T extends number>(
    rangeLike: SafeIntegerRange.Like<T>,
  ): SafeIntegerRange<T> {
    const { min, max } = IntegerRange.Struct.fromRangeLike(rangeLike);
    return new SafeIntegerRange(min, max);
  }

  static of<T extends number>(...args: Array<T>): SafeIntegerRange<T> {
    return this.from(args as SafeIntegerRange.Tuple<T>);
  }

  rangeEquals(otherRangeLike: SafeIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.aEqualsB(this, otherRange);
    } catch {
      return false;
    }
  }

  overlaps(otherRangeLike: SafeIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.aOverlapsB(this, otherRange);
    } catch {
      return false;
    }
  }

  isSuperrangeOf(otherRangeLike: SafeIntegerRange.Like<T>): boolean {
    try {
      const otherRange = IntegerRange.Struct.fromRangeLike(otherRangeLike);
      return IntegerRange.aContainsB(this, otherRange);
    } catch {
      return false;
    }
  }

  includes(test: number): test is T {
    return Number.isSafeInteger(test) && (test >= this.#min) &&
      (test <= this.#max);
  }

  clamp(input: number): T {
    if (Number.isSafeInteger(input) !== true) {
      throw new TypeError(
        "The type of `input` does not match the type of range.",
      );
    }

    if (this.includes(input)) {
      return normalizeNumber(input);
    }

    if (input < this.#min) {
      return normalizeNumber(this.#min);
    } else { // if (input > this.#max) {
      return normalizeNumber(this.#max);
    }
  }

  equals(other: unknown): boolean {
    if (other instanceof SafeIntegerRange) {
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

export namespace SafeIntegerRange {
  export type Tuple<T extends number> = IntegerRange.Tuple<T>;
  export type Struct<T extends number> = IntegerRange.Struct<T>;
  export type Like<T extends number> = IntegerRange.Like<T>;
}
