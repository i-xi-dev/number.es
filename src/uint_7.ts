import * as UintN from "./_uint_n.ts";
import { rangeOf } from "./_uint_n.ts";
import { uint7 } from "./uint_n_type.ts";

const _BIT_LENGTH = 7;

const _range = rangeOf(_BIT_LENGTH);

export const SIZE = _BIT_LENGTH;

export const MIN_VALUE = _range.min;

export const MAX_VALUE = _range.max;

export function isUint7(test: unknown): test is uint7 {
  return Number.isSafeInteger(test) && _range.includes(test as number);
}

export function bitwiseAnd(a: uint7, b: uint7): uint7 {
  if (isUint7(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint7(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseAnd(_BIT_LENGTH, _range, a, b);
}

export function bitwiseOr(a: uint7, b: uint7): uint7 {
  if (isUint7(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint7(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseOr(_BIT_LENGTH, _range, a, b);
}

export function bitwiseXOr(a: uint7, b: uint7): uint7 {
  if (isUint7(a) !== true) {
    throw new TypeError("TODO");
  }
  if (isUint7(b) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.bitwiseXOr(_BIT_LENGTH, _range, a, b);
}

export function rotateLeft(source: uint7, amount: number): uint7 {
  if (isUint7(source) !== true) {
    throw new TypeError("TODO");
  }

  return UintN.rotateLeft(_BIT_LENGTH, _range, source, amount);
}

export function saturateFromSafeInteger(source: number): uint7 {
  return UintN.saturateFromSafeInteger(_range, source);
}

export function truncateFromSafeInteger(source: number): uint7 {
  return UintN.truncateFromSafeInteger(_range, source);
}
