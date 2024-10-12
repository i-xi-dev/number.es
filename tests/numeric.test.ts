import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Numeric } from "../mod.ts";

Deno.test("Numeric.NUMBER_ZERO", () => {
  assertStrictEquals(Numeric.NUMBER_ZERO === 0, true);
  assertStrictEquals(Numeric.NUMBER_ZERO === (0n as unknown as number), false);
});

Deno.test("Numeric.BIGINT_ZERO", () => {
  assertStrictEquals(Numeric.BIGINT_ZERO === (0 as unknown as bigint), false);
  assertStrictEquals(Numeric.BIGINT_ZERO === 0n, true);
});

Deno.test("Numeric.normalizeNumber()", () => {
  assertStrictEquals(Numeric.normalizeNumber(0), 0);
  assertStrictEquals(Numeric.normalizeNumber(-0), 0);
  assertStrictEquals(Object.is(Numeric.normalizeNumber(-0), 0), true);
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

  const e1 = "`input` must be a `number`.";
  assertThrows(
    () => {
      Numeric.normalizeNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber(null as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber(0n as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber("" as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.normalizeNumber("0" as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Numeric.clampToSafeInteger()", () => {
  assertStrictEquals(Numeric.clampToSafeInteger(0), 0);
  assertStrictEquals(Numeric.clampToSafeInteger(-0), 0);
  assertStrictEquals(Object.is(Numeric.clampToSafeInteger(-0), 0), true);
  assertStrictEquals(Numeric.clampToSafeInteger(1), 1);
  assertStrictEquals(Numeric.clampToSafeInteger(-1), -1);

  assertStrictEquals(Numeric.clampToSafeInteger(-10.1), -10.1);
  assertStrictEquals(Numeric.clampToSafeInteger(-9.9), -9.9);
  assertStrictEquals(Numeric.clampToSafeInteger(9.9), 9.9);
  assertStrictEquals(Numeric.clampToSafeInteger(10.1), 10.1);

  const e2 = "`input` must not be `Number.NaN`.";
  assertThrows(
    () => {
      Numeric.clampToSafeInteger(Number.NaN);
    },
    RangeError,
    e2,
  );

  assertStrictEquals(
    Numeric.clampToSafeInteger(Number.POSITIVE_INFINITY),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    Numeric.clampToSafeInteger(Number.NEGATIVE_INFINITY),
    Number.MIN_SAFE_INTEGER,
  );

  const e1 = "`input` must be a `number`.";
  assertThrows(
    () => {
      Numeric.clampToSafeInteger(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.clampToSafeInteger(null as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.clampToSafeInteger(0n as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.clampToSafeInteger("" as unknown as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Numeric.clampToSafeInteger("0" as unknown as number);
    },
    TypeError,
    e1,
  );
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

  assertStrictEquals(Numeric.isPositive(0n), false);
  assertStrictEquals(Numeric.isPositive(-0n), false);
  assertStrictEquals(Numeric.isPositive(1n), true);
  assertStrictEquals(Numeric.isPositive(-1n), false);

  assertStrictEquals(Numeric.isPositive(Number.NaN), false);
  assertStrictEquals(Numeric.isPositive(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numeric.isPositive(Number.MAX_SAFE_INTEGER + 1), true);
  assertStrictEquals(Numeric.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isPositive(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isPositive(Number.MIN_SAFE_INTEGER - 1), false);
  assertStrictEquals(Numeric.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numeric.isPositive(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(Numeric.isPositive(BigInt(Number.MAX_SAFE_INTEGER)), true);
  assertStrictEquals(
    Numeric.isPositive(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numeric.isPositive(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(Numeric.isPositive(undefined as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(null as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(true as unknown as number), false);
  assertStrictEquals(Numeric.isPositive(false as unknown as number), false);
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

  assertStrictEquals(Numeric.isNonNegative(0n), true);
  assertStrictEquals(Numeric.isNonNegative(-0n), true);
  assertStrictEquals(Numeric.isNonNegative(1n), true);
  assertStrictEquals(Numeric.isNonNegative(-1n), false);

  assertStrictEquals(Numeric.isNonNegative(Number.NaN), false);
  assertStrictEquals(Numeric.isNonNegative(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(Numeric.isNonNegative(Number.MAX_SAFE_INTEGER + 1), true);
  assertStrictEquals(Numeric.isNonNegative(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isNonNegative(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isNonNegative(Number.MIN_SAFE_INTEGER - 1), false);
  assertStrictEquals(Numeric.isNonNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    Numeric.isNonNegative(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    true,
  );
  assertStrictEquals(
    Numeric.isNonNegative(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numeric.isNonNegative(BigInt(Number.MIN_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numeric.isNonNegative(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Numeric.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNonNegative(null as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative(true as unknown as number), false);
  assertStrictEquals(Numeric.isNonNegative(false as unknown as number), false);
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

  assertStrictEquals(Numeric.isNonPositive(0n), true);
  assertStrictEquals(Numeric.isNonPositive(-0n), true);
  assertStrictEquals(Numeric.isNonPositive(1n), false);
  assertStrictEquals(Numeric.isNonPositive(-1n), true);

  assertStrictEquals(Numeric.isNonPositive(Number.NaN), false);
  assertStrictEquals(Numeric.isNonPositive(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isNonPositive(Number.MAX_SAFE_INTEGER + 1), false);
  assertStrictEquals(Numeric.isNonPositive(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isNonPositive(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isNonPositive(Number.MIN_SAFE_INTEGER - 1), true);
  assertStrictEquals(Numeric.isNonPositive(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numeric.isNonPositive(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositive(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(
    Numeric.isNonPositive(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numeric.isNonPositive(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(
    Numeric.isNonPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(Numeric.isNonPositive(null as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive(true as unknown as number), false);
  assertStrictEquals(Numeric.isNonPositive(false as unknown as number), false);
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

  assertStrictEquals(Numeric.isNegative(0n), false);
  assertStrictEquals(Numeric.isNegative(-0n), false);
  assertStrictEquals(Numeric.isNegative(1n), false);
  assertStrictEquals(Numeric.isNegative(-1n), true);

  assertStrictEquals(Numeric.isNegative(Number.NaN), false);
  assertStrictEquals(Numeric.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Numeric.isNegative(Number.MAX_SAFE_INTEGER + 1), false);
  assertStrictEquals(Numeric.isNegative(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Numeric.isNegative(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.isNegative(Number.MIN_SAFE_INTEGER - 1), true);
  assertStrictEquals(Numeric.isNegative(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(
    Numeric.isNegative(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Numeric.isNegative(BigInt(Number.MAX_SAFE_INTEGER)),
    false,
  );
  assertStrictEquals(Numeric.isNegative(BigInt(Number.MIN_SAFE_INTEGER)), true);
  assertStrictEquals(
    Numeric.isNegative(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    true,
  );

  assertStrictEquals(Numeric.isNegative(undefined as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(null as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(true as unknown as number), false);
  assertStrictEquals(Numeric.isNegative(false as unknown as number), false);
  assertStrictEquals(Numeric.isNegative("" as unknown as number), false);
  assertStrictEquals(Numeric.isNegative("0" as unknown as number), false);
});

Deno.test("Numeric.inSafeIntegerRange()", () => {
  assertStrictEquals(Numeric.inSafeIntegerRange(0), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(-0), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(1), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(-1), true);

  assertStrictEquals(Numeric.inSafeIntegerRange(-10.1), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(-9.9), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(9.9), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(10.1), true);

  assertStrictEquals(Numeric.inSafeIntegerRange(0n), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(-0n), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(1n), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(-1n), true);

  assertStrictEquals(Numeric.inSafeIntegerRange(Number.NaN), false);
  assertStrictEquals(
    Numeric.inSafeIntegerRange(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(Number.MAX_SAFE_INTEGER + 1),
    false,
  );
  assertStrictEquals(Numeric.inSafeIntegerRange(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Numeric.inSafeIntegerRange(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(
    Numeric.inSafeIntegerRange(Number.MIN_SAFE_INTEGER - 1),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    Numeric.inSafeIntegerRange(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(BigInt(Number.MAX_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(BigInt(Number.MIN_SAFE_INTEGER)),
    true,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    false,
  );

  assertStrictEquals(
    Numeric.inSafeIntegerRange(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(null as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(true as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange(false as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange("" as unknown as number),
    false,
  );
  assertStrictEquals(
    Numeric.inSafeIntegerRange("0" as unknown as number),
    false,
  );
});

Deno.test("Numeric.Radix", () => {
  assertStrictEquals(Numeric.Radix.BINARY, 2);
  assertStrictEquals(Numeric.Radix.OCTAL, 8);
  assertStrictEquals(Numeric.Radix.DECIMAL, 10);
  assertStrictEquals(Numeric.Radix.HEXADECIMAL, 16);
});
