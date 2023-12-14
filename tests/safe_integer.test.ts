import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SafeInteger } from "../mod.ts";

Deno.test("SafeInteger.isPositive(number)", () => {
  assertStrictEquals(SafeInteger.isPositive(-1), false);
  assertStrictEquals(SafeInteger.isPositive(-0), false);
  assertStrictEquals(SafeInteger.isPositive(0), false);
  assertStrictEquals(SafeInteger.isPositive(1), true);
  assertStrictEquals(SafeInteger.isPositive(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(SafeInteger.isPositive(1.1), false);
  assertStrictEquals(SafeInteger.isPositive(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isPositive(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isPositive(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("SafeInteger.isPositive(any)", () => {
  assertStrictEquals(SafeInteger.isPositive("1"), false);
  assertStrictEquals(SafeInteger.isPositive(true), false);
});

Deno.test("SafeInteger.isNonNegative(number)", () => {
  assertStrictEquals(SafeInteger.isNonNegative(-1), false);
  assertStrictEquals(SafeInteger.isNonNegative(-0), true);
  assertStrictEquals(SafeInteger.isNonNegative(0), true);
  assertStrictEquals(SafeInteger.isNonNegative(1), true);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(SafeInteger.isNonNegative(1.1), false);
  assertStrictEquals(SafeInteger.isNonNegative(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("SafeInteger.isNonNegative(any)", () => {
  assertStrictEquals(SafeInteger.isNonNegative("1"), false);
  assertStrictEquals(SafeInteger.isNonNegative(true), false);
});

Deno.test("SafeInteger.isOdd(number)", () => {
  assertStrictEquals(SafeInteger.isOdd(-1), true);
  assertStrictEquals(SafeInteger.isOdd(-0), false);
  assertStrictEquals(SafeInteger.isOdd(0), false);
  assertStrictEquals(SafeInteger.isOdd(1), true);
  assertStrictEquals(
    SafeInteger.isOdd(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(SafeInteger.isOdd(1.1), false);
  assertStrictEquals(SafeInteger.isOdd(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isOdd(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isOdd(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isOdd(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("SafeInteger.isOdd(any)", () => {
  assertStrictEquals(SafeInteger.isOdd("1"), false);
  assertStrictEquals(SafeInteger.isOdd(true), false);
});

Deno.test("SafeInteger.isEven(number)", () => {
  assertStrictEquals(SafeInteger.isEven(-1), false);
  assertStrictEquals(SafeInteger.isEven(-0), true);
  assertStrictEquals(SafeInteger.isEven(0), true);
  assertStrictEquals(SafeInteger.isEven(1), false);
  assertStrictEquals(
    SafeInteger.isEven(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(SafeInteger.isEven(1.1), false);
  assertStrictEquals(SafeInteger.isEven(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isEven(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isEven(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isEven(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("SafeInteger.isEven(any)", () => {
  assertStrictEquals(SafeInteger.isEven("1"), false);
  assertStrictEquals(SafeInteger.isEven(true), false);
});

Deno.test("SafeInteger.round()", () => {
  assertThrows(
    () => {
      SafeInteger.round(undefined as unknown as number, Symbol());
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.NaN, Symbol());
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.MAX_SAFE_INTEGER, Symbol());
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.round(Number.MIN_SAFE_INTEGER, Symbol());
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.round(1, undefined as unknown as symbol);
    },
    TypeError,
    "roundingMode",
  );

  assertThrows(
    () => {
      SafeInteger.round(1, Symbol());
    },
    RangeError,
    "roundingMode",
  );
});

Deno.test("SafeInteger.round(number, UP)", () => {
  const op = SafeInteger.RoundingMode.UP;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 1);
  assertStrictEquals(SafeInteger.round(0.4, op), 1);
  assertStrictEquals(SafeInteger.round(0.45, op), 1);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 2);
  assertStrictEquals(SafeInteger.round(1.4, op), 2);
  assertStrictEquals(SafeInteger.round(1.45, op), 2);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.9, op), -1);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999999);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999998,
  );
});

Deno.test("SafeInteger.round(number, CEILING)", () => {
  const op = SafeInteger.RoundingMode.CEILING;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 1);
  assertStrictEquals(SafeInteger.round(0.4, op), 1);
  assertStrictEquals(SafeInteger.round(0.45, op), 1);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
});

Deno.test("SafeInteger.round(number, DOWN)", () => {
  const op = SafeInteger.RoundingMode.DOWN;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(-0.1, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(-1.1, op), -2);
  assertStrictEquals(SafeInteger.round(-1.4, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999998);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.round(number, FLOOR)", () => {
  const op = SafeInteger.RoundingMode.FLOOR;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(-0.1, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
});

Deno.test("SafeInteger.round(number, TOWARD_ZERO)", () => {
  const op = SafeInteger.RoundingMode.TOWARD_ZERO;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.9, op), 0);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 1);
  assertStrictEquals(SafeInteger.round(1.6, op), 1);
  assertStrictEquals(SafeInteger.round(1.9, op), 1);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -1);
  assertStrictEquals(SafeInteger.round(-1.6, op), -1);
  assertStrictEquals(SafeInteger.round(-1.9, op), -1);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999998);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999998,
  );
});

Deno.test("SafeInteger.round(number, TRUNCATE)", () => {
  const op = SafeInteger.RoundingMode.TRUNCATE;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 0);
  assertStrictEquals(SafeInteger.round(0.6, op), 0);
  assertStrictEquals(SafeInteger.round(0.9, op), 0);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), 0);
  assertStrictEquals(SafeInteger.round(-0.6, op), 0);
  assertStrictEquals(SafeInteger.round(-0.9, op), 0);
});

Deno.test("SafeInteger.round(number, AWAY_FROM_ZERO)", () => {
  const op = SafeInteger.RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 1);
  assertStrictEquals(SafeInteger.round(0.4, op), 1);
  assertStrictEquals(SafeInteger.round(0.45, op), 1);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), -1);
  assertStrictEquals(SafeInteger.round(-0.4, op), -1);
  assertStrictEquals(SafeInteger.round(-0.45, op), -1);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 2);
  assertStrictEquals(SafeInteger.round(1.4, op), 2);
  assertStrictEquals(SafeInteger.round(1.45, op), 2);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -2);
  assertStrictEquals(SafeInteger.round(-1.4, op), -2);
  assertStrictEquals(SafeInteger.round(-1.45, op), -2);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999999);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.round(number, HALF_UP)", () => {
  const op = SafeInteger.RoundingMode.HALF_UP;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.round(number, HALF_DOWN)", () => {
  const op = SafeInteger.RoundingMode.HALF_DOWN;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.round(number, HALF_TOWARD_ZERO)", () => {
  const op = SafeInteger.RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 1);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -1);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.round(number, HALF_AWAY_FROM_ZERO)", () => {
  const op = SafeInteger.RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.round(number, ROUND)", () => {
  const op = SafeInteger.RoundingMode.ROUND;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 1);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), -1);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);
});

Deno.test("SafeInteger.round(number, HALF_TO_EVEN)", () => {
  const op = SafeInteger.RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(SafeInteger.round(0, op), 0);
  assertStrictEquals(SafeInteger.round(-0, op), 0);
  assertStrictEquals(SafeInteger.round(1, op), 1);
  assertStrictEquals(SafeInteger.round(-1, op), -1);

  assertStrictEquals(SafeInteger.round(0.1, op), 0);
  assertStrictEquals(SafeInteger.round(0.4, op), 0);
  assertStrictEquals(SafeInteger.round(0.45, op), 0);
  assertStrictEquals(SafeInteger.round(0.5, op), 0);
  assertStrictEquals(SafeInteger.round(0.55, op), 1);
  assertStrictEquals(SafeInteger.round(0.6, op), 1);
  assertStrictEquals(SafeInteger.round(0.9, op), 1);

  assertStrictEquals(SafeInteger.round(-0.1, op), 0);
  assertStrictEquals(SafeInteger.round(-0.4, op), 0);
  assertStrictEquals(SafeInteger.round(-0.45, op), 0);
  assertStrictEquals(SafeInteger.round(-0.5, op), 0);
  assertStrictEquals(SafeInteger.round(-0.55, op), -1);
  assertStrictEquals(SafeInteger.round(-0.6, op), -1);
  assertStrictEquals(SafeInteger.round(-0.9, op), -1);

  assertStrictEquals(SafeInteger.round(1.1, op), 1);
  assertStrictEquals(SafeInteger.round(1.4, op), 1);
  assertStrictEquals(SafeInteger.round(1.45, op), 1);
  assertStrictEquals(SafeInteger.round(1.5, op), 2);
  assertStrictEquals(SafeInteger.round(1.55, op), 2);
  assertStrictEquals(SafeInteger.round(1.6, op), 2);
  assertStrictEquals(SafeInteger.round(1.9, op), 2);

  assertStrictEquals(SafeInteger.round(-1.1, op), -1);
  assertStrictEquals(SafeInteger.round(-1.4, op), -1);
  assertStrictEquals(SafeInteger.round(-1.45, op), -1);
  assertStrictEquals(SafeInteger.round(-1.5, op), -2);
  assertStrictEquals(SafeInteger.round(-1.55, op), -2);
  assertStrictEquals(SafeInteger.round(-1.6, op), -2);
  assertStrictEquals(SafeInteger.round(-1.9, op), -2);

  assertStrictEquals(SafeInteger.round(2.1, op), 2);
  assertStrictEquals(SafeInteger.round(2.4, op), 2);
  assertStrictEquals(SafeInteger.round(2.45, op), 2);
  assertStrictEquals(SafeInteger.round(2.5, op), 2);
  assertStrictEquals(SafeInteger.round(2.55, op), 3);
  assertStrictEquals(SafeInteger.round(2.6, op), 3);
  assertStrictEquals(SafeInteger.round(2.9, op), 3);

  assertStrictEquals(SafeInteger.round(-2.1, op), -2);
  assertStrictEquals(SafeInteger.round(-2.4, op), -2);
  assertStrictEquals(SafeInteger.round(-2.45, op), -2);
  assertStrictEquals(SafeInteger.round(-2.5, op), -2);
  assertStrictEquals(SafeInteger.round(-2.55, op), -3);
  assertStrictEquals(SafeInteger.round(-2.6, op), -3);
  assertStrictEquals(SafeInteger.round(-2.9, op), -3);

  // 9007199254740991

  assertStrictEquals(SafeInteger.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(SafeInteger.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(
    SafeInteger.round(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.round(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.fromNumber(number)", () => {
  assertStrictEquals(SafeInteger.fromNumber(0), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9), 0);
  assertStrictEquals(SafeInteger.fromNumber(1), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.1), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.6), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.9), 1);
  assertStrictEquals(SafeInteger.fromNumber(2), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.1), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.4), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.5), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.6), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.9), 2);

  assertStrictEquals(SafeInteger.fromNumber(-0.1), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9), 0);
  assertStrictEquals(SafeInteger.fromNumber(-1), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.6), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.9), -1);
  assertStrictEquals(SafeInteger.fromNumber(-2), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.1), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.4), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.5), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.6), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.9), -2);

  assertStrictEquals(SafeInteger.fromNumber(9876543210.5), 9876543210);
  assertStrictEquals(SafeInteger.fromNumber(-9876543210.5), -9876543210);

  assertStrictEquals(SafeInteger.fromNumber(undefined as unknown as number), 0);
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN), 0);
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MAX_VALUE),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.POSITIVE_INFINITY),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.NEGATIVE_INFINITY),
    Number.MIN_SAFE_INTEGER,
  );
});

