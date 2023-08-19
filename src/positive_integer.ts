import { Integer } from "./integer.ts";
import * as NumberUtils from "./number.ts";

type PositiveInteger = number; // 定義できないので単なる別名

namespace PositiveInteger {
  export const MIN_VALUE = 1;
  export const MAX_VALUE = Number.MAX_SAFE_INTEGER;

  /**
   * Determines whether the passed value is a positive safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a positive safe integer.
   */
  export function isPositiveInteger(test: unknown): test is PositiveInteger {
    return Integer.isInteger(test) &&
      NumberUtils.inRange(test, MIN_VALUE, MAX_VALUE);
  }

  export function from(
    source?: number,
    options?: Integer.ClampOptions,
  ): PositiveInteger {
    const int = Integer.fromNumber(source, options);

    const min = Integer.fromNumber(options?.lowerLimit, {
      fallback: MIN_VALUE,
      method: "trunc",
    });
    const max = Integer.fromNumber(options?.upperLimit, {
      fallback: MAX_VALUE,
      method: "trunc",
    });
    return NumberUtils.clamp(int, min, max);
  }
}

export { PositiveInteger };
