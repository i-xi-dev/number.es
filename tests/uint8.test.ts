import { assertStrictEquals } from "./deps.ts";
import { Uint8 } from "../mod.ts";

Deno.test("Uint8.isUint8(number)", () => {
  assertStrictEquals(Uint8.isUint8(-1), false);
  assertStrictEquals(Uint8.isUint8(-0), true);
  assertStrictEquals(Uint8.isUint8(0), true);
  assertStrictEquals(Uint8.isUint8(63), true);
  assertStrictEquals(Uint8.isUint8(64), true);
  assertStrictEquals(Uint8.isUint8(255), true);
  assertStrictEquals(Uint8.isUint8(256), false);
  assertStrictEquals(Uint8.isUint8(0.1), false);
});

Deno.test("Uint8.isUint8(any)", () => {
  assertStrictEquals(Uint8.isUint8("0"), false);
  assertStrictEquals(Uint8.isUint8("255"), false);
  assertStrictEquals(Uint8.isUint8(true), false);
  assertStrictEquals(Uint8.isUint8({}), false);
  assertStrictEquals(Uint8.isUint8([]), false);
  assertStrictEquals(Uint8.isUint8([0]), false);
  assertStrictEquals(Uint8.isUint8(undefined), false);
  assertStrictEquals(Uint8.isUint8(null), false);
});

Deno.test("Uint8.clamp(number)", () => {
  assertStrictEquals(Uint8.clamp(), 0);
  assertStrictEquals(Uint8.clamp(-1), 0);
  assertStrictEquals(Uint8.clamp(-0), 0);
  assertStrictEquals(Uint8.clamp(0), 0);
  assertStrictEquals(Uint8.clamp(63), 63);
  assertStrictEquals(Uint8.clamp(64), 64);
  assertStrictEquals(Uint8.clamp(255), 255);
  assertStrictEquals(Uint8.clamp(256), 255);
  assertStrictEquals(Uint8.clamp(0.1), 0);
  assertStrictEquals(Uint8.clamp(0.6), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number), 0);
});

Deno.test("Uint8.clamp(number, {}) - method:round", () => {
  const opt = { method: "round" } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 0);
  assertStrictEquals(Uint8.clamp(-1, opt), 0);
  assertStrictEquals(Uint8.clamp(-0, opt), 0);
  assertStrictEquals(Uint8.clamp(0, opt), 0);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 255);
  assertStrictEquals(Uint8.clamp(256, opt), 255);
  assertStrictEquals(Uint8.clamp(0.1, opt), 0);
  assertStrictEquals(Uint8.clamp(0.6, opt), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 0);
});

Deno.test("Uint8.clamp(number, {}) - method:trunc", () => {
  const opt = { method: "trunc" } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 0);
  assertStrictEquals(Uint8.clamp(-1, opt), 0);
  assertStrictEquals(Uint8.clamp(-0, opt), 0);
  assertStrictEquals(Uint8.clamp(0, opt), 0);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 255);
  assertStrictEquals(Uint8.clamp(256, opt), 255);
  assertStrictEquals(Uint8.clamp(0.1, opt), 0);
  assertStrictEquals(Uint8.clamp(0.6, opt), 0);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 0);
});

Deno.test("Uint8.clamp(number, {}) - fallback:255", () => {
  const opt = { fallback: 255 } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 255);
  assertStrictEquals(Uint8.clamp(-1, opt), 0);
  assertStrictEquals(Uint8.clamp(-0, opt), 0);
  assertStrictEquals(Uint8.clamp(0, opt), 0);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 255);
  assertStrictEquals(Uint8.clamp(256, opt), 255);
  assertStrictEquals(Uint8.clamp(0.1, opt), 0);
  assertStrictEquals(Uint8.clamp(0.6, opt), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 255);
});

Deno.test("Uint8.clamp(number, {}) - lowerLimit:1", () => {
  const opt = { lowerLimit: 1 } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 1);
  assertStrictEquals(Uint8.clamp(-1, opt), 1);
  assertStrictEquals(Uint8.clamp(-0, opt), 1);
  assertStrictEquals(Uint8.clamp(0, opt), 1);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 255);
  assertStrictEquals(Uint8.clamp(256, opt), 255);
  assertStrictEquals(Uint8.clamp(0.1, opt), 1);
  assertStrictEquals(Uint8.clamp(0.6, opt), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 1);
});

Deno.test("Uint8.clamp(number, {}) - lowerLimit:1, fallback:0", () => {
  const opt = { lowerLimit: 1, fallback: 0 } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 1);
  assertStrictEquals(Uint8.clamp(-1, opt), 1);
  assertStrictEquals(Uint8.clamp(-0, opt), 1);
  assertStrictEquals(Uint8.clamp(0, opt), 1);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 255);
  assertStrictEquals(Uint8.clamp(256, opt), 255);
  assertStrictEquals(Uint8.clamp(0.1, opt), 1);
  assertStrictEquals(Uint8.clamp(0.6, opt), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 1);
});

Deno.test("Uint8.clamp(number, {}) - upperLimit:254", () => {
  const opt = { upperLimit: 254 } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 0);
  assertStrictEquals(Uint8.clamp(-1, opt), 0);
  assertStrictEquals(Uint8.clamp(-0, opt), 0);
  assertStrictEquals(Uint8.clamp(0, opt), 0);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 254);
  assertStrictEquals(Uint8.clamp(256, opt), 254);
  assertStrictEquals(Uint8.clamp(0.1, opt), 0);
  assertStrictEquals(Uint8.clamp(0.6, opt), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 0);
});

Deno.test("Uint8.clamp(number, {}) - upperLimit:254, fallback:255", () => {
  const opt = { upperLimit: 254, fallback: 255 } as const;
  assertStrictEquals(Uint8.clamp(undefined, opt), 254);
  assertStrictEquals(Uint8.clamp(-1, opt), 0);
  assertStrictEquals(Uint8.clamp(-0, opt), 0);
  assertStrictEquals(Uint8.clamp(0, opt), 0);
  assertStrictEquals(Uint8.clamp(63, opt), 63);
  assertStrictEquals(Uint8.clamp(64, opt), 64);
  assertStrictEquals(Uint8.clamp(255, opt), 254);
  assertStrictEquals(Uint8.clamp(256, opt), 254);
  assertStrictEquals(Uint8.clamp(0.1, opt), 0);
  assertStrictEquals(Uint8.clamp(0.6, opt), 1);
  assertStrictEquals(Uint8.clamp("10" as unknown as number, opt), 254);
});
