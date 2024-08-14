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

Deno.test("SafeInteger.fromNumber()", () => {
  assertThrows(
    () => {
      SafeInteger.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.MAX_SAFE_INTEGER);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.MIN_SAFE_INTEGER);
    },
    RangeError,
    rfe3,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(inMax + 1);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(inMin - 1);
    },
    RangeError,
    rfe3,
  );

  // assertThrows(
  //   () => {
  //     SafeInteger.fromNumber(
  //       1,
  //       false as unknown as { roundingMode: RoundingMode },
  //     );
  //   },
  //   TypeError,
  //   rfe4,
  // );
  assertStrictEquals(
    SafeInteger.fromNumber(
      0,
      false as unknown as { roundingMode: RoundingMode },
    ),
    0,
  );

  // assertThrows(
  //   () => {
  //     SafeInteger.fromNumber(
  //       inMax,
  //       Symbol() as unknown as { roundingMode: RoundingMode },
  //     );
  //   },
  //   TypeError,
  //   rfe4,
  // );

  assertThrows(
    () => {
      SafeInteger.fromNumber(inMin, { roundingMode: Symbol() });
    },
    TypeError,
    rfe4,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(1, {
        roundingMode: false as unknown as RoundingMode,
      });
    },
    TypeError,
    rfe4,
  );
});

Deno.test("SafeInteger.fromNumber(number, UP)", () => {
  const op = { roundingMode: RoundingMode.UP };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -1);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_647,
  );
});

Deno.test("SafeInteger.fromNumber(number, CEILING)", () => {
  const op = { roundingMode: RoundingMode.CEILING };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);
});

Deno.test("SafeInteger.fromNumber(number, DOWN)", () => {
  const op = { roundingMode: RoundingMode.DOWN };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_646,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.fromNumber(number, FLOOR)", () => {
  const op = { roundingMode: RoundingMode.FLOOR };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
});

Deno.test("SafeInteger.fromNumber(number, TOWARD_ZERO)", () => {
  const op = { roundingMode: RoundingMode.TOWARD_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -1);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_646,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_647,
  );
});

Deno.test("SafeInteger.fromNumber(number, TRUNCATE)", () => {
  const op = { roundingMode: RoundingMode.TRUNCATE };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);
});

Deno.test("SafeInteger.fromNumber(number, TRUNCATE)", () => {
  const op = {};

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);
});

Deno.test("SafeInteger.fromNumber(number, TRUNCATE)", () => {
  assertStrictEquals(SafeInteger.fromNumber(0), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0), 0);
  assertStrictEquals(SafeInteger.fromNumber(1), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9), 0);

  assertStrictEquals(SafeInteger.fromNumber(-0.1), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.9), 0);
});

Deno.test("SafeInteger.fromNumber(number, AWAY_FROM_ZERO)", () => {
  const op = { roundingMode: RoundingMode.AWAY_FROM_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.fromNumber(number, HALF_UP)", () => {
  const op = { roundingMode: RoundingMode.HALF_UP };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.fromNumber(number, HALF_DOWN)", () => {
  const op = { roundingMode: RoundingMode.HALF_DOWN };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.fromNumber(number, HALF_TOWARD_ZERO)", () => {
  const op = { roundingMode: RoundingMode.HALF_TOWARD_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.fromNumber(number, HALF_AWAY_FROM_ZERO)", () => {
  const op = { roundingMode: RoundingMode.HALF_AWAY_FROM_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

Deno.test("SafeInteger.fromNumber(number, ROUND)", () => {
  const op = { roundingMode: RoundingMode.ROUND };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
});

Deno.test("SafeInteger.fromNumber(number, HALF_TO_EVEN)", () => {
  const op = { roundingMode: RoundingMode.HALF_TO_EVEN };

  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(inMax, op), inMax);
  assertStrictEquals(SafeInteger.fromNumber(inMin, op), inMin);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);

  assertStrictEquals(SafeInteger.fromNumber(2.1, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.4, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.45, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(2.55, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(2.6, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(2.9, op), 3);

  assertStrictEquals(SafeInteger.fromNumber(-2.1, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.4, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.45, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-2.55, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.6, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.9, op), -3);

  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.4, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.5, op),
    2_147_483_646,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(2_147_483_646.6, op),
    2_147_483_647,
  );

  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.4, op),
    -2_147_483_647,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.5, op),
    -2_147_483_648,
  );
  assertStrictEquals(
    SafeInteger.fromNumber(-2_147_483_647.6, op),
    -2_147_483_648,
  );
});

const fse0 = "`source` must be a string.";
const fse1 = "`source` must be a decimal representation of a number.";

Deno.test("SafeInteger.fromString(string)", () => {
  assertStrictEquals(SafeInteger.fromString("1"), 1);
  assertStrictEquals(SafeInteger.fromString("+1"), 1);
  assertStrictEquals(SafeInteger.fromString("0"), 0);
  assertStrictEquals(SafeInteger.fromString("-0"), 0);
  assertStrictEquals(SafeInteger.fromString("-1"), -1);

  assertStrictEquals(SafeInteger.fromString("1.0"), 1);
  assertStrictEquals(SafeInteger.fromString("1.9"), 1);

  assertStrictEquals(SafeInteger.fromString("001"), 1);
  // assertStrictEquals(SafeInteger.fromString(" 001 "), 1); //TODO optionsにtrim追加する？
  assertStrictEquals(SafeInteger.fromString("+001"), 1);
  assertStrictEquals(SafeInteger.fromString("-001"), -1);

  assertThrows(
    () => {
      SafeInteger.fromString(null as unknown as string);
    },
    TypeError,
    fse0,
  );
  assertThrows(
    () => {
      SafeInteger.fromString(1 as unknown as string);
    },
    TypeError,
    fse0,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("");
    },
    RangeError,
    fse1,
  );
  assertThrows(
    () => {
      SafeInteger.fromString("-");
    },
    RangeError,
    fse1,
  );
  assertThrows(
    () => {
      SafeInteger.fromString(".8"); //TODO okにすべき？
    },
    RangeError,
    fse1,
  );
  assertThrows(
    () => {
      SafeInteger.fromString("8.");
    },
    RangeError,
    fse1,
  );
});

//TODO toString
