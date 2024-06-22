import { isBigInt, isNumber } from "./numeric.ts";

function _isFiniteOrBigInt(test: unknown): test is number | bigint {
  return (isNumber(test) && Number.isFinite(test)) || isBigInt(test);
}

export class NumericRange<T extends (number | bigint)> {
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

  static #fromTuple<T extends (number | bigint)>(
    source: NumericRange.SourceTuple<T>,
  ): NumericRange<T> {
    if (source.length >= 1) {
      const i0 = source[0];
      const isIsFiniteOrBigInt = _isFiniteOrBigInt(i0);
      if (source.length === 2) {
        const i1 = source[1];
        if ((isIsFiniteOrBigInt === true) && _isFiniteOrBigInt(i1)) {
          return new NumericRange(i0, i1);
        }
      } else {
        return new NumericRange(i0, i0);
      }
    }
    throw new RangeError("source");
  }

  static from<T extends (number | bigint)>(
    ...args: Array<T | NumericRange.SourceTuple<T>>
  ): NumericRange<T> {
    if (args.length >= 1) {
      const arg0 = args[0];
      const arg0IsFiniteOrBigInt = _isFiniteOrBigInt(arg0);
      if (args.length === 1) {
        if (Array.isArray(arg0)) {
          return NumericRange.#fromTuple(arg0 as NumericRange.SourceTuple<T>);
        } else if (arg0IsFiniteOrBigInt === true) {
          return new NumericRange(arg0, arg0);
        }
      } else if (args.length >= 2) {
        const arg1 = args[1];
        if (args.length === 2) {
          if ((arg0IsFiniteOrBigInt === true) && _isFiniteOrBigInt(arg1)) {
            return new NumericRange(arg0, arg1);
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

export namespace NumericRange {
  export type SourceTuple<T extends (number | bigint)> = [min: T, max: T] | [
    minmax: T,
  ];
  //export type Source<T extends (number | bigint)> = SourceTuple<T> | {min:T,max:T};
}
