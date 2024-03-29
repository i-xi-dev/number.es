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
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, -33),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, -32),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, -1),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 0),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 1),
    0b00000000_00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 2),
    0b00000000_00000000_00000000_00000100,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 3),
    0b00000000_00000000_00000000_00001000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 4),
    0b00000000_00000000_00000000_00010000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 5),
    0b00000000_00000000_00000000_00100000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 6),
    0b00000000_00000000_00000000_01000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 7),
    0b00000000_00000000_00000000_10000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 8),
    0b00000000_00000000_00000001_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 9),
    0b00000000_00000000_00000010_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 10),
    0b00000000_00000000_00000100_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 11),
    0b00000000_00000000_00001000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 12),
    0b00000000_00000000_00010000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 13),
    0b00000000_00000000_00100000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 14),
    0b00000000_00000000_01000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 15),
    0b00000000_00000000_10000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 16),
    0b00000000_00000001_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 17),
    0b00000000_00000010_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 18),
    0b00000000_00000100_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 19),
    0b00000000_00001000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 20),
    0b00000000_00010000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 21),
    0b00000000_00100000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 22),
    0b00000000_01000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 23),
    0b00000000_10000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 24),
    0b00000001_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 25),
    0b00000010_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 26),
    0b00000100_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 27),
    0b00001000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 28),
    0b00010000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 29),
    0b00100000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 30),
    0b01000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 31),
    0b10000000_00000000_00000000_00000000,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 32),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 33),
    0b00000000_00000000_00000000_00000010,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 64),
    0b00000000_00000000_00000000_00000001,
  );
  assertStrictEquals(
    Uint32.rotateLeft(0b00000000_00000000_00000000_00000001, 65),
    0b00000000_00000000_00000000_00000010,
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
      Uint32.rotateLeft(0xFFFFFFFF, 3.1);
    },
    TypeError,
    "amount",
  );
});

Deno.test("Uint32.saturateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint32.saturateFromSafeInteger(-1), 0);
  assertStrictEquals(Uint32.saturateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint32.saturateFromSafeInteger(0), 0);
  assertStrictEquals(Uint32.saturateFromSafeInteger(255), 255);
  assertStrictEquals(Uint32.saturateFromSafeInteger(256), 256);
  assertStrictEquals(Uint32.saturateFromSafeInteger(65535), 65535);
  assertStrictEquals(Uint32.saturateFromSafeInteger(65536), 65536);
  assertStrictEquals(Uint32.saturateFromSafeInteger(0xFFFFFFFF), 0xFFFFFFFF);
  assertStrictEquals(Uint32.saturateFromSafeInteger(0x100000000), 0xFFFFFFFF);

  assertThrows(
    () => {
      Uint32.saturateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.saturateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.saturateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint32.truncateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint32.truncateFromSafeInteger(-1), Uint32Array.of(-1)[0]);
  assertStrictEquals(Uint32.truncateFromSafeInteger(-0), Uint32Array.of(-0)[0]);
  assertStrictEquals(Uint32.truncateFromSafeInteger(0), Uint32Array.of(0)[0]);
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(255),
    Uint32Array.of(255)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(256),
    Uint32Array.of(256)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(65535),
    Uint32Array.of(65535)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(65536),
    Uint32Array.of(65536)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(0xFFFFFFFF),
    Uint32Array.of(0xFFFFFFFF)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(0x100000000),
    Uint32Array.of(0x100000000)[0],
  );

  for (let i = 1; i < Number.MAX_SAFE_INTEGER; i = i * 3) {
    // console.log(`${i} -> ${i % 0x100000000}`);
    assertStrictEquals(Uint32.truncateFromSafeInteger(i), Uint32Array.of(i)[0]);
  }

  for (let i = -1; i > Number.MIN_SAFE_INTEGER; i = i * 3) {
    // console.log(`${i} -> ${0x100000000 + (i % 0x100000000)}`);
    assertStrictEquals(Uint32.truncateFromSafeInteger(i), Uint32Array.of(i)[0]);
  }

  assertThrows(
    () => {
      Uint32.truncateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.truncateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.truncateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint32.toBytes(number)", () => {
  assertStrictEquals(Uint32.toBytes(0).join(","), "0,0,0,0");
  assertStrictEquals(Uint32.toBytes(1).join(","), "0,0,0,1");
  assertStrictEquals(Uint32.toBytes(10).join(","), "0,0,0,10");
  assertStrictEquals(Uint32.toBytes(20).join(","), "0,0,0,20");
  assertStrictEquals(Uint32.toBytes(50).join(","), "0,0,0,50");
  assertStrictEquals(Uint32.toBytes(100).join(","), "0,0,0,100");
  assertStrictEquals(Uint32.toBytes(110).join(","), "0,0,0,110");
  assertStrictEquals(Uint32.toBytes(127).join(","), "0,0,0,127");
  assertStrictEquals(Uint32.toBytes(128).join(","), "0,0,0,128");
  assertStrictEquals(Uint32.toBytes(200).join(","), "0,0,0,200");
  assertStrictEquals(Uint32.toBytes(0xFF).join(","), "0,0,0,255");
  assertStrictEquals(Uint32.toBytes(0x100).join(","), "0,0,1,0");
  assertStrictEquals(Uint32.toBytes(0x1FF).join(","), "0,0,1,255");
  assertStrictEquals(Uint32.toBytes(0x200).join(","), "0,0,2,0");
  assertStrictEquals(Uint32.toBytes(0xFFFE).join(","), "0,0,255,254");
  assertStrictEquals(Uint32.toBytes(0xFFFF).join(","), "0,0,255,255");
  assertStrictEquals(Uint32.toBytes(0x10000).join(","), "0,1,0,0");
  assertStrictEquals(Uint32.toBytes(0x10001).join(","), "0,1,0,1");
  assertStrictEquals(Uint32.toBytes(0x10100).join(","), "0,1,1,0");
  assertStrictEquals(Uint32.toBytes(0x1FFFF).join(","), "0,1,255,255");
  assertStrictEquals(Uint32.toBytes(0xFFFFFF).join(","), "0,255,255,255");
  assertStrictEquals(Uint32.toBytes(0x1000000).join(","), "1,0,0,0");
  assertStrictEquals(Uint32.toBytes(0xFF000000).join(","), "255,0,0,0");
  assertStrictEquals(Uint32.toBytes(0xFFFFFFFF).join(","), "255,255,255,255");

  // const bx = new ArrayBuffer(4);
  // const bxv = new DataView(bx);
  // const bxv2 = new Uint8Array(bx);
  // const start = 0x8F000000;
  // const end = 0x8FFFFFFF;
  // for (let i = start; i <= end; i++) {
  //   bxv.setUint32(0, i);
  //   assertStrictEquals(Uint32.toBytes(i).join(","), [...bxv2].join(","));
  // }

  assertThrows(
    () => {
      Uint32.toBytes(-1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.toBytes(0x100000000);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.toBytes(1.5);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.toBytes("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});