Deno.test("SafeInteger.fromNumber(number, {}) - fallback", () => {
  const op = { fallback: 34 } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op), 34);
  assertStrictEquals(
    SafeInteger.fromNumber(undefined as unknown as number, op),
    34,
  );

  const op2 = { fallback: 3.5 } as const;
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NaN, op2);
    },
    TypeError,
    "options.fallback",
  );
});

Deno.test("SafeInteger.fromNumber(number, {}) - fallback:undefined", () => {
  const op = { fallback: undefined } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op), 0);
  assertStrictEquals(
    SafeInteger.fromNumber(undefined as unknown as number, op),
    0,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MAX_VALUE, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op),
    Number.MIN_SAFE_INTEGER,
  );
});

Deno.test("SafeInteger.fromNumber(number, {}) - fallback,strict", () => {
  const op = { fallback: 34, strict: true } as const;
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NaN, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromNumber(undefined as unknown as number, op);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.MAX_VALUE, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op);
    },
    RangeError,
    "source",
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op);
    },
    RangeError,
    "source",
  );

  const op2 = { fallback: 3.5, strict: true } as const;
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NaN, op2);
    },
    TypeError,
    "options.fallback",
  );
});

Deno.test("SafeInteger.fromNumber(number, {}) - lowerLimit", () => {
  const op = { lowerLimit: 21 } as const;
  assertStrictEquals(SafeInteger.fromNumber(22, op), 22);
  assertStrictEquals(SafeInteger.fromNumber(21, op), 21);
  assertStrictEquals(SafeInteger.fromNumber(20, op), 21);

  const op2 = { lowerLimit: -21 } as const;
  assertStrictEquals(SafeInteger.fromNumber(-22, op2), -21);
  assertStrictEquals(SafeInteger.fromNumber(-21, op2), -21);
  assertStrictEquals(SafeInteger.fromNumber(-20, op2), -20);

  const op3 = { lowerLimit: 21, fallback: 3 } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op3), 21);

  const op4 = { lowerLimit: -21, fallback: -200 } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op4), -21);

  assertThrows(
    () => {
      const op5 = { lowerLimit: Number.NaN } as const;
      SafeInteger.fromNumber(-25, op5);
    },
    TypeError,
    "lowerLimit",
  );
  assertThrows(
    () => {
      const op6 = { lowerLimit: 1.5 } as const;
      SafeInteger.fromNumber(-25, op6);
    },
    TypeError,
    "lowerLimit",
  );
  assertThrows(
    () => {
      const op5 = { lowerLimit: "" as unknown as number } as const;
      SafeInteger.fromNumber(-25, op5);
    },
    TypeError,
    "lowerLimit",
  );
});

