import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint16 } from "../mod.ts";

Deno.test("Uint16.isUint16(number)", () => {
  assertStrictEquals(Uint16.isUint16(-1), false);
  assertStrictEquals(Uint16.isUint16(-0), true);
  assertStrictEquals(Uint16.isUint16(0), true);
  assertStrictEquals(Uint16.isUint16(63), true);
  assertStrictEquals(Uint16.isUint16(64), true);
  assertStrictEquals(Uint16.isUint16(127), true);
  assertStrictEquals(Uint16.isUint16(128), true);
  assertStrictEquals(Uint16.isUint16(255), true);
  assertStrictEquals(Uint16.isUint16(256), true);
  assertStrictEquals(Uint16.isUint16(65535), true);
  assertStrictEquals(Uint16.isUint16(65536), false);
  assertStrictEquals(Uint16.isUint16(0xFFFFFFFF), false);
  assertStrictEquals(Uint16.isUint16(0x100000000), false);
  assertStrictEquals(Uint16.isUint16(0.1), false);
});

Deno.test("Uint16.isUint16(any)", () => {
  assertStrictEquals(Uint16.isUint16("0"), false);
  assertStrictEquals(Uint16.isUint16("255"), false);
  assertStrictEquals(Uint16.isUint16(true), false);
  assertStrictEquals(Uint16.isUint16({}), false);
  assertStrictEquals(Uint16.isUint16([]), false);
  assertStrictEquals(Uint16.isUint16([0]), false);
  assertStrictEquals(Uint16.isUint16(undefined), false);
  assertStrictEquals(Uint16.isUint16(null), false);
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
    Uint16.rotateLeft(0b11111111_11111111, 1),
    0b11111111_11111111,
  );

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
      Uint16.rotateLeft(0xFFFF, 17 as 16);
    },
    TypeError,
    "amount",
  );
});
