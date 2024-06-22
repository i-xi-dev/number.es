import { assertStrictEquals, assertThrows } from "./deps.ts";
import { RoundingMode, SafeInteger } from "../mod.ts";

Deno.test("SafeInteger.isPositiveSafeInteger(number)", () => {
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(-1), false);
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(-0), false);
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(0), false);
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(1), true);
  assertStrictEquals(
    SafeInteger.isPositiveSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(1.1), false);
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(-1.1), false);
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isPositiveSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isPositiveSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isPositiveSafeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("SafeInteger.isPositiveSafeInteger(any)", () => {
  assertStrictEquals(SafeInteger.isPositiveSafeInteger("1"), false);
  assertStrictEquals(SafeInteger.isPositiveSafeInteger(true), false);
});

Deno.test("SafeInteger.isNonNegativeSafeInteger(number)", () => {
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(-1), false);
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(-0), true);
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(0), true);
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(1), true);
  assertStrictEquals(
    SafeInteger.isNonNegativeSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(1.1), false);
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(-1.1), false);
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonNegativeSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegativeSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegativeSafeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("SafeInteger.isNonNegativeSafeInteger(any)", () => {
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger("1"), false);
  assertStrictEquals(SafeInteger.isNonNegativeSafeInteger(true), false);
});

Deno.test("SafeInteger.isNonPositiveSafeInteger(number)", () => {
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(-1), true);
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(-0), true);
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(0), true);
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(1), false);
  assertStrictEquals(
    SafeInteger.isNonPositiveSafeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(1.1), false);
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(-1.1), false);
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonPositiveSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonPositiveSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonPositiveSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("SafeInteger.isNonPositiveSafeInteger(any)", () => {
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger("1"), false);
  assertStrictEquals(SafeInteger.isNonPositiveSafeInteger(true), false);
});

Deno.test("SafeInteger.isNegativeSafeInteger(number)", () => {
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(-1), true);
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(-0), false);
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(0), false);
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(1), false);
  assertStrictEquals(
    SafeInteger.isNegativeSafeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(1.1), false);
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(-1.1), false);
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNegativeSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNegativeSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNegativeSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("SafeInteger.isNegativeSafeInteger(any)", () => {
  assertStrictEquals(SafeInteger.isNegativeSafeInteger("1"), false);
  assertStrictEquals(SafeInteger.isNegativeSafeInteger(true), false);
});

Deno.test("SafeInteger.isOddSafeInteger(number)", () => {
  assertStrictEquals(SafeInteger.isOddSafeInteger(-1), true);
  assertStrictEquals(SafeInteger.isOddSafeInteger(-0), false);
  assertStrictEquals(SafeInteger.isOddSafeInteger(0), false);
  assertStrictEquals(SafeInteger.isOddSafeInteger(1), true);
  assertStrictEquals(
    SafeInteger.isOddSafeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(SafeInteger.isOddSafeInteger(1.1), false);
  assertStrictEquals(SafeInteger.isOddSafeInteger(-1.1), false);
  assertStrictEquals(SafeInteger.isOddSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isOddSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isOddSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isOddSafeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("SafeInteger.isOddSafeInteger(any)", () => {
  assertStrictEquals(SafeInteger.isOddSafeInteger("1"), false);
  assertStrictEquals(SafeInteger.isOddSafeInteger(true), false);
});

Deno.test("SafeInteger.isEvenSafeInteger(number)", () => {
  assertStrictEquals(SafeInteger.isEvenSafeInteger(-1), false);
  assertStrictEquals(SafeInteger.isEvenSafeInteger(-0), true);
  assertStrictEquals(SafeInteger.isEvenSafeInteger(0), true);
  assertStrictEquals(SafeInteger.isEvenSafeInteger(1), false);
  assertStrictEquals(
    SafeInteger.isEvenSafeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(SafeInteger.isEvenSafeInteger(1.1), false);
  assertStrictEquals(SafeInteger.isEvenSafeInteger(-1.1), false);
  assertStrictEquals(SafeInteger.isEvenSafeInteger(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isEvenSafeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isEvenSafeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    SafeInteger.isEvenSafeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("SafeInteger.isEvenSafeInteger(any)", () => {
  assertStrictEquals(SafeInteger.isEvenSafeInteger("1"), false);
  assertStrictEquals(SafeInteger.isEvenSafeInteger(true), false);
});

Deno.test("SafeInteger.roundToSafeInteger()", () => {
  assertThrows(
    () => {
      SafeInteger.roundToSafeInteger(undefined as unknown as number, Symbol());
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.roundToSafeInteger(Number.NaN, Symbol());
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, Symbol());
    },
    RangeError,
    "roundingMode",
  );

  assertThrows(
    () => {
      SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, Symbol());
    },
    RangeError,
    "roundingMode",
  );

  assertThrows(
    () => {
      SafeInteger.roundToSafeInteger(1, undefined as unknown as symbol);
    },
    TypeError,
    "roundingMode",
  );

  assertThrows(
    () => {
      SafeInteger.roundToSafeInteger(1, Symbol());
    },
    RangeError,
    "roundingMode",
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, UP)", () => {
  const op = RoundingMode.UP;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), 0);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -1);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999998,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, CEILING)", () => {
  const op = RoundingMode.CEILING;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), 0);
});

Deno.test("SafeInteger.roundToSafeInteger(number, DOWN)", () => {
  const op = RoundingMode.DOWN;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999998,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, FLOOR)", () => {
  const op = RoundingMode.FLOOR;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);
});

