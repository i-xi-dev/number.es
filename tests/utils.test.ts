import { assertStrictEquals } from "./deps.ts";
import { isString } from "../src/utils.ts";

Deno.test("isString()", () => {
  assertStrictEquals(isString(0), false);
  assertStrictEquals(isString(0n), false);
  assertStrictEquals(isString(Number.NaN), false);
  assertStrictEquals(isString(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isString(Number.MAX_SAFE_INTEGER), false);
  assertStrictEquals(isString(Number.MIN_SAFE_INTEGER), false);
  assertStrictEquals(isString(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isString(undefined), false);
  assertStrictEquals(isString(null), false);
  assertStrictEquals(isString(true), false);
  assertStrictEquals(isString(false), false);
  assertStrictEquals(isString(""), true);
  assertStrictEquals(isString("0"), true);
});
