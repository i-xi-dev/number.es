import { assertStrictEquals, assertThrows } from "./deps.ts";
import { PositiveInteger } from "../mod.ts";

Deno.test("PositiveInteger.isPositiveInteger(number)", () => {
  assertStrictEquals(PositiveInteger.isPositiveInteger(-1), false);
  assertStrictEquals(PositiveInteger.isPositiveInteger(-0), false);
  assertStrictEquals(PositiveInteger.isPositiveInteger(0), false);
  assertStrictEquals(PositiveInteger.isPositiveInteger(1), true);
  assertStrictEquals(PositiveInteger.isPositiveInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(PositiveInteger.isPositiveInteger(1.1), false);
  assertStrictEquals(PositiveInteger.isPositiveInteger(Number.NaN), false);
  assertStrictEquals(
    PositiveInteger.isPositiveInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    PositiveInteger.isPositiveInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    PositiveInteger.isPositiveInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("PositiveInteger.isPositiveInteger(any)", () => {
  assertStrictEquals(PositiveInteger.isPositiveInteger("1"), false);
  assertStrictEquals(PositiveInteger.isPositiveInteger(true), false);
});

Deno.test("PositiveInteger.from(number)", () => {
  assertStrictEquals(PositiveInteger.from(), 1);
  assertStrictEquals(PositiveInteger.from(0), 1);
  assertStrictEquals(PositiveInteger.from(-0), 1);
  assertStrictEquals(PositiveInteger.from(1), 1);
  assertStrictEquals(PositiveInteger.from(-1), 1);
  assertStrictEquals(PositiveInteger.from(1.1), 1);
  assertStrictEquals(PositiveInteger.from(1.9), 2);
  assertStrictEquals(PositiveInteger.from(-1.1), 1);
  assertStrictEquals(PositiveInteger.from(-1.9), 1);
  assertStrictEquals(PositiveInteger.from("1" as unknown as number), 1);
  assertStrictEquals(PositiveInteger.from(2), 2);
  assertStrictEquals(PositiveInteger.from(-2), 1);
});

Deno.test("PositiveInteger.from(number, {}) - method:round", () => {
  const opt = { method: "round" } as const;
  assertStrictEquals(PositiveInteger.from(undefined, opt), 1);
  assertStrictEquals(PositiveInteger.from(0, opt), 1);
  assertStrictEquals(PositiveInteger.from(-0, opt), 1);
  assertStrictEquals(PositiveInteger.from(1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.9, opt), 2);
  assertStrictEquals(PositiveInteger.from(-1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from("1" as unknown as number, opt), 1);
  assertStrictEquals(PositiveInteger.from(2, opt), 2);
  assertStrictEquals(PositiveInteger.from(-2, opt), 1);
});

Deno.test("PositiveInteger.from(number, {}) - method:trunc", () => {
  const opt = { method: "trunc" } as const;
  assertStrictEquals(PositiveInteger.from(undefined, opt), 1);
  assertStrictEquals(PositiveInteger.from(0, opt), 1);
  assertStrictEquals(PositiveInteger.from(-0, opt), 1);
  assertStrictEquals(PositiveInteger.from(1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from("1" as unknown as number, opt), 1);
  assertStrictEquals(PositiveInteger.from(2, opt), 2);
  assertStrictEquals(PositiveInteger.from(-2, opt), 1);
});

Deno.test("PositiveInteger.from(number, {}) - fallback:9999", () => {
  const opt = { fallback: 9999 } as const;
  assertStrictEquals(PositiveInteger.from(undefined, opt), 9999);
  assertStrictEquals(PositiveInteger.from(0, opt), 1);
  assertStrictEquals(PositiveInteger.from(-0, opt), 1);
  assertStrictEquals(PositiveInteger.from(1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.9, opt), 2);
  assertStrictEquals(PositiveInteger.from(-1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from("1" as unknown as number, opt), 9999);
  assertStrictEquals(PositiveInteger.from(2, opt), 2);
  assertStrictEquals(PositiveInteger.from(-2, opt), 1);
});

Deno.test("PositiveInteger.from(number, {}) - lowerLimit:1", () => {
  const opt = { lowerLimit: 1 } as const;
  assertStrictEquals(PositiveInteger.from(undefined, opt), 1);
  assertStrictEquals(PositiveInteger.from(0, opt), 1);
  assertStrictEquals(PositiveInteger.from(-0, opt), 1);
  assertStrictEquals(PositiveInteger.from(1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.9, opt), 2);
  assertStrictEquals(PositiveInteger.from(-1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from("1" as unknown as number, opt), 1);
  assertStrictEquals(PositiveInteger.from(2, opt), 2);
  assertStrictEquals(PositiveInteger.from(-2, opt), 1);
});

Deno.test("PositiveInteger.from(number, {}) - upperLimit:1", () => {
  const opt = { upperLimit: 1 } as const;
  assertStrictEquals(PositiveInteger.from(undefined, opt), 1);
  assertStrictEquals(PositiveInteger.from(0, opt), 1);
  assertStrictEquals(PositiveInteger.from(-0, opt), 1);
  assertStrictEquals(PositiveInteger.from(1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.1, opt), 1);
  assertStrictEquals(PositiveInteger.from(-1.9, opt), 1);
  assertStrictEquals(PositiveInteger.from("1" as unknown as number, opt), 1);
  assertStrictEquals(PositiveInteger.from(2, opt), 1);
  assertStrictEquals(PositiveInteger.from(-2, opt), 1);
});
