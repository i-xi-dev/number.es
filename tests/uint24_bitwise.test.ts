import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint24 } from "../mod.ts";

Deno.test("Uint24.bitwiseAnd(number, number)", () => {
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );

  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0001,
  );

  assertThrows(
    () => {
      Uint24.bitwiseAnd(0x1000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0, 0x1000000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint24.bitwiseOr(number, number)", () => {
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseOr(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0001,
  );

  assertThrows(
    () => {
      Uint24.bitwiseOr(0x1000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint24.bitwiseOr(0, 0x1000000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint24.bitwiseXOr(number, number)", () => {
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint24.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );

  assertThrows(
    () => {
      Uint24.bitwiseXOr(0x1000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0, 0x1000000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint24.rotateLeft(number, number)", () => {
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 0),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 1),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 2),
    0b00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 3),
    0b00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 4),
    0b00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 5),
    0b00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 6),
    0b00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 7),
    0b00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 8),
    0b00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 9),
    0b00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 10),
    0b00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 11),
    0b00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 12),
    0b00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 13),
    0b00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 14),
    0b00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 15),
    0b00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 16),
    0b00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 17),
    0b00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 18),
    0b00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 19),
    0b00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 20),
    0b00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 21),
    0b00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 22),
    0b00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 23),
    0b01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b10000000_00000000_00000000, 24),
    0b10000000_00000000_00000000,
  );

  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 0),
    0b01111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 1),
    0b11111111_11111111_11111110,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 2),
    0b11111111_11111111_11111101,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 3),
    0b11111111_11111111_11111011,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 4),
    0b11111111_11111111_11110111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 5),
    0b11111111_11111111_11101111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 6),
    0b11111111_11111111_11011111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 7),
    0b11111111_11111111_10111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 8),
    0b11111111_11111111_01111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 9),
    0b11111111_11111110_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 10),
    0b11111111_11111101_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 11),
    0b11111111_11111011_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 12),
    0b11111111_11110111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 13),
    0b11111111_11101111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 14),
    0b11111111_11011111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 15),
    0b11111111_10111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 16),
    0b11111111_01111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 17),
    0b11111110_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 18),
    0b11111101_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 19),
    0b11111011_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 20),
    0b11110111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 21),
    0b11101111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 22),
    0b11011111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 23),
    0b10111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b01111111_11111111_11111111, 24),
    0b01111111_11111111_11111111,
  );

  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, -25),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, -24),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, -1),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 0),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 1),
    0b00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 2),
    0b00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 3),
    0b00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 4),
    0b00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 5),
    0b00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 6),
    0b00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 7),
    0b00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 8),
    0b00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 9),
    0b00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 10),
    0b00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 11),
    0b00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 12),
    0b00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 13),
    0b00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 14),
    0b00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 15),
    0b00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 16),
    0b00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 17),
    0b00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 18),
    0b00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 19),
    0b00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 20),
    0b00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 21),
    0b00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 22),
    0b01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 23),
    0b10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 24),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 25),
    0b00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 48),
    0b00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint24.rotateLeft(0b00000000_00000000_00000001, 49),
    0b00000000_00000000_00000010,
  );

  assertStrictEquals(
    Uint24.rotateLeft(0b11111111_11111111_11111111, 1),
    0b11111111_11111111_11111111,
  );

  assertStrictEquals(Uint24.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint24.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint24.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint24.rotateLeft(0, 101), 0);

  assertThrows(
    () => {
      Uint24.rotateLeft(0x100000000 as Uint24, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.rotateLeft(-1 as Uint24, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.rotateLeft(0xFFFF, 3.1);
    },
    TypeError,
    "amount",
  );
});
