import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Integer } from "../mod.ts";

Deno.test("Integer.isInteger(number)", () => {
  assertStrictEquals(Integer.isInteger(-1), true);
  assertStrictEquals(Integer.isInteger(-0), true);
  assertStrictEquals(Integer.isInteger(0), true);
  assertStrictEquals(Integer.isInteger(1), true);
  assertStrictEquals(Integer.isInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isInteger(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isInteger(1.1), false);
  assertStrictEquals(Integer.isInteger(Number.NaN), false);
  assertStrictEquals(Integer.isInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Integer.isInteger(Number.NEGATIVE_INFINITY), false);
});

Deno.test("Integer.toBigInt(number)", () => {
  assertStrictEquals(Integer.toBigInt(1.0), 1n);
  assertStrictEquals(Integer.toBigInt(1), 1n);
  assertStrictEquals(Integer.toBigInt(0), 0n);
  assertStrictEquals(Integer.toBigInt(-0), 0n);
  assertStrictEquals(Integer.toBigInt(-1), -1n);

  assertThrows(
    () => {
      Integer.toBigInt(1.1);
    },
    TypeError,
    "source",
  );
});

Deno.test("Integer.toBigInt(any)", () => {
  assertThrows(
    () => {
      Integer.toBigInt("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("Integer.toString(number)", () => {
  assertStrictEquals(Integer.toString(1.0), "1");
  assertStrictEquals(Integer.toString(1), "1");
  assertStrictEquals(Integer.toString(0), "0");
  assertStrictEquals(Integer.toString(-0), "0");
  assertStrictEquals(Integer.toString(-1), "-1");

  assertThrows(
    () => {
      Integer.toString(1.1);
    },
    TypeError,
    "source",
  );
});

Deno.test("Integer.toString(any)", () => {
  assertThrows(
    () => {
      Integer.toString("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("Integer.round()", () => {
  assertThrows(
    () => {
      Integer.round(undefined as unknown as number, Symbol());
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      Integer.round(Number.NaN, Symbol());
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      Integer.round(Number.MAX_SAFE_INTEGER, Symbol());
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      Integer.round(Number.MIN_SAFE_INTEGER, Symbol());
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      Integer.round(1, undefined as unknown as symbol);
    },
    TypeError,
    "roundingMode",
  );

  assertThrows(
    () => {
      Integer.round(1, Symbol());
    },
    RangeError,
    "roundingMode",
  );
});

Deno.test("Integer.round(number, UP)", () => {
  const op = Integer.RoundingMode.UP;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 1);
  assertStrictEquals(Integer.round(0.4, op), 1);
  assertStrictEquals(Integer.round(0.45, op), 1);
  assertStrictEquals(Integer.round(0.5, op), 1);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), 0);
  assertStrictEquals(Integer.round(-0.6, op), 0);
  assertStrictEquals(Integer.round(-0.9, op), 0);

  assertStrictEquals(Integer.round(1.1, op), 2);
  assertStrictEquals(Integer.round(1.4, op), 2);
  assertStrictEquals(Integer.round(1.45, op), 2);
  assertStrictEquals(Integer.round(1.5, op), 2);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -1);
  assertStrictEquals(Integer.round(-1.55, op), -1);
  assertStrictEquals(Integer.round(-1.6, op), -1);
  assertStrictEquals(Integer.round(-1.9, op), -1);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999999);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999998);
});

Deno.test("Integer.round(number, CEILING)", () => {
  const op = Integer.RoundingMode.CEILING;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 1);
  assertStrictEquals(Integer.round(0.4, op), 1);
  assertStrictEquals(Integer.round(0.45, op), 1);
  assertStrictEquals(Integer.round(0.5, op), 1);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), 0);
  assertStrictEquals(Integer.round(-0.6, op), 0);
  assertStrictEquals(Integer.round(-0.9, op), 0);
});

