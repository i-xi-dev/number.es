import * as _Utils from "./_utils.ts";
import { BigIntRange } from "./bigint_range.ts";
import { isBigInt } from "./numeric.ts";

export const ZERO = 0n;

export function isPositiveBigInt(test: unknown): boolean {
  return isBigInt(test) && (test > ZERO);
}

export function isNonNegativeBigInt(test: unknown): boolean {
  return isBigInt(test) && (test >= ZERO);
}

export function isNonPositiveBigInt(test: unknown): boolean {
  return isBigInt(test) && (test <= ZERO);
}

export function isNegativeBigInt(test: unknown): boolean {
  return isBigInt(test) && (test < ZERO);
}

export function isOddBigInt(test: unknown): boolean {
  return isBigInt(test) ? ((test % 2n) !== ZERO) : false;
}

export function isEvenBigInt(test: unknown): boolean {
  return isBigInt(test) ? ((test % 2n) === ZERO) : false;
}

export function clampBigInt(source: bigint, range: BigIntRange): bigint {
  if (isBigInt(source) !== true) {
    throw new TypeError("source");
  }

  const [min, max] = BigIntRange.resolve(range);
  const clamped = _Utils._max(
    min,
    _Utils._min(max, source),
  );
  return clamped;
}

export function inRange(test: bigint, range: BigIntRange): boolean {
  if (isBigInt(test) !== true) {
    return false;
  }

  const [min, max] = BigIntRange.resolve(range);
  return (test >= min) && (test <= max);
}