Deno.test("SafeInteger.roundToSafeInteger(number, TOWARD_ZERO)", () => {
  const op = RoundingMode.TOWARD_ZERO;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), 0);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -1);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999998,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999998,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, TRUNCATE)", () => {
  const op = RoundingMode.TRUNCATE;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), 0);
});

Deno.test("SafeInteger.roundToSafeInteger(number, AWAY_FROM_ZERO)", () => {
  const op = RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, HALF_UP)", () => {
  const op = RoundingMode.HALF_UP;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, HALF_DOWN)", () => {
  const op = RoundingMode.HALF_DOWN;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, HALF_TOWARD_ZERO)", () => {
  const op = RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, HALF_AWAY_FROM_ZERO)", () => {
  const op = RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999999,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

Deno.test("SafeInteger.roundToSafeInteger(number, ROUND)", () => {
  const op = RoundingMode.ROUND;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);
});

Deno.test("SafeInteger.roundToSafeInteger(number, HALF_TO_EVEN)", () => {
  const op = RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(SafeInteger.roundToSafeInteger(0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1, op), -1);

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MAX_SAFE_INTEGER, op),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(Number.MIN_SAFE_INTEGER, op),
    Number.MIN_SAFE_INTEGER,
  );

  assertStrictEquals(SafeInteger.roundToSafeInteger(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundToSafeInteger(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-1.9, op), -2);

  assertStrictEquals(SafeInteger.roundToSafeInteger(2.1, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(2.4, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(2.45, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(2.5, op), 2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(2.55, op), 3);
  assertStrictEquals(SafeInteger.roundToSafeInteger(2.6, op), 3);
  assertStrictEquals(SafeInteger.roundToSafeInteger(2.9, op), 3);

  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.1, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.4, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.45, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.5, op), -2);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.55, op), -3);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.6, op), -3);
  assertStrictEquals(SafeInteger.roundToSafeInteger(-2.9, op), -3);

  // 9007199254740991

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.4, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.5, op),
    999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(999999999999998.6, op),
    999999999999999,
  );

  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.4, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.5, op),
    -999999999999998,
  );
  assertStrictEquals(
    SafeInteger.roundToSafeInteger(-999999999999998.6, op),
    -999999999999999,
  );
});

// Deno.test("SafeInteger.fromNumber(number)", () => {
//   assertStrictEquals(SafeInteger.fromNumber(0), 0);
//   assertStrictEquals(SafeInteger.fromNumber(-0), 0);

//   assertStrictEquals(SafeInteger.fromNumber(0.1), 0);
//   assertStrictEquals(SafeInteger.fromNumber(0.4), 0);
//   assertStrictEquals(SafeInteger.fromNumber(0.5), 0);
//   assertStrictEquals(SafeInteger.fromNumber(0.6), 0);
//   assertStrictEquals(SafeInteger.fromNumber(0.9), 0);
//   assertStrictEquals(SafeInteger.fromNumber(1), 1);
//   assertStrictEquals(SafeInteger.fromNumber(1.1), 1);
//   assertStrictEquals(SafeInteger.fromNumber(1.4), 1);
//   assertStrictEquals(SafeInteger.fromNumber(1.5), 1);
//   assertStrictEquals(SafeInteger.fromNumber(1.6), 1);
//   assertStrictEquals(SafeInteger.fromNumber(1.9), 1);
//   assertStrictEquals(SafeInteger.fromNumber(2), 2);
//   assertStrictEquals(SafeInteger.fromNumber(2.1), 2);
//   assertStrictEquals(SafeInteger.fromNumber(2.4), 2);
//   assertStrictEquals(SafeInteger.fromNumber(2.5), 2);
//   assertStrictEquals(SafeInteger.fromNumber(2.6), 2);
//   assertStrictEquals(SafeInteger.fromNumber(2.9), 2);

