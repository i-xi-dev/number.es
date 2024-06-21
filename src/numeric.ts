export const ZERO = 0;

function _isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

/**
 * Determines whether the `test` is a positive number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a positive number. (positive finite or positive infinity)
 */
export function isPositive<T extends number>(test: T): boolean {
  return _isNumber(test) && (test > ZERO);
}

/**
 * Determines whether the `test` is a non-negative number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a non-negative number. (non-negative finite or positive infinity)
 */
export function isNonNegative<T extends number>(test: T): boolean {
  return _isNumber(test) && (test >= ZERO);
}

/**
 * Determines whether the `test` is a non-positive number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a non-positive number. (non-positive finite or negative infinity)
 */
export function isNonPositive<T extends number>(test: T): boolean {
  return _isNumber(test) && (test <= ZERO);
}

/**
 * Determines whether the `test` is a negative number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a negative number. (negative finite or negative infinity)
 */
export function isNegative<T extends number>(test: T): boolean {
  return _isNumber(test) && (test < ZERO);
}