Deno.test("Integer.round(number, DOWN)", () => {
  const op = Integer.RoundingMode.DOWN;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 0);
  assertStrictEquals(Integer.round(0.6, op), 0);
  assertStrictEquals(Integer.round(0.9, op), 0);

  assertStrictEquals(Integer.round(-0.1, op), -1);
  assertStrictEquals(Integer.round(-0.4, op), -1);
  assertStrictEquals(Integer.round(-0.45, op), -1);
  assertStrictEquals(Integer.round(-0.5, op), -1);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 1);
  assertStrictEquals(Integer.round(1.55, op), 1);
  assertStrictEquals(Integer.round(1.6, op), 1);
  assertStrictEquals(Integer.round(1.9, op), 1);

  assertStrictEquals(Integer.round(-1.1, op), -2);
  assertStrictEquals(Integer.round(-1.4, op), -2);
  assertStrictEquals(Integer.round(-1.45, op), -2);
  assertStrictEquals(Integer.round(-1.5, op), -2);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999998);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999999);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999999);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.round(number, FLOOR)", () => {
  const op = Integer.RoundingMode.FLOOR;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 0);
  assertStrictEquals(Integer.round(0.6, op), 0);
  assertStrictEquals(Integer.round(0.9, op), 0);

  assertStrictEquals(Integer.round(-0.1, op), -1);
  assertStrictEquals(Integer.round(-0.4, op), -1);
  assertStrictEquals(Integer.round(-0.45, op), -1);
  assertStrictEquals(Integer.round(-0.5, op), -1);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);
});

Deno.test("Integer.round(number, TOWARD_ZERO)", () => {
  const op = Integer.RoundingMode.TOWARD_ZERO;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 0);
  assertStrictEquals(Integer.round(0.6, op), 0);
  assertStrictEquals(Integer.round(0.9, op), 0);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), 0);
  assertStrictEquals(Integer.round(-0.6, op), 0);
  assertStrictEquals(Integer.round(-0.9, op), 0);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 1);
  assertStrictEquals(Integer.round(1.55, op), 1);
  assertStrictEquals(Integer.round(1.6, op), 1);
  assertStrictEquals(Integer.round(1.9, op), 1);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -1);
  assertStrictEquals(Integer.round(-1.55, op), -1);
  assertStrictEquals(Integer.round(-1.6, op), -1);
  assertStrictEquals(Integer.round(-1.9, op), -1);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999998);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999998);
});

Deno.test("Integer.round(number, TRUNCATE)", () => {
  const op = Integer.RoundingMode.TRUNCATE;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 0);
  assertStrictEquals(Integer.round(0.6, op), 0);
  assertStrictEquals(Integer.round(0.9, op), 0);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), 0);
  assertStrictEquals(Integer.round(-0.6, op), 0);
  assertStrictEquals(Integer.round(-0.9, op), 0);
});

Deno.test("Integer.round(number, AWAY_FROM_ZERO)", () => {
  const op = Integer.RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 1);
  assertStrictEquals(Integer.round(0.4, op), 1);
  assertStrictEquals(Integer.round(0.45, op), 1);
  assertStrictEquals(Integer.round(0.5, op), 1);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), -1);
  assertStrictEquals(Integer.round(-0.4, op), -1);
  assertStrictEquals(Integer.round(-0.45, op), -1);
  assertStrictEquals(Integer.round(-0.5, op), -1);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 2);
  assertStrictEquals(Integer.round(1.4, op), 2);
  assertStrictEquals(Integer.round(1.45, op), 2);
  assertStrictEquals(Integer.round(1.5, op), 2);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -2);
  assertStrictEquals(Integer.round(-1.4, op), -2);
  assertStrictEquals(Integer.round(-1.45, op), -2);
  assertStrictEquals(Integer.round(-1.5, op), -2);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999999);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999999);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999999);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.round(number, HALF_UP)", () => {
  const op = Integer.RoundingMode.HALF_UP;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 1);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 2);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -1);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.round(number, HALF_DOWN)", () => {
  const op = Integer.RoundingMode.HALF_DOWN;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), -1);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 1);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -2);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999999);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.round(number, HALF_TOWARD_ZERO)", () => {
  const op = Integer.RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 1);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -1);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.round(number, HALF_AWAY_FROM_ZERO)", () => {
  const op = Integer.RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 1);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), -1);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 2);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -2);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999999);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999999);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.round(number, ROUND)", () => {
  const op = Integer.RoundingMode.ROUND;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 1);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), -1);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);
});

