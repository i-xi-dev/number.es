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
  RoundingMode,
  ToStringOptions,
} from "./integer.ts";
import { isString } from "./utils.ts";

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
  if (isNumber(source) !== true) {
    throw new TypeError("`source` is must be a `number`.");
  }
  if (Number.isNaN(source)) {
    throw new RangeError("`source` is must not be `Number.NaN`.");
  }

  if (Number.isSafeInteger(source)) {
    return normalizeNumber(source);
  } else if (source > Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  } else if (source < Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }

  const rounded = _roundToSafeInteger(source, options?.roundingMode);
  return clampToSafeInteger(rounded);
}

function _roundToSafeInteger(
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
  const sourceIsNegative = source < 0;
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

// toNumber は無意味なので不要

export function fromBigInt(
  source: bigint, /* , options?: FromBigIntOptions */
): number {
  if (isBigInt(source) !== true) {
    throw new TypeError("`source` is must be a `bigint`.");
  }
  if (inSafeIntegerRange(source) !== true) {
    throw new RangeError(
      "`source` is must be within the range of safe integer.",
    );
  }

  return Number(source);
}

export function toBigInt(source: number): bigint {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("`source` is must be a safe integer.");
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
