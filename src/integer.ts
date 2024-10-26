import {
  BigIntType,
  NumberType,
  NumericType,
  SafeIntegerType,
} from "../deps.ts";
import { NUMBER_ZERO, numeric } from "./numeric.ts";

export function isOdd(test: numeric): test is numeric {
  return SafeIntegerType.isOdd(test) || BigIntType.isOdd(test);
}

export function isEven(test: numeric): test is numeric {
  return SafeIntegerType.isEven(test) || BigIntType.isEven(test);
}

const UP = "up"; // TOWARD_POSITIVE_INFINITY
const DOWN = "down"; // TOWARD_NEGATIVE_INFINITY
const TOWARD_ZERO = "toward-zero";
const HALF_AWAY_FROM_ZERO = "half-away-from-zero";
const HALF_TO_EVEN = "half-to-even";

export const RoundingMode = {
  UP,
  DOWN,
  TOWARD_ZERO,
  AWAY_FROM_ZERO: "away-from-zero",
  HALF_UP: "half-up",
  HALF_DOWN: "half-down",
  HALF_TOWARD_ZERO: "half-toward-zero",
  HALF_AWAY_FROM_ZERO,
  HALF_TO_EVEN,

  /** Alias for `UP`. */
  CEILING: UP,

  /** Alias for `DOWN`. */
  FLOOR: DOWN,

  /** Alias for `TOWARD_ZERO`. */
  TRUNCATE: TOWARD_ZERO,

  /** Alias for `HALF_AWAY_FROM_ZERO`. */
  ROUND: HALF_AWAY_FROM_ZERO, // Math.roundとは違うので注意（Math.roundは.5の場合切り捨て）

  /** Alias for `HALF_TO_EVEN`. */
  CONVERGENT: HALF_TO_EVEN,
} as const;

export type RoundingMode = typeof RoundingMode[keyof typeof RoundingMode];

export function roundNumber(
  input: number,
  roundingMode?: RoundingMode,
): number {
  if (Number.isFinite(input) !== true) {
    throw new TypeError("`input` must be a finite number.");
  }

  const integralPart = NumberType.toNormalized(Math.trunc(input));
  const integralPartIsEven = SafeIntegerType.isEven(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(input)) {
    return NumberType.toNormalized(input);
  }

  const nearestP = NumberType.toNormalized(Math.ceil(input));
  const nearestN = NumberType.toNormalized(Math.floor(input));
  const sourceIsNegative = input < 0;
  const nearestPH = nearestP - 0.5;
  const nearestNH = nearestN + 0.5;

  const halfUp = (): number => {
    return (input >= nearestPH) ? nearestP : nearestN;
  };

  const halfDown = (): number => {
    return (input <= nearestNH) ? nearestN : nearestP;
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
        if (input === nearestPH) {
          return integralPartIsEven ? integralPart : nearestN;
        }
        return halfDown();
      }

      if (input === nearestNH) {
        return integralPartIsEven ? integralPart : nearestP;
      }
      return halfUp();

    default:
      return NUMBER_ZERO as never;
  }
}

export type FromNumberOptions = {
  roundingMode?: RoundingMode;
};

// export type FromBigIntOptions = {
// };

export type FromStringOptions = {
  radix?: NumericType.Radix;
};

export type ToStringOptions = {
  lowerCase?: boolean;
  minIntegralDigits?: number;
  radix?: NumericType.Radix;
};

export const OverflowMode = {
  EXCEPTION: "exception",
  TRUNCATE: "truncate",
  SATURATE: "saturate",
} as const;

export type OverflowMode = typeof OverflowMode[keyof typeof OverflowMode];