Deno.test("Integer.round(number, HALF_TO_EVEN)", () => {
  const op = Integer.RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(Integer.round(0, op), 0);
  assertStrictEquals(Integer.round(-0, op), 0);
  assertStrictEquals(Integer.round(1, op), 1);
  assertStrictEquals(Integer.round(-1, op), -1);

  assertStrictEquals(Integer.round(0.1, op), 0);
  assertStrictEquals(Integer.round(0.4, op), 0);
  assertStrictEquals(Integer.round(0.45, op), 0);
  assertStrictEquals(Integer.round(0.5, op), 0);
  assertStrictEquals(Integer.round(0.55, op), 1);
  assertStrictEquals(Integer.round(0.6, op), 1);
  assertStrictEquals(Integer.round(0.9, op), 1);

  assertStrictEquals(Integer.round(-0.1, op), 0);
  assertStrictEquals(Integer.round(-0.4, op), 0);
  assertStrictEquals(Integer.round(-0.45, op), 0);
  assertStrictEquals(Integer.round(-0.5, op), 0);
  assertStrictEquals(Integer.round(-0.55, op), -1);
  assertStrictEquals(Integer.round(-0.6, op), -1);
  assertStrictEquals(Integer.round(-0.9, op), -1);

  assertStrictEquals(Integer.round(1.1, op), 1);
  assertStrictEquals(Integer.round(1.4, op), 1);
  assertStrictEquals(Integer.round(1.45, op), 1);
  assertStrictEquals(Integer.round(1.5, op), 2);
  assertStrictEquals(Integer.round(1.55, op), 2);
  assertStrictEquals(Integer.round(1.6, op), 2);
  assertStrictEquals(Integer.round(1.9, op), 2);

  assertStrictEquals(Integer.round(-1.1, op), -1);
  assertStrictEquals(Integer.round(-1.4, op), -1);
  assertStrictEquals(Integer.round(-1.45, op), -1);
  assertStrictEquals(Integer.round(-1.5, op), -2);
  assertStrictEquals(Integer.round(-1.55, op), -2);
  assertStrictEquals(Integer.round(-1.6, op), -2);
  assertStrictEquals(Integer.round(-1.9, op), -2);

  assertStrictEquals(Integer.round(2.1, op), 2);
  assertStrictEquals(Integer.round(2.4, op), 2);
  assertStrictEquals(Integer.round(2.45, op), 2);
  assertStrictEquals(Integer.round(2.5, op), 2);
  assertStrictEquals(Integer.round(2.55, op), 3);
  assertStrictEquals(Integer.round(2.6, op), 3);
  assertStrictEquals(Integer.round(2.9, op), 3);

  assertStrictEquals(Integer.round(-2.1, op), -2);
  assertStrictEquals(Integer.round(-2.4, op), -2);
  assertStrictEquals(Integer.round(-2.45, op), -2);
  assertStrictEquals(Integer.round(-2.5, op), -2);
  assertStrictEquals(Integer.round(-2.55, op), -3);
  assertStrictEquals(Integer.round(-2.6, op), -3);
  assertStrictEquals(Integer.round(-2.9, op), -3);

  // 9007199254740991

  assertStrictEquals(Integer.round(999999999999998.4, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.5, op), 999999999999998);
  assertStrictEquals(Integer.round(999999999999998.6, op), 999999999999999);

  assertStrictEquals(Integer.round(-999999999999998.4, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.5, op), -999999999999998);
  assertStrictEquals(Integer.round(-999999999999998.6, op), -999999999999999);
});