//   assertStrictEquals(SafeInteger.fromNumber(-0.1), 0);
//   assertStrictEquals(SafeInteger.fromNumber(-0.4), 0);
//   assertStrictEquals(SafeInteger.fromNumber(-0.5), 0);
//   assertStrictEquals(SafeInteger.fromNumber(-0.6), 0);
//   assertStrictEquals(SafeInteger.fromNumber(-0.9), 0);
//   assertStrictEquals(SafeInteger.fromNumber(-1), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-1.1), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-1.4), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-1.5), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-1.6), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-1.9), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-2), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2.1), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2.4), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2.5), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2.6), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2.9), -2);

//   assertStrictEquals(SafeInteger.fromNumber(9876543210.5), 9876543210);
//   assertStrictEquals(SafeInteger.fromNumber(-9876543210.5), -9876543210);

//   assertStrictEquals(SafeInteger.fromNumber(undefined as unknown as number), 0);
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN), 0);
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MAX_VALUE),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.POSITIVE_INFINITY),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.NEGATIVE_INFINITY),
//     Number.MIN_SAFE_INTEGER,
//   );
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - strict", () => {
//   const op = { strict: true } as const;
//   assertStrictEquals(SafeInteger.fromNumber(34, op), 34);
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(34.1, op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(Number.NaN, op);
//     },
//     RangeError,
//     "source",
//   );

//   const op2 = { strict: false } as const;
//   assertStrictEquals(SafeInteger.fromNumber(34, op2), 34);
//   assertStrictEquals(SafeInteger.fromNumber(34.1, op2), 34);
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op2), 0);
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - fallback,strict", () => {
//   const op = { fallback: 34, strict: true } as const;
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(Number.NaN, op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(undefined as unknown as number, op);
//     },
//     TypeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(Number.MAX_VALUE, op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op);
//     },
//     RangeError,
//     "source",
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op);
//     },
//     RangeError,
//     "source",
//   );

//   const op2 = { fallback: 3.5, strict: true } as const;
//   assertThrows(
//     () => {
//       SafeInteger.fromNumber(Number.NaN, op2);
//     },
//     RangeError,
//     "source",
//   );
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - fallback", () => {
//   const op = { fallback: 34 } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op), 34);
//   assertStrictEquals(
//     SafeInteger.fromNumber(undefined as unknown as number, op),
//     34,
//   );

//   const op2 = { fallback: 3.5 } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op2), 3);
//   const op3 = { fallback: Number.POSITIVE_INFINITY } as const;
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.NaN, op3),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op3),
//     Number.MIN_SAFE_INTEGER,
//   );
//   const op4 = { fallback: Number.NEGATIVE_INFINITY } as const;
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.NaN, op4),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op4),
//     Number.MAX_SAFE_INTEGER,
//   );
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - fallback:undefined", () => {
//   const op = { fallback: undefined } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op), 0);
//   assertStrictEquals(
//     SafeInteger.fromNumber(undefined as unknown as number, op),
//     0,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MAX_VALUE, op),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op),
//     Number.MIN_SAFE_INTEGER,
//   );
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - clampRange.min", () => {
//   const op = {
//     clampRange: [21, Number.POSITIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(22, op), 22);
//   assertStrictEquals(SafeInteger.fromNumber(21, op), 21);
//   assertStrictEquals(SafeInteger.fromNumber(20, op), 21);

//   const op2 = {
//     clampRange: [-21, Number.POSITIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-22, op2), -21);
//   assertStrictEquals(SafeInteger.fromNumber(-21, op2), -21);
//   assertStrictEquals(SafeInteger.fromNumber(-20, op2), -20);

//   const op3 = {
//     clampRange: [21, Number.POSITIVE_INFINITY] as [number, number],
//     fallback: 3,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op3), 21);

