import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint6 } from "../mod.ts";

Deno.test("Uint6.bitwiseAnd(number, number)", () => {
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b0000_00), 0b0000_00);

  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b0000_01), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b0000_01), 0b0000_01);

  assertThrows(
    () => {
      Uint6.bitwiseAnd(0x100 as unknown as Uint6, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, 0x100 as unknown as Uint6);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint6.bitwiseOr(number, number)", () => {
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b0000_01), 0b0000_01);

  assertThrows(
    () => {
      Uint6.bitwiseOr(0x100 as unknown as Uint6, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, 0x100 as unknown as Uint6);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint6.bitwiseXOr(number, number)", () => {
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b0000_01), 0b0000_00);

  assertThrows(
    () => {
      Uint6.bitwiseXOr(0x100 as unknown as Uint6, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, 0x100 as unknown as Uint6);
    },
    TypeError,
    "b",
  );
});
