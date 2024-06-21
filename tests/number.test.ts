import { assertStrictEquals, assertThrows } from "./deps.ts";
import { NumberEx, Radix } from "../mod.ts";

const {
  clampNumber,
  inRange,
  isEvenInteger,
  isNumber,
  isOddInteger,
  normalizeNumber,
} = NumberEx;

Deno.test("Radix", () => {
  assertStrictEquals(Radix.BINARY, 2);
  assertStrictEquals(Radix.OCTAL, 8);
  assertStrictEquals(Radix.DECIMAL, 10);
  assertStrictEquals(Radix.HEXADECIMAL, 16);
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

  assertThrows(
    () => {
      clampNumber(Number.MAX_SAFE_INTEGER, [undefined as unknown as number]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      clampNumber(Number.MAX_SAFE_INTEGER, ["0" as unknown as number]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      clampNumber(Number.MAX_SAFE_INTEGER, [0, undefined as unknown as number]);
    },
    TypeError,
    "range[1]",
  );
  assertThrows(
    () => {
      clampNumber(Number.MAX_SAFE_INTEGER, [Number.NaN]);
    },
    RangeError,
    "range[0]",
  );
  assertThrows(
    () => {
      clampNumber(Number.MAX_SAFE_INTEGER, [0, Number.NaN]);
    },
    RangeError,
    "range[1]",
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

  assertThrows(
    () => {
      inRange(Number.MAX_SAFE_INTEGER, [undefined as unknown as number]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      inRange(Number.MAX_SAFE_INTEGER, ["0" as unknown as number]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      inRange(Number.MAX_SAFE_INTEGER, [0, undefined as unknown as number]);
    },
    TypeError,
    "range[1]",
  );
  assertThrows(
    () => {
      inRange(Number.MAX_SAFE_INTEGER, [Number.NaN]);
    },
    RangeError,
    "range[0]",
  );
  assertThrows(
    () => {
      inRange(Number.MAX_SAFE_INTEGER, [0, Number.NaN]);
    },
    RangeError,
    "range[1]",
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
