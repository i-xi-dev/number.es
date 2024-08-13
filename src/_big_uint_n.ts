import {max,Range,ZERO}from "./big_integer.ts";
import { ZERO as _NUMBER_ZERO} from "./numeric.ts";

// supported bits.
export const BITS = [64] as const;
export type BITS = typeof BITS[number];

export function rangeOf(bits: BITS): Range {
  if (BITS.includes(bits) !== true) {
    throw new RangeError("TODO");
  }

  const min = ZERO;
  const max = ((2n ** BigInt(bits)) - 1n);

  return Range.of(min,max);
}

export function bitwiseAnd<T extends bigint>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  a: T,// Tであることを保証して渡すこと
  b: T,// Tであることを保証して渡すこと
): T {
  void bits;
  const aAndB = (a as bigint) & (b as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
  return (aAndB & range.max) as T;
}

export function bitwiseOr<T extends bigint>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  a: T,// Tであることを保証して渡すこと
  b: T,// Tであることを保証して渡すこと
): T {
  void bits;
  const aOrB = (a as bigint) | (b as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
  return (aOrB & range.max) as T;
}

export function bitwiseXOr<T extends bigint>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  a: T,// Tであることを保証して渡すこと
  b: T,// Tであることを保証して渡すこと
): T {
  void bits;
  const aXOrB = (a as bigint) ^ (b as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
  return (aXOrB & range.max) as T;
}

export function rotateLeft<T extends bigint>(
  bits: BITS,// BITSであることを保証して渡すこと
  range: Range,
  source: T,// Tであることを保証して渡すこと
  amount: number,
): T {
  if (Number.isSafeInteger(amount) !== true) {
    throw new TypeError("TODO");
  }

  let normalizedAmount = amount % bits;
  if (normalizedAmount < _NUMBER_ZERO) {
    normalizedAmount = normalizedAmount + bits;
  }
  if (normalizedAmount === _NUMBER_ZERO) {
    return source;
  }

  const bigIntAmount = BigInt(normalizedAmount);
  return (((source << bigIntAmount) |
    (source >> (BigInt(bits) - bigIntAmount))) & range.max) as T;
}
