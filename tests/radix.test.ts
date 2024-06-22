import { assertStrictEquals } from "./deps.ts";
import { Radix } from "../mod.ts";

Deno.test("Radix", () => {
  assertStrictEquals(Radix.BINARY, 2);
  assertStrictEquals(Radix.OCTAL, 8);
  assertStrictEquals(Radix.DECIMAL, 10);
  assertStrictEquals(Radix.HEXADECIMAL, 16);
});
