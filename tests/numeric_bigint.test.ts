import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.isBigInt()", () => {
  assertStrictEquals(Numeric.isBigInt(0n), true);
  assertStrictEquals(Numeric.isBigInt(-0n), true);
  assertStrictEquals(Numeric.isBigInt(1n), true);
  assertStrictEquals(Numeric.isBigInt(-1n), true);

  assertStrictEquals(Numeric.isBigInt(-10.1), false);
  assertStrictEquals(Numeric.isBigInt(-9.9), false);
  assertStrictEquals(Numeric.isBigInt(9.9), false);
  assertStrictEquals(Numeric.isBigInt(10.1), false);

  assertStrictEquals(Numeric.isBigInt(Number.NaN), false);
  assertStrictEquals(Numeric.isBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isBigInt(undefined), false);
  assertStrictEquals(Numeric.isBigInt(null), false);
  assertStrictEquals(Numeric.isBigInt(""), false);
  assertStrictEquals(Numeric.isBigInt("0"), false);
});
