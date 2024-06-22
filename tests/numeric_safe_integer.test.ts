import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.isPositiveSafeInteger(number)", () => {
  assertStrictEquals(Numeric.isPositiveSafeInteger(-1), false);
  assertStrictEquals(Numeric.isPositiveSafeInteger(-0), false);
  assertStrictEquals(Numeric.isPositiveSafeInteger(0), false);
  assertStrictEquals(Numeric.isPositiveSafeInteger(1), true);
  assertStrictEquals(
    Numeric.isPositiveSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(Numeric.isPositiveSafeInteger(1.1), false);
  assertStrictEquals(Numeric.isPositiveSafeInteger(-1.1), false);
  assertStrictEquals(Numeric.isPositiveSafeInteger(Number.NaN), false);
  assertStrictEquals(
    Numeric.isPositiveSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isPositiveSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isPositiveSafeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("Numeric.isPositiveSafeInteger(any)", () => {
  assertStrictEquals(Numeric.isPositiveSafeInteger("1"), false);
  assertStrictEquals(Numeric.isPositiveSafeInteger(true), false);
});

Deno.test("Numeric.isNonNegativeSafeInteger(number)", () => {
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(-1), false);
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(-0), true);
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(0), true);
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(1), true);
  assertStrictEquals(
    Numeric.isNonNegativeSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(1.1), false);
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(-1.1), false);
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNonNegativeSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeSafeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("Numeric.isNonNegativeSafeInteger(any)", () => {
  assertStrictEquals(Numeric.isNonNegativeSafeInteger("1"), false);
  assertStrictEquals(Numeric.isNonNegativeSafeInteger(true), false);
});

Deno.test("Numeric.isNonPositiveSafeInteger(number)", () => {
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(-1), true);
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(-0), true);
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(0), true);
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(1), false);
  assertStrictEquals(
    Numeric.isNonPositiveSafeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(1.1), false);
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(-1.1), false);
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNonPositiveSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("Numeric.isNonPositiveSafeInteger(any)", () => {
  assertStrictEquals(Numeric.isNonPositiveSafeInteger("1"), false);
  assertStrictEquals(Numeric.isNonPositiveSafeInteger(true), false);
});

Deno.test("Numeric.isNegativeSafeInteger(number)", () => {
  assertStrictEquals(Numeric.isNegativeSafeInteger(-1), true);
  assertStrictEquals(Numeric.isNegativeSafeInteger(-0), false);
  assertStrictEquals(Numeric.isNegativeSafeInteger(0), false);
  assertStrictEquals(Numeric.isNegativeSafeInteger(1), false);
  assertStrictEquals(
    Numeric.isNegativeSafeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(Numeric.isNegativeSafeInteger(1.1), false);
  assertStrictEquals(Numeric.isNegativeSafeInteger(-1.1), false);
  assertStrictEquals(Numeric.isNegativeSafeInteger(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNegativeSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNegativeSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNegativeSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("Numeric.isNegativeSafeInteger(any)", () => {
  assertStrictEquals(Numeric.isNegativeSafeInteger("1"), false);
  assertStrictEquals(Numeric.isNegativeSafeInteger(true), false);
});

Deno.test("Numeric.isOddSafeInteger(number)", () => {
  assertStrictEquals(Numeric.isOddSafeInteger(0), false);
  assertStrictEquals(Numeric.isOddSafeInteger(-0), false);
  assertStrictEquals(Numeric.isOddSafeInteger(1), true);
  assertStrictEquals(Numeric.isOddSafeInteger(-1), true);
  assertStrictEquals(Numeric.isOddSafeInteger(2), false);
  assertStrictEquals(Numeric.isOddSafeInteger(-2), false);
  assertStrictEquals(Numeric.isOddSafeInteger(3), true);
  assertStrictEquals(Numeric.isOddSafeInteger(-3), true);

  assertStrictEquals(Numeric.isOddSafeInteger(-10.1), false);
  assertStrictEquals(Numeric.isOddSafeInteger(-9.9), false);
  assertStrictEquals(Numeric.isOddSafeInteger(9.9), false);
  assertStrictEquals(Numeric.isOddSafeInteger(10.1), false);

  assertStrictEquals(
    Numeric.isOddSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(Numeric.isOddSafeInteger(1.1), false);
  assertStrictEquals(Numeric.isOddSafeInteger(-1.1), false);
  assertStrictEquals(Numeric.isOddSafeInteger(Number.NaN), false);
  assertStrictEquals(
    Numeric.isOddSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isOddSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isOddSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );

  assertStrictEquals(Numeric.isOddSafeInteger(undefined), false);
  assertStrictEquals(Numeric.isOddSafeInteger(null), false);
  assertStrictEquals(Numeric.isOddSafeInteger(0n), false);
  assertStrictEquals(Numeric.isOddSafeInteger(""), false);
  assertStrictEquals(Numeric.isOddSafeInteger("0"), false);
});

Deno.test("Numeric.isOddSafeInteger(any)", () => {
  assertStrictEquals(Numeric.isOddSafeInteger("1"), false);
  assertStrictEquals(Numeric.isOddSafeInteger(true), false);
});

Deno.test("Numeric.isEvenSafeInteger(number)", () => {
  assertStrictEquals(Numeric.isEvenSafeInteger(0), true);
  assertStrictEquals(Numeric.isEvenSafeInteger(-0), true);
  assertStrictEquals(Numeric.isEvenSafeInteger(1), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(-1), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(2), true);
  assertStrictEquals(Numeric.isEvenSafeInteger(-2), true);
  assertStrictEquals(Numeric.isEvenSafeInteger(3), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(-3), false);

  assertStrictEquals(Numeric.isEvenSafeInteger(-10.1), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(-9.9), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(9.9), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(10.1), false);

  assertStrictEquals(
    Numeric.isEvenSafeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(Numeric.isEvenSafeInteger(1.1), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(-1.1), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(Number.NaN), false);
  assertStrictEquals(
    Numeric.isEvenSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isEvenSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isEvenSafeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );

  assertStrictEquals(Numeric.isEvenSafeInteger(undefined), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(null), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(0n), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(""), false);
  assertStrictEquals(Numeric.isEvenSafeInteger("0"), false);
});

Deno.test("Numeric.isEvenSafeInteger(any)", () => {
  assertStrictEquals(Numeric.isEvenSafeInteger("1"), false);
  assertStrictEquals(Numeric.isEvenSafeInteger(true), false);
});
