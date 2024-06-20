import { BITS_PER_BYTE } from "./uint_n.ts";
import { inRange } from "./bigint.ts";
import { SafeInteger } from "./safe_integer.ts";

const Bits = [64] as const;
type Bits = typeof Bits[number];

function _assertBits(bits: Bits, _bitsTrusted: boolean): void {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
}

export function bytesOf(bits: Bits, _bitsTrusted = false): SafeInteger {
  _assertBits(bits, _bitsTrusted);

  if ((bits % BITS_PER_BYTE) !== 0) {
    throw new RangeError("bits");
  }

  return bits / BITS_PER_BYTE;
}

export const MIN_VALUE = 0n;

export function maxValueOf<T extends bigint>(
  bits: Bits,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  return ((2n ** BigInt(bits)) - 1n) as T;
}

export function isBigUintN(
  bits: Bits,
  test: unknown,
  _bitsTrusted = false,
): boolean {
  _assertBits(bits, _bitsTrusted);

  return (typeof test === "bigint") &&
    inRange(test, [MIN_VALUE, maxValueOf(bits, true)]);
}

export function bitwiseAnd<T extends bigint>(
  bits: Bits,
  a: T,
  b: T,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  if (isBigUintN(bits, a, true) !== true) {
    throw new TypeError("a");
  }
  if (isBigUintN(bits, b, true) !== true) {
    throw new TypeError("b");
  }

  const aAndB = (a as bigint) & (b as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
  return (aAndB & maxValueOf(bits, true)) as T;
}

export function bitwiseOr<T extends bigint>(
  bits: Bits,
  a: T,
  b: T,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  if (isBigUintN(bits, a, true) !== true) {
    throw new TypeError("a");
  }
  if (isBigUintN(bits, b, true) !== true) {
    throw new TypeError("b");
  }

  const aOrB = (a as bigint) | (b as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
  return (aOrB & maxValueOf(bits, true)) as T;
}

export function bitwiseXOr<T extends bigint>(
  bits: Bits,
  a: T,
  b: T,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  if (isBigUintN(bits, a, true) !== true) {
    throw new TypeError("a");
  }
  if (isBigUintN(bits, b, true) !== true) {
    throw new TypeError("b");
  }

  const aXOrB = (a as bigint) ^ (b as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
  return (aXOrB & maxValueOf(bits, true)) as T;
}

export function rotateLeft<T extends bigint>(
  bits: Bits,
  source: T,
  amount: SafeInteger,
  _bitsTrusted = false,
): T {
  _assertBits(bits, _bitsTrusted);

  if (isBigUintN(bits, source, true) !== true) {
    throw new TypeError("source");
  }
  if (Number.isSafeInteger(amount) !== true) {
    throw new TypeError("amount");
  }

  let normalizedAmount = amount % bits;
  if (normalizedAmount < 0) {
    normalizedAmount = normalizedAmount + bits;
  }
  if (normalizedAmount === 0) {
    return source;
  }

  const bigAmount = BigInt(normalizedAmount);
  const max = maxValueOf(bits, true);
  return (((source << bigAmount) |
    (source >> (BigInt(bits) - bigAmount))) & max) as T;
}
