import { BigIntegerRange } from "./big_integer.ts";
import { BITS_PER_BYTE, Uint8xOperations, UintNOperations } from "./uint_n.ts";
import { NUMBER_ZERO } from "./utils.ts";

class _UinNOperations<T extends bigint> implements UintNOperations<T> {
  readonly #bitLength: number;
  readonly #range: BigIntegerRange<T>;

  constructor(bitLength: number) {
    if (bitLength !== 64) {
      throw new Error("not implemented"); //TODO
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
      throw new Error("TODO");
    }
    if (this.inRange(other) !== true) {
      throw new Error("TODO");
    }

    const aAndB = (self as bigint) & (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aAndB & this.#range.max) as T;
  }

  bitwiseOr(self: T, other: T): T {
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (this.inRange(other) !== true) {
      throw new Error("TODO");
    }

    const aOrB = (self as bigint) | (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aOrB & this.#range.max) as T;
  }

  bitwiseXOr(self: T, other: T): T {
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (this.inRange(other) !== true) {
      throw new Error("TODO");
    }

    const aXOrB = (self as bigint) ^ (other as bigint); //XXX 何故かtypescriptにbigintでなくnumberだと言われる
    return (aXOrB & this.#range.max) as T;
  }

  rotateLeft(self: T, offset: number): T {
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (Number.isSafeInteger(offset) !== true) {
      throw new TypeError("TODO");
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
}

const _BITS = [64, 128] as const;
type _BITS = typeof _BITS[number];

class _Uint8xOperations<T extends bigint> extends _UinNOperations<T>
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

  toBytes(self: T, littleEndian: boolean): Uint8Array {
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }

    void littleEndian;
    throw new Error("not implemented."); //TODO
  }
}

export const BigUint64 = new _Uint8xOperations<bigint>(64);
export const BigUint128 = new _Uint8xOperations<bigint>(128);
