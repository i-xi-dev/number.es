import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.BIGINT_ZERO", () => {
  assertStrictEquals(Numeric.BIGINT_ZERO, 0n);
});

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

Deno.test("Numeric.isPositiveBigInt()", () => {
  assertStrictEquals(Numeric.isPositiveBigInt(0n), false);
  assertStrictEquals(Numeric.isPositiveBigInt(-0n), false);
  assertStrictEquals(Numeric.isPositiveBigInt(1n), true);
  assertStrictEquals(Numeric.isPositiveBigInt(-1n), false);

  assertStrictEquals(Numeric.isPositiveBigInt(-10.1), false);
  assertStrictEquals(Numeric.isPositiveBigInt(-9.9), false);
  assertStrictEquals(Numeric.isPositiveBigInt(9.9), false);
  assertStrictEquals(Numeric.isPositiveBigInt(10.1), false);

  assertStrictEquals(Numeric.isPositiveBigInt(Number.NaN), false);
  assertStrictEquals(Numeric.isPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isPositiveBigInt(undefined), false);
  assertStrictEquals(Numeric.isPositiveBigInt(null), false);
  assertStrictEquals(Numeric.isPositiveBigInt(""), false);
  assertStrictEquals(Numeric.isPositiveBigInt("0"), false);
});

Deno.test("Numeric.isNonNegativeBigInt()", () => {
  assertStrictEquals(Numeric.isNonNegativeBigInt(0n), true);
  assertStrictEquals(Numeric.isNonNegativeBigInt(-0n), true);
  assertStrictEquals(Numeric.isNonNegativeBigInt(1n), true);
  assertStrictEquals(Numeric.isNonNegativeBigInt(-1n), false);

  assertStrictEquals(Numeric.isNonNegativeBigInt(-10.1), false);
  assertStrictEquals(Numeric.isNonNegativeBigInt(-9.9), false);
  assertStrictEquals(Numeric.isNonNegativeBigInt(9.9), false);
  assertStrictEquals(Numeric.isNonNegativeBigInt(10.1), false);

  assertStrictEquals(Numeric.isNonNegativeBigInt(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNonNegativeBigInt(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeBigInt(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Numeric.isNonNegativeBigInt(undefined), false);
  assertStrictEquals(Numeric.isNonNegativeBigInt(null), false);
  assertStrictEquals(Numeric.isNonNegativeBigInt(""), false);
  assertStrictEquals(Numeric.isNonNegativeBigInt("0"), false);
});

Deno.test("Numeric.isNonPositiveBigInt()", () => {
  assertStrictEquals(Numeric.isNonPositiveBigInt(0n), true);
  assertStrictEquals(Numeric.isNonPositiveBigInt(-0n), true);
  assertStrictEquals(Numeric.isNonPositiveBigInt(1n), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt(-1n), true);

  assertStrictEquals(Numeric.isNonPositiveBigInt(-10.1), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt(-9.9), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt(9.9), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt(10.1), false);

  assertStrictEquals(Numeric.isNonPositiveBigInt(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNonPositiveBigInt(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveBigInt(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(Numeric.isNonPositiveBigInt(undefined), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt(null), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt(""), false);
  assertStrictEquals(Numeric.isNonPositiveBigInt("0"), false);
});

Deno.test("Numeric.isNegativeBigInt()", () => {
  assertStrictEquals(Numeric.isNegativeBigInt(0n), false);
  assertStrictEquals(Numeric.isNegativeBigInt(-0n), false);
  assertStrictEquals(Numeric.isNegativeBigInt(1n), false);
  assertStrictEquals(Numeric.isNegativeBigInt(-1n), true);

  assertStrictEquals(Numeric.isNegativeBigInt(-10.1), false);
  assertStrictEquals(Numeric.isNegativeBigInt(-9.9), false);
  assertStrictEquals(Numeric.isNegativeBigInt(9.9), false);
  assertStrictEquals(Numeric.isNegativeBigInt(10.1), false);

  assertStrictEquals(Numeric.isNegativeBigInt(Number.NaN), false);
  assertStrictEquals(Numeric.isNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isNegativeBigInt(undefined), false);
  assertStrictEquals(Numeric.isNegativeBigInt(null), false);
  assertStrictEquals(Numeric.isNegativeBigInt(""), false);
  assertStrictEquals(Numeric.isNegativeBigInt("0"), false);
});

Deno.test("Numeric.isOddBigInt()", () => {
  assertStrictEquals(Numeric.isOddBigInt(0n), false);
  assertStrictEquals(Numeric.isOddBigInt(-0n), false);
  assertStrictEquals(Numeric.isOddBigInt(1n), true);
  assertStrictEquals(Numeric.isOddBigInt(-1n), true);
  assertStrictEquals(Numeric.isOddBigInt(2n), false);
  assertStrictEquals(Numeric.isOddBigInt(-2n), false);
  assertStrictEquals(Numeric.isOddBigInt(3n), true);
  assertStrictEquals(Numeric.isOddBigInt(-3n), true);

  assertStrictEquals(Numeric.isOddBigInt(-10.1), false);
  assertStrictEquals(Numeric.isOddBigInt(-9.9), false);
  assertStrictEquals(Numeric.isOddBigInt(9.9), false);
  assertStrictEquals(Numeric.isOddBigInt(10.1), false);

  assertStrictEquals(Numeric.isOddBigInt(Number.NaN), false);
  assertStrictEquals(Numeric.isOddBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isOddBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isOddBigInt(undefined), false);
  assertStrictEquals(Numeric.isOddBigInt(null), false);
  assertStrictEquals(Numeric.isOddBigInt(""), false);
  assertStrictEquals(Numeric.isOddBigInt("0"), false);
});

Deno.test("Numeric.isEvenBigInt()", () => {
  assertStrictEquals(Numeric.isEvenBigInt(0n), true);
  assertStrictEquals(Numeric.isEvenBigInt(-0n), true);
  assertStrictEquals(Numeric.isEvenBigInt(1n), false);
  assertStrictEquals(Numeric.isEvenBigInt(-1n), false);
  assertStrictEquals(Numeric.isEvenBigInt(2n), true);
  assertStrictEquals(Numeric.isEvenBigInt(-2n), true);
  assertStrictEquals(Numeric.isEvenBigInt(3n), false);
  assertStrictEquals(Numeric.isEvenBigInt(-3n), false);

  assertStrictEquals(Numeric.isEvenBigInt(-10.1), false);
  assertStrictEquals(Numeric.isEvenBigInt(-9.9), false);
  assertStrictEquals(Numeric.isEvenBigInt(9.9), false);
  assertStrictEquals(Numeric.isEvenBigInt(10.1), false);

  assertStrictEquals(Numeric.isEvenBigInt(Number.NaN), false);
  assertStrictEquals(Numeric.isEvenBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isEvenBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isEvenBigInt(undefined), false);
  assertStrictEquals(Numeric.isEvenBigInt(null), false);
  assertStrictEquals(Numeric.isEvenBigInt(""), false);
  assertStrictEquals(Numeric.isEvenBigInt("0"), false);
});
