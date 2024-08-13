import * as UintN from "./_uint_n.ts";
import { rangeOf } from "./_uint_n.ts";
import { uint6 } from "./uint_n_type.ts";

const _BIT_LENGTH = 6;

const _range = rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;

export const MIN_VALUE = _range.min;

export const MAX_VALUE = _range.max;

export function isUint6(test: unknown): test is uint6 {
  return Number.isSafeInteger(test) && _range.includes(test as number);
}

export function bitwiseAnd(a: uint6, b: uint6): uint6 {
  if (isUint6(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint6(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(a: uint6, b: uint6): uint6 {
  if (isUint6(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint6(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(a: uint6, b: uint6): uint6 {
  if (isUint6(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint6(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(source: uint6, amount: number): uint6 {
  if (isUint6(source) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFromSafeInteger(source: number): uint6 {
  //TODO roundingModeを追加して関数名からSafeIntegerを除去
  return UintN.saturateFromSafeInteger(_range, source);
}

export function truncateFromSafeInteger(source: number): uint6 {
  return UintN.truncateFromSafeInteger(_range, source);
}
