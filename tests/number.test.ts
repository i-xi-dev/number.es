import { assertStrictEquals } from "./deps.ts";
import { NumberUtils } from "../mod.ts";

Deno.test("NumberUtils.ZERO", () => {
  assertStrictEquals(NumberUtils.ZERO, 0);
});

Deno.test("NumberUtils.inRange()", () => {
  assertStrictEquals(NumberUtils.inRange(0, 0, 0), true);
  assertStrictEquals(NumberUtils.inRange(-0, 0, 0), true);
  assertStrictEquals(NumberUtils.inRange(1, 0, 0), false);
  assertStrictEquals(NumberUtils.inRange(-1, 0, 0), false);

  assertStrictEquals(NumberUtils.inRange(0, 1, -1), false);

  assertStrictEquals(NumberUtils.inRange(9, 10, 20), false);
  assertStrictEquals(NumberUtils.inRange(9.9, 10, 20), false);
  assertStrictEquals(NumberUtils.inRange(10, 10, 20), true);
  assertStrictEquals(NumberUtils.inRange(20, 10, 20), true);
  assertStrictEquals(NumberUtils.inRange(20.1, 10, 20), false);
  assertStrictEquals(NumberUtils.inRange(21, 10, 20), false);

  assertStrictEquals(NumberUtils.inRange(-11, -10, 10), false);
  assertStrictEquals(NumberUtils.inRange(-10.1, -10, 10), false);
  assertStrictEquals(NumberUtils.inRange(-10, -10, 10), true);
  assertStrictEquals(NumberUtils.inRange(-9.9, -10, 10), true);
  assertStrictEquals(NumberUtils.inRange(9.9, -10, 10), true);
  assertStrictEquals(NumberUtils.inRange(10, -10, 10), true);
  assertStrictEquals(NumberUtils.inRange(10.1, -10, 10), false);
  assertStrictEquals(NumberUtils.inRange(11, -10, 10), false);
});
