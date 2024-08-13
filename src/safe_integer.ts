import { _IntegerRange, _IntegerRangeBase } from "./_integer_range.ts";
import { IntegerRange } from "./integer_range.ts";
import { isNegative, normalize, ZERO } from "./numeric.ts";
import { Radix } from "./radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

type safeint = number;

export function isOdd(test: safeint): boolean {
  return Number.isSafeInteger(test) && ((test % 2) !== ZERO);
}

export function isEven(test: safeint): boolean {
  return Number.isSafeInteger(test) && ((test % 2) === ZERO);
}

const _INT32_MAX = 2_147_483_647;
const _INT32_MIN = -2_147_483_648;

export function roundFrom(
  source: number,
  roundingMode: RoundingMode,
): safeint {
  if (Number.isFinite(source) !== true) {
    throw new TypeError("`source` must be a finite number.");
  }

  //TODO 受け付ける範囲は暫定
  if (source > _INT32_MAX) {
    throw new RangeError(
      "`source` must be less than or equal to Int32 maximum value.",
    );
  } else if (source < _INT32_MIN) {
    throw new RangeError(
      "`source` must be greater than or equal to int32 minimum value.",
    );
  }

  const integralPart = normalize(Math.trunc(source));
  const integralPartIsEven = isEven(integralPart);

  if (
    (typeof roundingMode !== "symbol") ||
    (Object.values(RoundingMode).includes(roundingMode) !== true)
  ) {
    throw new TypeError("`roundingMode` must be a `RoundingMode`.");
  }

  if (Number.isInteger(source)) {
    return normalize(source);
  }

  const nearestP = normalize(Math.ceil(source));
  const nearestN = normalize(Math.floor(source));
  const sourceIsNegative = isNegative(source);
  const nearestPH = nearestP - 0.5;
  const nearestNH = nearestN + 0.5;

  const halfUp = (): safeint => {
    return (source >= nearestPH) ? nearestP : nearestN;
  };

  const halfDown = (): safeint => {
    return (source <= nearestNH) ? nearestN : nearestP;
  };

  switch (roundingMode) {
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

export function fromString(source: string): safeint {
  if (/^[0-9]$/.test(source)) {
    return Number.parseInt(source, Radix.DECIMAL);
  }
  throw new TypeError("TODO");
}

export function toString(source: number): string {
  if (Number.isSafeInteger(source)) {
    return normalize(source).toString(Radix.DECIMAL);
  }
  throw new TypeError("TODO");
}

function _parseRangeLike(rangeLike: Range.Like): Range.Struct {
  return _IntegerRange.parse<number>(
    rangeLike,
    Number.isSafeInteger as (test: unknown) => test is number,
  );
}

export class Range extends _IntegerRangeBase<number>
  implements IntegerRange<number> {
  private constructor(min: number, max: number) {
    super(min, max);
  }

  protected override _checkType(test: unknown): test is number {
    return Number.isSafeInteger(test);
  }

  static from(rangeLike: Range.Like): Range {
    const { min, max } = _parseRangeLike(rangeLike);
    return new Range(min, max);
  }

  static of(...args: Array<number>): Range {
    return this.from(args as Range.Tuple);
  }

  override rangeEquals(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeEquals(min, max);
    } catch {
      return false;
    }
  }

  override overlaps(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeOverlaps(min, max);
    } catch {
      return false;
    }
  }

  override isSuperrangeOf(otherRange: Range.Like): boolean {
    try {
      const { min, max } = _parseRangeLike(otherRange);
      return this._rangeContains(min, max);
    } catch {
      return false;
    }
  }

  override equals(other: unknown): boolean {
    if (other instanceof Range) {
      return this._rangeEquals(other.min, other.max);
    }
    return false;
  }

  override clamp(input: number): number {
    return normalize(super.clamp(input));
  }
}

export namespace Range {
  export type Tuple = IntegerRange.Tuple<number>;
  export type Struct = IntegerRange.Struct<number>;
  export type Like = IntegerRange.Like<number>;
}
