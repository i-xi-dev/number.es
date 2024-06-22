import * as _Utils from "./_utils.ts";
import { NumberRange } from "./number_range.ts";
import { normalizeNumber, ZERO } from "./numeric.ts";

export const isNumber = _Utils._isNumber;

export function isOddInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) !== ZERO) : false;
}

export function isEvenInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) === ZERO) : false;
}

export function clampNumber(source: number, range: NumberRange): number {
  if ((isNumber(source) !== true) || Number.isNaN(source)) {
    throw new TypeError("source");
  }

  const [min, max] = NumberRange.resolve(range);
  const clamped = Math.max(
    min,
    Math.min(max, source),
  );
  return normalizeNumber(clamped);
}

export function inRange(test: number, range: NumberRange): boolean {
  if ((isNumber(test) !== true) || Number.isNaN(test)) {
    return false;
  }

  const [min, max] = NumberRange.resolve(range);
  return (test >= min) && (test <= max);
}
