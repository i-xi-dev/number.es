import { NumberUtils } from "./number.ts";

type Integer = number;

function _isInteger(test: unknown): test is Integer {
  return (typeof test === "number") && Number.isSafeInteger(test);
}

const _RADIX_DECIMAL = 10;

namespace Integer {
  /**
   * Determines whether the passed value is a positive safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a positive safe integer.
   */
  export function isPositiveInteger(value: unknown): boolean {
    return _isInteger(value) && (value > NumberUtils.ZERO);
  }

  /**
   * Determines whether the passed value is a nonnegative safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a nonnegative safe integer.
   */
  export function isNonNegativeInteger(value: unknown): boolean {
    return _isInteger(value) && (value >= NumberUtils.ZERO);
  }

  /**
   * Determines whether the passed value is a nonpositive safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a nonpositive safe integer.
   */
  export function isNonPositiveInteger(value: unknown): boolean {
    return _isInteger(value) && (value <= NumberUtils.ZERO);
  }

  /**
   * Determines whether the passed value is a negative safe integer.
   *
   * @param value - The value to be tested
   * @returns Whether the passed value is a negative safe integer.
   */
  export function isNegativeInteger(value: unknown): boolean {
    return _isInteger(value) && (value < NumberUtils.ZERO);
  }

  export function fromString(s: string): Integer {
    if ((typeof s === "string") && /^-?(?:[0-9]|[1-9][0-9]+)$/.test(s)) {
      return Number.parseInt(s, _RADIX_DECIMAL);
    }
    throw new TypeError("s");
  }

  export function toString(i: Integer): string {
    if (Number.isSafeInteger(i)) {
      if (i === 0) {
        if (1 / i === Number.NEGATIVE_INFINITY) {
          return "-0";
        }
        return "0";
      }
      return i.toString(_RADIX_DECIMAL);
    }
    throw new TypeError("i");
  }
}
Object.freeze(Integer);

export { Integer };