Deno.test("SafeInteger.fromNumber(number, {}) - upperLimit", () => {
  const op = { upperLimit: 21 } as const;
  assertStrictEquals(SafeInteger.fromNumber(22, op), 21);
  assertStrictEquals(SafeInteger.fromNumber(21, op), 21);
  assertStrictEquals(SafeInteger.fromNumber(20, op), 20);

  const op2 = { upperLimit: -21 } as const;
  assertStrictEquals(SafeInteger.fromNumber(-22, op2), -22);
  assertStrictEquals(SafeInteger.fromNumber(-21, op2), -21);
  assertStrictEquals(SafeInteger.fromNumber(-20, op2), -21);

  const op3 = { upperLimit: 21, fallback: 23 } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op3), 21);

  const op4 = { upperLimit: -21, fallback: -2 } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op4), -21);

  assertThrows(
    () => {
      const op5 = { upperLimit: Number.NaN } as const;
      SafeInteger.fromNumber(-25, op5);
    },
    TypeError,
    "upperLimit",
  );
  assertThrows(
    () => {
      const op6 = { upperLimit: 1.5 } as const;
      SafeInteger.fromNumber(-25, op6);
    },
    TypeError,
    "upperLimit",
  );
  assertThrows(
    () => {
      const op5 = { upperLimit: "" as unknown as number } as const;
      SafeInteger.fromNumber(-25, op5);
    },
    TypeError,
    "upperLimit",
  );
});

