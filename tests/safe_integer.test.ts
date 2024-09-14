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

Deno.test("SafeInteger.fromNumber()", () => {
  const rfe1 = "`source` must be a `number`.";
  const rfe2 = "`source` must not be `Number.NaN`.";

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5), 8);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:CEILING", () => {
  const op = { roundingMode: Integer.RoundingMode.CEILING };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 9);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -9);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -3);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:FLOOR", () => {
  const op = { roundingMode: Integer.RoundingMode.FLOOR };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -9);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -3);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:TRUNCATE", () => {
  const op = { roundingMode: Integer.RoundingMode.TRUNCATE };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -9);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -3);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 9);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 9);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -9);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -3);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -9);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -3);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:ROUND", () => {
  const op = { roundingMode: Integer.RoundingMode.ROUND };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -9);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -3);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:HALF_TO_EVEN", () => {
  const op = { roundingMode: Integer.RoundingMode.HALF_TO_EVEN };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:CONVERGENT", () => {
  const op = { roundingMode: Integer.RoundingMode.CONVERGENT };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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
  assertStrictEquals(SafeInteger.fromNumber(1.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.55, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.6, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(1.9, op), 2);

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 8);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromNumber() - roundingMode:unknown", () => {
  // roundingMode:TRUNCATE として処理する
  const op = { roundingMode: "hoge" as "up" };

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

  assertStrictEquals(SafeInteger.fromNumber(-8.5, op), -8);
  assertStrictEquals(SafeInteger.fromNumber(-7.5, op), -7);
  assertStrictEquals(SafeInteger.fromNumber(-6.5, op), -6);
  assertStrictEquals(SafeInteger.fromNumber(-5.5, op), -5);
  assertStrictEquals(SafeInteger.fromNumber(-4.5, op), -4);
  assertStrictEquals(SafeInteger.fromNumber(-3.5, op), -3);
  assertStrictEquals(SafeInteger.fromNumber(-2.5, op), -2);

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

  assertStrictEquals(SafeInteger.fromNumber(2.5, op), 2);
  assertStrictEquals(SafeInteger.fromNumber(3.5, op), 3);
  assertStrictEquals(SafeInteger.fromNumber(4.5, op), 4);
  assertStrictEquals(SafeInteger.fromNumber(5.5, op), 5);
  assertStrictEquals(SafeInteger.fromNumber(6.5, op), 6);
  assertStrictEquals(SafeInteger.fromNumber(7.5, op), 7);
  assertStrictEquals(SafeInteger.fromNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(SafeInteger.fromNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(SafeInteger.fromNumber(MAX + 0.9, op), MAX);
  // <<<
});

