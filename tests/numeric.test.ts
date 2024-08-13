import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.ZERO", () => {
  assertStrictEquals(Numeric.ZERO, 0);
});

Deno.test("Numeric.isNumber()", () => {
  assertStrictEquals(Numeric.isNumber(0), true);
  assertStrictEquals(Numeric.isNumber(-0), true);
  assertStrictEquals(Numeric.isNumber(1), true);
  assertStrictEquals(Numeric.isNumber(-1), true);

  assertStrictEquals(Numeric.isNumber(-10.1), true);
  assertStrictEquals(Numeric.isNumber(-9.9), true);
  assertStrictEquals(Numeric.isNumber(9.9), true);
  assertStrictEquals(Numeric.isNumber(10.1), true);

  assertStrictEquals(Numeric.isNumber(Number.NaN), true);
  assertStrictEquals(Numeric.isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numeric.isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Numeric.isNumber(undefined), false);
  assertStrictEquals(Numeric.isNumber(null), false);
  assertStrictEquals(Numeric.isNumber(0n), false);
  assertStrictEquals(Numeric.isNumber(""), false);
  assertStrictEquals(Numeric.isNumber("0"), false);
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
  assertStrictEquals(Numeric.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(Numeric.isPositive(undefined as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(null as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(true as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(false as unknown as number), false);
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
  assertStrictEquals(Numeric.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numeric.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNonNegative(null as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative(true as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative(false as unknown as number), false);
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
  assertStrictEquals(Numeric.isNonPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isNonPositive(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isNonPositive(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numeric.isNonPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNonPositive(null as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive(true as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive(false as unknown as number), false);
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
  assertStrictEquals(Numeric.isNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isNegative(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isNegative(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(Numeric.isNegative(undefined as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(null as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(true as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(false as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(0n as unknown as number), false);
  assertStrictEquals(Numeric.isNegative("" as unknown as number), false);
  assertStrictEquals(Numeric.isNegative("0" as unknown as number), false);
});

Deno.test("Numeric.normalize()", () => {
  assertStrictEquals(Numeric.normalize(0), 0);
  assertStrictEquals(Numeric.normalize(-0), 0);
  assertStrictEquals(Numeric.normalize(1), 1);
  assertStrictEquals(Numeric.normalize(-1), -1);

  assertStrictEquals(Numeric.normalize(-10.1), -10.1);
  assertStrictEquals(Numeric.normalize(-9.9), -9.9);
  assertStrictEquals(Numeric.normalize(9.9), 9.9);
  assertStrictEquals(Numeric.normalize(10.1), 10.1);

  assertStrictEquals(Numeric.normalize(Number.NaN), Number.NaN);
  assertStrictEquals(
    Numeric.normalize(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    Numeric.normalize(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );

  const e1 = "`source` is must be a `number`.";
  assertThrows(
    () => {
      Numeric.normalize(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalize(null as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalize(0n as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalize("" as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalize("0" as unknown as number);
    },
    TypeError,
    e1,
  );
});
