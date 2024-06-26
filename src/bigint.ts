import * as _Utils from "./_utils.ts";
import { BigIntRange } from "./bigint_range.ts";
import { isBigInt } from "./numeric.ts";

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
