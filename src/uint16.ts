import { inRange } from "./main.ts";

export type Uint16 = number;

export namespace Uint16 {
  export const MIN_VALUE = 0x0;
  export const MAX_VALUE = 0xFFFF;
  export function isUint16(test: unknown): test is Uint16 {
    return Number.isSafeInteger(test) &&
      inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }
}
