import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint8, uint8 } from "../mod.ts";

Deno.test("Uint8.bitLength", () => {
  assertStrictEquals(Uint8.bitLength, 8);
});

Deno.test("Uint8.inRange()", () => {
  assertStrictEquals(Uint8.inRange(-1), false);
  assertStrictEquals(Uint8.inRange(-0), true);
  assertStrictEquals(Uint8.inRange(0), true);
  assertStrictEquals(Uint8.inRange(63), true);
  assertStrictEquals(Uint8.inRange(64), true);
  assertStrictEquals(Uint8.inRange(127), true);
  assertStrictEquals(Uint8.inRange(128), true);
  assertStrictEquals(Uint8.inRange(255), true);
  assertStrictEquals(Uint8.inRange(256), false);
  assertStrictEquals(Uint8.inRange(65535), false);
  assertStrictEquals(Uint8.inRange(65536), false);
  assertStrictEquals(Uint8.inRange(0xFFFFFFFF), false);
  assertStrictEquals(Uint8.inRange(0x100000000), false);

  assertStrictEquals(Uint8.inRange(0.1), false);
  assertStrictEquals(Uint8.inRange(0.5), false);
  assertStrictEquals(Uint8.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint8.inRange(false as unknown as number), false);
  assertStrictEquals(Uint8.inRange({} as unknown as number), false);
  assertStrictEquals(Uint8.inRange([] as unknown as number), false);
  assertStrictEquals(Uint8.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint8.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint8.inRange(null as unknown as number), false);
});

Deno.test("Uint8.bitwiseAnd()", () => {
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b0000_0000), 0b0000_0000);

  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b0000_0001), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b0000_0001), 0b0000_0001);

  const e1 = "The type of `self` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0x100 as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.bitwiseAnd([0] as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0, 0x100 as unknown as uint8);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0, undefined as unknown as uint8);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint8.bitwiseOr()", () => {
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b0000_0001), 0b0000_0001);

  const e1 = "The type of `self` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.bitwiseOr(0x100 as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.bitwiseOr("0" as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.bitwiseOr(0, 0x100 as unknown as uint8);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.bitwiseOr(0, null as unknown as uint8);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint8.bitwiseXOr()", () => {
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b0000_0001), 0b0000_0000);

  const e1 = "The type of `self` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0x100 as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0n as unknown as uint8, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0, 0x100 as unknown as uint8);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0, [0] as unknown as uint8);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint8.rotateLeft()", () => {
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 0), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 1), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 2), 0b00000010);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 3), 0b00000100);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 4), 0b00001000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 5), 0b00010000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 6), 0b00100000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 7), 0b01000000);
  assertStrictEquals(Uint8.rotateLeft(0b10000000, 8), 0b10000000);

  assertStrictEquals(Uint8.rotateLeft(0b01111111, 0), 0b01111111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 1), 0b11111110);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 2), 0b11111101);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 3), 0b11111011);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 4), 0b11110111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 5), 0b11101111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 6), 0b11011111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 7), 0b10111111);
  assertStrictEquals(Uint8.rotateLeft(0b01111111, 8), 0b01111111);

  assertStrictEquals(Uint8.rotateLeft(0b00000001, -9), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, -8), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, -1), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 0), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 1), 0b00000010);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 2), 0b00000100);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 3), 0b00001000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 4), 0b00010000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 5), 0b00100000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 6), 0b01000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 7), 0b10000000);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 8), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 9), 0b00000010);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 16), 0b00000001);
  assertStrictEquals(Uint8.rotateLeft(0b00000001, 17), 0b00000010);

  assertStrictEquals(Uint8.rotateLeft(0b11111111, 1), 0b11111111);

  assertStrictEquals(Uint8.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint8.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint8.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint8.rotateLeft(0, 101), 0);

  const e1 = "The type of `self` does not match the type of `uint8`.";
  assertThrows(
    () => {
      Uint8.rotateLeft(256 as uint8, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint8.rotateLeft(-1 as uint8, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint8.rotateLeft(0xFF, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint8.byteLength", () => {
  assertStrictEquals(Uint8.byteLength, 1);
});

Deno.test("Uint8.toBytes()", () => {
  assertStrictEquals(
    [...Uint8.toBytes(0)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0, false)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0, true)].map((i) => i.toString()).join(","),
    "0",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0xFF)].map((i) => i.toString()).join(","),
    "255",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
    "255",
  );
  assertStrictEquals(
    [...Uint8.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
    "255",
  );
});
