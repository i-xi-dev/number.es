import { assertStrictEquals, assertThrows } from "./deps.ts";
import {
  clampNumber,
  inRange,
  isEvenInteger,
  isNegativeNumber,
  isNonNegativeNumber,
  isNonPositiveNumber,
  isNumber,
  isOddInteger,
  isPositiveNumber,
  normalizeNumber,
  ZERO,
} from "../mod.ts";

Deno.test("ZERO", () => {
  assertStrictEquals(ZERO, 0);
});

Deno.test("isNumber()", () => {
  assertStrictEquals(isNumber(0), true);
  assertStrictEquals(isNumber(-0), true);
  assertStrictEquals(isNumber(1), true);
  assertStrictEquals(isNumber(-1), true);

  assertStrictEquals(isNumber(-10.1), true);
  assertStrictEquals(isNumber(-9.9), true);
  assertStrictEquals(isNumber(9.9), true);
  assertStrictEquals(isNumber(10.1), true);

  assertStrictEquals(isNumber(Number.NaN), true);
  assertStrictEquals(isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNumber(undefined), false);
  assertStrictEquals(isNumber(null), false);
  assertStrictEquals(isNumber(0n), false);
  assertStrictEquals(isNumber(""), false);
  assertStrictEquals(isNumber("0"), false);
});

Deno.test("isPositiveNumber()", () => {
  assertStrictEquals(isPositiveNumber(0), false);
  assertStrictEquals(isPositiveNumber(-0), false);
  assertStrictEquals(isPositiveNumber(1), true);
  assertStrictEquals(isPositiveNumber(-1), false);

  assertStrictEquals(isPositiveNumber(-10.1), false);
  assertStrictEquals(isPositiveNumber(-9.9), false);
  assertStrictEquals(isPositiveNumber(9.9), true);
  assertStrictEquals(isPositiveNumber(10.1), true);

  assertStrictEquals(isPositiveNumber(Number.NaN), false);
  assertStrictEquals(isPositiveNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isPositiveNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isPositiveNumber(undefined), false);
  assertStrictEquals(isPositiveNumber(null), false);
  assertStrictEquals(isPositiveNumber(0n), false);
  assertStrictEquals(isPositiveNumber(""), false);
  assertStrictEquals(isPositiveNumber("0"), false);
});

