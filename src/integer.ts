import { isString } from "./utils.ts";
import { Radix } from "./radix.ts";
import { RoundingMode } from "./rounding_mode.ts";

export type FromNumberOptions = {
  roundingMode?: RoundingMode;
  //TODO 範囲外の場合のフォールバック
};

//export type FromBigIntOptions = {
//TODO
//};

export type FromStringOptions = {
  radix: Radix;
  //TODO 整数以外も受け付ける、trimするかどうか、パース出来ない場合のフォールバック
};

export type ToStringOptions = {
  radix: Radix;
};

export function resolveRadix(radix?: Radix): Radix {
  return Object.values(Radix).includes(radix as Radix)
    ? (radix as Radix)
    : Radix.DECIMAL;
}

export const REGEX = {
  [Radix.BINARY]: /^[-+]?[01]+$/,
  [Radix.OCTAL]: /^[-+]?[0-7]+$/,
  [Radix.DECIMAL]: /^[-+]?[0-9]+$/,
  [Radix.HEXADECIMAL]: /^[-+]?[0-9a-fA-F]+$/,
} as const;

export function parse(input: string, radix: Radix): number {
  if (isString(input) !== true) {
    throw new TypeError("TODO");
  }

  const regex = REGEX[radix];
  if (regex.test(input) !== true) {
    throw new RangeError("TODO");
  }

  return Number.parseInt(input, radix);
}
