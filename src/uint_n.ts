import { normalizeNumber } from "./numeric.ts";
import { NumericRange } from "./numeric_range.ts";
import { SafeInteger } from "./safe_integer.ts";

const Bits = [6, 7, 8, 16, 24, 32] as const;
type Bits = typeof Bits[number];

export const BITS_PER_BYTE = 8;

export type Info<T extends SafeInteger> = {
  bits: Bits;
  //bytes: SafeInteger;
  min: T;
  max: T;
  range: NumericRange<T>;
  count: SafeInteger;
};

export function bytesOf(bits: Bits): SafeInteger {
  if ((bits % BITS_PER_BYTE) !== 0) {
    throw new RangeError("bits");
  }

  return Math.ceil(bits / BITS_PER_BYTE);
}

const _MIN_VALUE = 0;

export function infoOf<T extends SafeInteger>(bits: Bits): Info<T> {
  //const bytes = _bytesOf(bits);
  const min = _MIN_VALUE as T;
  const max = ((2 ** bits) - 1) as T;

  return {
    bits,
    //bytes,
    min,
    max,
    range: NumericRange.from(min, max),
    count: max + 1,
  };
}

function _assertBits(bits: Bits, _bitsTrusted: boolean): void {
  if (_bitsTrusted !== true) {
    if (Bits.includes(bits) !== true) {
      throw new TypeError("bits");
    }
  }
}

export function isUintN<T extends SafeInteger>(
  info: Info<T>,
  test: unknown,
): boolean {
  return Number.isSafeInteger(test) &&
    info.range.includesNumber(test as number);
}

const _buffer = new ArrayBuffer(96); //TODO 32専用になってる
const _bufferUint32View = new Uint32Array(_buffer);
const _bufferUint16View = new Uint16Array(_buffer);

export function bitwiseAnd<T extends SafeInteger>(
  info: Info<T>,
  a: T,
  b: T,
): T {
  if (isUintN(info, a) !== true) {
    throw new TypeError("a");
  }
  if (isUintN(info, b) !== true) {
    throw new TypeError("b");
  }

  if (info.bits >= 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない

    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = 0;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 & b1;
    _bufferUint16View[5] = a2 & b2;
    return _bufferUint32View[2] as T;
  } else {
    return ((a & b) & info.max) as T;
  }
}

export function bitwiseOr<T extends SafeInteger>(
  info: Info<T>,
  a: T,
  b: T,
): T {
  if (isUintN(info, a) !== true) {
    throw new TypeError("a");
  }
  if (isUintN(info, b) !== true) {
    throw new TypeError("b");
  }

  if (info.bits >= 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない

    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = 0;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 | b1;
    _bufferUint16View[5] = a2 | b2;
    return _bufferUint32View[2] as T;
  } else {
    return ((a | b) & info.max) as T;
  }
}

export function bitwiseXOr<T extends SafeInteger>(
  info: Info<T>,
  a: T,
  b: T,
): T {
  if (isUintN(info, a) !== true) {
    throw new TypeError("a");
  }
  if (isUintN(info, b) !== true) {
    throw new TypeError("b");
  }

  if (info.bits >= 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない

    // bigintに変換してビット演算するよりこちらの方が速い
    _bufferUint32View[0] = a;
    _bufferUint32View[1] = b;
    _bufferUint32View[2] = 0;
    const [a1, a2, b1, b2] = _bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
    _bufferUint16View[4] = a1 ^ b1;
    _bufferUint16View[5] = a2 ^ b2;
    return _bufferUint32View[2] as T;
  } else {
    return ((a ^ b) & info.max) as T;
  }
}

export function rotateLeft<T extends SafeInteger>(
  info: Info<T>,
  source: T,
  amount: SafeInteger,
): T {
  if (isUintN(info, source) !== true) {
    throw new TypeError("source");
  }
  if (Number.isSafeInteger(amount) !== true) {
    throw new TypeError("amount");
  }

  let normalizedAmount = amount % info.bits;
  if (normalizedAmount < 0) {
    normalizedAmount = normalizedAmount + info.bits;
  }
  if (normalizedAmount === 0) {
    return source;
  }

  if (info.bits === 32) {
    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const bs = BigInt(source);
    return Number(
      ((bs << BigInt(normalizedAmount)) |
        (bs >> BigInt(info.bits - normalizedAmount))) & BigInt(info.max),
    ) as T;
  } else {
    return (((source << normalizedAmount) |
      (source >> (info.bits - normalizedAmount))) & info.max) as T;
  }
}

export function saturateFromSafeInteger<T extends SafeInteger>(
  info: Info<T>,
  source: SafeInteger,
): T {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("source");
  }

  if (source > info.max) {
    return info.max as T;
  } else if (source < info.min) {
    return info.min as T;
  }
  return normalizeNumber(source) as T;
}

export function truncateFromSafeInteger<T extends SafeInteger>(
  info: Info<T>,
  source: SafeInteger,
): T {
  if (Number.isSafeInteger(source) !== true) {
    throw new TypeError("source");
  }

  if (source === 0) {
    return 0 as T;
  } else if (source > 0) {
    return (source % info.count) as T;
  } else {
    return (info.count + (source % info.count)) as T;
  }
}
