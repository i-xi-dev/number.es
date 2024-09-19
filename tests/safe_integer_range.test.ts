import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SafeIntegerRange } from "../mod.ts";

const range00 = SafeIntegerRange.of(0);
const range01 = SafeIntegerRange.of(0, 1);
const range10 = SafeIntegerRange.of(-1, 0);
const range23 = SafeIntegerRange.of(2, 3);
const range32 = SafeIntegerRange.of(-3, -2);

const range00b = SafeIntegerRange.from({ min: 0, max: 0 });
const range01b = SafeIntegerRange.from({ min: 0, max: 1 });
const range10b = SafeIntegerRange.from({ min: -1, max: 0 });

const rangeX01 = SafeIntegerRange.of(-20, 280);

Deno.test("SafeIntegerRange.prototype.min", () => {
  assertStrictEquals(range00.min, 0);
  assertStrictEquals(range01.min, 0);
  assertStrictEquals(range10.min, -1);
  assertStrictEquals(range23.min, 2);
  assertStrictEquals(range32.min, -3);

  assertStrictEquals(range00b.min, 0);
  assertStrictEquals(range01b.min, 0);
  assertStrictEquals(range10b.min, -1);

  assertStrictEquals(rangeX01.min, -20);
});

Deno.test("SafeIntegerRange.prototype.max", () => {
  assertStrictEquals(range00.max, 0);
  assertStrictEquals(range01.max, 1);
  assertStrictEquals(range10.max, 0);
  assertStrictEquals(range23.max, 3);
  assertStrictEquals(range32.max, -2);

  assertStrictEquals(range00b.max, 0);
  assertStrictEquals(range01b.max, 1);
  assertStrictEquals(range10b.max, 0);

  assertStrictEquals(rangeX01.max, 280);
});

Deno.test("SafeIntegerRange.prototype.size", () => {
  assertStrictEquals(range00.size, 1);
  assertStrictEquals(range01.size, 2);
  assertStrictEquals(range10.size, 2);
  assertStrictEquals(range23.size, 2);
  assertStrictEquals(range32.size, 2);

  assertStrictEquals(range00b.size, 1);
  assertStrictEquals(range01b.size, 2);
  assertStrictEquals(range10b.size, 2);

  assertStrictEquals(rangeX01.size, 301);
});

Deno.test("SafeIntegerRange.from()", () => {
  const t1 = SafeIntegerRange.from(rangeX01);
  assertStrictEquals(t1.min, -20);
  assertStrictEquals(t1.max, 280);
  assertStrictEquals(t1.size, 301);
});

Deno.test("SafeIntegerRange.of()", () => {
  const t1 = SafeIntegerRange.of(4, 8, 9);
  assertStrictEquals(t1.min, 4);
  assertStrictEquals(t1.max, 8);
  assertStrictEquals(t1.size, 5);
});

Deno.test("SafeIntegerRange.rangeEquals()", () => {
  assertStrictEquals(range00.rangeEquals(range00), true);
  assertStrictEquals(range00.rangeEquals(range01), false);
  assertStrictEquals(range00.rangeEquals(range10), false);

  assertStrictEquals(range00.rangeEquals(range00b), true);
  assertStrictEquals(range00.rangeEquals(range01b), false);
  assertStrictEquals(range00.rangeEquals(range10b), false);
  
  assertStrictEquals(range01.rangeEquals(range00), false);
  assertStrictEquals(range01.rangeEquals(range01), true);
  assertStrictEquals(range01.rangeEquals(range10), false);

  assertStrictEquals(range01.rangeEquals(range00b), false);
  assertStrictEquals(range01.rangeEquals(range01b), true);
  assertStrictEquals(range01.rangeEquals(range10b), false);
  
  assertStrictEquals(range10.rangeEquals(range00), false);
  assertStrictEquals(range10.rangeEquals(range01), false);
  assertStrictEquals(range10.rangeEquals(range10), true);

  assertStrictEquals(range10.rangeEquals(range00b), false);
  assertStrictEquals(range10.rangeEquals(range01b), false);
  assertStrictEquals(range10.rangeEquals(range10b), true);
  
  assertStrictEquals(range23.rangeEquals(range00), false);
  assertStrictEquals(range23.rangeEquals(range01), false);
  assertStrictEquals(range23.rangeEquals(range10), false);

  assertStrictEquals(range23.rangeEquals(range00b), false);
  assertStrictEquals(range23.rangeEquals(range01b), false);
  assertStrictEquals(range23.rangeEquals(range10b), false);
  
  assertStrictEquals(range32.rangeEquals(range00), false);
  assertStrictEquals(range32.rangeEquals(range01), false);
  assertStrictEquals(range32.rangeEquals(range10), false);

  assertStrictEquals(range32.rangeEquals(range00b), false);
  assertStrictEquals(range32.rangeEquals(range01b), false);
  assertStrictEquals(range32.rangeEquals(range10b), false);
});

Deno.test("SafeIntegerRange.overlaps()", () => {
});

//TODO
