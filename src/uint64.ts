import { inRange } from "./bigint.ts";

/**
 * The type of 64-bit unsigned integer.
 */
export type Uint64 = bigint;

export namespace Uint64 {
  export const BYTES = 8;

  export const SIZE = 32;

  export const MIN_VALUE = 0x0n;

  export const MAX_VALUE = 0xFFFF_FFFF_FFFF_FFFFn;

  export function isUint64(test: unknown): boolean {
    return (typeof test === "bigint") && inRange(test, [MIN_VALUE, MAX_VALUE]);
  }
}
