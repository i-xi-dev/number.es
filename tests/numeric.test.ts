import { assertStrictEquals } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.ZERO", () => {
  assertStrictEquals(Numeric.ZERO, 0);
});

Deno.test("Numeric.isPositive()", () => {
  assertStrictEquals(Numeric.isPositive(0), false);
  assertStrictEquals(Numeric.isPositive(-0), false);
  assertStrictEquals(Numeric.isPositive(1), true);
  assertStrictEquals(Numeric.isPositive(-1), false);

  assertStrictEquals(Numeric.isPositive(-10.1), false);
  assertStrictEquals(Numeric.isPositive(-9.9), false);
  assertStrictEquals(Numeric.isPositive(9.9), true);
  assertStrictEquals(Numeric.isPositive(10.1), true);

  assertStrictEquals(Numeric.isPositive(Number.NaN), false);
  assertStrictEquals(Numeric.isPositive(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numeric.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isPositive(undefined as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(null as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(0n as unknown as number), false);
  assertStrictEquals(Numeric.isPositive("" as unknown as number), false);
  assertStrictEquals(Numeric.isPositive("0" as unknown as number), false);
});

Deno.test("Numeric.isNonNegative()", () => {
  assertStrictEquals(Numeric.isNonNegative(0), true);
  assertStrictEquals(Numeric.isNonNegative(-0), true);
  assertStrictEquals(Numeric.isNonNegative(1), true);
  assertStrictEquals(Numeric.isNonNegative(-1), false);

  assertStrictEquals(Numeric.isNonNegative(-10.1), false);
  assertStrictEquals(Numeric.isNonNegative(-9.9), false);
  assertStrictEquals(Numeric.isNonNegative(9.9), true);
  assertStrictEquals(Numeric.isNonNegative(10.1), true);

  assertStrictEquals(Numeric.isNonNegative(Number.NaN), false);
  assertStrictEquals(Numeric.isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numeric.isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numeric.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNonNegative(null as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative(0n as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative("" as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative("0" as unknown as number), false);
});

Deno.test("Numeric.isNonPositive()", () => {
  assertStrictEquals(Numeric.isNonPositive(0), true);
  assertStrictEquals(Numeric.isNonPositive(-0), true);
  assertStrictEquals(Numeric.isNonPositive(1), false);
  assertStrictEquals(Numeric.isNonPositive(-1), true);

  assertStrictEquals(Numeric.isNonPositive(-10.1), true);
  assertStrictEquals(Numeric.isNonPositive(-9.9), true);
  assertStrictEquals(Numeric.isNonPositive(9.9), false);
  assertStrictEquals(Numeric.isNonPositive(10.1), false);

  assertStrictEquals(Numeric.isNonPositive(Number.NaN), false);
  assertStrictEquals(Numeric.isNonPositive(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isNonPositive(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numeric.isNonPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNonPositive(null as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive(0n as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive("" as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive("0" as unknown as number), false);
});

Deno.test("Numeric.isNegative()", () => {
  assertStrictEquals(Numeric.isNegative(0), false);
  assertStrictEquals(Numeric.isNegative(-0), false);
  assertStrictEquals(Numeric.isNegative(1), false);
  assertStrictEquals(Numeric.isNegative(-1), true);

  assertStrictEquals(Numeric.isNegative(-10.1), true);
  assertStrictEquals(Numeric.isNegative(-9.9), true);
  assertStrictEquals(Numeric.isNegative(9.9), false);
  assertStrictEquals(Numeric.isNegative(10.1), false);

  assertStrictEquals(Numeric.isNegative(Number.NaN), false);
  assertStrictEquals(Numeric.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isNegative(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Numeric.isNegative(undefined as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(null as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(0n as unknown as number), false);
  assertStrictEquals(Numeric.isNegative("" as unknown as number), false);
  assertStrictEquals(Numeric.isNegative("0" as unknown as number), false);
});
