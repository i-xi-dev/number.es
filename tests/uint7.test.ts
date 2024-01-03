import { assertStrictEquals } from "./deps.ts";
import { Uint7 } from "../mod.ts";

Deno.test("Uint7.isUint7(number)", () => {
  assertStrictEquals(Uint7.isUint7(-1), false);
  assertStrictEquals(Uint7.isUint7(-0), true);
  assertStrictEquals(Uint7.isUint7(0), true);
  assertStrictEquals(Uint7.isUint7(63), true);
  assertStrictEquals(Uint7.isUint7(64), true);
  assertStrictEquals(Uint7.isUint7(127), true);
  assertStrictEquals(Uint7.isUint7(128), false);
  assertStrictEquals(Uint7.isUint7(255), false);
  assertStrictEquals(Uint7.isUint7(256), false);
  assertStrictEquals(Uint7.isUint7(65535), false);
  assertStrictEquals(Uint7.isUint7(65536), false);
  assertStrictEquals(Uint7.isUint7(0xFFFFFFFF), false);
  assertStrictEquals(Uint7.isUint7(0x100000000), false);
  assertStrictEquals(Uint7.isUint7(0.1), false);
});

Deno.test("Uint7.isUint7(any)", () => {
  assertStrictEquals(Uint7.isUint7("0"), false);
  assertStrictEquals(Uint7.isUint7("255"), false);
  assertStrictEquals(Uint7.isUint7(true), false);
  assertStrictEquals(Uint7.isUint7({}), false);
  assertStrictEquals(Uint7.isUint7([]), false);
  assertStrictEquals(Uint7.isUint7([0]), false);
  assertStrictEquals(Uint7.isUint7(undefined), false);
  assertStrictEquals(Uint7.isUint7(null), false);
});