Deno.test("Integer.fromNumber(number)", () => {
  assertStrictEquals(Integer.fromNumber(0), 0);
  assertStrictEquals(Integer.fromNumber(-0), 0);

  assertStrictEquals(Integer.fromNumber(0.1), 0);
  assertStrictEquals(Integer.fromNumber(0.4), 0);
  assertStrictEquals(Integer.fromNumber(0.5), 0);
  assertStrictEquals(Integer.fromNumber(0.6), 0);
  assertStrictEquals(Integer.fromNumber(0.9), 0);
  assertStrictEquals(Integer.fromNumber(1), 1);
  assertStrictEquals(Integer.fromNumber(1.1), 1);
  assertStrictEquals(Integer.fromNumber(1.4), 1);
  assertStrictEquals(Integer.fromNumber(1.5), 1);
  assertStrictEquals(Integer.fromNumber(1.6), 1);
  assertStrictEquals(Integer.fromNumber(1.9), 1);
  assertStrictEquals(Integer.fromNumber(2), 2);
  assertStrictEquals(Integer.fromNumber(2.1), 2);
  assertStrictEquals(Integer.fromNumber(2.4), 2);
  assertStrictEquals(Integer.fromNumber(2.5), 2);
  assertStrictEquals(Integer.fromNumber(2.6), 2);
  assertStrictEquals(Integer.fromNumber(2.9), 2);

  assertStrictEquals(Integer.fromNumber(-0.1), 0);
  assertStrictEquals(Integer.fromNumber(-0.4), 0);
  assertStrictEquals(Integer.fromNumber(-0.5), 0);
  assertStrictEquals(Integer.fromNumber(-0.6), 0);
  assertStrictEquals(Integer.fromNumber(-0.9), 0);
  assertStrictEquals(Integer.fromNumber(-1), -1);
  assertStrictEquals(Integer.fromNumber(-1.1), -1);
  assertStrictEquals(Integer.fromNumber(-1.4), -1);
  assertStrictEquals(Integer.fromNumber(-1.5), -1);
  assertStrictEquals(Integer.fromNumber(-1.6), -1);
  assertStrictEquals(Integer.fromNumber(-1.9), -1);
  assertStrictEquals(Integer.fromNumber(-2), -2);
  assertStrictEquals(Integer.fromNumber(-2.1), -2);
  assertStrictEquals(Integer.fromNumber(-2.4), -2);
  assertStrictEquals(Integer.fromNumber(-2.5), -2);
  assertStrictEquals(Integer.fromNumber(-2.6), -2);
  assertStrictEquals(Integer.fromNumber(-2.9), -2);

  assertStrictEquals(Integer.fromNumber(9876543210.5), 9876543210);
  assertStrictEquals(Integer.fromNumber(-9876543210.5), -9876543210);

  assertStrictEquals(Integer.fromNumber(undefined as unknown as number), 0);
  assertStrictEquals(Integer.fromNumber(Number.NaN), 0);
});

Deno.test("Integer.fromNumber(number, {}) - fallback", () => {
  const op = { fallback: 34 } as const;
  assertStrictEquals(Integer.fromNumber(Number.NaN, op), 34);
  assertStrictEquals(Integer.fromNumber(undefined as unknown as number, op), 34);

  const op2 = { fallback: 3.5 } as const;
  assertThrows(
    () => {
      Integer.fromNumber(Number.NaN, op2);
    },
    TypeError,
    "options.fallback",
  );
});

Deno.test("Integer.fromNumber(number, {}) - fallback:undefined", () => {
  const op = { fallback: undefined } as const;
  assertStrictEquals(Integer.fromNumber(Number.NaN, op), 0);
  assertStrictEquals(Integer.fromNumber(undefined as unknown as number, op), 0);
});

