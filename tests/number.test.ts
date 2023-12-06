import { assertStrictEquals, assertThrows } from "./deps.ts";
import { NumberUtils } from "../mod.ts";

Deno.test("NumberUtils.ZERO", () => {
  assertStrictEquals(NumberUtils.ZERO, 0);
});

Deno.test("NumberUtils.inRange()", () => {
  assertStrictEquals(NumberUtils.inRange(0, 0, 0), true);
  assertStrictEquals(NumberUtils.inRange(-0, 0, 0), true);
  assertStrictEquals(NumberUtils.inRange(1, 0, 0), false);
  assertStrictEquals(NumberUtils.inRange(-1, 0, 0), false);

  assertThrows(
    () => {
      NumberUtils.inRange(0, 1, -1);
    },
    RangeError,
    "min, max",
  );

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

  assertThrows(
    () => {
      NumberUtils.inRange(3, 2, 1);
    },
    RangeError,
    "min, max",
  );

  assertThrows(
    () => {
      NumberUtils.inRange(Number.NaN, 0, 0);
    },
    TypeError,
    "test",
  );

  assertThrows(
    () => {
      NumberUtils.inRange(0, Number.NaN, 0);
    },
    TypeError,
    "min",
  );

  assertThrows(
    () => {
      NumberUtils.inRange(0, Number.NaN, Number.NaN);
    },
    TypeError,
    "min",
  );

  assertThrows(
    () => {
      NumberUtils.inRange(0, 0, Number.NaN);
    },
    TypeError,
    "max",
  );
});

Deno.test("NumberUtils.clamp", () => {
  assertStrictEquals(NumberUtils.clamp(0, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(-0, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(1, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(-1, 0, 0), 0);

  assertStrictEquals(NumberUtils.clamp(0, -10, 10), 0);
  assertStrictEquals(NumberUtils.clamp(-0, -10, 10), 0);
  assertStrictEquals(NumberUtils.clamp(-11, -10, 10), -10);
  assertStrictEquals(NumberUtils.clamp(-10.1, -10, 10), -10);
  assertStrictEquals(NumberUtils.clamp(-10, -10, 10), -10);
  assertStrictEquals(NumberUtils.clamp(-9.9, -10, 10), -9.9);
  assertStrictEquals(NumberUtils.clamp(9.9, -10, 10), 9.9);
  assertStrictEquals(NumberUtils.clamp(10, -10, 10), 10);
  assertStrictEquals(NumberUtils.clamp(10.1, -10, 10), 10);
  assertStrictEquals(NumberUtils.clamp(11, -10, 10), 10);

  assertThrows(
    () => {
      NumberUtils.clamp(3, 2, 1);
    },
    RangeError,
    "min, max",
  );
});