Deno.test("SafeInteger.fromBigInt()", () => {
  const rfe1 = "`source` must be a `bigint`.";
  const rfe2 = "`source` must be within the range of safe integer.";

  assertThrows(
    () => {
      SafeInteger.fromBigInt(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(MIN) - 1n);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromBigInt(BigInt(MAX) + 1n);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromBigInt(BigInt(MIN)), MIN);
  assertStrictEquals(SafeInteger.fromBigInt(-1n), -1);
  assertStrictEquals(SafeInteger.fromBigInt(-0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(0n), 0);
  assertStrictEquals(SafeInteger.fromBigInt(1n), 1);
  assertStrictEquals(SafeInteger.fromBigInt(BigInt(MAX)), MAX);
});

Deno.test("SafeInteger.toBigInt()", () => {
  const rfe1 = "`source` must be a safe integer.";

  assertThrows(
    () => {
      SafeInteger.toBigInt(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt("0" as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toBigInt(1.5);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.toBigInt(MIN), BigInt(MIN));
  assertStrictEquals(SafeInteger.toBigInt(-1), -1n);
  assertStrictEquals(SafeInteger.toBigInt(-0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(0), 0n);
  assertStrictEquals(SafeInteger.toBigInt(1), 1n);
  assertStrictEquals(SafeInteger.toBigInt(MAX), BigInt(MAX));
});

Deno.test("SafeInteger.fromString()", () => {
  const rfe1 = "`source` must be a `string`.";

  assertThrows(
    () => {
      SafeInteger.fromString(undefined as unknown as string);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromString(0 as unknown as string);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.fromString(0n as unknown as string);
    },
    TypeError,
    rfe1,
  );

  const rfe2 = "`source` must be a representation of a integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("");
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("a");
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1"), -1);
  assertStrictEquals(SafeInteger.fromString("-0"), 0);
  assertStrictEquals(SafeInteger.fromString("0"), 0);
  assertStrictEquals(SafeInteger.fromString("1"), 1);
  assertStrictEquals(SafeInteger.fromString("1111"), 1111);

  assertStrictEquals(SafeInteger.fromString("+0"), 0);
  assertStrictEquals(SafeInteger.fromString("+1"), 1);

  assertStrictEquals(SafeInteger.fromString("00"), 0);
  assertStrictEquals(SafeInteger.fromString("01"), 1);
});

Deno.test("SafeInteger.fromString() - radix:2", () => {
  const op = { radix: 2 } as const;

  const rfe2 = "`source` must be a representation of a integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("2", op);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 15);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:8", () => {
  const op = { radix: 8 } as const;

  const rfe2 = "`source` must be a representation of a integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("8", op);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      SafeInteger.fromString("9", op);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 585);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 1111);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:16", () => {
  const op = { radix: 16 } as const;

  const rfe2 = "`source` must be a representation of a integer.";

  assertThrows(
    () => {
      SafeInteger.fromString("g", op);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 4369);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);
  assertStrictEquals(SafeInteger.fromString("a", op), 10);
  assertStrictEquals(SafeInteger.fromString("B", op), 11);
  assertStrictEquals(SafeInteger.fromString("c", op), 12);
  assertStrictEquals(SafeInteger.fromString("0d", op), 13);
  assertStrictEquals(SafeInteger.fromString("E", op), 14);
  assertStrictEquals(SafeInteger.fromString("f", op), 15);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.fromString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 2 } as const;

  assertStrictEquals(SafeInteger.fromString("-1", op), -1);
  assertStrictEquals(SafeInteger.fromString("-0", op), 0);
  assertStrictEquals(SafeInteger.fromString("0", op), 0);
  assertStrictEquals(SafeInteger.fromString("1", op), 1);
  assertStrictEquals(SafeInteger.fromString("1111", op), 1111);

  assertStrictEquals(SafeInteger.fromString("2", op), 2);
  assertStrictEquals(SafeInteger.fromString("3", op), 3);
  assertStrictEquals(SafeInteger.fromString("4", op), 4);
  assertStrictEquals(SafeInteger.fromString("5", op), 5);
  assertStrictEquals(SafeInteger.fromString("6", op), 6);
  assertStrictEquals(SafeInteger.fromString("7", op), 7);
  assertStrictEquals(SafeInteger.fromString("8", op), 8);
  assertStrictEquals(SafeInteger.fromString("9", op), 9);

  assertStrictEquals(SafeInteger.fromString("+0", op), 0);
  assertStrictEquals(SafeInteger.fromString("+1", op), 1);

  assertStrictEquals(SafeInteger.fromString("00", op), 0);
  assertStrictEquals(SafeInteger.fromString("01", op), 1);
});

Deno.test("SafeInteger.toString()", () => {
  const rfe1 = "`source` must be a safe integer.";

  assertThrows(
    () => {
      SafeInteger.toString(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      SafeInteger.toString(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(SafeInteger.toString(-1), "-1");
  assertStrictEquals(SafeInteger.toString(-0), "0");
  assertStrictEquals(SafeInteger.toString(0), "0");
  assertStrictEquals(SafeInteger.toString(1), "1");

  assertStrictEquals(SafeInteger.toString(1111), "1111");

  assertStrictEquals(SafeInteger.toString(2), "2");
  assertStrictEquals(SafeInteger.toString(3), "3");
  assertStrictEquals(SafeInteger.toString(4), "4");
  assertStrictEquals(SafeInteger.toString(5), "5");
  assertStrictEquals(SafeInteger.toString(6), "6");
  assertStrictEquals(SafeInteger.toString(7), "7");
  assertStrictEquals(SafeInteger.toString(8), "8");
  assertStrictEquals(SafeInteger.toString(9), "9");
  assertStrictEquals(SafeInteger.toString(10), "10");
  assertStrictEquals(SafeInteger.toString(11), "11");
  assertStrictEquals(SafeInteger.toString(12), "12");
  assertStrictEquals(SafeInteger.toString(13), "13");
  assertStrictEquals(SafeInteger.toString(14), "14");
  assertStrictEquals(SafeInteger.toString(15), "15");
  assertStrictEquals(SafeInteger.toString(16), "16");
});

Deno.test("SafeInteger.toString() - radix:2", () => {
  const op = { radix: 2 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "10001010111");

  assertStrictEquals(SafeInteger.toString(2, op), "10");
  assertStrictEquals(SafeInteger.toString(3, op), "11");
  assertStrictEquals(SafeInteger.toString(4, op), "100");
  assertStrictEquals(SafeInteger.toString(5, op), "101");
  assertStrictEquals(SafeInteger.toString(6, op), "110");
  assertStrictEquals(SafeInteger.toString(7, op), "111");
  assertStrictEquals(SafeInteger.toString(8, op), "1000");
  assertStrictEquals(SafeInteger.toString(9, op), "1001");
  assertStrictEquals(SafeInteger.toString(10, op), "1010");
  assertStrictEquals(SafeInteger.toString(11, op), "1011");
  assertStrictEquals(SafeInteger.toString(12, op), "1100");
  assertStrictEquals(SafeInteger.toString(13, op), "1101");
  assertStrictEquals(SafeInteger.toString(14, op), "1110");
  assertStrictEquals(SafeInteger.toString(15, op), "1111");
  assertStrictEquals(SafeInteger.toString(16, op), "10000");
});

Deno.test("SafeInteger.toString() - radix:8", () => {
  const op = { radix: 8 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "2127");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "10");
  assertStrictEquals(SafeInteger.toString(9, op), "11");
  assertStrictEquals(SafeInteger.toString(10, op), "12");
  assertStrictEquals(SafeInteger.toString(11, op), "13");
  assertStrictEquals(SafeInteger.toString(12, op), "14");
  assertStrictEquals(SafeInteger.toString(13, op), "15");
  assertStrictEquals(SafeInteger.toString(14, op), "16");
  assertStrictEquals(SafeInteger.toString(15, op), "17");
  assertStrictEquals(SafeInteger.toString(16, op), "20");
});

Deno.test("SafeInteger.toString() - radix:10", () => {
  const op = { radix: 10 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "1111");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "10");
  assertStrictEquals(SafeInteger.toString(11, op), "11");
  assertStrictEquals(SafeInteger.toString(12, op), "12");
  assertStrictEquals(SafeInteger.toString(13, op), "13");
  assertStrictEquals(SafeInteger.toString(14, op), "14");
  assertStrictEquals(SafeInteger.toString(15, op), "15");
  assertStrictEquals(SafeInteger.toString(16, op), "16");
});

Deno.test("SafeInteger.toString() - radix:16", () => {
  const op = { radix: 16 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "457");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "a");
  assertStrictEquals(SafeInteger.toString(11, op), "b");
  assertStrictEquals(SafeInteger.toString(12, op), "c");
  assertStrictEquals(SafeInteger.toString(13, op), "d");
  assertStrictEquals(SafeInteger.toString(14, op), "e");
  assertStrictEquals(SafeInteger.toString(15, op), "f");
  assertStrictEquals(SafeInteger.toString(16, op), "10");
});

Deno.test("SafeInteger.toString() - radix:unknown", () => {
  // radix:10 として処理する
  const op = { radix: 3 as 10 } as const;

  assertStrictEquals(SafeInteger.toString(-1, op), "-1");
  assertStrictEquals(SafeInteger.toString(-0, op), "0");
  assertStrictEquals(SafeInteger.toString(0, op), "0");
  assertStrictEquals(SafeInteger.toString(1, op), "1");

  assertStrictEquals(SafeInteger.toString(1111, op), "1111");

  assertStrictEquals(SafeInteger.toString(2, op), "2");
  assertStrictEquals(SafeInteger.toString(3, op), "3");
  assertStrictEquals(SafeInteger.toString(4, op), "4");
  assertStrictEquals(SafeInteger.toString(5, op), "5");
  assertStrictEquals(SafeInteger.toString(6, op), "6");
  assertStrictEquals(SafeInteger.toString(7, op), "7");
  assertStrictEquals(SafeInteger.toString(8, op), "8");
  assertStrictEquals(SafeInteger.toString(9, op), "9");
  assertStrictEquals(SafeInteger.toString(10, op), "10");
  assertStrictEquals(SafeInteger.toString(11, op), "11");
  assertStrictEquals(SafeInteger.toString(12, op), "12");
  assertStrictEquals(SafeInteger.toString(13, op), "13");
  assertStrictEquals(SafeInteger.toString(14, op), "14");
  assertStrictEquals(SafeInteger.toString(15, op), "15");
  assertStrictEquals(SafeInteger.toString(16, op), "16");
});
