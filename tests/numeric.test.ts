import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.ZERO", () => {
  assertStrictEquals(Numeric.ZERO, 0);
});

Deno.test("Numeric.isPositiveNumber()", () => {
  assertStrictEquals(Numeric.isPositiveNumber(0), false);
  assertStrictEquals(Numeric.isPositiveNumber(-0), false);
  assertStrictEquals(Numeric.isPositiveNumber(1), true);
  assertStrictEquals(Numeric.isPositiveNumber(-1), false);

  assertStrictEquals(Numeric.isPositiveNumber(-10.1), false);
  assertStrictEquals(Numeric.isPositiveNumber(-9.9), false);
  assertStrictEquals(Numeric.isPositiveNumber(9.9), true);
  assertStrictEquals(Numeric.isPositiveNumber(10.1), true);

  assertStrictEquals(Numeric.isPositiveNumber(Number.NaN), false);
  assertStrictEquals(Numeric.isPositiveNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numeric.isPositiveNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numeric.isPositiveNumber(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isPositiveNumber(null as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isPositiveNumber(0n as unknown as number), false);
  assertStrictEquals(Numeric.isPositiveNumber("" as unknown as number), false);
  assertStrictEquals(Numeric.isPositiveNumber("0" as unknown as number), false);
});

Deno.test("Numeric.isNonNegativeNumber()", () => {
  assertStrictEquals(Numeric.isNonNegativeNumber(0), true);
  assertStrictEquals(Numeric.isNonNegativeNumber(-0), true);
  assertStrictEquals(Numeric.isNonNegativeNumber(1), true);
  assertStrictEquals(Numeric.isNonNegativeNumber(-1), false);

  assertStrictEquals(Numeric.isNonNegativeNumber(-10.1), false);
  assertStrictEquals(Numeric.isNonNegativeNumber(-9.9), false);
  assertStrictEquals(Numeric.isNonNegativeNumber(9.9), true);
  assertStrictEquals(Numeric.isNonNegativeNumber(10.1), true);

  assertStrictEquals(Numeric.isNonNegativeNumber(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNonNegativeNumber(Number.POSITIVE_INFINITY),
    true,
  );
  assertStrictEquals(
    Numeric.isNonNegativeNumber(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    Numeric.isNonNegativeNumber(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeNumber(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeNumber(0n as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeNumber("" as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegativeNumber("0" as unknown as number),
    false,
  );
});

Deno.test("Numeric.isNonPositiveNumber()", () => {
  assertStrictEquals(Numeric.isNonPositiveNumber(0), true);
  assertStrictEquals(Numeric.isNonPositiveNumber(-0), true);
  assertStrictEquals(Numeric.isNonPositiveNumber(1), false);
  assertStrictEquals(Numeric.isNonPositiveNumber(-1), true);

  assertStrictEquals(Numeric.isNonPositiveNumber(-10.1), true);
  assertStrictEquals(Numeric.isNonPositiveNumber(-9.9), true);
  assertStrictEquals(Numeric.isNonPositiveNumber(9.9), false);
  assertStrictEquals(Numeric.isNonPositiveNumber(10.1), false);

  assertStrictEquals(Numeric.isNonPositiveNumber(Number.NaN), false);
  assertStrictEquals(
    Numeric.isNonPositiveNumber(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveNumber(Number.NEGATIVE_INFINITY),
    true,
  );

  assertStrictEquals(
    Numeric.isNonPositiveNumber(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveNumber(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveNumber(0n as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveNumber("" as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositiveNumber("0" as unknown as number),
    false,
  );
});

Deno.test("Numeric.isNegativeNumber()", () => {
  assertStrictEquals(Numeric.isNegativeNumber(0), false);
  assertStrictEquals(Numeric.isNegativeNumber(-0), false);
  assertStrictEquals(Numeric.isNegativeNumber(1), false);
  assertStrictEquals(Numeric.isNegativeNumber(-1), true);

  assertStrictEquals(Numeric.isNegativeNumber(-10.1), true);
  assertStrictEquals(Numeric.isNegativeNumber(-9.9), true);
  assertStrictEquals(Numeric.isNegativeNumber(9.9), false);
  assertStrictEquals(Numeric.isNegativeNumber(10.1), false);

  assertStrictEquals(Numeric.isNegativeNumber(Number.NaN), false);
  assertStrictEquals(Numeric.isNegativeNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isNegativeNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numeric.isNegativeNumber(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.isNegativeNumber(null as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNegativeNumber(0n as unknown as number), false);
  assertStrictEquals(Numeric.isNegativeNumber("" as unknown as number), false);
  assertStrictEquals(Numeric.isNegativeNumber("0" as unknown as number), false);
});

Deno.test("Numeric.normalizeNumber()", () => {
  assertStrictEquals(Numeric.normalizeNumber(0), 0);
  assertStrictEquals(Numeric.normalizeNumber(-0), 0);
  assertStrictEquals(Numeric.normalizeNumber(1), 1);
  assertStrictEquals(Numeric.normalizeNumber(-1), -1);

  assertStrictEquals(Numeric.normalizeNumber(-10.1), -10.1);
  assertStrictEquals(Numeric.normalizeNumber(-9.9), -9.9);
  assertStrictEquals(Numeric.normalizeNumber(9.9), 9.9);
  assertStrictEquals(Numeric.normalizeNumber(10.1), 10.1);

  assertStrictEquals(Numeric.normalizeNumber(Number.NaN), Number.NaN);
  assertStrictEquals(
    Numeric.normalizeNumber(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    Numeric.normalizeNumber(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );

  assertThrows(
    () => {
      Numeric.normalizeNumber(undefined as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber(null as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber(0n as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber("0" as unknown as number);
    },
    TypeError,
    "source",
  );
});
