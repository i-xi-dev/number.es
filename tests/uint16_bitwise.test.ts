import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint16 } from "../mod.ts";

Deno.test("Uint16.bitwiseAnd(number, number)", () => {
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );

  assertStrictEquals(
    Uint16.bitwiseAnd(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseAnd(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0001,
  );

  assertThrows(
    () => {
      Uint16.bitwiseAnd(0x10000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0, 0x10000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint16.bitwiseOr(number, number)", () => {
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint16.bitwiseOr(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseOr(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0001,
  );

  assertThrows(
    () => {
      Uint16.bitwiseOr(0x10000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint16.bitwiseOr(0, 0x10000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint16.bitwiseXOr(number, number)", () => {
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint16.bitwiseXOr(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint16.bitwiseXOr(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0000,
  );

  assertThrows(
    () => {
      Uint16.bitwiseXOr(0x10000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0, 0x10000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint16.rotateLeft(number, number)", () => {
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 0),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 1),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 2),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 3),
    0b00000000_00000100,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 4),
    0b00000000_00001000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 5),
    0b00000000_00010000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 6),
    0b00000000_00100000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 7),
    0b00000000_01000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 8),
    0b00000000_10000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 9),
    0b00000001_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 10),
    0b00000010_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 11),
    0b00000100_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 12),
    0b00001000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 13),
    0b00010000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 14),
    0b00100000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 15),
    0b01000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 16),
    0b10000000_00000000,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 0),
    0b01111111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 1),
    0b11111111_11111110,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 2),
    0b11111111_11111101,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 3),
    0b11111111_11111011,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 4),
    0b11111111_11110111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 5),
    0b11111111_11101111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 6),
    0b11111111_11011111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 7),
    0b11111111_10111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 8),
    0b11111111_01111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 9),
    0b11111110_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 10),
    0b11111101_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 11),
    0b11111011_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 12),
    0b11110111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 13),
    0b11101111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 14),
    0b11011111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 15),
    0b10111111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 16),
    0b01111111_11111111,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -17),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -16),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -1),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 0),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 1),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 2),
    0b00000000_00000100,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 3),
    0b00000000_00001000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 4),
    0b00000000_00010000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 5),
    0b00000000_00100000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 6),
    0b00000000_01000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 7),
    0b00000000_10000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 8),
    0b00000001_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 9),
    0b00000010_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 10),
    0b00000100_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 11),
    0b00001000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 12),
    0b00010000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 13),
    0b00100000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 14),
    0b01000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 15),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 16),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 17),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 32),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 33),
    0b00000000_00000010,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b11111111_11111111, 1),
    0b11111111_11111111,
  );

  assertStrictEquals(Uint16.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint16.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint16.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint16.rotateLeft(0, 101), 0);

  assertThrows(
    () => {
      Uint16.rotateLeft(0x10000 as Uint16, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.rotateLeft(-1 as Uint16, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.rotateLeft(0xFFFF, 3.1);
    },
    TypeError,
    "amount",
  );
});
