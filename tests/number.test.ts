import { assertStrictEquals, assertThrows } from "./deps.ts";
import { NumberUtils } from "../mod.ts";

Deno.test("NumberUtils.clamp()", () => {
  assertStrictEquals(NumberUtils.clamp(0, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(0.5, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(1, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(-0.5, 0, 0), 0);
  assertStrictEquals(NumberUtils.clamp(-1, 0, 0), 0);

  assertStrictEquals(NumberUtils.clamp(0, 1, 2), 1);
  assertStrictEquals(NumberUtils.clamp(0.5, 1, 2), 1);
  assertStrictEquals(NumberUtils.clamp(1, 1, 2), 1);
  assertStrictEquals(NumberUtils.clamp(1.5, 1, 2), 1.5);
  assertStrictEquals(NumberUtils.clamp(2, 1, 2), 2);
  assertStrictEquals(NumberUtils.clamp(2.5, 1, 2), 2);
  assertStrictEquals(NumberUtils.clamp(-0.5, 1, 2), 1);
  assertStrictEquals(NumberUtils.clamp(-1, 1, 2), 1);

  assertStrictEquals(NumberUtils.clamp(0, 0.5, 2), 0.5);
  assertStrictEquals(NumberUtils.clamp(0.5, 0.5, 2), 0.5);
  assertStrictEquals(NumberUtils.clamp(1, 0.5, 2), 1);
  assertStrictEquals(NumberUtils.clamp(1.5, 0.5, 2), 1.5);
  assertStrictEquals(NumberUtils.clamp(2, 0.5, 2), 2);
  assertStrictEquals(NumberUtils.clamp(2.5, 0.5, 2), 2);
  assertStrictEquals(NumberUtils.clamp(-0.5, 0.5, 2), 0.5);
  assertStrictEquals(NumberUtils.clamp(-1, 0.5, 2), 0.5);
});