//   const op3b = {
//     clampRange: [-21, Number.POSITIVE_INFINITY] as [number, number],
//     fallback: 3,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op3b), 3);

//   const op4 = {
//     clampRange: [-21, Number.POSITIVE_INFINITY] as [number, number],
//     fallback: -200,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op4), -21);

//   const op4b = {
//     clampRange: [21, Number.POSITIVE_INFINITY] as [number, number],
//     fallback: -200,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op4b), 21);

//   assertThrows(
//     () => {
//       const op5 = {
//         clampRange: [Number.NaN, Number.POSITIVE_INFINITY] as [number, number],
//       } as const;
//       SafeInteger.fromNumber(-25, op5);
//     },
//     RangeError,
//     "range[0]",
//   );

//   const op6 = {
//     clampRange: [1.5, Number.POSITIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25, op6), 2);
//   assertStrictEquals(SafeInteger.fromNumber(25, op6), 25);

//   const op7 = {
//     clampRange: [-1.5, Number.POSITIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25, op7), -1);
//   assertStrictEquals(SafeInteger.fromNumber(25, op7), 25);

//   assertThrows(
//     () => {
//       const op5 = {
//         clampRange: ["" as unknown as number, Number.POSITIVE_INFINITY] as [
//           number,
//           number,
//         ],
//       } as const;
//       SafeInteger.fromNumber(-25, op5);
//     },
//     TypeError,
//     "range[0]",
//   );
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - clampRange.max", () => {
//   const op = {
//     clampRange: [21, Number.NEGATIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(22, op), 21);
//   assertStrictEquals(SafeInteger.fromNumber(21, op), 21);
//   assertStrictEquals(SafeInteger.fromNumber(20, op), 20);

//   const op2 = {
//     clampRange: [-21, Number.NEGATIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-22, op2), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-21, op2), -21);
//   assertStrictEquals(SafeInteger.fromNumber(-20, op2), -21);

//   const op3 = {
//     clampRange: [21, Number.NEGATIVE_INFINITY] as [number, number],
//     fallback: 3,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op3), 3);

//   const op3b = {
//     clampRange: [Number.NEGATIVE_INFINITY, -21] as [number, number],
//     fallback: 3,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op3b), -21);

//   const op4 = {
//     clampRange: [-21, Number.NEGATIVE_INFINITY] as [number, number],
//     fallback: -200,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op4), -200);

//   const op4b = {
//     clampRange: [21, Number.NEGATIVE_INFINITY] as [number, number],
//     fallback: -200,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.NaN, op4b), -200);

//   assertThrows(
//     () => {
//       const op5 = {
//         clampRange: [Number.NEGATIVE_INFINITY, Number.NaN] as [number, number],
//       } as const;
//       SafeInteger.fromNumber(-25, op5);
//     },
//     RangeError,
//     "range[1]",
//   );

//   const op6 = {
//     clampRange: [1.5, Number.NEGATIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25, op6), -25);
//   assertStrictEquals(SafeInteger.fromNumber(25, op6), 1);

//   const op7 = {
//     clampRange: [-1.5, Number.NEGATIVE_INFINITY] as [number, number],
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25, op7), -25);
//   assertStrictEquals(SafeInteger.fromNumber(25, op7), -2);

//   assertThrows(
//     () => {
//       const op5 = {
//         clampRange: [Number.NEGATIVE_INFINITY, "" as unknown as number] as [
//           number,
//           number,
//         ],
//       } as const;
//       SafeInteger.fromNumber(-25, op5);
//     },
//     TypeError,
//     "range[1]",
//   );
// });

// Deno.test("SafeInteger.fromNumber(number, {}) - clampRange", () => {
//   const op = { clampRange: [22, 24] as [number, number] } as const;
//   assertStrictEquals(SafeInteger.fromNumber(25, op), 24);
//   assertStrictEquals(SafeInteger.fromNumber(24.5, op), 24);
//   assertStrictEquals(SafeInteger.fromNumber(24, op), 24);
//   assertStrictEquals(SafeInteger.fromNumber(23, op), 23);
//   assertStrictEquals(SafeInteger.fromNumber(22, op), 22);
//   assertStrictEquals(SafeInteger.fromNumber(21.5, op), 22);
//   assertStrictEquals(SafeInteger.fromNumber(21, op), 22);

