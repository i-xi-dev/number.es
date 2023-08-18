import { assertStrictEquals, assertThrows } from "./deps.ts";
import { NonNegativeInteger } from "../mod.ts";

Deno.test("NonNegativeInteger.isNonNegativeInteger(number)", () => {
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(-1), false);
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(-0), true);
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(0), true);
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(1), true);
  assertStrictEquals(
    NonNegativeInteger.isNonNegativeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(1.1), false);
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(Number.NaN), false);
  assertStrictEquals(
    NonNegativeInteger.isNonNegativeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    NonNegativeInteger.isNonNegativeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    NonNegativeInteger.isNonNegativeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("NonNegativeInteger.isNonNegativeInteger(any)", () => {
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger("1"), false);
  assertStrictEquals(NonNegativeInteger.isNonNegativeInteger(true), false);
});

Deno.test("NonNegativeInteger.clamp(number)", () => {
  assertStrictEquals(NonNegativeInteger.clamp(0), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-0), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1.1), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.9), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-1.1), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-1.9), 0);
  assertStrictEquals(NonNegativeInteger.clamp("1" as unknown as number), 0);
  assertStrictEquals(NonNegativeInteger.clamp(2), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-2), 0);
});

Deno.test("NonNegativeInteger.clamp(number, {}) - method:round", () => {
  const opt = { method: "round" } as const;
  assertStrictEquals(NonNegativeInteger.clamp(0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1.1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.9, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-1.1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-1.9, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp("1" as unknown as number, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(2, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-2, opt), 0);
});

Deno.test("NonNegativeInteger.clamp(number, {}) - method:trunc", () => {
  const opt = { method: "trunc" } as const;
  assertStrictEquals(NonNegativeInteger.clamp(0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1.1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.9, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1.1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-1.9, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp("1" as unknown as number, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(2, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-2, opt), 0);
});

Deno.test("NonNegativeInteger.clamp(number, {}) - fallback:9999", () => {
  const opt = { fallback: 9999 } as const;
  assertStrictEquals(NonNegativeInteger.clamp(0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1.1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.9, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-1.1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-1.9, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp("1" as unknown as number, opt), 9999);
  assertStrictEquals(NonNegativeInteger.clamp(2, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-2, opt), 0);
});

Deno.test("NonNegativeInteger.clamp(number, {}) - lowerLimit:1", () => {
  const opt = { lowerLimit: 1 } as const;
  assertStrictEquals(NonNegativeInteger.clamp(0, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-0, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.9, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-1.1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1.9, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp("1" as unknown as number, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(2, opt), 2);
  assertStrictEquals(NonNegativeInteger.clamp(-2, opt), 1);
});

Deno.test("NonNegativeInteger.clamp(number, {}) - upperLimit:1", () => {
  const opt = { upperLimit: 1 } as const;
  assertStrictEquals(NonNegativeInteger.clamp(0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-0, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(1.1, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(1.9, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-1.1, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(-1.9, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp("1" as unknown as number, opt), 0);
  assertStrictEquals(NonNegativeInteger.clamp(2, opt), 1);
  assertStrictEquals(NonNegativeInteger.clamp(-2, opt), 0);
});
