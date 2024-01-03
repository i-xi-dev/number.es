import { inRange } from "./main.ts";

export type Uint32 = number;

export namespace Uint32 {
  export const MIN_VALUE = 0x0;
  export const MAX_VALUE = 0xFFFFFFFF;
  export function isUint32(test: unknown): test is Uint32 {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }
}
