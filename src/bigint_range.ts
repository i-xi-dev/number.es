import * as _Utils from "./_utils.ts";
import { isBigInt } from "./numeric.ts";

export type BigIntRange = [min: bigint, max: bigint] | [minmax: bigint];

export namespace BigIntRange {
  export type Resolved = [
    min: bigint,
    max: bigint,
  ];

  export function resolve(
    range: unknown, /* (BigIntRange | Resolved) */
  ): Resolved {
    let min = BigInt(Number.MIN_SAFE_INTEGER);
    let max = BigInt(Number.MAX_SAFE_INTEGER);
    if (Array.isArray(range)) {
      if (range.length > 0) {
        if (isBigInt(range[0])) {
          min = range[0];
        } else {
          throw new TypeError("range[0]");
        }

        if (range.length > 1) {
          if (isBigInt(range[1])) {
            max = range[1];
          } else {
            throw new TypeError("range[1]");
          }
        } else {
          max = min;
        }
      }
    }

    return [
      _Utils._min(min, max),
      _Utils._max(min, max),
    ];
  }
}
