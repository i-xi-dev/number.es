import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint8 } from "../mod.ts";

Deno.test("Uint8.bitwiseAnd(number, number)", () => {
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b0000_0000), 0b0000_0000);

  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b0000_0001), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b0000_0001), 0b0000_0001);

  assertThrows(
    () => {
      Uint8.bitwiseAnd(0x100 as unknown as Uint8, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0, 0x100 as unknown as Uint8);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint8.bitwiseOr(number, number)", () => {
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b0000_0001), 0b0000_0001);

  assertThrows(
    () => {
      Uint8.bitwiseOr(0x100 as unknown as Uint8, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint8.bitwiseOr(0, 0x100 as unknown as Uint8);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint8.bitwiseXOr(number, number)", () => {
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b0000_0001), 0b0000_0000);

  assertThrows(
    () => {
      Uint8.bitwiseXOr(0x100 as unknown as Uint8, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0, 0x100 as unknown as Uint8);
    },
    TypeError,
    "b",
  );
});
