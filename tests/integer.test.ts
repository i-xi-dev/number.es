import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Integer } from "../mod.ts";

Deno.test("Integer.isOdd()", () => {
  assertStrictEquals(Integer.isOdd(0), false);
  assertStrictEquals(Integer.isOdd(-0), false);
  assertStrictEquals(Integer.isOdd(1), true);
  assertStrictEquals(Integer.isOdd(-1), true);
  assertStrictEquals(Integer.isOdd(2), false);
  assertStrictEquals(Integer.isOdd(-2), false);
  assertStrictEquals(Integer.isOdd(3), true);
  assertStrictEquals(Integer.isOdd(-3), true);

  assertStrictEquals(Integer.isOdd(-10.1), false);
  assertStrictEquals(Integer.isOdd(-9.9), false);
  assertStrictEquals(Integer.isOdd(9.9), false);
  assertStrictEquals(Integer.isOdd(10.1), false);

  assertStrictEquals(Integer.isOdd(0n), false);
  assertStrictEquals(Integer.isOdd(-0n), false);
  assertStrictEquals(Integer.isOdd(1n), true);
  assertStrictEquals(Integer.isOdd(-1n), true);
  assertStrictEquals(Integer.isOdd(2n), false);
  assertStrictEquals(Integer.isOdd(-2n), false);
  assertStrictEquals(Integer.isOdd(3n), true);
  assertStrictEquals(Integer.isOdd(-3n), true);

  assertStrictEquals(Integer.isOdd(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isOdd(1.1), false);
  assertStrictEquals(Integer.isOdd(-1.1), false);
  assertStrictEquals(Integer.isOdd(Number.NaN), false);
  assertStrictEquals(Integer.isOdd(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Integer.isOdd(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(Integer.isOdd(Number.MIN_SAFE_INTEGER), true);

  assertStrictEquals(Integer.isOdd(undefined as unknown as number), false);
  assertStrictEquals(Integer.isOdd(null as unknown as number), false);
  assertStrictEquals(Integer.isOdd(true as unknown as number), false);
  assertStrictEquals(Integer.isOdd(false as unknown as number), false);
  assertStrictEquals(Integer.isOdd("" as unknown as number), false);
  assertStrictEquals(Integer.isOdd("0" as unknown as number), false);
});

Deno.test("Integer.isEven()", () => {
  assertStrictEquals(Integer.isEven(0), true);
  assertStrictEquals(Integer.isEven(-0), true);
  assertStrictEquals(Integer.isEven(1), false);
  assertStrictEquals(Integer.isEven(-1), false);
  assertStrictEquals(Integer.isEven(2), true);
  assertStrictEquals(Integer.isEven(-2), true);
  assertStrictEquals(Integer.isEven(3), false);
  assertStrictEquals(Integer.isEven(-3), false);

  assertStrictEquals(Integer.isEven(-10.1), false);
  assertStrictEquals(Integer.isEven(-9.9), false);
  assertStrictEquals(Integer.isEven(9.9), false);
  assertStrictEquals(Integer.isEven(10.1), false);

  assertStrictEquals(Integer.isEven(0n), true);
  assertStrictEquals(Integer.isEven(-0n), true);
  assertStrictEquals(Integer.isEven(1n), false);
  assertStrictEquals(Integer.isEven(-1n), false);
  assertStrictEquals(Integer.isEven(2n), true);
  assertStrictEquals(Integer.isEven(-2n), true);
  assertStrictEquals(Integer.isEven(3n), false);
  assertStrictEquals(Integer.isEven(-3n), false);

  assertStrictEquals(Integer.isEven(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(Integer.isEven(1.1), false);
  assertStrictEquals(Integer.isEven(-1.1), false);
  assertStrictEquals(Integer.isEven(Number.NaN), false);
  assertStrictEquals(Integer.isEven(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Integer.isEven(Number.NEGATIVE_INFINITY), false);
  assertStrictEquals(Integer.isEven(Number.MIN_SAFE_INTEGER), false);

  assertStrictEquals(Integer.isEven(undefined as unknown as number), false);
  assertStrictEquals(Integer.isEven(null as unknown as number), false);
  assertStrictEquals(Integer.isEven(true as unknown as number), false);
  assertStrictEquals(Integer.isEven(false as unknown as number), false);
  assertStrictEquals(Integer.isEven("" as unknown as number), false);
  assertStrictEquals(Integer.isEven("0" as unknown as number), false);
});

const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;

Deno.test("Integer.roundNumber()", () => {
  const rfe1 = "`input` must be a finite number.";

  assertThrows(
    () => {
      Integer.roundNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      Integer.roundNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      Integer.roundNumber(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      Integer.roundNumber(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      Integer.roundNumber(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(Integer.roundNumber(-1), -1);
  assertStrictEquals(Integer.roundNumber(-0), 0);
  assertStrictEquals(Integer.roundNumber(0), 0);
  assertStrictEquals(Integer.roundNumber(1), 1);

  assertStrictEquals(Integer.roundNumber(MAX), MAX);
  assertStrictEquals(Integer.roundNumber(MIN), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5), -8);
  assertStrictEquals(Integer.roundNumber(-7.5), -7);
  assertStrictEquals(Integer.roundNumber(-6.5), -6);
  assertStrictEquals(Integer.roundNumber(-5.5), -5);
  assertStrictEquals(Integer.roundNumber(-4.5), -4);
  assertStrictEquals(Integer.roundNumber(-3.5), -3);
  assertStrictEquals(Integer.roundNumber(-2.5), -2);

  assertStrictEquals(Integer.roundNumber(-1.9), -1);
  assertStrictEquals(Integer.roundNumber(-1.6), -1);
  assertStrictEquals(Integer.roundNumber(-1.55), -1);
  assertStrictEquals(Integer.roundNumber(-1.5), -1);
  assertStrictEquals(Integer.roundNumber(-1.45), -1);
  assertStrictEquals(Integer.roundNumber(-1.4), -1);
  assertStrictEquals(Integer.roundNumber(-1.1), -1);

  assertStrictEquals(Integer.roundNumber(-0.9), 0);
  assertStrictEquals(Integer.roundNumber(-0.6), 0);
  assertStrictEquals(Integer.roundNumber(-0.55), 0);
  assertStrictEquals(Integer.roundNumber(-0.5), 0);
  assertStrictEquals(Integer.roundNumber(-0.45), 0);
  assertStrictEquals(Integer.roundNumber(-0.4), 0);
  assertStrictEquals(Integer.roundNumber(-0.1), 0);

  assertStrictEquals(Integer.roundNumber(0.1), 0);
  assertStrictEquals(Integer.roundNumber(0.4), 0);
  assertStrictEquals(Integer.roundNumber(0.45), 0);
  assertStrictEquals(Integer.roundNumber(0.5), 0);
  assertStrictEquals(Integer.roundNumber(0.55), 0);
  assertStrictEquals(Integer.roundNumber(0.6), 0);
  assertStrictEquals(Integer.roundNumber(0.9), 0);

  assertStrictEquals(Integer.roundNumber(1.1), 1);
  assertStrictEquals(Integer.roundNumber(1.4), 1);
  assertStrictEquals(Integer.roundNumber(1.45), 1);
  assertStrictEquals(Integer.roundNumber(1.5), 1);
  assertStrictEquals(Integer.roundNumber(1.55), 1);
  assertStrictEquals(Integer.roundNumber(1.6), 1);
  assertStrictEquals(Integer.roundNumber(1.9), 1);

  assertStrictEquals(Integer.roundNumber(2.5), 2);
  assertStrictEquals(Integer.roundNumber(3.5), 3);
  assertStrictEquals(Integer.roundNumber(4.5), 4);
  assertStrictEquals(Integer.roundNumber(5.5), 5);
  assertStrictEquals(Integer.roundNumber(6.5), 6);
  assertStrictEquals(Integer.roundNumber(7.5), 7);
  assertStrictEquals(Integer.roundNumber(8.5), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:UP", () => {
  const op = Integer.RoundingMode.UP;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 1);
  assertStrictEquals(Integer.roundNumber(0.4, op), 1);
  assertStrictEquals(Integer.roundNumber(0.45, op), 1);
  assertStrictEquals(Integer.roundNumber(0.5, op), 1);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 2);
  assertStrictEquals(Integer.roundNumber(1.4, op), 2);
  assertStrictEquals(Integer.roundNumber(1.45, op), 2);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 3);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 5);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 7);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:CEILING", () => {
  const op = Integer.RoundingMode.CEILING;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 1);
  assertStrictEquals(Integer.roundNumber(0.4, op), 1);
  assertStrictEquals(Integer.roundNumber(0.45, op), 1);
  assertStrictEquals(Integer.roundNumber(0.5, op), 1);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 2);
  assertStrictEquals(Integer.roundNumber(1.4, op), 2);
  assertStrictEquals(Integer.roundNumber(1.45, op), 2);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 3);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 5);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 7);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:DOWN", () => {
  const op = Integer.RoundingMode.DOWN;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -9);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -3);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -2);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.1, op), -1);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(0.9, op), 0);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 1);
  assertStrictEquals(Integer.roundNumber(1.6, op), 1);
  assertStrictEquals(Integer.roundNumber(1.9, op), 1);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:FLOOR", () => {
  const op = Integer.RoundingMode.FLOOR;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -9);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -3);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -2);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.1, op), -1);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(0.9, op), 0);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 1);
  assertStrictEquals(Integer.roundNumber(1.6, op), 1);
  assertStrictEquals(Integer.roundNumber(1.9, op), 1);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:TOWARD_ZERO", () => {
  const op = Integer.RoundingMode.TOWARD_ZERO;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(0.9, op), 0);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 1);
  assertStrictEquals(Integer.roundNumber(1.6, op), 1);
  assertStrictEquals(Integer.roundNumber(1.9, op), 1);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:TRUNCATE", () => {
  const op = Integer.RoundingMode.TRUNCATE;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(0.9, op), 0);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 1);
  assertStrictEquals(Integer.roundNumber(1.6, op), 1);
  assertStrictEquals(Integer.roundNumber(1.9, op), 1);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:AWAY_FROM_ZERO", () => {
  const op = Integer.RoundingMode.AWAY_FROM_ZERO;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -9);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -3);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -2);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.1, op), -1);

  assertStrictEquals(Integer.roundNumber(0.1, op), 1);
  assertStrictEquals(Integer.roundNumber(0.4, op), 1);
  assertStrictEquals(Integer.roundNumber(0.45, op), 1);
  assertStrictEquals(Integer.roundNumber(0.5, op), 1);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 2);
  assertStrictEquals(Integer.roundNumber(1.4, op), 2);
  assertStrictEquals(Integer.roundNumber(1.45, op), 2);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 3);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 5);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 7);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:HALF_UP", () => {
  const op = Integer.RoundingMode.HALF_UP;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 1);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 3);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 5);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 7);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:HALF_DOWN", () => {
  const op = Integer.RoundingMode.HALF_DOWN;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -9);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -3);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:HALF_TOWARD_ZERO", () => {
  const op = Integer.RoundingMode.HALF_TOWARD_ZERO;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:HALF_AWAY_FROM_ZERO", () => {
  const op = Integer.RoundingMode.HALF_AWAY_FROM_ZERO;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -9);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -3);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 1);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 3);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 5);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 7);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:ROUND", () => {
  const op = Integer.RoundingMode.ROUND;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -9);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -3);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 1);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 3);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 5);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 7);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 9);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:HALF_TO_EVEN", () => {
  const op = Integer.RoundingMode.HALF_TO_EVEN;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:CONVERGENT", () => {
  const op = Integer.RoundingMode.CONVERGENT;

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -2);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 1);
  assertStrictEquals(Integer.roundNumber(0.6, op), 1);
  assertStrictEquals(Integer.roundNumber(0.9, op), 1);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 2);
  assertStrictEquals(Integer.roundNumber(1.55, op), 2);
  assertStrictEquals(Integer.roundNumber(1.6, op), 2);
  assertStrictEquals(Integer.roundNumber(1.9, op), 2);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 4);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 6);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 8);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

