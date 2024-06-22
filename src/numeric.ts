export const ZERO = 0;

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

/**
 * Determines whether the `test` is a positive number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a positive number. (positive finite or positive infinity)
 */
export function isPositiveNumber<T extends number>(test: T): boolean {
  return isNumber(test) && (test > ZERO);
}

/**
 * Determines whether the `test` is a positive safe integer.
 *
 * @param test - The value to be tested.
 * @returns Whether the `test` is a positive safe integer.
 */
export function isPositiveSafeInteger(test: unknown): boolean {
  return Number.isSafeInteger(test) && isPositiveNumber(test as number);
}

export function isPositiveBigInt(test: unknown): boolean {
  return isBigInt(test) && (test > ZERO);
}

/**
 * Determines whether the `test` is a non-negative number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a non-negative number. (non-negative finite or positive infinity)
 */
export function isNonNegativeNumber<T extends number>(test: T): boolean {
  return isNumber(test) && (test >= ZERO);
}

/**
 * Determines whether the `test` is a non-negative safe integer.
 *
 * @param test - The value to be tested.
 * @returns Whether the `test` is a non-negative safe integer.
 */
export function isNonNegativeSafeInteger(test: unknown): boolean {
  return Number.isSafeInteger(test) && isNonNegativeNumber(test as number);
}

export function isNonNegativeBigInt(test: unknown): boolean {
  return isBigInt(test) && (test >= ZERO);
}

/**
 * Determines whether the `test` is a non-positive number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a non-positive number. (non-positive finite or negative infinity)
 */
export function isNonPositiveNumber<T extends number>(test: T): boolean {
  return isNumber(test) && (test <= ZERO);
}

/**
 * Determines whether the `test` is a non-positive safe integer.
 *
 * @param test - The value to be tested.
 * @returns Whether the `test` is a non-positive safe integer.
 */
export function isNonPositiveSafeInteger(test: unknown): boolean {
  return Number.isSafeInteger(test) && isNonPositiveNumber(test as number);
}

export function isNonPositiveBigInt(test: unknown): boolean {
  return isBigInt(test) && (test <= ZERO);
}

/**
 * Determines whether the `test` is a negative number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a negative number. (negative finite or negative infinity)
 */
export function isNegativeNumber<T extends number>(test: T): boolean {
  return isNumber(test) && (test < ZERO);
}

/**
 * Determines whether the `test` is a negative safe integer.
 *
 * @param test - The value to be tested.
 * @returns Whether the `test` is a negative safe integer.
 */
export function isNegativeSafeInteger(test: unknown): boolean {
  return Number.isSafeInteger(test) && isNegativeNumber(test as number);
}

export function isNegativeBigInt(test: unknown): boolean {
  return isBigInt(test) && (test < ZERO);
}

export function normalizeNumber<T extends number>(source: T): T {
  if (isNumber(source) !== true) {
    throw new TypeError("source");
  }
  if (Number.isFinite(source) !== true) {
    return source;
  }

  // -0は0とする
  return (source === ZERO) ? ZERO as T : source;
}
