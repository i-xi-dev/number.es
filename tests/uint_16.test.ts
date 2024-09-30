import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint16 } from "../mod.ts";

Deno.test("Uint16.bitLength", () => {
  assertStrictEquals(Uint16.bitLength, 16);
});

Deno.test("Uint16.inRange()", () => {
  assertStrictEquals(Uint16.inRange(-1), false);
  assertStrictEquals(Uint16.inRange(-0), true);
  assertStrictEquals(Uint16.inRange(0), true);
  assertStrictEquals(Uint16.inRange(63), true);
  assertStrictEquals(Uint16.inRange(64), true);
  assertStrictEquals(Uint16.inRange(127), true);
  assertStrictEquals(Uint16.inRange(128), true);
  assertStrictEquals(Uint16.inRange(255), true);
  assertStrictEquals(Uint16.inRange(256), true);
  assertStrictEquals(Uint16.inRange(65535), true);
  assertStrictEquals(Uint16.inRange(65536), false);
  assertStrictEquals(Uint16.inRange(0xFFFFFFFF), false);
  assertStrictEquals(Uint16.inRange(0x100000000), false);

  assertStrictEquals(Uint16.inRange(0.1), false);
  assertStrictEquals(Uint16.inRange(0.5), false);
  assertStrictEquals(Uint16.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint16.inRange(false as unknown as number), false);
  assertStrictEquals(Uint16.inRange({} as unknown as number), false);
  assertStrictEquals(Uint16.inRange([] as unknown as number), false);
  assertStrictEquals(Uint16.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint16.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint16.inRange(null as unknown as number), false);
});

Deno.test("Uint16.bitwiseAnd()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0x10000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.bitwiseAnd([0] as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0, 0x10000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.bitwiseAnd(0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint16.bitwiseOr()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.bitwiseOr(0x10000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.bitwiseOr("0" as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.bitwiseOr(0, 0x10000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.bitwiseOr(0, null as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint16.bitwiseXOr()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0x10000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0n as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0, 0x10000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint16.bitwiseXOr(0, [0] as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint16.rotateLeft()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint16`.";
  assertThrows(
    () => {
      Uint16.rotateLeft(0x10000 as number, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint16.rotateLeft(-1 as number, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint16.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint16.byteLength", () => {
  assertStrictEquals(Uint16.byteLength, 2);
});

Deno.test("Uint16.toBytes()", () => {
  assertStrictEquals(
    [...Uint16.toBytes(0)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0, false)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0, true)].map((i) => i.toString()).join(","),
    "0,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "0,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
    "0,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
    "255,0",
  );

  assertStrictEquals(
    [...Uint16.toBytes(0x100)].map((i) => i.toString()).join(","),
    "1,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0x100, false)].map((i) => i.toString()).join(","),
    "1,0",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0x100, true)].map((i) => i.toString()).join(","),
    "0,1",
  );

  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
    "255,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF, false)].map((i) => i.toString()).join(","),
    "255,255",
  );
  assertStrictEquals(
    [...Uint16.toBytes(0xFFFF, true)].map((i) => i.toString()).join(","),
    "255,255",
  );
});