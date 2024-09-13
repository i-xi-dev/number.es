import { isBigInt } from "./utils.ts";

const _ZERO = 0;

export type numeric = number | bigint;

function _isNumeric(test: unknown): test is numeric {
  return Number.isFinite(test) || isBigInt(test);
}

export function isPositive(test: numeric): boolean {
  return _isNumeric(test) && (test > _ZERO);
}

export function isNonNegative(test: numeric): boolean {
  return _isNumeric(test) && (test >= _ZERO);
}

export function isNonPositive(test: numeric): boolean {
  return _isNumeric(test) && (test <= _ZERO);
}

export function isNegative(test: numeric): boolean {
  return _isNumeric(test) && (test < _ZERO);
}

export function inSafeIntegerRange(test: numeric) {
  return _isNumeric(test) && (test >= Number.MIN_SAFE_INTEGER) &&
    (test <= Number.MAX_SAFE_INTEGER);
}
