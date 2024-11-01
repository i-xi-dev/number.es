import { Numerics } from "../deps.ts";

type numeric = number | bigint;

export type FromNumberOptions = {
  overflowMode?: Numerics.OverflowMode;
  roundingMode?: Numerics.RoundingMode;
}; // Numerics.FromNumberOptions & { overflowMode }

export type FromBigIntOptions = {
  overflowMode?: Numerics.OverflowMode;
};

export type FromStringOptions = {
  overflowMode?: Numerics.OverflowMode;
  radix?: Numerics.Radix;
}; // Numerics.FromStringOptions & { overflowMode }

export type ToStringOptions = Numerics.ToStringOptions;

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
