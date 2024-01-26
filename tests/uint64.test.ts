import { assertStrictEquals } from "./deps.ts";
import { Uint64 } from "../mod.ts";

Deno.test("Uint64.isUint64(number)", () => {
  assertStrictEquals(Uint64.isUint64(-1), false);
  assertStrictEquals(Uint64.isUint64(-0), false);
  assertStrictEquals(Uint64.isUint64(0), false);
  assertStrictEquals(Uint64.isUint64(63), false);
  assertStrictEquals(Uint64.isUint64(64), false);
  assertStrictEquals(Uint64.isUint64(127), false);
  assertStrictEquals(Uint64.isUint64(128), false);
  assertStrictEquals(Uint64.isUint64(255), false);
  assertStrictEquals(Uint64.isUint64(256), false);
  assertStrictEquals(Uint64.isUint64(65535), false);
  assertStrictEquals(Uint64.isUint64(65536), false);
  assertStrictEquals(Uint64.isUint64(0xFFFFFFFF), false);
  assertStrictEquals(Uint64.isUint64(0x100000000), false);
  assertStrictEquals(Uint64.isUint64(0.1), false);

  assertStrictEquals(Uint64.isUint64(-1n), false);
  assertStrictEquals(Uint64.isUint64(-0n), true);
  assertStrictEquals(Uint64.isUint64(0n), true);
  assertStrictEquals(Uint64.isUint64(63n), true);
  assertStrictEquals(Uint64.isUint64(64n), true);
  assertStrictEquals(Uint64.isUint64(127n), true);
  assertStrictEquals(Uint64.isUint64(128n), true);
  assertStrictEquals(Uint64.isUint64(255n), true);
  assertStrictEquals(Uint64.isUint64(256n), true);
  assertStrictEquals(Uint64.isUint64(65535n), true);
  assertStrictEquals(Uint64.isUint64(65536n), true);
  assertStrictEquals(Uint64.isUint64(0xFFFFFFFFn), true);
  assertStrictEquals(Uint64.isUint64(0x100000000n), true);
  assertStrictEquals(Uint64.isUint64(0xFFFFFFFFFFFFFFFFn), true);
  assertStrictEquals(Uint64.isUint64(0x10000000000000000n), false);
});

Deno.test("Uint64.isUint64(any)", () => {
  assertStrictEquals(Uint64.isUint64("0"), false);
  assertStrictEquals(Uint64.isUint64("255"), false);
  assertStrictEquals(Uint64.isUint64(true), false);
  assertStrictEquals(Uint64.isUint64({}), false);
  assertStrictEquals(Uint64.isUint64([]), false);
  assertStrictEquals(Uint64.isUint64([0]), false);
  assertStrictEquals(Uint64.isUint64(undefined), false);
  assertStrictEquals(Uint64.isUint64(null), false);
});