Deno.test("Integer.roundNumber() - roundingMode:unknown", () => {
  // roundingMode:TRUNCATE として処理する
  const op = "hoge" as "up";

  assertStrictEquals(Integer.roundNumber(-1, op), -1);
  assertStrictEquals(Integer.roundNumber(-0, op), 0);
  assertStrictEquals(Integer.roundNumber(0, op), 0);
  assertStrictEquals(Integer.roundNumber(1, op), 1);

  assertStrictEquals(Integer.roundNumber(MAX, op), MAX);
  assertStrictEquals(Integer.roundNumber(MIN, op), MIN);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MIN + 0.9, op), MIN + 1);
  assertStrictEquals(Integer.roundNumber(MIN + 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.1, op), MIN);
  assertStrictEquals(Integer.roundNumber(MIN - 0.9, op), MIN - 1);
  // <<<

  assertStrictEquals(Integer.roundNumber(-8.5, op), -8);
  assertStrictEquals(Integer.roundNumber(-7.5, op), -7);
  assertStrictEquals(Integer.roundNumber(-6.5, op), -6);
  assertStrictEquals(Integer.roundNumber(-5.5, op), -5);
  assertStrictEquals(Integer.roundNumber(-4.5, op), -4);
  assertStrictEquals(Integer.roundNumber(-3.5, op), -3);
  assertStrictEquals(Integer.roundNumber(-2.5, op), -2);

  assertStrictEquals(Integer.roundNumber(-1.9, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.6, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.55, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.5, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.45, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.4, op), -1);
  assertStrictEquals(Integer.roundNumber(-1.1, op), -1);

  assertStrictEquals(Integer.roundNumber(-0.9, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(-0.1, op), 0);

  assertStrictEquals(Integer.roundNumber(0.1, op), 0);
  assertStrictEquals(Integer.roundNumber(0.4, op), 0);
  assertStrictEquals(Integer.roundNumber(0.45, op), 0);
  assertStrictEquals(Integer.roundNumber(0.5, op), 0);
  assertStrictEquals(Integer.roundNumber(0.55, op), 0);
  assertStrictEquals(Integer.roundNumber(0.6, op), 0);
  assertStrictEquals(Integer.roundNumber(0.9, op), 0);

  assertStrictEquals(Integer.roundNumber(1.1, op), 1);
  assertStrictEquals(Integer.roundNumber(1.4, op), 1);
  assertStrictEquals(Integer.roundNumber(1.45, op), 1);
  assertStrictEquals(Integer.roundNumber(1.5, op), 1);
  assertStrictEquals(Integer.roundNumber(1.55, op), 1);
  assertStrictEquals(Integer.roundNumber(1.6, op), 1);
  assertStrictEquals(Integer.roundNumber(1.9, op), 1);

  assertStrictEquals(Integer.roundNumber(2.5, op), 2);
  assertStrictEquals(Integer.roundNumber(3.5, op), 3);
  assertStrictEquals(Integer.roundNumber(4.5, op), 4);
  assertStrictEquals(Integer.roundNumber(5.5, op), 5);
  assertStrictEquals(Integer.roundNumber(6.5, op), 6);
  assertStrictEquals(Integer.roundNumber(7.5, op), 7);
  assertStrictEquals(Integer.roundNumber(8.5, op), 8);

  // ずれるのはNumber型の問題なので関知しない >>>
  assertStrictEquals(Integer.roundNumber(MAX - 0.9, op), MAX - 1);
  assertStrictEquals(Integer.roundNumber(MAX - 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.1, op), MAX);
  assertStrictEquals(Integer.roundNumber(MAX + 0.9, op), MAX + 1);
  // <<<
});

//TODO ,,, resolveRadix