//   const opb = { clampRange: [21.5, 24.5] as [number, number] } as const;
//   assertStrictEquals(SafeInteger.fromNumber(25, opb), 24);
//   assertStrictEquals(SafeInteger.fromNumber(24.5, opb), 24);
//   assertStrictEquals(SafeInteger.fromNumber(24, opb), 24);
//   assertStrictEquals(SafeInteger.fromNumber(23, opb), 23);
//   assertStrictEquals(SafeInteger.fromNumber(22, opb), 22);
//   assertStrictEquals(SafeInteger.fromNumber(21.5, opb), 22);
//   assertStrictEquals(SafeInteger.fromNumber(21, opb), 22);
//   const opc = {
//     clampRange: [21.5, 24.5] as [number, number],
//     roundingMode: RoundingMode.CEILING,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(25.5, opc), 24);
//   assertStrictEquals(SafeInteger.fromNumber(24.5, opc), 24);
//   assertStrictEquals(SafeInteger.fromNumber(23.5, opc), 24);
//   assertStrictEquals(SafeInteger.fromNumber(22.5, opc), 23);
//   assertStrictEquals(SafeInteger.fromNumber(21.5, opc), 22);
//   assertStrictEquals(SafeInteger.fromNumber(20.5, opc), 22);
//   const opd = {
//     clampRange: [21.5, 24.5] as [number, number],
//     roundingMode: RoundingMode.FLOOR,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(25.5, opd), 24);
//   assertStrictEquals(SafeInteger.fromNumber(24.5, opd), 24);
//   assertStrictEquals(SafeInteger.fromNumber(23.5, opd), 23);
//   assertStrictEquals(SafeInteger.fromNumber(22.5, opd), 22);
//   assertStrictEquals(SafeInteger.fromNumber(21.5, opd), 22);
//   assertStrictEquals(SafeInteger.fromNumber(20.5, opd), 22);

//   const op2 = { clampRange: [-24, -22] as [number, number] } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25, op2), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-24.5, op2), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-24, op2), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-23, op2), -23);
//   assertStrictEquals(SafeInteger.fromNumber(-22, op2), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-21.5, op2), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-21, op2), -22);

//   const op2b = { clampRange: [-24.5, -21.5] as [number, number] } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25, op2b), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-24.5, op2b), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-24, op2b), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-23, op2b), -23);
//   assertStrictEquals(SafeInteger.fromNumber(-22, op2b), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-21.5, op2b), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-21, op2b), -22);
//   const op2c = {
//     clampRange: [-24.5, -21.5] as [number, number],
//     roundingMode: RoundingMode.CEILING,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25.5, op2c), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-24.5, op2c), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-23.5, op2c), -23);
//   assertStrictEquals(SafeInteger.fromNumber(-22.5, op2c), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-21.5, op2c), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-20.5, op2c), -22);
//   const op2d = {
//     clampRange: [-24.5, -21.5] as [number, number],
//     roundingMode: RoundingMode.FLOOR,
//   } as const;
//   assertStrictEquals(SafeInteger.fromNumber(-25.5, op2d), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-24.5, op2d), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-23.5, op2d), -24);
//   assertStrictEquals(SafeInteger.fromNumber(-22.5, op2d), -23);
//   assertStrictEquals(SafeInteger.fromNumber(-21.5, op2d), -22);
//   assertStrictEquals(SafeInteger.fromNumber(-20.5, op2d), -22);

//   const op4 = { clampRange: [-2, 2] as [number, number] } as const;
//   assertStrictEquals(SafeInteger.fromNumber(Number.MIN_VALUE, op4), 0);
//   assertStrictEquals(SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER, op4), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2.1, op4), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-2, op4), -2);
//   assertStrictEquals(SafeInteger.fromNumber(-1.9, op4), -1);
//   assertStrictEquals(SafeInteger.fromNumber(-0, op4), 0);
//   assertStrictEquals(SafeInteger.fromNumber(0, op4), 0);
//   assertStrictEquals(SafeInteger.fromNumber(1.9, op4), 1);
//   assertStrictEquals(SafeInteger.fromNumber(2, op4), 2);
//   assertStrictEquals(SafeInteger.fromNumber(2.1, op4), 2);
//   assertStrictEquals(SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER, op4), 2);
//   assertStrictEquals(SafeInteger.fromNumber(Number.MAX_VALUE, op4), 2);
// });

// Deno.test("SafeInteger.fromBigInt(bigint)", () => {
//   assertStrictEquals(SafeInteger.fromBigInt(0n), 0);
//   assertStrictEquals(SafeInteger.fromBigInt(-0n), 0);