Deno.test("SafeInteger.fromNumber(number, {}) - lowerLimit,upperLimit", () => {
  const op = { lowerLimit: 22, upperLimit: 24 } as const;
  assertStrictEquals(SafeInteger.fromNumber(25, op), 24);
  assertStrictEquals(SafeInteger.fromNumber(24, op), 24);
  assertStrictEquals(SafeInteger.fromNumber(23, op), 23);
  assertStrictEquals(SafeInteger.fromNumber(22, op), 22);
  assertStrictEquals(SafeInteger.fromNumber(21, op), 22);

  const op2 = { lowerLimit: -24, upperLimit: -22 } as const;
  assertStrictEquals(SafeInteger.fromNumber(-25, op2), -24);
  assertStrictEquals(SafeInteger.fromNumber(-24, op2), -24);
  assertStrictEquals(SafeInteger.fromNumber(-23, op2), -23);
  assertStrictEquals(SafeInteger.fromNumber(-22, op2), -22);
  assertStrictEquals(SafeInteger.fromNumber(-21, op2), -22);

  assertThrows(
    () => {
      const op3 = { lowerLimit: 22, upperLimit: -22 } as const;
      SafeInteger.fromNumber(-25, op3);
    },
    RangeError,
    "min, max",
  );

  const op4 = { lowerLimit: -2, upperLimit: 2 } as const;
  assertStrictEquals(SafeInteger.fromNumber(Number.MIN_VALUE, op4), 0);
  assertStrictEquals(SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op4), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.1, op4), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2, op4), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op4), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op4), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op4), 0);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op4), 1);
  assertStrictEquals(SafeInteger.fromNumber(2, op4), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.1, op4), 2);
  assertStrictEquals(SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op4), 2);
  assertStrictEquals(SafeInteger.fromNumber(Number.MAX_VALUE, op4), 2);
});

Deno.test("SafeInteger.fromNumber(number, {}) - strict", () => {
  const op = { strict: true } as const;
  assertStrictEquals(SafeInteger.fromNumber(34, op), 34);
  assertThrows(
    () => {
      SafeInteger.fromNumber(34.1, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NaN, op);
    },
    RangeError,
    "source",
  );

  const op2 = { strict: false } as const;
  assertStrictEquals(SafeInteger.fromNumber(34, op2), 34);
  assertStrictEquals(SafeInteger.fromNumber(34.1, op2), 34);
  assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op2), 0);
});

