import { BITS_PER_BYTE, Uint8xOperations, UintNOperations } from "./uint_n.ts";
import { SafeIntegerRange, ZERO } from "./safe_integer.ts";
import { uint6, uint7, uint8 } from "./uint_n_type.ts";

class _UinNOperations<T extends number> implements UintNOperations<T> {
  readonly #bitLength: number;
  readonly #range: SafeIntegerRange<T>;

  readonly #buffer: ArrayBuffer;
  readonly #bufferUint32View: Uint32Array;
  readonly #bufferUint16View: Uint16Array;

  constructor(bitLength: number) {
    if (bitLength > 32) {
      throw new Error("not implemented"); //TODO
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

  bitwiseAnd(self: T, other: T): T {
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (this.inRange(other) !== true) {
      throw new Error("TODO");
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
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (this.inRange(other) !== true) {
      throw new Error("TODO");
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
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (this.inRange(other) !== true) {
      throw new Error("TODO");
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
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }
    if (Number.isSafeInteger(offset) !== true) {
      throw new TypeError("TODO");
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
}

const _BITS = [8, 16, 24, 32] as const;
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

  toBytes(self: T, littleEndian: boolean): Uint8Array {
    if (this.inRange(self) !== true) {
      throw new Error("TODO");
    }

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
