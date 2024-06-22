import { isNumber } from "./numeric.ts";

export class NumberRange<T extends number> {
  readonly #min: T;
  readonly #max: T;

  private constructor(min: T, max: T) {
    this.#min = min;
    this.#max = max;
  }

  get min(): number {
    return this.#min;
  }

  get max(): number {
    return this.#max;
  }

  static #exact<T extends number>(minmax: T): NumberRange<T> {
    if (Number.isFinite(minmax) !== true) {
      throw new TypeError("minmax");
    }
    return new NumberRange(minmax, minmax);
  }

  static #ofMinAndMax<T extends number>(min: T, max: T): NumberRange<T> {
    if (Number.isFinite(min) !== true) {
      throw new TypeError("min");
    }
    if (Number.isFinite(max) !== true) {
      throw new TypeError("max");
    }
    return new NumberRange(min, max);
  }

  static #fromTuple<T extends number>(
    source: NumberRange.SourceTuple<T>,
  ): NumberRange<T> {
    if (Array.isArray(source) !== true) {
      throw new TypeError("source");
    }
    if (source.length <= 0) {
      throw new RangeError("source");
    }

    if (source.length >= 1 && isNumber(source[0])) {
      if (source.length === 2) {
        if (isNumber(source[1])) {
          return NumberRange.#ofMinAndMax(source[0], source[1]);
        }
      } else {
        return NumberRange.#exact(source[0]);
      }
    }
    throw new RangeError("source");
  }

  static from<T extends number>(
    ...args: Array<T | NumberRange.SourceTuple<T>>
  ): NumberRange<T> {
    if (args.length >= 1) {
      const arg0 = args[0];
      if (args.length === 1) {
        if (Array.isArray(arg0)) {
          return NumberRange.#fromTuple(arg0 as NumberRange.SourceTuple<T>);
        } else if (isNumber(arg0)) {
          return NumberRange.#exact(arg0 as T);
        }
      } else if (args.length >= 2) {
        const arg1 = args[1];
        if (args.length === 2) {
          if (isNumber(arg1)) {
            return NumberRange.#ofMinAndMax(arg0 as T, arg1 as T);
          }
        }
      }
    }

    throw new TypeError("args");
  }

  includesNumber(test: number): boolean {
    if (Number.isFinite(test) !== true) {
      throw new TypeError("test");
    }

    return (test >= this.#min) && (test <= this.#max);
  }

  //TODO 何にclampするかはsourceの型に依存する
  // clampNumber(source: T): T {
  //   if (isNumber(source ) || Number.isNaN(source)) {
  //     throw new TypeError("source");
  //   }

  //   const clamped = Math.max(this.#min, Math.min(this.#max, source)) as T;
  //   return normalizeNumber(clamped);
  // }

  //TODO intersectsRange

  //TODO unionRange
}

export namespace NumberRange {
  export type SourceTuple<T extends number> = [min: T, max: T] | [minmax: T];
  //export type Source<T extends number> = SourceTuple<T> | {min:T,max:T};
}
