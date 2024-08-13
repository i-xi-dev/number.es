import {BITS_PER_BYTE} from "./_uint_8x.ts";
import {uint8} from "./uint_n_type.ts";
import * as UintN from "./_uint_n.ts";

const _BIT_LENGTH = 16;

const _range = UintN.rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;
export const MIN_VALUE = _range.min;
export const MAX_VALUE = _range.max;

export const BYTES = _BIT_LENGTH/BITS_PER_BYTE;

export function isUint16(test: unknown): boolean /* test is uint16 */{
  return Number.isSafeInteger(test) && _range.includes(test as number);
}

export function bitwiseAnd(a: number/* uint16 */, b: number/* uint16 */): number/* uint16 */ {
  if (isUint16(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint16(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(a: number/* uint16 */, b: number/* uint16 */): number/* uint16 */ {
  if (isUint16(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint16(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(a: number/* uint16 */, b: number/* uint16 */): number/* uint16 */ {
  if (isUint16(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint16(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(source: number/* uint16 */, amount: number): number/* uint16 */ {
  if (isUint16(source) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFromSafeInteger(source: number): number/* uint16 */ {
  return UintN.saturateFromSafeInteger(_range, source);
}

export function truncateFromSafeInteger(source: number): number/* uint16 */ {
  // Uint16Arrayにオーバーフローorアンダーフローする整数をセットしたのと同じ結果
  return UintN.truncateFromSafeInteger(_range, source);
}

//TODO Uint16ArrayからUint8Arrayにした方が速いのでは
export function toBytes(
  source: number/* uint16 */,
  littleEndian = false,
): [uint8, uint8] {
  if (isUint16(source) !== true) {
    throw new TypeError("TODO");
  }

  const beBytes: [uint8, uint8] = [
    Math.trunc(source / 0x100) as uint8,
    (source % 0x100) as uint8,
  ];
  return (littleEndian === true)
    ? (beBytes.reverse() as [uint8, uint8])
    : beBytes;
}
