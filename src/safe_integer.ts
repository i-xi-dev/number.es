import {
  isEvenSafeInteger,
  isNegativeNumber,
  normalizeNumber,
  NUMBER_ZERO,
} from "./numeric.ts";
import { NumericRange } from "./numeric_range.ts";
import { Radix } from "./radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

// 事実上定義できないのでnumberの別名とする
export type SafeInteger = number;

export namespace SafeInteger {
  export function roundToSafeInteger(
    source: number,
    roundingMode: RoundingMode,
  ): SafeInteger {
    if (Number.isFinite(source) !== true) {
      throw new TypeError("source");
    }

    if (source > Number.MAX_SAFE_INTEGER) {
      throw new RangeError("source");
    } else if (source < Number.MIN_SAFE_INTEGER) {
      throw new RangeError("source");
    }

    const integralPart = normalizeNumber(Math.trunc(source));
    const integralPartIsEven = isEvenSafeInteger(integralPart);

    if (typeof roundingMode !== "symbol") {
      throw new TypeError("roundingMode");
    } else if (
      Object.values(RoundingMode).includes(roundingMode) !== true
    ) {
      throw new RangeError("roundingMode");
    }

    if (Number.isInteger(source)) {
      return normalizeNumber(source);
    }

    const nearestP = normalizeNumber(Math.ceil(source));
    const nearestN = normalizeNumber(Math.floor(source));
    const sourceIsNegative = isNegativeNumber(source);
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
        return NUMBER_ZERO as never;
    }
  }

  export type FromOptions = {
    strict?: boolean; // doNotTreatFalsyAsZero & acceptsOnlyIntegers
    fallback?: SafeInteger;
    roundingMode?: RoundingMode;
    clampRange?: NumericRange<SafeInteger>;
  };

  // export namespace FromOptions {
  //   export type Resolved = Readonly<{
  //     [_RESOLVED_MARKER]: true;
  //     strict: boolean;
  //     fallback: SafeInteger;
  //     roundingMode: RoundingMode;
  //     clampRange: NumericRange<SafeInteger>;
  //   }>;

  //   export function resolve(options: FromOptions | Resolved = {}): Resolved {
  //     if (_RESOLVED_MARKER in options) {
  //       return options;
  //     }

  //     const strict = (options as Resolved)?.strict === true;
  //     let fallback = NUMBER_ZERO;
  //     if (isNumber(options?.fallback)) {
  //       if (Number.isFinite(options.fallback)) {
  //         fallback = options.fallback;
  //       } else if ((options.fallback) >= Number.MAX_SAFE_INTEGER) {
  //         fallback = Number.MAX_SAFE_INTEGER;
  //       } else if ((options.fallback) <= Number.MIN_SAFE_INTEGER) {
  //         fallback = Number.MIN_SAFE_INTEGER;
  //       }
  //     }
  //     const roundingMode = _resolveRoundingMode(options?.roundingMode);
  //     const clampRange = _toSafeIntegerRange(options?.clampRange);

  //     return Object.freeze({
  //       [_RESOLVED_MARKER]: true as true,
  //       strict,
  //       fallback,
  //       roundingMode,
  //       clampRange,
  //     });
  //   }
  // }

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

  export function clamp(
    source: SafeInteger,
    range: NumericRange<SafeInteger> | NumericRange.SourceTuple<SafeInteger>,
  ): SafeInteger {
    //TODO チェック

    const range2 = (range instanceof NumericRange)
      ? range
      : NumericRange.from(range);
    if (range2.includesNumber(source)) {
      return source;
    }
    const clamped = Math.max(range2.min, Math.min(range2.max, source));
    return normalizeNumber(clamped);
  }

  // export function fromNumber(
  //   source?: number,
  //   options?: FromOptions,
  // ): SafeInteger {
  //   const resolvedOptions = FromOptions.resolve(options);

  //   let adjusted = source;
  //   if (resolvedOptions.strict === true) {
  //     if (typeof adjusted !== "number") {
  //       throw new TypeError("source");
  //     }
  //     if (Number.isSafeInteger(adjusted) !== true) {
  //       throw new RangeError("source");
  //     }
  //   } else {
  //     if (Number.isFinite(adjusted)) {
  //       if ((adjusted as number) > Number.MAX_SAFE_INTEGER) {
  //         adjusted = Number.MAX_SAFE_INTEGER;
  //       } else if ((adjusted as number) < Number.MIN_SAFE_INTEGER) {
  //         adjusted = Number.MIN_SAFE_INTEGER;
  //       }
  //     } else {
  //       if (typeof (adjusted ?? Number.NaN) !== "number") {
  //         // number,null,undefined のいずれでもない場合
  //         throw new TypeError("source");
  //       } else if (adjusted === Number.POSITIVE_INFINITY) {
  //         adjusted = Number.MAX_SAFE_INTEGER;
  //       } else if (adjusted === Number.NEGATIVE_INFINITY) {
  //         adjusted = Number.MIN_SAFE_INTEGER;
  //       } else {
  //         adjusted = resolvedOptions.fallback;
  //       }
  //     }
  //   }

  //   const min = resolvedOptions.clampRange[0];
  //   const max = resolvedOptions.clampRange[1] as number;

  //   if (Number.isSafeInteger(adjusted)) {
  //     return clampNumber(adjusted as number, min, max); // clampRangeはsafe-integerなのでclampToSafeIntegerを使用する
  //   }

  //   const rounded = roundToSafeInteger(
  //     adjusted as number,
  //     resolvedOptions.roundingMode,
  //   );
  //   return clampNumber(rounded, min, max); // clampRangeはsafe-integerなのでclampToSafeIntegerを使用する
  // }

  // export function fromBigInt(
  //   source?: bigint,
  //   options?: FromOptions,
  // ): SafeInteger {
  //   if (typeof (source ?? 0n) !== "bigint") {
  //     // bigint,null,undefined のいずれでもない場合
  //     throw new TypeError("source");
  //   }

  //   // ignore options.roundingMode, strict, fallback
  //   return fromNumber(Number(source), options);
  // }

  // export function fromString(
  //   source?: string,
  //   options?: FromOptions,
  // ): SafeInteger {
  //   if (typeof (source ?? "") !== "string") {
  //     // string,null,undefined のいずれでもない場合
  //     throw new TypeError("source");
  //   }

  //   let adjusted = source;
  //   let pattern: RegExp;

  //   if (options?.strict === true) {
  //     pattern = /^[\-+]?(?:[0-9]|[1-9][0-9]+)(?:.0+)?$/;

  //     if ((adjusted === null) || (adjusted === undefined)) {
  //       throw new TypeError("source");
  //     }
  //   } else {
  //     pattern = /^[\-+]?(?:[0-9]+)(?:.[0-9]+)?$/; //XXX ".1"を0.1として扱うか？

  //     if (typeof adjusted === "string") {
  //       adjusted = adjusted.trim();
  //     }
  //     if ((adjusted ?? "") === "") {
  //       // stringかつ"",null,undefined のいずれかの場合
  //       return fromNumber(Number.NaN, options);
  //     }
  //   }

  //   if (pattern.test(adjusted as string)) {
  //     return fromNumber(Number.parseFloat(adjusted as string), options);
  //   }
  //   throw new RangeError("source");
  // }

  //XXX export function from()

  export function toBigInt(source: SafeInteger): bigint {
    if (Number.isSafeInteger(source)) {
      return BigInt(source);
    }
    throw new TypeError("source");
  }

  export function toString(source: SafeInteger): string {
    if (Number.isSafeInteger(source)) {
      return normalizeNumber(source).toString(Radix.DECIMAL);
    }
    throw new TypeError("source");
  }
}

// function _toSafeIntegerRange(
//   range: unknown, /* (NumericRange | Resolved) */
// ): NumericRange.Resolved {
//   const [min, max] = NumericRange.resolve(range as NumericRange<SafeInteger>);

//   return [
//     (min < Number.MIN_SAFE_INTEGER) ? Number.MIN_SAFE_INTEGER : Math.ceil(min),
//     (max > Number.MAX_SAFE_INTEGER) ? Number.MAX_SAFE_INTEGER : Math.floor(max),
//   ];
// }

// function _resolveRoundingMode(roundingMode?: RoundingMode): RoundingMode {
//   if (Object.values(RoundingMode).includes(roundingMode as RoundingMode)) {
//     return roundingMode as RoundingMode;
//   }
//   return RoundingMode.TRUNCATE;
// }

// const _RESOLVED_MARKER = Symbol();
