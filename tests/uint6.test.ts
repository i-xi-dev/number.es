import { assertStrictEquals } from "./deps.ts";
import { Uint6 } from "../mod.ts";

Deno.test("Uint6.isUint6(number)", () => {
  assertStrictEquals(Uint6.isUint6(-1), false);
  assertStrictEquals(Uint6.isUint6(-0), true);
  assertStrictEquals(Uint6.isUint6(0), true);
  assertStrictEquals(Uint6.isUint6(63), true);
  assertStrictEquals(Uint6.isUint6(64), false);
  assertStrictEquals(Uint6.isUint6(127), false);
  assertStrictEquals(Uint6.isUint6(128), false);
  assertStrictEquals(Uint6.isUint6(255), false);
  assertStrictEquals(Uint6.isUint6(256), false);
  assertStrictEquals(Uint6.isUint6(65535), false);
  assertStrictEquals(Uint6.isUint6(65536), false);
  assertStrictEquals(Uint6.isUint6(0xFFFFFFFF), false);
  assertStrictEquals(Uint6.isUint6(0x100000000), false);
  assertStrictEquals(Uint6.isUint6(0.1), false);
});

Deno.test("Uint6.isUint6(any)", () => {
  assertStrictEquals(Uint6.isUint6("0"), false);
  assertStrictEquals(Uint6.isUint6("255"), false);
  assertStrictEquals(Uint6.isUint6(true), false);
  assertStrictEquals(Uint6.isUint6({}), false);
  assertStrictEquals(Uint6.isUint6([]), false);
  assertStrictEquals(Uint6.isUint6([0]), false);
  assertStrictEquals(Uint6.isUint6(undefined), false);
  assertStrictEquals(Uint6.isUint6(null), false);
});
