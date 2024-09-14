import { isString } from "./utils.ts";
import { Radix } from "./radix.ts";

const UP = Symbol("UP"); // TOWARD_POSITIVE_INFINITY
const DOWN = Symbol("DOWN"); // TOWARD_NEGATIVE_INFINITY
const TOWARD_ZERO = Symbol("TOWARD_ZERO");
const HALF_AWAY_FROM_ZERO = Symbol("HALF_AWAY_FROM_ZERO");
const HALF_TO_EVEN = Symbol("HALF_TO_EVEN");

export const RoundingMode = {
  UP,
  DOWN,
  TOWARD_ZERO,
  AWAY_FROM_ZERO: Symbol("AWAY_FROM_ZERO"),
  HALF_UP: Symbol("HALF_UP"),
  HALF_DOWN: Symbol("HALF_DOWN"),
  HALF_TOWARD_ZERO: Symbol("HALF_TOWARD_ZERO"),
  HALF_AWAY_FROM_ZERO,
  HALF_TO_EVEN,

  /** Alias for `UP`. */
  CEILING: UP,

  /** Alias for `DOWN`. */
  FLOOR: DOWN,

  /** Alias for `TOWARD_ZERO`. */
  TRUNCATE: TOWARD_ZERO,

  /** Alias for `HALF_AWAY_FROM_ZERO`. */
  ROUND: HALF_AWAY_FROM_ZERO, // Math.roundとは違うので注意（Math.roundは.5の場合切り捨て）

  /** Alias for `HALF_TO_EVEN`. */
  CONVERGENT: HALF_TO_EVEN,
} as const;

export type RoundingMode = typeof RoundingMode[keyof typeof RoundingMode];

export type FromNumberOptions = {
  roundingMode?: RoundingMode;
  //XXX 範囲外の場合のフォールバック
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
