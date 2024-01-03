import { assertStrictEquals } from "./deps.ts";
import { Uint32 } from "../mod.ts";

Deno.test("Uint32.isUint32(number)", () => {
  assertStrictEquals(Uint32.isUint32(-1), false);
  assertStrictEquals(Uint32.isUint32(-0), true);
  assertStrictEquals(Uint32.isUint32(0), true);
  assertStrictEquals(Uint32.isUint32(63), true);
  assertStrictEquals(Uint32.isUint32(64), true);
  assertStrictEquals(Uint32.isUint32(255), true);
  assertStrictEquals(Uint32.isUint32(256), true);
  assertStrictEquals(Uint32.isUint32(65535), true);
  assertStrictEquals(Uint32.isUint32(65536), true);
  assertStrictEquals(Uint32.isUint32(0xFFFFFFFF), true);
  assertStrictEquals(Uint32.isUint32(0x100000000), false);
  assertStrictEquals(Uint32.isUint32(0.1), false);
});

Deno.test("Uint32.isUint32(any)", () => {
  assertStrictEquals(Uint32.isUint32("0"), false);
  assertStrictEquals(Uint32.isUint32("255"), false);
  assertStrictEquals(Uint32.isUint32(true), false);
  assertStrictEquals(Uint32.isUint32({}), false);
  assertStrictEquals(Uint32.isUint32([]), false);
  assertStrictEquals(Uint32.isUint32([0]), false);
  assertStrictEquals(Uint32.isUint32(undefined), false);
  assertStrictEquals(Uint32.isUint32(null), false);
});
