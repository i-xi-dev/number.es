import { assertStrictEquals } from "./deps.ts";
import { Uint16 } from "../mod.ts";

Deno.test("Uint16.isUint16(number)", () => {
  assertStrictEquals(Uint16.isUint16(-1), false);
  assertStrictEquals(Uint16.isUint16(-0), true);
  assertStrictEquals(Uint16.isUint16(0), true);
  assertStrictEquals(Uint16.isUint16(63), true);
  assertStrictEquals(Uint16.isUint16(64), true);
  assertStrictEquals(Uint16.isUint16(255), true);
  assertStrictEquals(Uint16.isUint16(256), true);
  assertStrictEquals(Uint16.isUint16(65535), true);
  assertStrictEquals(Uint16.isUint16(65536), false);
  assertStrictEquals(Uint16.isUint16(0xFFFFFFFF), false);
  assertStrictEquals(Uint16.isUint16(0x100000000), false);
  assertStrictEquals(Uint16.isUint16(0.1), false);
});

Deno.test("Uint16.isUint16(any)", () => {
  assertStrictEquals(Uint16.isUint16("0"), false);
  assertStrictEquals(Uint16.isUint16("255"), false);
  assertStrictEquals(Uint16.isUint16(true), false);
  assertStrictEquals(Uint16.isUint16({}), false);
  assertStrictEquals(Uint16.isUint16([]), false);
  assertStrictEquals(Uint16.isUint16([0]), false);
  assertStrictEquals(Uint16.isUint16(undefined), false);
  assertStrictEquals(Uint16.isUint16(null), false);
});
