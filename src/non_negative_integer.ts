import { Integer } from "./integer.ts";
import * as NumberUtils from "./number.ts";

type NonNegativeInteger = number; // 定義できないので単なる別名

namespace NonNegativeInteger {
  export const MIN_VALUE = 0;
  export const MAX_VALUE = Number.MAX_SAFE_INTEGER;

  /**
   * Determines whether the passed value is a non-negative safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a non-negative safe integer.
   */
  export function isNonNegativeInteger(
    test: unknown,
  ): test is NonNegativeInteger {
    return Integer.isInteger(test) &&
      NumberUtils.inRange(test, MIN_VALUE, MAX_VALUE);
  }

  export function from(
    source?: number,
    options?: Integer.ClampOptions,
  ): NonNegativeInteger {
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

export { NonNegativeInteger };
