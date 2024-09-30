import { BigIntegerRange } from "./big_integer_range.ts";
import { BITS_PER_BYTE, Uint8xOperations, UintNOperations } from "./uint_n.ts";
import { inSafeIntegerRange, NUMBER_ZERO } from "./numeric.ts";
// import { isPositive as isPositiveSafeInteger } from "./safe_integer.ts";

class _UinNOperations<T extends bigint> implements UintNOperations<T> {
  readonly #bitLength: number;
  readonly #range: BigIntegerRange<T>;

  constructor(bitLength: number) {
    if (bitLength !== 64) {
      throw new Error("not implemented"); //TODO 対応するとしても1～128まで？
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

  bitwiseAnd(self: T, other: T): T {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }
    if (this.inRange(other) !== true) {
      throw new TypeError(
        "The type of `other` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    const aAndB = (self as bigint) & (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aAndB & this.#range.max) as T;
  }

  bitwiseOr(self: T, other: T): T {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }
    if (this.inRange(other) !== true) {
      throw new TypeError(
        "The type of `other` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    const aOrB = (self as bigint) | (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aOrB & this.#range.max) as T;
  }

  bitwiseXOr(self: T, other: T): T {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }
    if (this.inRange(other) !== true) {
      throw new TypeError(
        "The type of `other` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    const aXOrB = (self as bigint) ^ (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aXOrB & this.#range.max) as T;
  }

  rotateLeft(self: T, offset: number): T {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }
    if (Number.isSafeInteger(offset) !== true) {
      throw new TypeError("`offset` must be a safe integer.");
    }

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

  toNumber(self: T): number {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    if (inSafeIntegerRange(self)) {
      return Number(self);
    }
    throw new RangeError("`self` must be within the range of safe integer.");
  }

  toBigInt(self: T): bigint {
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" +
          this.#bitLength + "`.",
      );
    }

    return self;
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
    if (this.inRange(self) !== true) {
      throw new TypeError(
        "The type of `self` does not match the type of `uint" + this.bitLength +
          "`.",
      );
    }

    this.#bufferView.setBigUint64(0, self, littleEndian);
    return Uint8Array.from(this.#bufferUint8View);
  }
}

export const BigUint64 = new _Uint8xOperations<bigint>(64);
// export const BigUint128 = new _Uint8xOperations<bigint>(128);
