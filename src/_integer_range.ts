export interface _IntegerRange<T extends (number | bigint)> {
  min: T;
  max: T;
  rangeEquals(otherRange: _IntegerRange.Like<T>): boolean;
  overlaps(otherRange: _IntegerRange.Like<T>): boolean;
  isSuperrangeOf(otherRange: _IntegerRange.Like<T>): boolean;
  // isSubrangeOf(otherRange: _IntegerRange.Like<T>): boolean;
  // touches(otherRange: _IntegerRange.Like<T>): boolean;
  // disjoint(otherRange: _IntegerRange.Like<T>): boolean;
  // exceptWith(otherRange: _IntegerRange.Like): _IntegerRange;
  // intersectWith(otherRange: _IntegerRange.Like): _IntegerRange;
  // unionWith(otherRange: _IntegerRange.Like): _IntegerRange;
  // normalize(ranges)
  includes(test: T): boolean;
  clamp(input: T): T;
  equals(other: unknown): boolean;
  [Symbol.iterator](): IterableIterator<T>;
  toArray(): Array<T>;
}

export abstract class _IntegerRangeBase<T extends (number | bigint)> implements _IntegerRange<T> {
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

  protected abstract _checkType(test: unknown): test is T;

  abstract rangeEquals(otherRange: _IntegerRange.Like<T>): boolean;

  protected _rangeEquals(otherMin: T, otherMax: T): boolean {
    return (this.#min === otherMin) && (this.#max === otherMax);
  }

  abstract overlaps(otherRange: _IntegerRange.Like<T>): boolean;

  protected _rangeOverlaps(otherMin: T, otherMax: T): boolean {
    return (this.#min <= otherMax) || (this.#max >= otherMin);
  }

  abstract isSuperrangeOf(otherRange: _IntegerRange.Like<T>): boolean;

  protected _rangeContains(otherMin: T, otherMax: T): boolean {
    return (this.#min <= otherMin) && (this.#max >= otherMax);
  }

  includes(test: T): boolean {
    if (this._checkType(test) !== true) {
      throw new TypeError("The type of `test` does not match the type of range.");
    }
    return (test >= this.#min) && (test <= this.#max);
  }

  clamp(input: T): T {
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
}

export namespace _IntegerRange {
  export type Tuple<T extends (number | bigint)> = [min: T, max: T] | [minmax: T];

  export type Struct<T extends (number | bigint)> = {
    min: T,
    max: T,
  };
  
  export type Like<T extends (number | bigint)> = Tuple<T> | Struct<T>;

  export function parse<T extends (number | bigint)>(rangeLike: _IntegerRange.Like<T>, validator: (test: unknown) => test is T): Struct<T> {
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
      throw new TypeError("`rangeLike` must be a `_IntegerRange.Like`.");
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
