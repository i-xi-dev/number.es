import { assertStrictEquals, assertThrows } from "./deps.ts";
import { clamp, inRange, ZERO } from "../mod.ts";

Deno.test("ZERO", () => {
  assertStrictEquals(ZERO, 0);
});

Deno.test("inRange()", () => {
  assertStrictEquals(inRange(0, 0, 0), true);
  assertStrictEquals(inRange(-0, 0, 0), true);
  assertStrictEquals(inRange(1, 0, 0), false);
  assertStrictEquals(inRange(-1, 0, 0), false);

  assertThrows(
    () => {
      inRange(0, 1, -1);
    },
    RangeError,
    "min, max",
  );

  assertStrictEquals(inRange(9, 10, 20), false);
  assertStrictEquals(inRange(9.9, 10, 20), false);
  assertStrictEquals(inRange(10, 10, 20), true);
  assertStrictEquals(inRange(20, 10, 20), true);
  assertStrictEquals(inRange(20.1, 10, 20), false);
  assertStrictEquals(inRange(21, 10, 20), false);

  assertStrictEquals(inRange(-11, -10, 10), false);
  assertStrictEquals(inRange(-10.1, -10, 10), false);
  assertStrictEquals(inRange(-10, -10, 10), true);
  assertStrictEquals(inRange(-9.9, -10, 10), true);
  assertStrictEquals(inRange(9.9, -10, 10), true);
  assertStrictEquals(inRange(10, -10, 10), true);
  assertStrictEquals(inRange(10.1, -10, 10), false);
  assertStrictEquals(inRange(11, -10, 10), false);

  assertThrows(
    () => {
      inRange(3, 2, 1);
    },
    RangeError,
    "min, max",
  );

  assertThrows(
    () => {
      inRange(Number.NaN, 0, 0);
    },
    TypeError,
    "test",
  );

  assertThrows(
    () => {
      inRange(0, Number.NaN, 0);
    },
    TypeError,
    "min",
  );

  assertThrows(
    () => {
      inRange(0, Number.NaN, Number.NaN);
    },
    TypeError,
    "min",
  );

  assertThrows(
    () => {
      inRange(0, 0, Number.NaN);
    },
    TypeError,
    "max",
  );
});

Deno.test("clamp()", () => {
  assertStrictEquals(clamp(0, 0, 0), 0);
  assertStrictEquals(clamp(-0, 0, 0), 0);
  assertStrictEquals(clamp(1, 0, 0), 0);
  assertStrictEquals(clamp(-1, 0, 0), 0);

  assertStrictEquals(clamp(0, -10, 10), 0);
  assertStrictEquals(clamp(-0, -10, 10), 0);
  assertStrictEquals(clamp(-11, -10, 10), -10);
  assertStrictEquals(clamp(-10.1, -10, 10), -10);
  assertStrictEquals(clamp(-10, -10, 10), -10);
  assertStrictEquals(clamp(-9.9, -10, 10), -9.9);
  assertStrictEquals(clamp(9.9, -10, 10), 9.9);
  assertStrictEquals(clamp(10, -10, 10), 10);
  assertStrictEquals(clamp(10.1, -10, 10), 10);
  assertStrictEquals(clamp(11, -10, 10), 10);

  assertThrows(
    () => {
      clamp(3, 2, 1);
    },
    RangeError,
    "min, max",
  );
});
