import { numeric, Radix } from "./numeric.ts";
import { OverflowMode, RoundingMode } from "./integer.ts";

export type FromNumberOptions = {
  roundingMode?: RoundingMode;
  overflowMode?: OverflowMode;
};

export type FromBigIntOptions = {
  overflowMode?: OverflowMode;
};

export type FromStringOptions = {
  overflowMode?: OverflowMode;
  radix?: Radix;
};

export type ToStringOptions = {
  minIntegralDigits?: number;
  radix?: Radix;
  lowerCase?: boolean;
};

export interface UintNOperations<T extends numeric> {
  bitLength: number;
  inRange(value: unknown): value is T;
  bitwiseAnd(self: T, other: T): T;
  bitwiseOr(self: T, other: T): T;
  bitwiseXOr(self: T, other: T): T;
  //XXX bitwiseNot(self: T): T;
  rotateLeft(self: T, offset: number): T;
  //XXX rotateRight(self: T, offset: number): T;
  fromNumber(value: number, options?: FromNumberOptions): T;
  toNumber(self: T): number;
  fromBigInt(value: bigint, options?: FromBigIntOptions): T;
  toBigInt(self: T): bigint;
  fromString(value: string, options?: FromStringOptions): T;
  toString(self: T, options?: ToStringOptions): string;
}

export const BITS_PER_BYTE = 8;

export interface Uint8xOperations<T extends numeric>
  extends UintNOperations<T> {
  byteLength: number;
  toBytes(self: T, littleEndian: boolean): Uint8Array;
}
