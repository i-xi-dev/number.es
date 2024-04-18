import { assertStrictEquals } from "./deps.ts";
import { BigUint64 } from "../mod.ts";

Deno.test("BigUint64.isUint64(number)", () => {
  assertStrictEquals(BigUint64.isBigUint64(-1), false);
  assertStrictEquals(BigUint64.isBigUint64(-0), false);
  assertStrictEquals(BigUint64.isBigUint64(0), false);
  assertStrictEquals(BigUint64.isBigUint64(63), false);
  assertStrictEquals(BigUint64.isBigUint64(64), false);
  assertStrictEquals(BigUint64.isBigUint64(127), false);
  assertStrictEquals(BigUint64.isBigUint64(128), false);
  assertStrictEquals(BigUint64.isBigUint64(255), false);
  assertStrictEquals(BigUint64.isBigUint64(256), false);
  assertStrictEquals(BigUint64.isBigUint64(65535), false);
  assertStrictEquals(BigUint64.isBigUint64(65536), false);
  assertStrictEquals(BigUint64.isBigUint64(0xFFFFFFFF), false);
  assertStrictEquals(BigUint64.isBigUint64(0x100000000), false);
  assertStrictEquals(BigUint64.isBigUint64(0.1), false);

  assertStrictEquals(BigUint64.isBigUint64(-1n), false);
  assertStrictEquals(BigUint64.isBigUint64(-0n), true);
  assertStrictEquals(BigUint64.isBigUint64(0n), true);
  assertStrictEquals(BigUint64.isBigUint64(63n), true);
  assertStrictEquals(BigUint64.isBigUint64(64n), true);
  assertStrictEquals(BigUint64.isBigUint64(127n), true);
  assertStrictEquals(BigUint64.isBigUint64(128n), true);
  assertStrictEquals(BigUint64.isBigUint64(255n), true);
  assertStrictEquals(BigUint64.isBigUint64(256n), true);
  assertStrictEquals(BigUint64.isBigUint64(65535n), true);
  assertStrictEquals(BigUint64.isBigUint64(65536n), true);
  assertStrictEquals(BigUint64.isBigUint64(0xFFFFFFFFn), true);
  assertStrictEquals(BigUint64.isBigUint64(0x100000000n), true);
  assertStrictEquals(BigUint64.isBigUint64(0xFFFFFFFFFFFFFFFFn), true);
  assertStrictEquals(BigUint64.isBigUint64(0x10000000000000000n), false);
});

Deno.test("BigUint64.isUint64(any)", () => {
  assertStrictEquals(BigUint64.isBigUint64("0"), false);
  assertStrictEquals(BigUint64.isBigUint64("255"), false);
  assertStrictEquals(BigUint64.isBigUint64(true), false);
  assertStrictEquals(BigUint64.isBigUint64({}), false);
  assertStrictEquals(BigUint64.isBigUint64([]), false);
  assertStrictEquals(BigUint64.isBigUint64([0]), false);
  assertStrictEquals(BigUint64.isBigUint64(undefined), false);
  assertStrictEquals(BigUint64.isBigUint64(null), false);
});
