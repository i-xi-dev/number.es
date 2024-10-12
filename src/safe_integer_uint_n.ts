import {
  BITS_PER_BYTE,
  FromBigIntOptions,
  FromNumberOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "./uint_n.ts";
import {
  inSafeIntegerRange,
  isBigInt,
  isNumber,
  normalizeNumber,
} from "./numeric.ts";
import { isPositive as isPositiveSafeInteger, ZERO } from "./safe_integer.ts";
import { OverflowMode, resolveRadix, roundNumber } from "./integer.ts";
import { SafeIntegerRange } from "./safe_integer_range.ts";
import { uint6, uint7, uint8 } from "./uint_n_type.ts";

class _UinNOperations<T extends number> implements UintNOperations<T> {
  readonly #bitLength: number;
  readonly #range: SafeIntegerRange<T>;

  readonly #buffer: ArrayBuffer;
  readonly #bufferUint32View: Uint32Array;
  readonly #bufferUint16View: Uint16Array;

  constructor(bitLength: number) {
    if ((isPositiveSafeInteger(bitLength) !== true) || (bitLength > 32)) {
      throw new Error("not implemented"); //XXX 対応するとしても48まで
    }

    this.#bitLength = bitLength;
    this.#range = SafeIntegerRange.of<T>(0 as T, (2 ** bitLength - 1) as T);

    this.#buffer = new ArrayBuffer(96);
    this.#bufferUint32View = new Uint32Array(this.#buffer);
    this.#bufferUint16View = new Uint16Array(this.#buffer);
  }

  get bitLength(): number {
    return this.#bitLength;
  }

  inRange(value: number): value is T {
    return this.#range.includes(value);
  }

  protected _assertSelf(self: T): void {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }
  }

  bitwiseAnd(self: T, other: T): T {
    this._assertSelf(self);

    if (this.inRange(other) !== true) {
      throw new TypeError(
        "The type of `other` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[0] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = ZERO;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 & b1;
      this.#bufferUint16View[5] = a2 & b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self & other) & this.#range.max) as T;
    }
  }

  bitwiseOr(self: T, other: T): T {
    this._assertSelf(self);

    if (this.inRange(other) !== true) {
      throw new TypeError(
        "The type of `other` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[0] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = ZERO;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 | b1;
      this.#bufferUint16View[5] = a2 | b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self | other) & this.#range.max) as T;
    }
  }

  bitwiseXOr(self: T, other: T): T {
    this._assertSelf(self);

    if (this.inRange(other) !== true) {
      throw new TypeError(
        "The type of `other` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      // bigintに変換してビット演算するよりこちらの方が速い
      this.#bufferUint32View[0] = self;
      this.#bufferUint32View[1] = other;
      this.#bufferUint32View[2] = ZERO;
      const [a1, a2, b1, b2] = this.#bufferUint16View; // バイオオーダーは元の順にセットするので、ここでは関係ない
      this.#bufferUint16View[4] = a1 ^ b1;
      this.#bufferUint16View[5] = a2 ^ b2;
      return this.#bufferUint32View[2] as T;
    } else {
      return ((self ^ other) & this.#range.max) as T;
    }
  }

  rotateLeft(self: T, offset: number): T {
    this._assertSelf(self);

    if (Number.isSafeInteger(offset) !== true) {
      throw new TypeError("`offset` must be a safe integer.");
    }

    let normalizedOffset = offset % this.#bitLength;
    if (normalizedOffset < ZERO) {
      normalizedOffset = normalizedOffset + this.#bitLength;
    }
    if (normalizedOffset === ZERO) {
      return self;
    }

    if (this.#bitLength === 32) {
      // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
      const bs = BigInt(self);
      return Number(
        ((bs << BigInt(normalizedOffset)) |
          (bs >> BigInt(this.#bitLength - normalizedOffset))) &
          BigInt(this.#range.max),
      ) as T;
    } else {
      return (((self << normalizedOffset) |
        (self >> (this.#bitLength - normalizedOffset))) & this.#range.max) as T;
    }
  }

  fromNumber(value: number, options?: FromNumberOptions): T {
    if (isNumber(value) !== true) {
      throw new TypeError("`value` must be a `number`.");
    }
    if (Number.isNaN(value)) {
      throw new TypeError("`value` must not be `NaN`.");
    }

    let adjustedValue: number;
    if (value > Number.MAX_SAFE_INTEGER) {
      adjustedValue = Number.MAX_SAFE_INTEGER;
    } else if (value < Number.MIN_SAFE_INTEGER) {
      adjustedValue = Number.MIN_SAFE_INTEGER;
    } else {
      //XXX もっと狭めるか？
      adjustedValue = value;
    }

    let valueAsInt: number;
    if (Number.isSafeInteger(adjustedValue)) {
      valueAsInt = adjustedValue;
    } else {
      valueAsInt = roundNumber(adjustedValue, options?.roundingMode);
    }

    if (this.inRange(valueAsInt)) {
      return normalizeNumber(valueAsInt);
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsInt);

      default: // case OverflowMode.SATURATE:
        return this.#range.clamp(valueAsInt);
    }
  }

  // #saturateFromInteger(value: number): T {
  //   // if (Number.isSafeInteger(value) !== true) {
  //   //   throw new TypeError("`value` must be a safe integer.");
  //   // }
  //
  //   if (value > this.#range.max) {
  //     return this.#range.max;
  //   } else if (value < this.#range.min) {
  //     return this.#range.min;
  //   }
  //
  //   return normalizeNumber(value as T);
  // }

  #truncateFromInteger(value: number): T {
    // if (Number.isSafeInteger(value) !== true) {
    //   throw new TypeError("`value` must be a safe integer.");
    // }

    if (value === ZERO) {
      return ZERO as T;
    } else if (value > ZERO) {
      return (value % this.#range.size) as T;
    } else {
      return (this.#range.size + (value % this.#range.size)) as T;
    }
  }

  toNumber(self: T): number {
    this._assertSelf(self);

    return normalizeNumber(self);
  }

  fromBigInt(value: bigint, options?: FromBigIntOptions): T {
    if (isBigInt(value) !== true) {
      throw new TypeError("`value` must be a `bigint`.");
    }
    if (inSafeIntegerRange(value) !== true) {
      throw new RangeError("`value` must be within the range of safe integer.");
    }

    const valueAsNumber = Number(value);

    if (this.inRange(valueAsNumber)) {
      return valueAsNumber;
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsNumber);

      default: // case OverflowMode.SATURATE:
        return this.#range.clamp(valueAsNumber);
    }
  }

  toBigInt(self: T): bigint {
    this._assertSelf(self);
    return BigInt(self);
  }

  toString(self: T, options?: ToStringOptions): string {
    this._assertSelf(self);

    const radix = resolveRadix(options?.radix);
    let result = self.toString(radix);

    if (options?.lowerCase !== true) {
      result = result.toUpperCase();
    }

    const minIntegralDigits = options?.minIntegralDigits;
    if (
      isNumber(minIntegralDigits) &&
      isPositiveSafeInteger(minIntegralDigits as number)
    ) {
      result = result.padStart(minIntegralDigits, "0");
    }

    return result;
  }
}

const _BITS = [8, 16, 24, 32 /* , 40, 48 */] as const;
type _BITS = typeof _BITS[number];

class _Uint8xOperations<T extends number> extends _UinNOperations<T>
  implements Uint8xOperations<T> {
  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== 0) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("TODO");
    }
  }

  get byteLength(): number {
    return this.bitLength / BITS_PER_BYTE;
  }

  toBytes(self: T, littleEndian: boolean = false): Uint8Array {
    this._assertSelf(self);

    if (this.bitLength === 8) {
      return Uint8Array.of(self);
    }

    const bytes: Array<uint8> = [];
    if (this.bitLength === 32) {
      bytes.push(Math.trunc(self / 0x1000000) as uint8);
    }
    if (this.bitLength >= 24) {
      const o3 = (self >= 0x1000000) ? (self % 0x1000000) : self;
      bytes.push(Math.trunc(o3 / 0x10000) as uint8);
    }
    if (this.bitLength >= 16) {
      const o2 = (self >= 0x10000) ? (self % 0x10000) : self;
      bytes.push(Math.trunc(o2 / 0x100) as uint8);
      bytes.push((self % 0x100) as uint8);
    }

    return Uint8Array.from(
      (littleEndian === true) ? bytes.reverse() : bytes,
    );
  }
}

export const Uint6 = new _UinNOperations<uint6>(6);
export const Uint7 = new _UinNOperations<uint7>(7);
export const Uint8 = new _Uint8xOperations<uint8>(8);
export const Uint16 = new _Uint8xOperations<number>(16);
export const Uint24 = new _Uint8xOperations<number>(24);
export const Uint32 = new _Uint8xOperations<number>(32);
