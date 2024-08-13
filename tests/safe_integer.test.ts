import { assertStrictEquals, assertThrows } from "./deps.ts";
import { RoundingMode, SafeInteger } from "../mod.ts";

Deno.test("SafeInteger.isOdd(number)", () => {
  assertStrictEquals(SafeInteger.isOdd(0), false);
  assertStrictEquals(SafeInteger.isOdd(-0), false);
  assertStrictEquals(SafeInteger.isOdd(1), true);
  assertStrictEquals(SafeInteger.isOdd(-1), true);
  assertStrictEquals(SafeInteger.isOdd(2), false);
  assertStrictEquals(SafeInteger.isOdd(-2), false);
  assertStrictEquals(SafeInteger.isOdd(3), true);
  assertStrictEquals(SafeInteger.isOdd(-3), true);

  assertStrictEquals(SafeInteger.isOdd(-10.1), false);
  assertStrictEquals(SafeInteger.isOdd(-9.9), false);
  assertStrictEquals(SafeInteger.isOdd(9.9), false);
  assertStrictEquals(SafeInteger.isOdd(10.1), false);

  assertStrictEquals(SafeInteger.isOdd(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(SafeInteger.isOdd(1.1), false);
  assertStrictEquals(SafeInteger.isOdd(-1.1), false);
  assertStrictEquals(SafeInteger.isOdd(Number.NaN), false);
  assertStrictEquals(SafeInteger.isOdd(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isOdd(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isOdd(Number.MIN_SAFE_INTEGER), true);

  assertStrictEquals(SafeInteger.isOdd(undefined as unknown as number), false);
  assertStrictEquals(SafeInteger.isOdd(null as unknown as number), false);
  assertStrictEquals(SafeInteger.isOdd(true as unknown as number), false);
  assertStrictEquals(SafeInteger.isOdd(false as unknown as number), false);
  assertStrictEquals(SafeInteger.isOdd(0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isOdd("" as unknown as number), false);
  assertStrictEquals(SafeInteger.isOdd("0" as unknown as number), false);
});

Deno.test("SafeInteger.isEven(number)", () => {
  assertStrictEquals(SafeInteger.isEven(0), true);
  assertStrictEquals(SafeInteger.isEven(-0), true);
  assertStrictEquals(SafeInteger.isEven(1), false);
  assertStrictEquals(SafeInteger.isEven(-1), false);
  assertStrictEquals(SafeInteger.isEven(2), true);
  assertStrictEquals(SafeInteger.isEven(-2), true);
  assertStrictEquals(SafeInteger.isEven(3), false);
  assertStrictEquals(SafeInteger.isEven(-3), false);

  assertStrictEquals(SafeInteger.isEven(-10.1), false);
  assertStrictEquals(SafeInteger.isEven(-9.9), false);
  assertStrictEquals(SafeInteger.isEven(9.9), false);
  assertStrictEquals(SafeInteger.isEven(10.1), false);

  assertStrictEquals(SafeInteger.isEven(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(SafeInteger.isEven(1.1), false);
  assertStrictEquals(SafeInteger.isEven(-1.1), false);
  assertStrictEquals(SafeInteger.isEven(Number.NaN), false);
  assertStrictEquals(SafeInteger.isEven(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isEven(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isEven(Number.MIN_SAFE_INTEGER), false);

  assertStrictEquals(SafeInteger.isEven(undefined as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(null as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(true as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(false as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven("" as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven("0" as unknown as number), false);
});

const rfe1 = "`source` must be a finite number.";
const rfe2 = "`source` must be less than or equal to Int32 maximum value.";
const rfe3 = "`source` must be greater than or equal to int32 minimum value.";
const rfe4 = "`roundingMode` must be a `RoundingMode`.";

const inMax = 2_147_483_647;
const inMin = -2_147_483_648;

Deno.test("SafeInteger.roundFrom()", () => {
  assertThrows(
    () => {
      SafeInteger.roundFrom(undefined as unknown as number, Symbol());
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(Number.NaN, Symbol());
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(Number.POSITIVE_INFINITY, Symbol());
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(Number.NEGATIVE_INFINITY, Symbol());
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(Number.MAX_SAFE_INTEGER, Symbol());
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(Number.MIN_SAFE_INTEGER, Symbol());
    },
    RangeError,
    rfe3,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(inMax + 1, Symbol());
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(inMin - 1, Symbol());
    },
    RangeError,
    rfe3,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(1, undefined as unknown as symbol);
    },
    TypeError,
    rfe4,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(inMax, Symbol());
    },
    TypeError,
    rfe4,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(inMin, Symbol());
    },
    TypeError,
    rfe4,
  );

  assertThrows(
    () => {
      SafeInteger.roundFrom(1, Symbol());
    },
    TypeError,
    rfe4,
  );
});

Deno.test("SafeInteger.roundFrom(number, UP)", () => {
  const op = RoundingMode.UP;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), 0);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -1);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_647,
  );
});

Deno.test("SafeInteger.roundFrom(number, CEILING)", () => {
  const op = RoundingMode.CEILING;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), 0);
});

Deno.test("SafeInteger.roundFrom(number, DOWN)", () => {
  const op = RoundingMode.DOWN;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_646,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.roundFrom(number, FLOOR)", () => {
  const op = RoundingMode.FLOOR;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);
});

Deno.test("SafeInteger.roundFrom(number, TOWARD_ZERO)", () => {
  const op = RoundingMode.TOWARD_ZERO;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), 0);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -1);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_646,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_647,
  );
});

