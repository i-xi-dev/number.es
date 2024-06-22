import * as _Utils from "./_utils.ts";
import { ZERO } from "./numeric.ts";

export const isNumber = _Utils._isNumber;

export function isOddInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) !== ZERO) : false;
}

export function isEvenInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) === ZERO) : false;
}
