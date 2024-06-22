import { assertStrictEquals, assertThrows } from "./deps.ts";
import { NumberEx, Radix } from "../mod.ts";

const {
  isEvenInteger,
  isNumber,
  isOddInteger,
} = NumberEx;

Deno.test("Radix", () => {
  assertStrictEquals(Radix.BINARY, 2);
  assertStrictEquals(Radix.OCTAL, 8);
  assertStrictEquals(Radix.DECIMAL, 10);
  assertStrictEquals(Radix.HEXADECIMAL, 16);
});

Deno.test("isNumber()", () => {
  assertStrictEquals(isNumber(0), true);
  assertStrictEquals(isNumber(-0), true);
  assertStrictEquals(isNumber(1), true);
  assertStrictEquals(isNumber(-1), true);

  assertStrictEquals(isNumber(-10.1), true);
  assertStrictEquals(isNumber(-9.9), true);
  assertStrictEquals(isNumber(9.9), true);
  assertStrictEquals(isNumber(10.1), true);

  assertStrictEquals(isNumber(Number.NaN), true);
  assertStrictEquals(isNumber(Number.POSITIVE_INFINITY), true);
  assertStrictEquals(isNumber(Number.NEGATIVE_INFINITY), true);

  assertStrictEquals(isNumber(undefined), false);
  assertStrictEquals(isNumber(null), false);
  assertStrictEquals(isNumber(0n), false);
  assertStrictEquals(isNumber(""), false);
  assertStrictEquals(isNumber("0"), false);
});

Deno.test("isOddInteger()", () => {
  assertStrictEquals(isOddInteger(0), false);
  assertStrictEquals(isOddInteger(-0), false);
  assertStrictEquals(isOddInteger(1), true);
  assertStrictEquals(isOddInteger(-1), true);
  assertStrictEquals(isOddInteger(2), false);
  assertStrictEquals(isOddInteger(-2), false);
  assertStrictEquals(isOddInteger(3), true);
  assertStrictEquals(isOddInteger(-3), true);

  assertStrictEquals(isOddInteger(-10.1), false);
  assertStrictEquals(isOddInteger(-9.9), false);
  assertStrictEquals(isOddInteger(9.9), false);
  assertStrictEquals(isOddInteger(10.1), false);

  assertStrictEquals(isOddInteger(Number.NaN), false);
  assertStrictEquals(isOddInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isOddInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isOddInteger(undefined), false);
  assertStrictEquals(isOddInteger(null), false);
  assertStrictEquals(isOddInteger(0n), false);
  assertStrictEquals(isOddInteger(""), false);
  assertStrictEquals(isOddInteger("0"), false);
});

Deno.test("isEvenInteger()", () => {
  assertStrictEquals(isEvenInteger(0), true);
  assertStrictEquals(isEvenInteger(-0), true);
  assertStrictEquals(isEvenInteger(1), false);
  assertStrictEquals(isEvenInteger(-1), false);
  assertStrictEquals(isEvenInteger(2), true);
  assertStrictEquals(isEvenInteger(-2), true);
  assertStrictEquals(isEvenInteger(3), false);
  assertStrictEquals(isEvenInteger(-3), false);

  assertStrictEquals(isEvenInteger(-10.1), false);
  assertStrictEquals(isEvenInteger(-9.9), false);
  assertStrictEquals(isEvenInteger(9.9), false);
  assertStrictEquals(isEvenInteger(10.1), false);

  assertStrictEquals(isEvenInteger(Number.NaN), false);
  assertStrictEquals(isEvenInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isEvenInteger(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isEvenInteger(undefined), false);
  assertStrictEquals(isEvenInteger(null), false);
  assertStrictEquals(isEvenInteger(0n), false);
  assertStrictEquals(isEvenInteger(""), false);
  assertStrictEquals(isEvenInteger("0"), false);
});