Deno.test("SafeInteger.roundFrom(number, TRUNCATE)", () => {
  const op = RoundingMode.TRUNCATE;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 0);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), 0);
});

Deno.test("SafeInteger.roundFrom(number, AWAY_FROM_ZERO)", () => {
  const op = RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.roundFrom(number, HALF_UP)", () => {
  const op = RoundingMode.HALF_UP;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.roundFrom(number, HALF_DOWN)", () => {
  const op = RoundingMode.HALF_DOWN;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.roundFrom(number, HALF_TOWARD_ZERO)", () => {
  const op = RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.roundFrom(number, HALF_AWAY_FROM_ZERO)", () => {
  const op = RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.roundFrom(number, ROUND)", () => {
  const op = RoundingMode.ROUND;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);
});

Deno.test("SafeInteger.roundFrom(number, HALF_TO_EVEN)", () => {
  const op = RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(SafeInteger.roundFrom(0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(-1, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(inMax, op), inMax);
  assertStrictEquals(SafeInteger.roundFrom(inMin, op), inMin);

  assertStrictEquals(SafeInteger.roundFrom(0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(0.55, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.6, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(0.9, op), 1);

  assertStrictEquals(SafeInteger.roundFrom(-0.1, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.4, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.45, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.5, op), 0);
  assertStrictEquals(SafeInteger.roundFrom(-0.55, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.6, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-0.9, op), -1);

  assertStrictEquals(SafeInteger.roundFrom(1.1, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.4, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.45, op), 1);
  assertStrictEquals(SafeInteger.roundFrom(1.5, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.55, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.6, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(1.9, op), 2);

  assertStrictEquals(SafeInteger.roundFrom(-1.1, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.4, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.45, op), -1);
  assertStrictEquals(SafeInteger.roundFrom(-1.5, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.55, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.6, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-1.9, op), -2);

  assertStrictEquals(SafeInteger.roundFrom(2.1, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(2.4, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(2.45, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(2.5, op), 2);
  assertStrictEquals(SafeInteger.roundFrom(2.55, op), 3);
  assertStrictEquals(SafeInteger.roundFrom(2.6, op), 3);
  assertStrictEquals(SafeInteger.roundFrom(2.9, op), 3);

  assertStrictEquals(SafeInteger.roundFrom(-2.1, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-2.4, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-2.45, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-2.5, op), -2);
  assertStrictEquals(SafeInteger.roundFrom(-2.55, op), -3);
  assertStrictEquals(SafeInteger.roundFrom(-2.6, op), -3);
  assertStrictEquals(SafeInteger.roundFrom(-2.9, op), -3);

  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.roundFrom(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

//TODO fromString

//TODO toString
