import {BITS_PER_BYTE} from "./_uint_8x.ts";
import {isBigInt} from "./big_integer.ts";
import {uint8} from "./uint_n_type.ts";
import * as BigUintN from "./_big_uint_n.ts";

const _BIT_LENGTH = 64;

const _range = BigUintN.rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;
export const MIN_VALUE = _range.min;
export const MAX_VALUE = _range.max;

export const BYTES = _BIT_LENGTH/BITS_PER_BYTE;

export function isBigUint64(test: unknown): boolean /* test is biguint64 */{
  return isBigInt(test) && _range.includes(test as bigint);
}

export function bitwiseAnd(a: bigint/* biguint64 */, b: bigint/* biguint64 */): bigint/* biguint64 */ {
  if (isBigUint64(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isBigUint64(b) !== true) {
    throw new TypeError("TODO");
  }

  return BigUintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(a: bigint/* biguint64 */, b: bigint/* biguint64 */): bigint/* biguint64 */ {
  if (isBigUint64(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isBigUint64(b) !== true) {
    throw new TypeError("TODO");
  }

  return BigUintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(a: bigint/* biguint64 */, b: bigint/* biguint64 */): bigint/* biguint64 */ {
  if (isBigUint64(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isBigUint64(b) !== true) {
    throw new TypeError("TODO");
  }

  return BigUintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(source: bigint/* biguint64 */, amount: number): bigint/* biguint64 */ {
  if (isBigUint64(source) !== true) {
    throw new TypeError("TODO");
  }

  return BigUintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFrom(source: bigint): bigint/* biguint64 */ {
  void source;
  throw new Error("not implemented");//TODO
}

export function truncateFrom(source: bigint): bigint/* biguint64 */ {
  void source;
  throw new Error("not implemented");//TODO
}

export function toBytes(
  source: bigint/* biguint64 */,
  littleEndian = false,
): [uint8, uint8, uint8, uint8, uint8, uint8, uint8, uint8] {
  void source;
  void littleEndian;
  throw new Error("not implemented");//TODO
}