Deno.test("SafeInteger.fromBigInt(bigint)", () => {
  assertStrictEquals(SafeInteger.fromBigInt(0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(-0n), 0);

  assertStrictEquals(SafeInteger.fromBigInt(1n), 1);
  assertStrictEquals(SafeInteger.fromBigInt(2n), 2);
  assertStrictEquals(SafeInteger.fromBigInt(-1n), -1);
  assertStrictEquals(SafeInteger.fromBigInt(-2n), -2);

  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MAX_VALUE)),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
    Number.MAX_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.fromBigInt(undefined as unknown as bigint), 0);
});

Deno.test("SafeInteger.fromBigInt(bigint, {}) - strict", () => {
  const op = { strict: true } as const;
  assertStrictEquals(SafeInteger.fromBigInt(0n, op), 0);
  assertStrictEquals(SafeInteger.fromBigInt(-0n, op), 0);

  assertStrictEquals(SafeInteger.fromBigInt(1n, op), 1);
  assertStrictEquals(SafeInteger.fromBigInt(2n, op), 2);
  assertStrictEquals(SafeInteger.fromBigInt(-1n, op), -1);
  assertStrictEquals(SafeInteger.fromBigInt(-2n, op), -2);

  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER), op),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER), op),
    Number.MAX_SAFE_INTEGER,
  );
  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(Number.MAX_VALUE), op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromBigInt(undefined as unknown as bigint, op);
    },
    RangeError,
    "source",
  );
});

Deno.test("SafeInteger.fromString(string)", () => {
  assertStrictEquals(SafeInteger.fromString("1"), 1);
  assertStrictEquals(SafeInteger.fromString("+1"), 1);
  assertStrictEquals(SafeInteger.fromString("0"), 0);
  assertStrictEquals(SafeInteger.fromString("-0"), 0);
  assertStrictEquals(SafeInteger.fromString("-1"), -1);

  assertStrictEquals(SafeInteger.fromString(""), 0);
  assertStrictEquals(SafeInteger.fromString("1.0"), 1);
  assertStrictEquals(SafeInteger.fromString("1.9"), 1);

  assertStrictEquals(SafeInteger.fromString("001"), 1);
  assertStrictEquals(SafeInteger.fromString(" 001 "), 1);
  assertStrictEquals(SafeInteger.fromString("+001"), 1);
  assertStrictEquals(SafeInteger.fromString("-001"), -1);
  assertStrictEquals(SafeInteger.fromString(null as unknown as string), 0);

  assertThrows(
    () => {
      SafeInteger.fromString("-");
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString(".8");
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString("8.");
    },
    RangeError,
    "source",
  );
});

Deno.test("SafeInteger.fromString(any)", () => {
  assertThrows(
    () => {
      SafeInteger.fromString(1 as unknown as string);
    },
    TypeError,
    "source",
  );
});

Deno.test("SafeInteger.fromString(string, {}) - strict", () => {
  const op = { strict: true } as const;

  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("-1", op), -1);

  assertThrows(
    () => {
      SafeInteger.fromString("", op);
    },
    RangeError,
    "source",
  );
  assertStrictEquals(SafeInteger.fromString("1.0", op), 1);
  assertThrows(
    () => {
      SafeInteger.fromString("1.9", op);
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.fromString("001", op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString(" 001 ", op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString("+001", op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString("-001", op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString(null as unknown as string, op);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.fromString("-", op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString(".8", op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      SafeInteger.fromString("8.", op);
    },
    RangeError,
    "source",
  );
});

Deno.test("SafeInteger.toBigInt(number)", () => {
  assertStrictEquals(SafeInteger.toBigInt(1.0), 1n);
  assertStrictEquals(SafeInteger.toBigInt(1), 1n);
  assertStrictEquals(SafeInteger.toBigInt(0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(-0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(-1), -1n);

  assertThrows(
    () => {
      SafeInteger.toBigInt(1.1);
    },
    TypeError,
    "source",
  );
});

Deno.test("SafeInteger.toBigInt(any)", () => {
  assertThrows(
    () => {
      SafeInteger.toBigInt("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("SafeInteger.toString(number)", () => {
  assertStrictEquals(SafeInteger.toString(1.0), "1");
  assertStrictEquals(SafeInteger.toString(1), "1");
  assertStrictEquals(SafeInteger.toString(0), "0");
  assertStrictEquals(SafeInteger.toString(-0), "0");
  assertStrictEquals(SafeInteger.toString(-1), "-1");

  assertThrows(
    () => {
      SafeInteger.toString(1.1);
    },
    TypeError,
    "source",
  );
});

Deno.test("SafeInteger.toString(any)", () => {
  assertThrows(
    () => {
      SafeInteger.toString("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});