Deno.test("isNonNegativeNumber()", () => {
  assertStrictEquals(isNonNegativeNumber(0), true);
  assertStrictEquals(isNonNegativeNumber(-0), true);
  assertStrictEquals(isNonNegativeNumber(1), true);
  assertStrictEquals(isNonNegativeNumber(-1), false);

  assertStrictEquals(isNonNegativeNumber(-10.1), false);
  assertStrictEquals(isNonNegativeNumber(-9.9), false);
  assertStrictEquals(isNonNegativeNumber(9.9), true);
  assertStrictEquals(isNonNegativeNumber(10.1), true);

  assertStrictEquals(isNonNegativeNumber(Number.NaN), false);
  assertStrictEquals(isNonNegativeNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNonNegativeNumber(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonNegativeNumber(undefined), false);
  assertStrictEquals(isNonNegativeNumber(null), false);
  assertStrictEquals(isNonNegativeNumber(0n), false);
  assertStrictEquals(isNonNegativeNumber(""), false);
  assertStrictEquals(isNonNegativeNumber("0"), false);
});

Deno.test("isNonPositiveNumber()", () => {
  assertStrictEquals(isNonPositiveNumber(0), true);
  assertStrictEquals(isNonPositiveNumber(-0), true);
  assertStrictEquals(isNonPositiveNumber(1), false);
  assertStrictEquals(isNonPositiveNumber(-1), true);

  assertStrictEquals(isNonPositiveNumber(-10.1), true);
  assertStrictEquals(isNonPositiveNumber(-9.9), true);
  assertStrictEquals(isNonPositiveNumber(9.9), false);
  assertStrictEquals(isNonPositiveNumber(10.1), false);

  assertStrictEquals(isNonPositiveNumber(Number.NaN), false);
  assertStrictEquals(isNonPositiveNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonPositiveNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNonPositiveNumber(undefined), false);
  assertStrictEquals(isNonPositiveNumber(null), false);
  assertStrictEquals(isNonPositiveNumber(0n), false);
  assertStrictEquals(isNonPositiveNumber(""), false);
  assertStrictEquals(isNonPositiveNumber("0"), false);
});

Deno.test("isNegativeNumber()", () => {
  assertStrictEquals(isNegativeNumber(0), false);
  assertStrictEquals(isNegativeNumber(-0), false);
  assertStrictEquals(isNegativeNumber(1), false);
  assertStrictEquals(isNegativeNumber(-1), true);

  assertStrictEquals(isNegativeNumber(-10.1), true);
  assertStrictEquals(isNegativeNumber(-9.9), true);
  assertStrictEquals(isNegativeNumber(9.9), false);
  assertStrictEquals(isNegativeNumber(10.1), false);

  assertStrictEquals(isNegativeNumber(Number.NaN), false);
  assertStrictEquals(isNegativeNumber(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNegativeNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNegativeNumber(undefined), false);
  assertStrictEquals(isNegativeNumber(null), false);
  assertStrictEquals(isNegativeNumber(0n), false);
  assertStrictEquals(isNegativeNumber(""), false);
  assertStrictEquals(isNegativeNumber("0"), false);
});

Deno.test("isOddInteger()", () => {
  assertStrictEquals(isOddInteger(0), false);
  assertStrictEquals(isOddInteger(-0), false);
  assertStrictEquals(isOddInteger(1), true);
  assertStrictEquals(isOddInteger(-1), true);
  assertStrictEquals(isOddInteger(2), false);
  assertStrictEquals(isOddInteger(-2), false);
  assertStrictEquals(isOddInteger(3), true);
  assertStrictEquals(isOddInteger(-3), true);

  assertStrictEquals(isOddInteger(-10.1), false);
  assertStrictEquals(isOddInteger(-9.9), false);
  assertStrictEquals(isOddInteger(9.9), false);
  assertStrictEquals(isOddInteger(10.1), false);

  assertStrictEquals(isOddInteger(Number.NaN), false);
  assertStrictEquals(isOddInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isOddInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isOddInteger(undefined), false);
  assertStrictEquals(isOddInteger(null), false);
  assertStrictEquals(isOddInteger(0n), false);
  assertStrictEquals(isOddInteger(""), false);
  assertStrictEquals(isOddInteger("0"), false);
});

Deno.test("isEvenInteger()", () => {
  assertStrictEquals(isEvenInteger(0), true);
  assertStrictEquals(isEvenInteger(-0), true);
  assertStrictEquals(isEvenInteger(1), false);
  assertStrictEquals(isEvenInteger(-1), false);
  assertStrictEquals(isEvenInteger(2), true);
  assertStrictEquals(isEvenInteger(-2), true);
  assertStrictEquals(isEvenInteger(3), false);
  assertStrictEquals(isEvenInteger(-3), false);

  assertStrictEquals(isEvenInteger(-10.1), false);
  assertStrictEquals(isEvenInteger(-9.9), false);
  assertStrictEquals(isEvenInteger(9.9), false);
  assertStrictEquals(isEvenInteger(10.1), false);

  assertStrictEquals(isEvenInteger(Number.NaN), false);
  assertStrictEquals(isEvenInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isEvenInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isEvenInteger(undefined), false);
  assertStrictEquals(isEvenInteger(null), false);
  assertStrictEquals(isEvenInteger(0n), false);
  assertStrictEquals(isEvenInteger(""), false);
  assertStrictEquals(isEvenInteger("0"), false);
});

Deno.test("normalizeNumber()", () => {
  assertStrictEquals(normalizeNumber(0), 0);
  assertStrictEquals(normalizeNumber(-0), 0);
  assertStrictEquals(normalizeNumber(1), 1);
  assertStrictEquals(normalizeNumber(-1), -1);

  assertStrictEquals(normalizeNumber(-10.1), -10.1);
  assertStrictEquals(normalizeNumber(-9.9), -9.9);
  assertStrictEquals(normalizeNumber(9.9), 9.9);
  assertStrictEquals(normalizeNumber(10.1), 10.1);

  assertStrictEquals(normalizeNumber(Number.NaN), Number.NaN);
  assertStrictEquals(
    normalizeNumber(Number.POSITIVE_INFINITY),
    Number.POSITIVE_INFINITY,
  );
  assertStrictEquals(
    normalizeNumber(Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  );

  assertThrows(
    () => {
      normalizeNumber(undefined as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      normalizeNumber(null as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      normalizeNumber(0n as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      normalizeNumber("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      normalizeNumber("0" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("clampNumber()", () => {
  assertStrictEquals(clampNumber(0, [0, 0]), 0);
  assertStrictEquals(clampNumber(-0, [0, 0]), 0);
  assertStrictEquals(clampNumber(1, [0, 0]), 0);
  assertStrictEquals(clampNumber(-1, [0, 0]), 0);

  assertStrictEquals(clampNumber(0, [-10, 10]), 0);
  assertStrictEquals(clampNumber(-0, [-10, 10]), 0);
  assertStrictEquals(clampNumber(-11, [-10, 10]), -10);
  assertStrictEquals(clampNumber(-10.1, [-10, 10]), -10);
  assertStrictEquals(clampNumber(-10, [-10, 10]), -10);
  assertStrictEquals(clampNumber(-9.9, [-10, 10]), -9.9);
  assertStrictEquals(clampNumber(9.9, [-10, 10]), 9.9);
  assertStrictEquals(clampNumber(10, [-10, 10]), 10);
  assertStrictEquals(clampNumber(10.1, [-10, 10]), 10);
  assertStrictEquals(clampNumber(11, [-10, 10]), 10);

  assertStrictEquals(clampNumber(10.6, [-10.5, 10.5]), 10.5);
  assertStrictEquals(clampNumber(10.5, [-10.5, 10.5]), 10.5);
  assertStrictEquals(clampNumber(10.4, [-10.5, 10.5]), 10.4);
  assertStrictEquals(clampNumber(-10.4, [-10.5, 10.5]), -10.4);
  assertStrictEquals(clampNumber(-10.5, [-10.5, 10.5]), -10.5);
  assertStrictEquals(clampNumber(-10.6, [-10.5, 10.5]), -10.5);

  assertStrictEquals(
    clampNumber(Number.MAX_SAFE_INTEGER, [undefined as unknown as number]),
    Number.MAX_SAFE_INTEGER,
  );
  assertStrictEquals(
    clampNumber(Number.MIN_SAFE_INTEGER, [
      999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999n as unknown as number,
    ]),
    Number.MIN_SAFE_INTEGER,
  );
  assertStrictEquals(
    clampNumber(Number.MAX_SAFE_INTEGER, ["0" as unknown as number]),
    Number.MAX_SAFE_INTEGER,
  );

  assertThrows(
    () => {
      clampNumber(Number.NaN, [0]);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      clampNumber("0" as unknown as number, [0]);
    },
    TypeError,
    "source",
  );
});

Deno.test("clampNumber() - 2", () => {
  assertStrictEquals(clampNumber(0, [0]), 0);
  assertStrictEquals(clampNumber(-0, [0]), 0);
  assertStrictEquals(clampNumber(1, [0]), 0);
  assertStrictEquals(clampNumber(-1, [0]), 0);

  assertStrictEquals(clampNumber(0, [10, -10]), 0);
  assertStrictEquals(clampNumber(-0, [10, -10]), 0);
  assertStrictEquals(clampNumber(-11, [10, -10]), -10);
  assertStrictEquals(clampNumber(-10.1, [10, -10]), -10);
  assertStrictEquals(clampNumber(-10, [10, -10]), -10);
  assertStrictEquals(clampNumber(-9.9, [10, -10]), -9.9);
  assertStrictEquals(clampNumber(9.9, [10, -10]), 9.9);
  assertStrictEquals(clampNumber(10, [10, -10]), 10);
  assertStrictEquals(clampNumber(10.1, [10, -10]), 10);
  assertStrictEquals(clampNumber(11, [10, -10]), 10);
});

Deno.test("inRange()", () => {
  assertStrictEquals(inRange(0, [0, 0]), true);
  assertStrictEquals(inRange(-0, [0, 0]), true);
  assertStrictEquals(inRange(1, [0, 0]), false);
  assertStrictEquals(inRange(-1, [0, 0]), false);

  assertStrictEquals(inRange(0, [-10, 10]), true);
  assertStrictEquals(inRange(-0, [-10, 10]), true);
  assertStrictEquals(inRange(-11, [-10, 10]), false);
  assertStrictEquals(inRange(-10.1, [-10, 10]), false);
  assertStrictEquals(inRange(-10, [-10, 10]), true);
  assertStrictEquals(inRange(-9.9, [-10, 10]), true);
  assertStrictEquals(inRange(9.9, [-10, 10]), true);
  assertStrictEquals(inRange(10, [-10, 10]), true);
  assertStrictEquals(inRange(10.1, [-10, 10]), false);
  assertStrictEquals(inRange(11, [-10, 10]), false);

  assertStrictEquals(inRange(10.6, [-10.5, 10.5]), false);
  assertStrictEquals(inRange(10.5, [-10.5, 10.5]), true);
  assertStrictEquals(inRange(10.4, [-10.5, 10.5]), true);
  assertStrictEquals(inRange(-10.4, [-10.5, 10.5]), true);
  assertStrictEquals(inRange(-10.5, [-10.5, 10.5]), true);
  assertStrictEquals(inRange(-10.6, [-10.5, 10.5]), false);

  assertStrictEquals(
    inRange(Number.MAX_SAFE_INTEGER, [undefined as unknown as number]),
    true,
  );
  assertStrictEquals(
    inRange(Number.MIN_SAFE_INTEGER, [
      999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999n as unknown as number,
    ]),
    true,
  );
  assertStrictEquals(
    inRange(Number.MAX_SAFE_INTEGER, ["0" as unknown as number]),
    true,
  );

  assertStrictEquals(
    inRange(Number.NaN, [0]),
    false,
  );
  assertStrictEquals(
    inRange("0" as unknown as number, [0]),
    false,
  );
});

Deno.test("inRange() - 2", () => {
  assertStrictEquals(inRange(0, [0]), true);
  assertStrictEquals(inRange(-0, [0]), true);
  assertStrictEquals(inRange(1, [0]), false);
  assertStrictEquals(inRange(-1, [0]), false);

  assertStrictEquals(inRange(0, [10, -10]), true);
  assertStrictEquals(inRange(-0, [10, -10]), true);
  assertStrictEquals(inRange(-11, [10, -10]), false);
  assertStrictEquals(inRange(-10.1, [10, -10]), false);
  assertStrictEquals(inRange(-10, [10, -10]), true);
  assertStrictEquals(inRange(-9.9, [10, -10]), true);
  assertStrictEquals(inRange(9.9, [10, -10]), true);
  assertStrictEquals(inRange(10, [10, -10]), true);
  assertStrictEquals(inRange(10.1, [10, -10]), false);
  assertStrictEquals(inRange(11, [10, -10]), false);
});
