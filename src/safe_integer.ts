import {
  clampToSafeInteger,
  inSafeIntegerRange,
  isBigInt,
  isNumber,
  normalizeNumber,
  NUMBER_ZERO,
} from "./numeric.ts";
import {
  FromNumberOptions,
  FromStringOptions,
  REGEX,
  resolveRadix,
  ToStringOptions,
} from "./integer.ts";
import { IntegerRange } from "./integer_range.ts";
import { isString } from "./utils.ts";
import { RoundingMode } from "./rounding_mode.ts";

export const ZERO = NUMBER_ZERO;

export function isPositive(test: number): boolean {
  return Number.isSafeInteger(test) && (test > ZERO);
}

export function isNonNegative(test: number): boolean {
  return Number.isSafeInteger(test) && (test >= ZERO);
}

export function isNonPositive(test: number): boolean {
  return Number.isSafeInteger(test) && (test <= ZERO);
}

export function isNegative(test: number): boolean {
  return Number.isSafeInteger(test) && (test < ZERO);
}

export function isOdd(test: number): boolean {
  return Number.isSafeInteger(test) && ((test % 2) !== ZERO);
}

export function isEven(test: number): boolean {
  return Number.isSafeInteger(test) && ((test % 2) === ZERO);
}

export function fromNumber(
  source: number,
  options?: FromNumberOptions,
): number {
  if ((isNumber(source) !== true) || Number.isNaN(source)) {
    throw new TypeError("TODO");
  }

  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError("TODO");
  }

  if (Number.isSafeInteger(source)) {
    return normalizeNumber(source);
  }

  const rounded = _roundToSafeInteger(source, options?.roundingMode);

  return clampToSafeInteger(rounded);
}

export function _roundToSafeInteger(
  source: number,
  roundingMode?: RoundingMode,
): number {
  if (Number.isFinite(source) !== true) {
    throw new Error("TODO");
  }

  const integralPart = normalizeNumber(Math.trunc(source));
  const integralPartIsEven = isEven(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(source)) {
    return normalizeNumber(source);
  }

  const nearestP = normalizeNumber(Math.ceil(source));
  const nearestN = normalizeNumber(Math.floor(source));
  const sourceIsNegative = isNegative(source);
  const nearestPH = nearestP - 0.5;
  const nearestNH = nearestN + 0.5;

  const halfUp = (): number => {
    return (source >= nearestPH) ? nearestP : nearestN;
  };

  const halfDown = (): number => {
    return (source <= nearestNH) ? nearestN : nearestP;
  };

  switch (resolvedRoundingMode) {
    case RoundingMode.UP:
      return nearestP;

    case RoundingMode.DOWN:
      return nearestN;

    case RoundingMode.TOWARD_ZERO:
      return integralPart;

    case RoundingMode.AWAY_FROM_ZERO:
      return sourceIsNegative ? nearestN : nearestP;

    case RoundingMode.HALF_UP:
      return halfUp();

    case RoundingMode.HALF_DOWN:
      return halfDown();

    case RoundingMode.HALF_TOWARD_ZERO:
      return sourceIsNegative ? halfUp() : halfDown();

    case RoundingMode.HALF_AWAY_FROM_ZERO:
      return sourceIsNegative ? halfDown() : halfUp();

    case RoundingMode.HALF_TO_EVEN:
      if (sourceIsNegative) {
        if (source === nearestPH) {
          return integralPartIsEven ? integralPart : nearestN;
        }
        return halfDown();
      }

      if (source === nearestNH) {
        return integralPartIsEven ? integralPart : nearestP;
      }
      return halfUp();

    default:
      return ZERO as never;
  }
}

// toNumber は不要

export function fromBigInt(
  source: bigint, /* , options?: FromBigIntOptions */
): number {
  if (isBigInt(source) !== true) {
    throw new TypeError("`source` must be a bigint.");
  }
  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError("`source` must be within the range of safe integer.");
  }

  return Number(source);
}

export function toBigInt(source: number): bigint {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("TODO");
  }
  return BigInt(source);
}

export function fromString(
  source: string,
  options?: FromStringOptions,
): number {
  if (isString(source) !== true) {
    throw new TypeError("`source` must be a string.");
  }

  const radix = resolveRadix(options?.radix);
  const regex = REGEX[radix];
  if (regex.test(source) !== true) {
    throw new RangeError("`source` must be a representation of a integer.");
  }

  return Number.parseInt(source, radix);
}

export function toString(source: number, options?: ToStringOptions): string {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("`source` must be a safe integer.");
  }

  const radix = resolveRadix(options?.radix);
  return normalizeNumber(source).toString(radix);
}

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
