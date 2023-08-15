import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Integer } from "../mod.ts";

Deno.test("Integer.isPositiveInteger(number)", () => {
  assertStrictEquals(Integer.isPositiveInteger(-1), false);
  assertStrictEquals(Integer.isPositiveInteger(-0), false);
  assertStrictEquals(Integer.isPositiveInteger(0), false);
  assertStrictEquals(Integer.isPositiveInteger(1), true);
  assertStrictEquals(Integer.isPositiveInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isPositiveInteger(1.1), false);
  assertStrictEquals(Integer.isPositiveInteger(Number.NaN), false);
  assertStrictEquals(
    Integer.isPositiveInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isPositiveInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isPositiveInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("Integer.isPositiveInteger(any)", () => {
  assertStrictEquals(Integer.isPositiveInteger("1"), false);
  assertStrictEquals(Integer.isPositiveInteger(true), false);
});

Deno.test("Integer.isNonNegativeInteger(number)", () => {
  assertStrictEquals(Integer.isNonNegativeInteger(-1), false);
  assertStrictEquals(Integer.isNonNegativeInteger(-0), true);
  assertStrictEquals(Integer.isNonNegativeInteger(0), true);
  assertStrictEquals(Integer.isNonNegativeInteger(1), true);
  assertStrictEquals(
    Integer.isNonNegativeInteger(Number.MAX_SAFE_INTEGER),
    true,
  );
  assertStrictEquals(Integer.isNonNegativeInteger(1.1), false);
  assertStrictEquals(Integer.isNonNegativeInteger(Number.NaN), false);
  assertStrictEquals(
    Integer.isNonNegativeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isNonNegativeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isNonNegativeInteger(Number.MIN_SAFE_INTEGER),
    false,
  );
});

Deno.test("Integer.isNonNegativeInteger(any)", () => {
  assertStrictEquals(Integer.isNonNegativeInteger("1"), false);
  assertStrictEquals(Integer.isNonNegativeInteger(true), false);
});

Deno.test("Integer.isNonPositiveInteger(number)", () => {
  assertStrictEquals(Integer.isNonPositiveInteger(-1), true);
  assertStrictEquals(Integer.isNonPositiveInteger(-0), true);
  assertStrictEquals(Integer.isNonPositiveInteger(0), true);
  assertStrictEquals(Integer.isNonPositiveInteger(1), false);
  assertStrictEquals(
    Integer.isNonPositiveInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(Integer.isNonPositiveInteger(1.1), false);
  assertStrictEquals(Integer.isNonPositiveInteger(Number.NaN), false);
  assertStrictEquals(
    Integer.isNonPositiveInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isNonPositiveInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isNonPositiveInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("Integer.isNonPositiveInteger(any)", () => {
  assertStrictEquals(Integer.isNonPositiveInteger("1"), false);
  assertStrictEquals(Integer.isNonPositiveInteger(true), false);
});

Deno.test("Integer.isNegativeInteger(number)", () => {
  assertStrictEquals(Integer.isNegativeInteger(-1), true);
  assertStrictEquals(Integer.isNegativeInteger(-0), false);
  assertStrictEquals(Integer.isNegativeInteger(0), false);
  assertStrictEquals(Integer.isNegativeInteger(1), false);
  assertStrictEquals(
    Integer.isNegativeInteger(Number.MAX_SAFE_INTEGER),
    false,
  );
  assertStrictEquals(Integer.isNegativeInteger(1.1), false);
  assertStrictEquals(Integer.isNegativeInteger(Number.NaN), false);
  assertStrictEquals(
    Integer.isNegativeInteger(Number.POSITIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isNegativeInteger(Number.NEGATIVE_INFINITY),
    false,
  );
  assertStrictEquals(
    Integer.isNegativeInteger(Number.MIN_SAFE_INTEGER),
    true,
  );
});

Deno.test("Integer.isNegativeInteger(any)", () => {
  assertStrictEquals(Integer.isNegativeInteger("1"), false);
  assertStrictEquals(Integer.isNegativeInteger(true), false);
});

Deno.test("Integer.fromString(string)", () => {
  assertStrictEquals(Integer.fromString("1"), 1);
  assertStrictEquals(Integer.fromString("0"), 0);
  assertStrictEquals(Integer.fromString("-0"), -0);
  assertStrictEquals(Integer.fromString("-1"), -1);

  assertThrows(
    () => {
      Integer.fromString("");
    },
    TypeError,
    "s",
  );
  assertThrows(
    () => {
      Integer.fromString("-");
    },
    TypeError,
    "s",
  );
  assertThrows(
    () => {
      Integer.fromString("1.0");
    },
    TypeError,
    "s",
  );
});

Deno.test("Integer.fromString(any)", () => {
  assertThrows(
    () => {
      Integer.fromString(1 as unknown as string);
    },
    TypeError,
    "s",
  );
});

Deno.test("Integer.toString(number)", () => {
  assertStrictEquals(Integer.toString(1.0), "1");
  assertStrictEquals(Integer.toString(1), "1");
  assertStrictEquals(Integer.toString(0), "0");
  assertStrictEquals(Integer.toString(-0), "-0");
  assertStrictEquals(Integer.toString(-1), "-1");

  assertThrows(
    () => {
      Integer.toString(1.1);
    },
    TypeError,
    "i",
  );
});

Deno.test("Integer.toString(any)", () => {
  assertThrows(
    () => {
      Integer.toString("1" as unknown as number);
    },
    TypeError,
    "i",
  );
});
