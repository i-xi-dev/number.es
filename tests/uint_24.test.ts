import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint24 } from "../mod.ts";

Deno.test("Uint24.bitLength", () => {
  assertStrictEquals(Uint24.bitLength, 24);
});

Deno.test("Uint24.inRange()", () => {
  assertStrictEquals(Uint24.inRange(-1), false);
  assertStrictEquals(Uint24.inRange(-0), true);
  assertStrictEquals(Uint24.inRange(0), true);
  assertStrictEquals(Uint24.inRange(63), true);
  assertStrictEquals(Uint24.inRange(64), true);
  assertStrictEquals(Uint24.inRange(127), true);
  assertStrictEquals(Uint24.inRange(128), true);
  assertStrictEquals(Uint24.inRange(255), true);
  assertStrictEquals(Uint24.inRange(256), true);
  assertStrictEquals(Uint24.inRange(65535), true);
  assertStrictEquals(Uint24.inRange(65536), true);
  assertStrictEquals(Uint24.inRange(0xFFFFFF), true);
  assertStrictEquals(Uint24.inRange(0x1000000), false);
  assertStrictEquals(Uint24.inRange(0xFFFFFFFF), false);
  assertStrictEquals(Uint24.inRange(0x100000000), false);

  assertStrictEquals(Uint24.inRange(0.1), false);
  assertStrictEquals(Uint24.inRange(0.5), false);
  assertStrictEquals(Uint24.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint24.inRange(false as unknown as number), false);
  assertStrictEquals(Uint24.inRange({} as unknown as number), false);
  assertStrictEquals(Uint24.inRange([] as unknown as number), false);
  assertStrictEquals(Uint24.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint24.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint24.inRange(null as unknown as number), false);
});

Deno.test("Uint24.bitwiseAnd()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0x1000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.bitwiseAnd([0] as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0, 0x1000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint24.bitwiseOr()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.bitwiseOr(0x1000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.bitwiseOr("0" as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.bitwiseOr(0, 0x1000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.bitwiseOr(0, null as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint24.bitwiseXOr()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0x1000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0n as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0, 0x1000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0, [0] as unknown as number);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint24.rotateLeft()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.rotateLeft(0x100000000 as number, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.rotateLeft(-1 as number, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint24.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint24.toNumber()", () => {
  assertStrictEquals(Uint24.toNumber(0), 0);
  assertStrictEquals(Uint24.toNumber(-0), 0);
  assertStrictEquals(Object.is(Uint24.toNumber(-0), 0), true);
  assertStrictEquals(Uint24.toNumber(0xFFFFFF), 0xFFFFFF);

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.toNumber(0x1000000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toNumber(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toNumber(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint24.toBigInt()", () => {
  assertStrictEquals(Uint24.toBigInt(0), 0n);
  assertStrictEquals(Uint24.toBigInt(-0), 0n);
  assertStrictEquals(Uint24.toBigInt(0xFFFFFF), 0xFFFFFFn);

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.toBigInt(0x1000000 as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toBigInt(-1 as number);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toBigInt(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint24.byteLength", () => {
  assertStrictEquals(Uint24.byteLength, 3);
});

Deno.test("Uint24.toBytes()", () => {
  assertStrictEquals(
    [...Uint24.toBytes(0)].map((i) => i.toString()).join(","),
    "0,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0, false)].map((i) => i.toString()).join(","),
    "0,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0, true)].map((i) => i.toString()).join(","),
    "0,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "0,0,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
    "0,0,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
    "255,0,0",
  );

  assertStrictEquals(
    [...Uint24.toBytes(0x100)].map((i) => i.toString()).join(","),
    "0,1,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0x100, false)].map((i) => i.toString()).join(","),
    "0,1,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0x100, true)].map((i) => i.toString()).join(","),
    "0,1,0",
  );

  assertStrictEquals(
    [...Uint24.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
    "0,255,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFF, false)].map((i) => i.toString()).join(","),
    "0,255,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,0",
  );

  assertStrictEquals(
    [...Uint24.toBytes(0x10000)].map((i) => i.toString()).join(","),
    "1,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0x10000, false)].map((i) => i.toString()).join(","),
    "1,0,0",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0x10000, true)].map((i) => i.toString()).join(","),
    "0,0,1",
  );

  assertStrictEquals(
    [...Uint24.toBytes(0xFFFFFF)].map((i) => i.toString()).join(","),
    "255,255,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFFFF, false)].map((i) => i.toString()).join(","),
    "255,255,255",
  );
  assertStrictEquals(
    [...Uint24.toBytes(0xFFFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,255",
  );

  const e1 = "The type of `self` does not match the type of `uint24`.";
  assertThrows(
    () => {
      Uint24.toBytes(0x1000000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toBytes(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint24.toBytes(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});
