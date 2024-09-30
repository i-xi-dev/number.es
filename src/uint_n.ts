import { numeric } from "./numeric.ts";

export interface UintNOperations<T extends numeric> {
  bitLength: number;
  inRange(value: unknown): value is T;
  bitwiseAnd(self: T, other: T): T;
  bitwiseOr(self: T, other: T): T;
  bitwiseXOr(self: T, other: T): T;
  //TODO bitwiseNot(self: T): T;
  rotateLeft(self: T, offset: number): T;
  //TODO rotateRight(self: T, offset: number): T;
  toNumber(self: T): number;
  toBigInt(self: T): bigint;
}

export const BITS_PER_BYTE = 8;

export interface Uint8xOperations<T extends numeric>
  extends UintNOperations<T> {
  byteLength: number;
  toBytes(self: T, littleEndian: boolean): Uint8Array;
}

//TODO fromNumber(value: number, options: TODO): T;
//TODO toNumber(self: T, options: TODO): number;
//TODO fromString(value: string, options: TODO): T;
//TODO toString(self: T, options: TODO): string;
//TODO fromBigInt(value: bigint, options: TODO): T;
