import * as UintN from "./_uint_n.ts";
import { BITS_PER_BYTE } from "./_uint_8x.ts";
import { uint8 } from "./uint_n_type.ts";

const _BIT_LENGTH = 24;

const _range = UintN.rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;

export const MIN_VALUE = _range.min;

export const MAX_VALUE = _range.max;

export const BYTES = _BIT_LENGTH / BITS_PER_BYTE;

export function isUint24(test: unknown): boolean /* test is uint24 */ {
  return Number.isSafeInteger(test) && _range.includes(test as number);
}

export function bitwiseAnd(
  a: number, /* uint24 */
  b: number, /* uint24 */
): number /* uint24 */ {
  if (isUint24(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint24(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(
  a: number, /* uint24 */
  b: number, /* uint24 */
): number /* uint24 */ {
  if (isUint24(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint24(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(
  a: number, /* uint24 */
  b: number, /* uint24 */
): number /* uint24 */ {
  if (isUint24(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint24(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(
  source: number, /* uint24 */
  amount: number,
): number /* uint24 */ {
  if (isUint24(source) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFromSafeInteger(source: number): number /* uint24 */ {
  return UintN.saturateFromSafeInteger(_range, source);
}

export function truncateFromSafeInteger(source: number): number /* uint24 */ {
  return UintN.truncateFromSafeInteger(_range, source);
}

export function toBytes(
  source: number, /* uint24 */
  littleEndian = false,
): [uint8, uint8, uint8] {
  void source;
  void littleEndian;
  throw new Error("not implemented."); //TODO
}
