import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Integer, SafeInteger } from "../mod.ts";

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("SafeInteger.ZERO", () => {
  assertStrictEquals(SafeInteger.ZERO === 0, true);
  assertStrictEquals(SafeInteger.ZERO === (0n as unknown as number), false);
});

Deno.test("SafeInteger.isPositive()", () => {
  assertStrictEquals(SafeInteger.isPositive(0), false);
  assertStrictEquals(SafeInteger.isPositive(-0), false);
  assertStrictEquals(SafeInteger.isPositive(1), true);
  assertStrictEquals(SafeInteger.isPositive(-1), false);

  assertStrictEquals(SafeInteger.isPositive(-10.1), false);
  assertStrictEquals(SafeInteger.isPositive(-9.9), false);
  assertStrictEquals(SafeInteger.isPositive(9.9), false);
  assertStrictEquals(SafeInteger.isPositive(10.1), false);

  assertStrictEquals(SafeInteger.isPositive(0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive(-0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive(1n as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive(-1n as unknown as number), false);

  assertStrictEquals(SafeInteger.isPositive(Number.NaN), false);
  assertStrictEquals(SafeInteger.isPositive(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isPositive(MAX + 1), false);
  assertStrictEquals(SafeInteger.isPositive(MAX), true);
  assertStrictEquals(SafeInteger.isPositive(MIN), false);
  assertStrictEquals(SafeInteger.isPositive(MIN - 1), false);
  assertStrictEquals(SafeInteger.isPositive(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    SafeInteger.isPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isPositive(null as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive(true as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive(false as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive("" as unknown as number), false);
  assertStrictEquals(SafeInteger.isPositive("0" as unknown as number), false);
});

Deno.test("SafeInteger.isNonNegative()", () => {
  assertStrictEquals(SafeInteger.isNonNegative(0), true);
  assertStrictEquals(SafeInteger.isNonNegative(-0), true);
  assertStrictEquals(SafeInteger.isNonNegative(1), true);
  assertStrictEquals(SafeInteger.isNonNegative(-1), false);

  assertStrictEquals(SafeInteger.isNonNegative(-10.1), false);
  assertStrictEquals(SafeInteger.isNonNegative(-9.9), false);
  assertStrictEquals(SafeInteger.isNonNegative(9.9), false);
  assertStrictEquals(SafeInteger.isNonNegative(10.1), false);

  assertStrictEquals(SafeInteger.isNonNegative(0n as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(-0n as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative(1n as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(-1n as unknown as number),
    false,
  );

  assertStrictEquals(SafeInteger.isNonNegative(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative(MAX + 1), false);
  assertStrictEquals(SafeInteger.isNonNegative(MAX), true);
  assertStrictEquals(SafeInteger.isNonNegative(MIN), false);
  assertStrictEquals(SafeInteger.isNonNegative(MIN - 1), false);
  assertStrictEquals(
    SafeInteger.isNonNegative(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    SafeInteger.isNonNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(null as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(true as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonNegative(false as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNonNegative("" as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonNegative("0" as unknown as number),
    false,
  );
});

Deno.test("SafeInteger.isNonPositive()", () => {
  assertStrictEquals(SafeInteger.isNonPositive(0), true);
  assertStrictEquals(SafeInteger.isNonPositive(-0), true);
  assertStrictEquals(SafeInteger.isNonPositive(1), false);
  assertStrictEquals(SafeInteger.isNonPositive(-1), true);

  assertStrictEquals(SafeInteger.isNonPositive(-10.1), false);
  assertStrictEquals(SafeInteger.isNonPositive(-9.9), false);
  assertStrictEquals(SafeInteger.isNonPositive(9.9), false);
  assertStrictEquals(SafeInteger.isNonPositive(10.1), false);

  assertStrictEquals(SafeInteger.isNonPositive(0n as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonPositive(-0n as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNonPositive(1n as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonPositive(-1n as unknown as number),
    false,
  );

  assertStrictEquals(SafeInteger.isNonPositive(Number.NaN), false);
  assertStrictEquals(
    SafeInteger.isNonPositive(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(SafeInteger.isNonPositive(MAX + 1), false);
  assertStrictEquals(SafeInteger.isNonPositive(MAX), false);
  assertStrictEquals(SafeInteger.isNonPositive(MIN), true);
  assertStrictEquals(SafeInteger.isNonPositive(MIN - 1), false);
  assertStrictEquals(
    SafeInteger.isNonPositive(Number.NEGATIVE_INFINITY),
    false,
  );

  assertStrictEquals(
    SafeInteger.isNonPositive(undefined as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonPositive(null as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonPositive(true as unknown as number),
    false,
  );
  assertStrictEquals(
    SafeInteger.isNonPositive(false as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNonPositive("" as unknown as number), false);
  assertStrictEquals(
    SafeInteger.isNonPositive("0" as unknown as number),
    false,
  );
});

Deno.test("SafeInteger.isNegative()", () => {
  assertStrictEquals(SafeInteger.isNegative(0), false);
  assertStrictEquals(SafeInteger.isNegative(-0), false);
  assertStrictEquals(SafeInteger.isNegative(1), false);
  assertStrictEquals(SafeInteger.isNegative(-1), true);

  assertStrictEquals(SafeInteger.isNegative(-10.1), false);
  assertStrictEquals(SafeInteger.isNegative(-9.9), false);
  assertStrictEquals(SafeInteger.isNegative(9.9), false);
  assertStrictEquals(SafeInteger.isNegative(10.1), false);

  assertStrictEquals(SafeInteger.isNegative(0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative(-0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative(1n as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative(-1n as unknown as number), false);

  assertStrictEquals(SafeInteger.isNegative(Number.NaN), false);
  assertStrictEquals(SafeInteger.isNegative(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isNegative(MAX + 1), false);
  assertStrictEquals(SafeInteger.isNegative(MAX), false);
  assertStrictEquals(SafeInteger.isNegative(MIN), true);
  assertStrictEquals(SafeInteger.isNegative(MIN - 1), false);
  assertStrictEquals(SafeInteger.isNegative(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(
    SafeInteger.isNegative(undefined as unknown as number),
    false,
  );
  assertStrictEquals(SafeInteger.isNegative(null as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative(true as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative(false as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative("" as unknown as number), false);
  assertStrictEquals(SafeInteger.isNegative("0" as unknown as number), false);
});

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

  assertStrictEquals(SafeInteger.isOdd(MAX), true);
  assertStrictEquals(SafeInteger.isOdd(1.1), false);
  assertStrictEquals(SafeInteger.isOdd(-1.1), false);
  assertStrictEquals(SafeInteger.isOdd(Number.NaN), false);
  assertStrictEquals(SafeInteger.isOdd(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isOdd(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isOdd(MIN), true);

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

  assertStrictEquals(SafeInteger.isEven(MAX), false);
  assertStrictEquals(SafeInteger.isEven(1.1), false);
  assertStrictEquals(SafeInteger.isEven(-1.1), false);
  assertStrictEquals(SafeInteger.isEven(Number.NaN), false);
  assertStrictEquals(SafeInteger.isEven(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isEven(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(SafeInteger.isEven(MIN), false);

  assertStrictEquals(SafeInteger.isEven(undefined as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(null as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(true as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(false as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven(0n as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven("" as unknown as number), false);
  assertStrictEquals(SafeInteger.isEven("0" as unknown as number), false);
});

const rfe1 = "`source` is must be a `number`.";
const rfe2 = "`source` is must not be `Number.NaN`.";

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
      SafeInteger.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromNumber(Number.NaN);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromNumber(-1), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0), 0);
  assertStrictEquals(SafeInteger.fromNumber(0), 0);
  assertStrictEquals(SafeInteger.fromNumber(1), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.6), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9), 0);

  assertStrictEquals(SafeInteger.fromNumber(1.1), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.6), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.9), 1);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:UP", () => {
  const op = { roundingMode: Integer.RoundingMode.UP };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:DOWN", () => {
  const op = { roundingMode: Integer.RoundingMode.DOWN };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -2);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 1);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:TOWARD_ZERO", () => {
  const op = { roundingMode: Integer.RoundingMode.TOWARD_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 1);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:AWAY_FROM_ZERO", () => {
  const op = { roundingMode: Integer.RoundingMode.AWAY_FROM_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -2);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:HALF_UP", () => {
  const op = { roundingMode: Integer.RoundingMode.HALF_UP };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:HALF_DOWN", () => {
  const op = { roundingMode: Integer.RoundingMode.HALF_DOWN };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:HALF_TOWARD_ZERO", () => {
  const op = { roundingMode: Integer.RoundingMode.HALF_TOWARD_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:HALF_AWAY_FROM_ZERO", () => {
  const op = { roundingMode: Integer.RoundingMode.HALF_AWAY_FROM_ZERO };

  assertStrictEquals(SafeInteger.fromNumber(-1, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(1, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(Number.POSITIVE_INFINITY, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MIN, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(Number.NEGATIVE_INFINITY, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(SafeInteger.fromNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(SafeInteger.fromNumber(MIN - 0.9, op), MIN);
  // <<<

  assertStrictEquals(SafeInteger.fromNumber(-1.9, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.6, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.55, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.5, op), -2);
  assertStrictEquals(SafeInteger.fromNumber(-1.45, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.4, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-1.1, op), -1);

  assertStrictEquals(SafeInteger.fromNumber(-0.9, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.6, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.55, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.5, op), -1);
  assertStrictEquals(SafeInteger.fromNumber(-0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(-0.1, op), 0);

  assertStrictEquals(SafeInteger.fromNumber(0.1, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.4, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.45, op), 0);
  assertStrictEquals(SafeInteger.fromNumber(0.5, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.55, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.6, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(0.9, op), 1);

  assertStrictEquals(SafeInteger.fromNumber(1.1, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.4, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.45, op), 1);
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

//TODO fromNumber HALF_TO_EVEN,CEILING,FLOOR,TRUNCATE,ROUND,CONVERGENT

//TODO fromBigInt

//TODO toBigInt
//TODO fromString
//TODO toString
