import { inRange } from "./main.ts";

/**
 * The type of 6-bit unsigned integer.
 */
type Uint6 =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63;

/**
 * The 6-bit unsigned integer
 */
namespace Uint6 {
  /**
   * The minimum value of 6-bit unsigned integer.
   */
  export const MIN_VALUE = 0;

  /**
   * The maximum value of 6-bit unsigned integer.
   */
  export const MAX_VALUE = 63;

  /**
   * Determines whether the passed `test` is an 6-bit unsigned integer.
   *
   * @param test - The value to be tested
   * @returns Whether the passed `test` is an 6-bit unsigned integer.
   */
  export function isUint6(test: unknown): test is Uint6 {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }
}

export { Uint6 };
