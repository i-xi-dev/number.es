import * as NumberUtils from "./number.ts";

// 事実上定義できないのでnumberの別名とする
type SafeInteger = number;

const _RADIX_DECIMAL = 10;

function _normalize(n: SafeInteger): SafeInteger {
  // -0は0とする
  return (n === 0) ? 0 : n;
}

function _parseInt(s: string): SafeInteger {
  const i = Number.parseInt(s, _RADIX_DECIMAL);
  return _normalize(i);
}

namespace SafeInteger {
  /**
   * Determines whether the passed value is a positive safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a positive safe integer.
   */
  export function isPositive(test: unknown): boolean {
    return Number.isSafeInteger(test) &&
      NumberUtils.inRange(test as number, 1, Number.MAX_SAFE_INTEGER);
  }

  /**
   * Determines whether the passed value is a non-negative safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a non-negative safe integer.
   */
  export function isNonNegative(test: unknown): boolean {
    return Number.isSafeInteger(test) &&
      NumberUtils.inRange(test as number, 0, Number.MAX_SAFE_INTEGER);
  }

  export function isOdd(test: unknown): boolean {
    return Number.isSafeInteger(test)
      ? (((test as SafeInteger) % 2) !== 0)
      : false;
  }

  export function isEven(test: unknown): boolean {
    return Number.isSafeInteger(test)
      ? (((test as SafeInteger) % 2) === 0)
      : false;
  }

  const UP = Symbol("UP"); // TOWARD_POSITIVE_INFINITY
  const DOWN = Symbol("DOWN"); // TOWARD_NEGATIVE_INFINITY
  const TOWARD_ZERO = Symbol("TOWARD_ZERO");
  const HALF_AWAY_FROM_ZERO = Symbol("HALF_AWAY_FROM_ZERO");
  const HALF_TO_EVEN = Symbol("HALF_TO_EVEN");

