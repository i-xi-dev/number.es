import { assertStrictEquals } from "./deps.ts";
import { isNonNegative, isPositive, ZERO } from "../mod.ts";

Deno.test("ZERO", () => {
  assertStrictEquals(ZERO, 0);
});

Deno.test("isPositive()", () => {
  assertStrictEquals(isPositive(0), false);
  assertStrictEquals(isPositive(-0), false);
  assertStrictEquals(isPositive(1), true);
  assertStrictEquals(isPositive(-1), false);

  assertStrictEquals(isPositive(-10.1), false);
  assertStrictEquals(isPositive(-9.9), false);
  assertStrictEquals(isPositive(9.9), true);
  assertStrictEquals(isPositive(10.1), true);

  assertStrictEquals(isPositive(Number.NaN), false);
  assertStrictEquals(isPositive(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isPositive(undefined as unknown as number), false);
  assertStrictEquals(isPositive(null as unknown as number), false);
  assertStrictEquals(isPositive(0n as unknown as number), false);
  assertStrictEquals(isPositive("" as unknown as number), false);
  assertStrictEquals(isPositive("0" as unknown as number), false);
});

Deno.test("isNonNegative()", () => {
  assertStrictEquals(isNonNegative(0), true);
  assertStrictEquals(isNonNegative(-0), true);
  assertStrictEquals(isNonNegative(1), true);
  assertStrictEquals(isNonNegative(-1), false);

  assertStrictEquals(isNonNegative(-10.1), false);
  assertStrictEquals(isNonNegative(-9.9), false);
  assertStrictEquals(isNonNegative(9.9), true);
  assertStrictEquals(isNonNegative(10.1), true);

  assertStrictEquals(isNonNegative(Number.NaN), false);
  assertStrictEquals(isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonNegative(undefined as unknown as number), false);
  assertStrictEquals(isNonNegative(null as unknown as number), false);
  assertStrictEquals(isNonNegative(0n as unknown as number), false);
  assertStrictEquals(isNonNegative("" as unknown as number), false);
  assertStrictEquals(isNonNegative("0" as unknown as number), false);
});