Deno.test("Integer.fromNumber(number, {}) - fallback,strict", () => {
  const op = { fallback: 34, strict: true } as const;
  assertThrows(
    () => {
      Integer.fromNumber(Number.NaN, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Integer.fromNumber(undefined as unknown as number, op);
    },
    RangeError,
    "source",
  );

  const op2 = { fallback: 3.5, strict: true } as const;
  assertThrows(
    () => {
      Integer.fromNumber(Number.NaN, op2);
    },
    TypeError,
    "options.fallback",
  );
});

Deno.test("Integer.fromNumber(number, {}) - lowerLimit", () => {
  const op = { lowerLimit: 21 } as const;
  assertStrictEquals(Integer.fromNumber(22, op), 22);
  assertStrictEquals(Integer.fromNumber(21, op), 21);
  assertStrictEquals(Integer.fromNumber(20, op), 21);

  const op2 = { lowerLimit: -21 } as const;
  assertStrictEquals(Integer.fromNumber(-22, op2), -21);
  assertStrictEquals(Integer.fromNumber(-21, op2), -21);
  assertStrictEquals(Integer.fromNumber(-20, op2), -20);

  const op3 = { lowerLimit: 21, fallback: 3 } as const;
  assertStrictEquals(Integer.fromNumber(Number.NaN, op3), 21);

  const op4 = { lowerLimit: -21, fallback: -200 } as const;
  assertStrictEquals(Integer.fromNumber(Number.NaN, op4), -21);

  assertThrows(
    () => {
      const op5 = { lowerLimit: Number.NaN, } as const;
      Integer.fromNumber(-25, op5);
    },
    TypeError,
    "options.lowerLimit",
  );
  assertThrows(
    () => {
      const op6 = { lowerLimit: 1.5, } as const;
      Integer.fromNumber(-25, op6);
    },
    TypeError,
    "options.lowerLimit",
  );
  assertThrows(
    () => {
      const op5 = { lowerLimit: "" as unknown as number, } as const;
      Integer.fromNumber(-25, op5);
    },
    TypeError,
    "options.lowerLimit",
  );
});

Deno.test("Integer.fromNumber(number, {}) - upperLimit", () => {
  const op = { upperLimit: 21 } as const;
  assertStrictEquals(Integer.fromNumber(22, op), 21);
  assertStrictEquals(Integer.fromNumber(21, op), 21);
  assertStrictEquals(Integer.fromNumber(20, op), 20);

  const op2 = { upperLimit: -21 } as const;
  assertStrictEquals(Integer.fromNumber(-22, op2), -22);
  assertStrictEquals(Integer.fromNumber(-21, op2), -21);
  assertStrictEquals(Integer.fromNumber(-20, op2), -21);

  const op3 = { upperLimit: 21, fallback: 23 } as const;
  assertStrictEquals(Integer.fromNumber(Number.NaN, op3), 21);

  const op4 = { upperLimit: -21, fallback: -2 } as const;
  assertStrictEquals(Integer.fromNumber(Number.NaN, op4), -21);

  assertThrows(
    () => {
      const op5 = { upperLimit: Number.NaN, } as const;
      Integer.fromNumber(-25, op5);
    },
    TypeError,
    "options.upperLimit",
  );
  assertThrows(
    () => {
      const op6 = { upperLimit: 1.5, } as const;
      Integer.fromNumber(-25, op6);
    },
    TypeError,
    "options.upperLimit",
  );
  assertThrows(
    () => {
      const op5 = { upperLimit: "" as unknown as number, } as const;
      Integer.fromNumber(-25, op5);
    },
    TypeError,
    "options.upperLimit",
  );
});

Deno.test("Integer.fromNumber(number, {}) - lowerLimit,upperLimit", () => {
  const op = { lowerLimit: 22, upperLimit: 24 } as const;
  assertStrictEquals(Integer.fromNumber(25, op), 24);
  assertStrictEquals(Integer.fromNumber(24, op), 24);
  assertStrictEquals(Integer.fromNumber(23, op), 23);
  assertStrictEquals(Integer.fromNumber(22, op), 22);
  assertStrictEquals(Integer.fromNumber(21, op), 22);

  const op2 = { lowerLimit: -24, upperLimit: -22 } as const;
  assertStrictEquals(Integer.fromNumber(-25, op2), -24);
  assertStrictEquals(Integer.fromNumber(-24, op2), -24);
  assertStrictEquals(Integer.fromNumber(-23, op2), -23);
  assertStrictEquals(Integer.fromNumber(-22, op2), -22);
  assertStrictEquals(Integer.fromNumber(-21, op2), -22);

  assertThrows(
    () => {
      const op3 = { lowerLimit: 22, upperLimit: -22 } as const;
      Integer.fromNumber(-25, op3);
    },
    RangeError,
    "min, max",
  );

  const op4 = { lowerLimit: -2, upperLimit: 2 } as const;
  assertStrictEquals(Integer.fromNumber(Number.MIN_VALUE, op4), 0);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER, op4), -2);
  assertStrictEquals(Integer.fromNumber(-2.1, op4), -2);
  assertStrictEquals(Integer.fromNumber(-2, op4), -2);
  assertStrictEquals(Integer.fromNumber(-1.9, op4), -1);
  assertStrictEquals(Integer.fromNumber(-0, op4), 0);
  assertStrictEquals(Integer.fromNumber(0, op4), 0);
  assertStrictEquals(Integer.fromNumber(1.9, op4), 1);
  assertStrictEquals(Integer.fromNumber(2, op4), 2);
  assertStrictEquals(Integer.fromNumber(2.1, op4), 2);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER, op4), 2);

  assertThrows(
    () => {
      Integer.fromNumber(Number.MAX_VALUE, op4)
    },
    RangeError,
    "source",
  );
});

