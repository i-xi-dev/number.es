import { assertStrictEquals, assertThrows } from "./deps.ts";
import { IntegerRange } from "../mod.ts";

Deno.test("IntegerRange.equals()", () => {
  const minmax0 = { min: 0, max: 0 };

  assertStrictEquals(IntegerRange.equals(minmax0, minmax0), true);
  assertStrictEquals(IntegerRange.equals({ min: 0, max: 1 }, minmax0), false);
  assertStrictEquals(IntegerRange.equals(minmax0, { min: 0, max: 1 }), false);
  assertStrictEquals(IntegerRange.equals({ min: -1, max: 0 }, minmax0), false);
  assertStrictEquals(IntegerRange.equals(minmax0, { min: -1, max: 0 }), false);
});

//TODO aOverlapsB,aContainsB,fromRangeLike
