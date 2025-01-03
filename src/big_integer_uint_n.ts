import { BigIntegerRange } from "./big_integer_range.ts";
import { BigIntType, Numerics, SafeIntegerType } from "../deps.ts";
import {
  BITS_PER_BYTE,
  FromBigIntOptions,
  FromNumberOptions,
  FromStringOptions,
  ToStringOptions,
  Uint8xOperations,
  UintNOperations,
} from "./uint_n.ts";

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
    SafeIntegerType.assertSafeInteger(offset, "offset");

    let normalizedOffset = offset % this.#bitLength;
    if (normalizedOffset < 0) {
      normalizedOffset = normalizedOffset + this.#bitLength;
    }
    if (normalizedOffset === 0) {
      return self;
    }

    const bigIntOffset = BigInt(normalizedOffset);
    return (((self << bigIntOffset) |
      (self >> (BigInt(this.#bitLength) - bigIntOffset))) &
      this.#range.max) as T;
  }

  fromNumber(value: number, options?: FromNumberOptions): T {
    const valueAsBigInt = BigIntType.fromNumber(value, options);

    if (this.inRange(valueAsBigInt)) {
      return valueAsBigInt;
    }

    switch (options?.overflowMode) {
      case Numerics.OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case Numerics.OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(valueAsBigInt);

      default: // case Numerics.OverflowMode.SATURATE:
        return this.#range.clamp(valueAsBigInt);
    }
  }

  #truncateFromInteger(value: bigint): T {
    if (value === 0n) {
      return 0n as T;
    }

    const sizeAsBigInt = BigInt(this.#range.size);
    if (value > 0n) {
      return (value % sizeAsBigInt) as T;
    } else {
      return (sizeAsBigInt + (value % sizeAsBigInt)) as T;
    }
  }

  toNumber(self: T): number {
    this._assertInRange(self, "self");

    if (
      BigIntType.isInRange(
        self,
        BigInt(Number.MIN_SAFE_INTEGER),
        BigInt(Number.MAX_SAFE_INTEGER),
      ) !== true
    ) {
      throw new RangeError("`self` must be within the range of safe integer.");
    }
    return Number(self);
  }

  fromBigInt(value: bigint, options?: FromBigIntOptions): T {
    BigIntType.assertBigInt(value, "value");

    if (this.inRange(value)) {
      return value;
    }

    switch (options?.overflowMode) {
      case Numerics.OverflowMode.EXCEPTION:
        throw new RangeError(
          "`value` must be within the range of `uint" +
            this.#bitLength + "`.",
        );

      case Numerics.OverflowMode.TRUNCATE:
        return this.#truncateFromInteger(value);

      default: // case Numerics.OverflowMode.SATURATE:
        return this.#range.clamp(value);
    }
  }

  toBigInt(self: T): bigint {
    this._assertInRange(self, "self");
    return self;
  }

  fromString(value: string, options?: FromStringOptions): T {
    const valueAsBigInt = BigIntType.fromString(value, options);
    return this.fromBigInt(valueAsBigInt, options);
  }

  toString(self: T, options?: ToStringOptions): string {
    this._assertInRange(self, "self");
    return BigIntType.toString(self, options);
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
      throw new Error("Unsupprted bit length.");
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
