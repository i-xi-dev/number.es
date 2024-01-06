import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint32 } from "../mod.ts";

Deno.test("Uint32.isUint32(number)", () => {
  assertStrictEquals(Uint32.isUint32(-1), false);
  assertStrictEquals(Uint32.isUint32(-0), true);
  assertStrictEquals(Uint32.isUint32(0), true);
  assertStrictEquals(Uint32.isUint32(63), true);
  assertStrictEquals(Uint32.isUint32(64), true);
  assertStrictEquals(Uint32.isUint32(127), true);
  assertStrictEquals(Uint32.isUint32(128), true);
  assertStrictEquals(Uint32.isUint32(255), true);
  assertStrictEquals(Uint32.isUint32(256), true);
  assertStrictEquals(Uint32.isUint32(65535), true);
  assertStrictEquals(Uint32.isUint32(65536), true);
  assertStrictEquals(Uint32.isUint32(0xFFFFFFFF), true);
  assertStrictEquals(Uint32.isUint32(0x100000000), false);
  assertStrictEquals(Uint32.isUint32(0.1), false);
});

Deno.test("Uint32.isUint32(any)", () => {
  assertStrictEquals(Uint32.isUint32("0"), false);
  assertStrictEquals(Uint32.isUint32("255"), false);
  assertStrictEquals(Uint32.isUint32(true), false);
  assertStrictEquals(Uint32.isUint32({}), false);
  assertStrictEquals(Uint32.isUint32([]), false);
  assertStrictEquals(Uint32.isUint32([0]), false);
  assertStrictEquals(Uint32.isUint32(undefined), false);
  assertStrictEquals(Uint32.isUint32(null), false);
});

Deno.test("Uint32.rotateLeft(number, number)", () => {
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 0),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 1),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 2),
    0b00000000_00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 3),
    0b00000000_00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 4),
    0b00000000_00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 5),
    0b00000000_00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 6),
    0b00000000_00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 7),
    0b00000000_00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 8),
    0b00000000_00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 9),
    0b00000000_00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 10),
    0b00000000_00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 11),
    0b00000000_00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 12),
    0b00000000_00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 13),
    0b00000000_00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 14),
    0b00000000_00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 15),
    0b00000000_00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 16),
    0b00000000_00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 17),
    0b00000000_00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 18),
    0b00000000_00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 19),
    0b00000000_00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 20),
    0b00000000_00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 21),
    0b00000000_00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 22),
    0b00000000_00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 23),
    0b00000000_01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 24),
    0b00000000_10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 25),
    0b00000001_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 26),
    0b00000010_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 27),
    0b00000100_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 28),
    0b00001000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 29),
    0b00010000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 30),
    0b00100000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 31),
    0b01000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b10000000_00000000_00000000_00000000, 32),
    0b10000000_00000000_00000000_00000000,
  );

  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 0),
    0b01111111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 1),
    0b11111111_11111111_11111111_11111110,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 2),
    0b11111111_11111111_11111111_11111101,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 3),
    0b11111111_11111111_11111111_11111011,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 4),
    0b11111111_11111111_11111111_11110111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 5),
    0b11111111_11111111_11111111_11101111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 6),
    0b11111111_11111111_11111111_11011111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 7),
    0b11111111_11111111_11111111_10111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 8),
    0b11111111_11111111_11111111_01111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 9),
    0b11111111_11111111_11111110_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 10),
    0b11111111_11111111_11111101_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 11),
    0b11111111_11111111_11111011_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 12),
    0b11111111_11111111_11110111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 13),
    0b11111111_11111111_11101111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 14),
    0b11111111_11111111_11011111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 15),
    0b11111111_11111111_10111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 16),
    0b11111111_11111111_01111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 17),
    0b11111111_11111110_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 18),
    0b11111111_11111101_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 19),
    0b11111111_11111011_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 20),
    0b11111111_11110111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 21),
    0b11111111_11101111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 22),
    0b11111111_11011111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 23),
    0b11111111_10111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 24),
    0b11111111_01111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 25),
    0b11111110_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 26),
    0b11111101_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 27),
    0b11111011_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 28),
    0b11110111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 29),
    0b11101111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 30),
    0b11011111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 31),
    0b10111111_11111111_11111111_11111111,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b01111111_11111111_11111111_11111111, 32),
    0b01111111_11111111_11111111_11111111,
  );

  assertStrictEquals(
    Uint32.rotateLeft(0b11111111_11111111_11111111_11111111, 1),
    0b11111111_11111111_11111111_11111111,
  );

  assertThrows(
    () => {
      Uint32.rotateLeft(0x100000000 as Uint32, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.rotateLeft(-1 as Uint32, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.rotateLeft(0xFFFFFFFF, 33 as 32);
    },
    TypeError,
    "amount",
  );
});