//   assertStrictEquals(SafeInteger.fromBigInt(1n), 1);
//   assertStrictEquals(SafeInteger.fromBigInt(2n), 2);
//   assertStrictEquals(SafeInteger.fromBigInt(-1n), -1);
//   assertStrictEquals(SafeInteger.fromBigInt(-2n), -2);

//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MAX_VALUE)),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n),
//     Number.MAX_SAFE_INTEGER,
//   );

//   assertStrictEquals(SafeInteger.fromBigInt(undefined as unknown as bigint), 0);
// });

// Deno.test("SafeInteger.fromBigInt(bigint, {}) - strict", () => {
//   const op = { strict: true } as const;
//   assertStrictEquals(SafeInteger.fromBigInt(0n, op), 0);
//   assertStrictEquals(SafeInteger.fromBigInt(-0n, op), 0);

//   assertStrictEquals(SafeInteger.fromBigInt(1n, op), 1);
//   assertStrictEquals(SafeInteger.fromBigInt(2n, op), 2);
//   assertStrictEquals(SafeInteger.fromBigInt(-1n, op), -1);
//   assertStrictEquals(SafeInteger.fromBigInt(-2n, op), -2);

//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER), op),
//     Number.MIN_SAFE_INTEGER,
//   );
//   assertStrictEquals(
//     SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER), op),
//     Number.MAX_SAFE_INTEGER,
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromBigInt(BigInt(Number.MAX_VALUE), op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n, op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n, op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromBigInt(undefined as unknown as bigint, op);
//     },
//     RangeError,
//     "source",
//   );
// });

// Deno.test("SafeInteger.fromString(string)", () => {
//   assertStrictEquals(SafeInteger.fromString("1"), 1);
//   assertStrictEquals(SafeInteger.fromString("+1"), 1);
//   assertStrictEquals(SafeInteger.fromString("0"), 0);
//   assertStrictEquals(SafeInteger.fromString("-0"), 0);
//   assertStrictEquals(SafeInteger.fromString("-1"), -1);

//   assertStrictEquals(SafeInteger.fromString(""), 0);
//   assertStrictEquals(SafeInteger.fromString("1.0"), 1);
//   assertStrictEquals(SafeInteger.fromString("1.9"), 1);

//   assertStrictEquals(SafeInteger.fromString("001"), 1);
//   assertStrictEquals(SafeInteger.fromString(" 001 "), 1);
//   assertStrictEquals(SafeInteger.fromString("+001"), 1);
//   assertStrictEquals(SafeInteger.fromString("-001"), -1);
//   assertStrictEquals(SafeInteger.fromString(null as unknown as string), 0);

//   assertThrows(
//     () => {
//       SafeInteger.fromString("-");
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString(".8");
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString("8.");
//     },
//     RangeError,
//     "source",
//   );
// });

// Deno.test("SafeInteger.fromString(any)", () => {
//   assertThrows(
//     () => {
//       SafeInteger.fromString(1 as unknown as string);
//     },
//     TypeError,
//     "source",
//   );
// });

// Deno.test("SafeInteger.fromString(string, {}) - strict", () => {
//   const op = { strict: true } as const;

//   assertStrictEquals(SafeInteger.fromString("1", op), 1);
//   assertStrictEquals(SafeInteger.fromString("+1", op), 1);
//   assertStrictEquals(SafeInteger.fromString("0", op), 0);
//   assertStrictEquals(SafeInteger.fromString("-0", op), 0);
//   assertStrictEquals(SafeInteger.fromString("-1", op), -1);

//   assertThrows(
//     () => {
//       SafeInteger.fromString("", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertStrictEquals(SafeInteger.fromString("1.0", op), 1);
//   assertThrows(
//     () => {
//       SafeInteger.fromString("1.9", op);
//     },
//     RangeError,
//     "source",
//   );

//   assertThrows(
//     () => {
//       SafeInteger.fromString("001", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString(" 001 ", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString("+001", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString("-001", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString(null as unknown as string, op);
//     },
//     TypeError,
//     "source",
//   );

//   assertThrows(
//     () => {
//       SafeInteger.fromString("-", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString(".8", op);
//     },
//     RangeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       SafeInteger.fromString("8.", op);
//     },
//     RangeError,
//     "source",
//   );
// });

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
