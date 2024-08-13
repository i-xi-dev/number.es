import * as UintN from "./_uint_n.ts";
import { BITS_PER_BYTE } from "./_uint_8x.ts";
import { uint8 } from "./uint_n_type.ts";

const _BIT_LENGTH = 32;

const _range = UintN.rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;

export const MIN_VALUE = _range.min;

export const MAX_VALUE = _range.max;

export const BYTES = _BIT_LENGTH / BITS_PER_BYTE;

export function isUint32(test: unknown): boolean /* test is uint32 */ {
  return Number.isSafeInteger(test) && _range.includes(test as number);
}

export function bitwiseAnd(
  a: number, /* uint32 */
  b: number, /* uint32 */
): number /* uint32 */ {
  if (isUint32(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint32(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(
  a: number, /* uint32 */
  b: number, /* uint32 */
): number /* uint32 */ {
  if (isUint32(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint32(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(
  a: number, /* uint32 */
  b: number, /* uint32 */
): number /* uint32 */ {
  if (isUint32(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint32(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(
  source: number, /* uint32 */
  amount: number,
): number /* uint32 */ {
  if (isUint32(source) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFromSafeInteger(source: number): number /* uint32 */ {
  return UintN.saturateFromSafeInteger(_range, source);
}

export function truncateFromSafeInteger(source: number): number /* uint32 */ {
  // Uint32Arrayにオーバーフローorアンダーフローする整数をセットしたのと同じ結果
  return UintN.truncateFromSafeInteger(_range, source);
}

//TODO Uint32ArrayからUint8Arrayにした方が速いのでは
export function toBytes(
  source: number, /* uint32 */
  littleEndian = false,
): [uint8, uint8, uint8, uint8] {
  if (isUint32(source) !== true) {
    throw new TypeError("TODO");
  }

  const s2 = (source >= 0x1000000) ? (source % 0x1000000) : source;
  const s3 = (source >= 0x10000) ? (source % 0x10000) : source;
  const beBytes: [uint8, uint8, uint8, uint8] = [
    Math.trunc(source / 0x1000000) as uint8,
    Math.trunc(s2 / 0x10000) as uint8,
    Math.trunc(s3 / 0x100) as uint8,
    (source % 0x100) as uint8,
  ];
  return (littleEndian === true)
    ? (beBytes.reverse() as [uint8, uint8, uint8, uint8])
    : beBytes;
}