  export const RoundingMode = {
    UP,
    DOWN,
    TOWARD_ZERO,
    AWAY_FROM_ZERO: Symbol("AWAY_FROM_ZERO"),
    HALF_UP: Symbol("HALF_UP"),
    HALF_DOWN: Symbol("HALF_DOWN"),
    HALF_TOWARD_ZERO: Symbol("HALF_TOWARD_ZERO"),
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

  export function round(
    source: number,
    roundingMode: RoundingMode,
  ): SafeInteger {
    if (typeof source !== "number") {
      throw new TypeError("source");
    } else if (Number.isFinite(source) !== true) {
      throw new RangeError("source");
    }

    //TODO 不足
    if (source >= Number.MAX_SAFE_INTEGER) {
      throw new RangeError("source");
    } else if (source <= Number.MIN_SAFE_INTEGER) {
      throw new RangeError("source");
    }

    const integralPart = _normalize(Math.trunc(source));

    if (typeof roundingMode !== "symbol") {
      throw new TypeError("roundingMode");
    } else if (Object.values(RoundingMode).includes(roundingMode) !== true) {
      throw new RangeError("roundingMode");
    }

    if (Number.isInteger(source)) {
      return _normalize(source);
    }

    const nearestP = _normalize(Math.ceil(source));
    const nearestN = _normalize(Math.floor(source));
    const isNegative = source < 0;
    const nearestPH = nearestP - 0.5;
    const nearestNH = nearestN + 0.5;

    const halfUp = (): SafeInteger => {
      return (source >= nearestPH) ? nearestP : nearestN;
    };

    const halfDown = (): SafeInteger => {
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
        return isNegative ? nearestN : nearestP;

      case RoundingMode.HALF_UP:
        return halfUp();

      case RoundingMode.HALF_DOWN:
        return halfDown();

      case RoundingMode.HALF_TOWARD_ZERO:
        return isNegative ? halfUp() : halfDown();

      case RoundingMode.HALF_AWAY_FROM_ZERO:
        return isNegative ? halfDown() : halfUp();

      case RoundingMode.HALF_TO_EVEN:
        if (isNegative) {
          if (source === nearestPH) {
            return ((integralPart % 2) === 0) ? integralPart : nearestN;
          }
          return halfDown();
        }

        if (source === nearestNH) {
          return ((integralPart % 2) === 0) ? integralPart : nearestP;
        }
        return halfUp();

      default:
        return 0 as never;
    }
  }

  export type FromOptions = {
    fallback?: SafeInteger;
    roundingMode?: RoundingMode;
    lowerLimit?: SafeInteger;
    upperLimit?: SafeInteger;
    strict?: boolean; // doNotTreatFalsyAsZero & acceptsOnlyIntegers
  };

  function _isNullableSafeInteger(
    test: unknown,
  ): { isSafeInteger: boolean; isNull: boolean } {
    return {
      isSafeInteger: Number.isSafeInteger(test),
      isNull: (test === undefined) || (test === null),
    };
  }

  function _normalizeRange(
    lowerLimit?: number,
    upperLimit?: number,
  ): { lowerLimit: SafeInteger; upperLimit: SafeInteger } {
    const { isSafeInteger: lowerLimitIsInteger, isNull: lowerLimitIsNull } =
      _isNullableSafeInteger(lowerLimit);
    if ((lowerLimitIsNull !== true) && (lowerLimitIsInteger !== true)) {
      throw new TypeError("lowerLimit");
    }
    const { isSafeInteger: upperLimitIsInteger, isNull: upperLimitIsNull } =
      _isNullableSafeInteger(upperLimit);
    if ((upperLimitIsNull !== true) && (upperLimitIsInteger !== true)) {
      throw new TypeError("upperLimit");
    }
    const normalizedLowerLimit = lowerLimitIsInteger
      ? _normalize(lowerLimit as SafeInteger)
      : Number.MIN_SAFE_INTEGER;
    const normalizedUpperLimit = upperLimitIsInteger
      ? _normalize(upperLimit as SafeInteger)
      : Number.MAX_SAFE_INTEGER;
    return {
      lowerLimit: normalizedLowerLimit,
      upperLimit: normalizedUpperLimit,
    };
  }

  /*
                        | null      |       |       |       |       |       |       |
                        | undefined | NaN   | ""    | +∞    | -∞    | > MAX | < MIN |
    --------------------|-----------|-------|-------|-------|-------|-------|-------|
    fromNumber(strict)  | Error     | Error | N/A   | Error | Error | Error | Error |
    fromNumber(!strict) | 0         | 0     | N/A   | MAX   | MIN   | MAX   | MIN   |
    fromBigInt(strict)  | Error     | N/A   | N/A   | N/A   | N/A   | Error | Error |
    fromBigInt(!strict) | 0         | N/A   | N/A   | N/A   | N/A   | MAX   | MIN   |
    fromString(strict)  | Error     | N/A   | Error | N/A   | N/A   | Error | Error |
    fromString(!strict) | 0         | N/A   | 0     | N/A   | N/A   | MAX   | MIN   |
  */

  export function fromNumber(
    source: number,
    options?: FromOptions,
  ): SafeInteger {
    const { lowerLimit, upperLimit } = _normalizeRange(
      options?.lowerLimit,
      options?.upperLimit,
    );
    const cn = (i: SafeInteger): SafeInteger => {
      return NumberUtils.clamp(_normalize(i), lowerLimit, upperLimit);
    };

    const { isSafeInteger: fallbackIsInteger, isNull: fallbackIsNull } =
      _isNullableSafeInteger(options?.fallback);
    if ((fallbackIsNull !== true) && (fallbackIsInteger !== true)) {
      throw new TypeError("options.fallback");
    }

    const normalizedFallback = fallbackIsInteger
      ? cn(options?.fallback as SafeInteger)
      : 0;

    let adjusted = source;
    if (options?.strict === true) {
      if (typeof source !== "number") {
        throw new TypeError("source");
      }
      if (Number.isSafeInteger(source) !== true) {
        throw new RangeError("source");
      }
    } else {
      if (Number.isFinite(source)) {
        if (source > Number.MAX_SAFE_INTEGER) {
          adjusted = Number.MAX_SAFE_INTEGER;
        } else if (source < Number.MIN_SAFE_INTEGER) {
          adjusted = Number.MIN_SAFE_INTEGER;
        }
      } else {
        if (
          (typeof source !== "number") && (source !== null) &&
          (source !== undefined)
        ) {
          throw new TypeError("source");
        } else if (source === Number.POSITIVE_INFINITY) {
          adjusted = Number.MAX_SAFE_INTEGER;
        } else if (source === Number.NEGATIVE_INFINITY) {
          adjusted = Number.MIN_SAFE_INTEGER;
        } else {
          adjusted = normalizedFallback;
        }
      }
    }

    if (Number.isSafeInteger(adjusted)) {
      return cn(adjusted);
    }

    let roundingMode = RoundingMode.TRUNCATE;
    if (
      options?.roundingMode &&
      Object.values(RoundingMode).includes(options.roundingMode)
    ) {
      roundingMode = options.roundingMode;
    }
    const rounded = round(adjusted, roundingMode);
    return cn(rounded);
  }

  export function fromBigInt(
    source: bigint,
    options?: FromOptions,
  ): SafeInteger {
    if (
      (typeof source !== "bigint") && (source !== null) &&
      (source !== undefined)
    ) {
      throw new TypeError("source");
    }

    // ignore options.roundingMode
    return fromNumber(Number(source), options);
  }

  export function fromString(
    source: string,
    options?: FromOptions,
  ): SafeInteger {
    if (
      (typeof source !== "string") && (source !== null) &&
      (source !== undefined)
    ) {
      throw new TypeError("source");
    }

    let adjusted = source;
    let pattern: RegExp;

    if (options?.strict === true) {
      pattern = /^[\-+]?(?:[0-9]|[1-9][0-9]+)(?:.0+)?$/;

      if ((adjusted === null) || (adjusted === undefined)) {
        throw new TypeError("source");
      }
    } else {
      pattern = /^[\-+]?(?:[0-9]+)(?:.[0-9]+)?$/; //XXX ".1"を0.1として扱うか？

      if (typeof adjusted === "string") {
        adjusted = adjusted.trim();
      }
      if (
        (adjusted === "") || (adjusted === null) || (adjusted === undefined)
      ) {
        return fromNumber(Number.NaN, options);
      }
    }

    if (pattern.test(adjusted)) {
      return fromNumber(Number.parseFloat(adjusted), options);
    }
    throw new RangeError("source");
  }

  //XXX export function from()

  export function toBigInt(source: SafeInteger): bigint {
    if (Number.isSafeInteger(source)) {
      return BigInt(source);
    }
    throw new TypeError("source");
  }

  export function toString(source: SafeInteger): string {
    if (Number.isSafeInteger(source)) {
      if (source === NumberUtils.ZERO) {
        return "0";
      }
      return source.toString(_RADIX_DECIMAL);
    }
    throw new TypeError("source");
  }
}

export { SafeInteger };
