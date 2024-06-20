import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint24 } from "../mod.ts";

Deno.test("Uint24.isUint24(number)", () => {
  assertStrictEquals(Uint24.isUint24(-1), false);
  assertStrictEquals(Uint24.isUint24(-0), true);
  assertStrictEquals(Uint24.isUint24(0), true);
  assertStrictEquals(Uint24.isUint24(63), true);
  assertStrictEquals(Uint24.isUint24(64), true);
  assertStrictEquals(Uint24.isUint24(127), true);
  assertStrictEquals(Uint24.isUint24(128), true);
  assertStrictEquals(Uint24.isUint24(255), true);
  assertStrictEquals(Uint24.isUint24(256), true);
  assertStrictEquals(Uint24.isUint24(65535), true);
  assertStrictEquals(Uint24.isUint24(65536), true);
  assertStrictEquals(Uint24.isUint24(0xFFFFFF), true);
  assertStrictEquals(Uint24.isUint24(0x1000000), false);
  assertStrictEquals(Uint24.isUint24(0xFFFFFFFF), false);
  assertStrictEquals(Uint24.isUint24(0x100000000), false);
  assertStrictEquals(Uint24.isUint24(0.1), false);
});

Deno.test("Uint24.isUint24(any)", () => {
  assertStrictEquals(Uint24.isUint24("0"), false);
  assertStrictEquals(Uint24.isUint24("255"), false);
  assertStrictEquals(Uint24.isUint24(true), false);
  assertStrictEquals(Uint24.isUint24({}), false);
  assertStrictEquals(Uint24.isUint24([]), false);
  assertStrictEquals(Uint24.isUint24([0]), false);
  assertStrictEquals(Uint24.isUint24(undefined), false);
  assertStrictEquals(Uint24.isUint24(null), false);
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

Deno.test("Uint24.saturateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint24.saturateFromSafeInteger(-1), 0);
  assertStrictEquals(Uint24.saturateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint24.saturateFromSafeInteger(0), 0);
  assertStrictEquals(Uint24.saturateFromSafeInteger(0xFFFFFF), 0xFFFFFF);
  assertStrictEquals(Uint24.saturateFromSafeInteger(0x1000000), 0xFFFFFF);

  assertThrows(
    () => {
      Uint24.saturateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.saturateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.saturateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint24.truncateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint24.truncateFromSafeInteger(-1), 0xFFFFFF);
  assertStrictEquals(Uint24.truncateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint24.truncateFromSafeInteger(0), 0);
  assertStrictEquals(Uint24.truncateFromSafeInteger(0xFFFFFF), 0xFFFFFF);
  assertStrictEquals(Uint24.truncateFromSafeInteger(0x1000000), 0);

  // for (let i = 1; i < Number.MAX_SAFE_INTEGER; i = i * 3) {
  //   // console.log(`${i} -> ${i % 256}`);
  //   assertStrictEquals(Uint24.truncateFromSafeInteger(i), Uint8Array.of(i)[0]);
  // }

  // for (let i = -1; i > Number.MIN_SAFE_INTEGER; i = i * 3) {
  //   // console.log(`${i} -> ${256 + (i % 256)}`);
  //   assertStrictEquals(Uint24.truncateFromSafeInteger(i), Uint8Array.of(i)[0]);
  // }

  assertThrows(
    () => {
      Uint24.truncateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.truncateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.truncateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});
