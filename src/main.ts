import { Range } from "./range.ts";

export const ZERO = 0;

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

/**
 * Determines whether the `test` is a positive number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a positive number. (positive finite or positive infinity)
 */
export function isPositiveNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) > ZERO);
}

/**
 * Determines whether the `test` is a non-negative number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a non-negative number. (non-negative finite or positive infinity)
 */
export function isNonNegativeNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) >= ZERO);
}

export function isNonPositiveNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) <= ZERO);
}

export function isNegativeNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) < ZERO);
}

export function isOddInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) !== ZERO) : false;
}

export function isEvenInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) === ZERO) : false;
}

export function normalizeNumber(source: number): number {
  if (isNumber(source) !== true) {
    throw new TypeError("source");
  }

  // -0は0とする
  return (source === ZERO) ? ZERO : source;
}

export function clampNumber(source: number, range: Range): number {
  if ((isNumber(source) !== true) || Number.isNaN(source)) {
    throw new TypeError("source");
  }

  const [min, max] = Range.resolve(range);
  const clamped = Math.max(
    min,
    Math.min(max, source),
  );
  return normalizeNumber(clamped);
}

export function inRange(test: number, range: Range): boolean {
  if ((isNumber(test) !== true) || Number.isNaN(test)) {
    throw new TypeError("test");
  }

  const [min, max] = Range.resolve(range);
  return (test >= min) && (test <= max);
}
