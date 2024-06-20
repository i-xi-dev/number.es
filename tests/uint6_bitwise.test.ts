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

Deno.test("Uint6.rotateLeft(number, number)", () => {
  assertStrictEquals(Uint6.rotateLeft(0b100000, 0), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 1), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 2), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 3), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 4), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 5), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 6), 0b100000);

  assertStrictEquals(Uint6.rotateLeft(0b011111, 0), 0b011111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 1), 0b111110);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 2), 0b111101);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 3), 0b111011);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 4), 0b110111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 5), 0b101111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 6), 0b011111);

  assertStrictEquals(Uint6.rotateLeft(0b000001, -1), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 0), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 1), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 2), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 3), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 4), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 5), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 6), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 7), 0b000010);

  assertStrictEquals(Uint6.rotateLeft(0b111111, 1), 0b111111);

  assertStrictEquals(Uint6.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 101), 0);

  assertThrows(
    () => {
      Uint6.rotateLeft(0x40 as Uint6, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint6.rotateLeft(-1 as Uint6, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint6.rotateLeft(0x3F, 3.1);
    },
    TypeError,
    "amount",
  );
});
