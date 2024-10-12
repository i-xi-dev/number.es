import {
  assertBigInt,
  assertNumber,
  assertSafeInteger,
  isNumber,
  isString,
} from "./utils.ts";
import { BigIntegerRange } from "./big_integer_range.ts";
import {
  BITS_PER_BYTE,
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "./uint_n.ts";
import { inSafeIntegerRange, NUMBER_ZERO, RADIX_PREFIX } from "./numeric.ts";
import { isPositive as isPositiveSafeInteger } from "./safe_integer.ts";
// import { isPositive as isPositiveSafeInteger } from "./safe_integer.ts";
import {
  OverflowMode,
  RADIX_REGEX,
  resolveRadix,
  roundNumber,
} from "./integer.ts";
import { ZERO } from "./big_integer.ts";

class _UinNOperations<T extends bigint> implements UintNOperations<T> {
  readonly #bitLength: number;
  readonly #range: BigIntegerRange<T>;

  constructor(bitLength: number) {
    if (bitLength !== 64) {
      throw new Error("not implemented"); //XXX 対応するとしても1～128まで？
    }

    this.#bitLength = bitLength;
    this.#range = BigIntegerRange.of<T>(
      0n as T,
      (2n ** BigInt(bitLength) - 1n) as T,
    );
  }

  get bitLength(): number {
    return this.#bitLength;
  }

  inRange(value: bigint): value is T {
    return this.#range.includes(value);
  }

  protected _assertInRange(test: T, label: string): void {
    if (this.inRange(test) !== true) {
      throw new TypeError(
        `The type of \`${label}\` does not match the type of \`uint${this.#bitLength}\`.`,
      ); // 型が期待値でない場合も含むのでRangeErrorでなくTypeErrorとした
    }
  }

  bitwiseAnd(self: T, other: T): T {
    this._assertInRange(self, "self");
    this._assertInRange(other, "other");

    const aAndB = (self as bigint) & (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aAndB & this.#range.max) as T;
  }

  bitwiseOr(self: T, other: T): T {
    this._assertInRange(self, "self");
    this._assertInRange(other, "other");

    const aOrB = (self as bigint) | (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aOrB & this.#range.max) as T;
  }

  bitwiseXOr(self: T, other: T): T {
    this._assertInRange(self, "self");
    this._assertInRange(other, "other");

    const aXOrB = (self as bigint) ^ (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aXOrB & this.#range.max) as T;
  }

  rotateLeft(self: T, offset: number): T {
    this._assertInRange(self, "self");
    assertSafeInteger(offset, "offset");

    let normalizedOffset = offset % this.#bitLength;
    if (normalizedOffset < NUMBER_ZERO) {
      normalizedOffset = normalizedOffset + this.#bitLength;
    }
    if (normalizedOffset === NUMBER_ZERO) {
      return self;
    }

    const bigIntOffset = BigInt(normalizedOffset);
    return (((self << bigIntOffset) |
      (self >> (BigInt(this.#bitLength) - bigIntOffset))) &
      this.#range.max) as T;
  }

  fromNumber(value: number, options?: FromNumberOptions): T {
    assertNumber(value, "value");

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

    const valueAsBigInt = BigInt(valueAsInt);

    if (this.inRange(valueAsBigInt)) {
      return valueAsBigInt;
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsBigInt);

      default: // case OverflowMode.SATURATE:
        return this.#range.clamp(valueAsBigInt);
    }
  }

  #truncateFromInteger(value: bigint): T {
    if (value === ZERO) {
      return ZERO as T;
    }

    const sizeAsBigInt = BigInt(this.#range.size);
    if (value > ZERO) {
      return (value % sizeAsBigInt) as T;
    } else {
      return (sizeAsBigInt + (value % sizeAsBigInt)) as T;
    }
  }

  toNumber(self: T): number {
    this._assertInRange(self, "self");

    if (inSafeIntegerRange(self)) {
      return Number(self);
    }
    throw new RangeError("`self` must be within the range of safe integer.");
  }

  fromBigInt(value: bigint, options?: FromBigIntOptions): T {
    assertBigInt(value, "value");

    if (this.inRange(value)) {
      return value;
    }

    switch (options?.overflowMode) {
      case OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(value);

      default: // case OverflowMode.SATURATE:
        return this.#range.clamp(value);
    }
  }

  toBigInt(self: T): bigint {
    this._assertInRange(self, "self");
    return self;
  }

  fromString(value: string, options?: FromStringOptions): T {
    if (isString(value) !== true) {
      throw new TypeError("`value` must be a `string`.");
    }

    const radix = resolveRadix(options?.radix);
    const regex = RADIX_REGEX[radix];
    if (regex.test(value) !== true) {
      throw new RangeError(
        "`value` must be a representation of a `uint" + this.#bitLength + "`.",
      );
    }

    const negative = value.startsWith("-");
    let adjustedValue = value;
    adjustedValue = adjustedValue.replace(/^[-+]?/, "");
    adjustedValue = RADIX_PREFIX[radix] + adjustedValue;
    let valueAsBigInt = BigInt(adjustedValue);
    if (negative === true) {
      valueAsBigInt *= -1n;
    }

    return this.fromBigInt(valueAsBigInt, options);
  }

  toString(self: T, options?: ToStringOptions): string {
    this._assertInRange(self, "self");

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

const _BITS = [/* 56, */ 64, /* 72, 80, 88, 96, 104, 112, 120, */ 128] as const;
type _BITS = typeof _BITS[number];

class _Uint8xOperations<T extends bigint> extends _UinNOperations<T>
  implements Uint8xOperations<T> {
  readonly #buffer: ArrayBuffer;
  readonly #bufferView: DataView;
  readonly #bufferUint8View: Uint8Array;

  constructor(bitLength: _BITS) {
    super(bitLength);
    //if ((bitLength % BITS_PER_BYTE) !== 0) {
    if (_BITS.includes(bitLength) !== true) {
      throw new Error("TODO");
    }

    this.#buffer = new ArrayBuffer(bitLength / BITS_PER_BYTE);
    this.#bufferView = new DataView(this.#buffer);
    this.#bufferUint8View = new Uint8Array(this.#buffer);
  }

  get byteLength(): number {
    return this.bitLength / BITS_PER_BYTE;
  }

  toBytes(self: T, littleEndian: boolean = false): Uint8Array {
    this._assertInRange(self, "self");

    this.#bufferView.setBigUint64(0, self, littleEndian);
    return Uint8Array.from(this.#bufferUint8View);
  }
}

export const BigUint64 = new _Uint8xOperations<bigint>(64);
// export const BigUint128 = new _Uint8xOperations<bigint>(128);
