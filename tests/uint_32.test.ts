import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint32 } from "../mod.ts";

const count = 16384;

const aArray1 = new Uint32Array(count);
crypto.getRandomValues(aArray1);

const bArray1 = new Uint32Array(count);
crypto.getRandomValues(bArray1);

function _format(i: number): string {
  return i.toString(16).toUpperCase().padStart(8, "0");
}

Deno.test("Uint32.bitLength", () => {
  assertStrictEquals(Uint32.bitLength, 32);
});

Deno.test("Uint32.inRange()", () => {
  assertStrictEquals(Uint32.inRange(-1), false);
  assertStrictEquals(Uint32.inRange(-0), true);
  assertStrictEquals(Uint32.inRange(0), true);
  assertStrictEquals(Uint32.inRange(63), true);
  assertStrictEquals(Uint32.inRange(64), true);
  assertStrictEquals(Uint32.inRange(127), true);
  assertStrictEquals(Uint32.inRange(128), true);
  assertStrictEquals(Uint32.inRange(255), true);
  assertStrictEquals(Uint32.inRange(256), true);
  assertStrictEquals(Uint32.inRange(65535), true);
  assertStrictEquals(Uint32.inRange(65536), true);
  assertStrictEquals(Uint32.inRange(0xFFFFFF), true);
  assertStrictEquals(Uint32.inRange(0x1000000), true);
  assertStrictEquals(Uint32.inRange(0xFFFFFFFF), true);
  assertStrictEquals(Uint32.inRange(0x100000000), false);

  assertStrictEquals(Uint32.inRange(0.1), false);
  assertStrictEquals(Uint32.inRange(0.5), false);
  assertStrictEquals(Uint32.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint32.inRange(false as unknown as number), false);
  assertStrictEquals(Uint32.inRange({} as unknown as number), false);
  assertStrictEquals(Uint32.inRange([] as unknown as number), false);
  assertStrictEquals(Uint32.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint32.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint32.inRange(null as unknown as number), false);
});

function _bitwiseAnd(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba & bb) & 0b11111111_11111111_11111111_11111111n);
}

Deno.test("Uint32.bitwiseAnd()", () => {
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );

  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseAnd(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0001,
  );

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0x100000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.bitwiseAnd([0] as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0, 0x100000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0, undefined as unknown as number);
    },
    TypeError,
    e2,
  );

  for (let i = 0; i < count; i++) {
    const a = aArray1[i];
    const b = bArray1[i];
    const r1 = Uint32.bitwiseAnd(a, b);
    const r2 = _bitwiseAnd(a, b);
    //console.log(`0x${_format(a)} & 0x${_format(b)} -> ${_format(r1)} / ${_format(r2)}`,);
    assertStrictEquals(r1, r2);
  }
});

function _bitwiseOr(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba | bb) & 0b11111111_11111111_11111111_11111111n);
}

Deno.test("Uint32.bitwiseOr()", () => {
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0001,
  );

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.bitwiseOr(0x100000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.bitwiseOr("0" as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.bitwiseOr(0, 0x100000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.bitwiseOr(0, null as unknown as number);
    },
    TypeError,
    e2,
  );

  for (let i = 0; i < count; i++) {
    const a = aArray1[i];
    const b = bArray1[i];
    const r1 = Uint32.bitwiseOr(a, b);
    const r2 = _bitwiseOr(a, b);
    //console.log(`0x${_format(a)} | 0x${_format(b)} -> ${_format(r1)} / ${_format(r2)}`,);
    assertStrictEquals(r1, r2);
  }
});

function _bitwiseXOr(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba ^ bb) & 0b11111111_11111111_11111111_11111111n);
}

Deno.test("Uint32.bitwiseXOr()", () => {
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1111_1111_1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b1000_0000_0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    Uint32.bitwiseXOr(
      0b0000_0000_0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000_0000_0000,
  );

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0x100000000 as unknown as number, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0n as unknown as number, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0, 0x100000000 as unknown as number);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0, [0] as unknown as number);
    },
    TypeError,
    e2,
  );

  for (let i = 0; i < count; i++) {
    const a = aArray1[i];
    const b = bArray1[i];
    const r1 = Uint32.bitwiseXOr(a, b);
    const r2 = _bitwiseXOr(a, b);
    //console.log(`0x${_format(a)} ^ 0x${_format(b)} -> ${_format(r1)} / ${_format(r2)}`);
    assertStrictEquals(r1, r2);
  }
});

Deno.test("Uint32.rotateLeft()", () => {
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

  assertStrictEquals(Uint32.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint32.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint32.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint32.rotateLeft(0, 101), 0);

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.rotateLeft(0x100000000 as number, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.rotateLeft(-1 as number, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint32.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint32.byteLength", () => {
  assertStrictEquals(Uint32.byteLength, 4);
});

Deno.test("Uint32.toBytes()", () => {
  assertStrictEquals(
    [...Uint32.toBytes(0)].map((i) => i.toString()).join(","),
    "0,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0, false)].map((i) => i.toString()).join(","),
    "0,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0, true)].map((i) => i.toString()).join(","),
    "0,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "0,0,0,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
    "0,0,0,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
    "255,0,0,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0x100)].map((i) => i.toString()).join(","),
    "0,0,1,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x100, false)].map((i) => i.toString()).join(","),
    "0,0,1,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x100, true)].map((i) => i.toString()).join(","),
    "0,1,0,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
    "0,0,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFF, false)].map((i) => i.toString()).join(","),
    "0,0,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,0,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0x10000)].map((i) => i.toString()).join(","),
    "0,1,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x10000, false)].map((i) => i.toString()).join(","),
    "0,1,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x10000, true)].map((i) => i.toString()).join(","),
    "0,0,1,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFF)].map((i) => i.toString()).join(","),
    "0,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFF, false)].map((i) => i.toString()).join(","),
    "0,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,255,0",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0x1000000)].map((i) => i.toString()).join(","),
    "1,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x1000000, false)].map((i) => i.toString()).join(","),
    "1,0,0,0",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0x1000000, true)].map((i) => i.toString()).join(","),
    "0,0,0,1",
  );

  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFFFF)].map((i) => i.toString()).join(","),
    "255,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFFFF, false)].map((i) => i.toString()).join(","),
    "255,255,255,255",
  );
  assertStrictEquals(
    [...Uint32.toBytes(0xFFFFFFFF, true)].map((i) => i.toString()).join(","),
    "255,255,255,255",
  );

  const e1 = "The type of `self` does not match the type of `uint32`.";
  assertThrows(
    () => {
      Uint32.toBytes(0x100000000);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.toBytes(-1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint32.toBytes(undefined as unknown as number);
    },
    TypeError,
    e1,
  );
});
