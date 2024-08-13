import {BITS_PER_BYTE} from "./_uint_8x.ts";
import {uint8} from "./uint_n_type.ts";
import * as UintN from "./_uint_n.ts";

const _BIT_LENGTH = 8;

const _range = UintN.rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;
export const MIN_VALUE = _range.min;
export const MAX_VALUE = _range.max;

export const BYTES = _BIT_LENGTH/BITS_PER_BYTE;

export function isUint8(test: unknown): test is uint8 {
  return Number.isSafeInteger(test) && _range.includes(test as number);
}

export function bitwiseAnd(a: uint8, b: uint8): uint8 {
  if (isUint8(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint8(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(a: uint8, b: uint8): uint8 {
  if (isUint8(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint8(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(a: uint8, b: uint8): uint8 {
  if (isUint8(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint8(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(source: uint8, amount: number): uint8 {
  if (isUint8(source) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFromSafeInteger(source: number): uint8 {
  // Uint8ClampedArrayにオーバーフローorアンダーフローする整数をセットしたのと同じ結果
  return UintN.saturateFromSafeInteger(_range, source);
}

export function truncateFromSafeInteger(source: number): uint8 {
  // Uint8Arrayにオーバーフローorアンダーフローする整数をセットしたのと同じ結果
  return UintN.truncateFromSafeInteger(_range, source);
}

export function toBytes(
  source: uint8,
  littleEndian = false,
): [uint8] {
  void littleEndian;
  if (isUint8(source) !== true) {
    throw new TypeError("TODO");
  }

  return [source];
}
