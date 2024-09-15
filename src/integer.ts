import {
  BIGINT_ZERO,
  isBigInt,
  normalizeNumber,
  NUMBER_ZERO,
  numeric,
  Radix,
} from "./numeric.ts";

export function isOdd(test: numeric): boolean {
  if (Number.isSafeInteger(test)) {
    return (((test as number) % 2) !== NUMBER_ZERO);
  } else if (isBigInt(test)) {
    return ((test % 2n) !== BIGINT_ZERO);
  }
  return false;
}

export function isEven(test: numeric): boolean {
  if (Number.isSafeInteger(test)) {
    return (((test as number) % 2) === NUMBER_ZERO);
  } else if (isBigInt(test)) {
    return ((test % 2n) === BIGINT_ZERO);
  }
  return false;
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

  const integralPart = normalizeNumber(Math.trunc(input));
  const integralPartIsEven = isEven(integralPart);

  const resolvedRoundingMode =
    Object.values(RoundingMode).includes(roundingMode as RoundingMode)
      ? roundingMode
      : RoundingMode.TRUNCATE;

  if (Number.isInteger(input)) {
    return normalizeNumber(input);
  }

  const nearestP = normalizeNumber(Math.ceil(input));
  const nearestN = normalizeNumber(Math.floor(input));
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

// export type FromNumberOptions = {
//   //XXX 整数以外も受け付けるか否か
//   roundingMode?: RoundingMode;
//   //XXX 範囲外の場合のフォールバック
// };

// export type FromBigIntOptions = {
//   //XXX 範囲外の場合のフォールバック
// };

export type FromStringOptions = {
  //XXX & FromNumberOptions
  //XXX trimするか否か
  radix: Radix;
  //XXX パース出来ない場合のフォールバック
};

export type ToStringOptions = {
  radix: Radix;
  //XXX upperCase
  //XXX leadZero or padStart
};

export function resolveRadix(radix?: Radix): Radix {
  return Object.values(Radix).includes(radix as Radix)
    ? (radix as Radix)
    : Radix.DECIMAL;
}

export const REGEX = {
  [Radix.BINARY]: /^[-+]?[01]+$/,
  [Radix.OCTAL]: /^[-+]?[0-7]+$/,
  [Radix.DECIMAL]: /^[-+]?[0-9]+$/,
  [Radix.HEXADECIMAL]: /^[-+]?[0-9a-fA-F]+$/,
} as const;