Deno.test("Integer.fromNumber(number, {}) - strict", () => {
  const op = { strict: true } as const;
  assertStrictEquals(Integer.fromNumber(34, op), 34);
  assertThrows(
    () => {
      Integer.fromNumber(34.1, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Integer.fromNumber(Number.NaN, op);
    },
    RangeError,
    "source",
  );

  const op2 = { strict: false } as const;
  assertStrictEquals(Integer.fromNumber(34, op2), 34);
  assertStrictEquals(Integer.fromNumber(34.1, op2), 34);
  assertStrictEquals(Integer.fromNumber(Number.NaN, op2), 0);
});

Deno.test("Integer.fromBigInt(number)", () => {
  assertStrictEquals(Integer.fromBigInt(0n), 0);
  assertStrictEquals(Integer.fromBigInt(-0n), 0);

  assertStrictEquals(Integer.fromBigInt(1n), 1);
  assertStrictEquals(Integer.fromBigInt(2n), 2);
  assertStrictEquals(Integer.fromBigInt(-1n), -1);
  assertStrictEquals(Integer.fromBigInt(-2n), -2);

  assertStrictEquals(Integer.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER)), Number.MIN_SAFE_INTEGER);
  assertStrictEquals(Integer.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER)), Number.MAX_SAFE_INTEGER);

  assertThrows(
    () => {
      Integer.fromBigInt(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Integer.fromBigInt(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Integer.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    "source",
  );
});




// Deno.test("Integer.fromString(string)", () => {
//   assertStrictEquals(Integer.fromString("1"), 1);
//   assertStrictEquals(Integer.fromString("+1"), 1);
//   assertStrictEquals(Integer.fromString("0"), 0);
//   assertStrictEquals(Integer.fromString("-0"), 0);
//   assertStrictEquals(Integer.fromString("-1"), -1);

//   assertThrows(
//     () => {
//       Integer.fromString("");
//     },
//     TypeError,
//     "s",
//   );
//   assertThrows(
//     () => {
//       Integer.fromString("-");
//     },
//     TypeError,
//     "s",
//   );
//   assertThrows(
//     () => {
//       Integer.fromString("1.0");
//     },
//     TypeError,
//     "s",
//   );
// });

// Deno.test("Integer.fromString(any)", () => {
//   assertThrows(
//     () => {
//       Integer.fromString(1 as unknown as string);
//     },
//     TypeError,
//     "s",
//   );
// });
