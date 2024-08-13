import {IntegerRange}from "./integer_range.ts";

export abstract class _IntegerRangeBase<T extends (number | bigint)> implements IntegerRange<T> {
  readonly #min: T;
  readonly #max: T;

  protected constructor(min: T, max: T) {
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

  protected abstract _checkType(test: unknown): test is T;

  abstract rangeEquals(otherRange: IntegerRange.Like<T>): boolean;

  protected _rangeEquals(otherMin: T, otherMax: T): boolean {
    return (this.#min === otherMin) && (this.#max === otherMax);
  }

  abstract overlaps(otherRange: IntegerRange.Like<T>): boolean;

  protected _rangeOverlaps(otherMin: T, otherMax: T): boolean {
    return (this.#min <= otherMax) || (this.#max >= otherMin);
  }

  abstract isSuperrangeOf(otherRange: IntegerRange.Like<T>): boolean;

  protected _rangeContains(otherMin: T, otherMax: T): boolean {
    return (this.#min <= otherMin) && (this.#max >= otherMax);
  }

  includes(test: T): boolean {
    return this._checkType(test) && (test >= this.#min) && (test <= this.#max);
  }

  clamp(input: T): T {
    if (this._checkType(input) !== true) {
      throw new TypeError("The type of `input` does not match the type of range.");
    }

    if (this.includes(input)) {
      return input;
    }

    if (input < this.#min) {
      return this.#min;
    }
    else { // if (input > this.#max) {
      return this.#max;
    }
  }

  abstract equals(other: unknown): boolean;

  [Symbol.iterator](): IterableIterator<T> {
    const min = this.min;
    const max = this.max;
    return (function*() {
      for (let i = min; i <= max; i++) {
        yield i;
      }
    })();
  }

  toArray(): Array<T> {
    return [...this[Symbol.iterator]()];
  }

  toSet(): Set<T> {
    return new Set<T>(this[Symbol.iterator]());
  }
}

export namespace _IntegerRange {
  export function parse<T extends (number | bigint)>(rangeLike: IntegerRange.Like<T>, validator: (test: unknown) => test is T): IntegerRange.Struct<T> {
    let parsedMin: T | undefined;
    let parsedMax: T | undefined;
  
    if (Array.isArray(rangeLike)) {
      if (rangeLike.length > 0) {
        parsedMin = rangeLike[0];
        if (rangeLike.length > 1) {
          parsedMax = rangeLike[1];
        }
        else {
          parsedMax = rangeLike[0];
        }
      }
  
      throw new RangeError("`rangeLike` array must have more than one element.");
    }
    else if (rangeLike && (typeof rangeLike === "object")) {
      parsedMin = ("min" in rangeLike) ? rangeLike.min : undefined;
      parsedMax = ("max" in rangeLike) ? rangeLike.max : undefined;
    }
    else {
      throw new TypeError("`rangeLike` must be a `IntegerRange.Like`.");
    }
  
    if (validator(parsedMin) !== true) {
      throw new TypeError("TODO");
    }
    if (validator(parsedMax) !== true) {
      throw new TypeError("TODO");
    }

    if (parsedMin > parsedMax) {
      throw new RangeError("`rangeLike[0]` must be less than or equal to `rangeLike[1]`");
    }

    return {
      min: parsedMin,
      max: parsedMax,
    };
  }  
}
