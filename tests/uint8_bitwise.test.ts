import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint8 } from "../mod.ts";

Deno.test("Uint8.bitwiseAnd(number, number)", () => {
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0000, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1111_1111, 0b0000_0000), 0b0000_0000);

  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b1000_0000, 0b0000_0001), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseAnd(0b0000_0001, 0b0000_0001), 0b0000_0001);

  assertThrows(
    () => {
      Uint8.bitwiseAnd(0x100 as unknown as Uint8, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint8.bitwiseAnd(0, 0x100 as unknown as Uint8);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint8.bitwiseOr(number, number)", () => {
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseOr(0b0000_0001, 0b0000_0001), 0b0000_0001);

  assertThrows(
    () => {
      Uint8.bitwiseOr(0x100 as unknown as Uint8, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint8.bitwiseOr(0, 0x100 as unknown as Uint8);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint8.bitwiseXOr(number, number)", () => {
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(Uint8.bitwiseXOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(Uint8.bitwiseXOr(0b0000_0001, 0b0000_0001), 0b0000_0000);

  assertThrows(
    () => {
      Uint8.bitwiseXOr(0x100 as unknown as Uint8, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint8.bitwiseXOr(0, 0x100 as unknown as Uint8);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint8.rotateLeft(number, number)", () => {
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

  assertThrows(
    () => {
      Uint8.rotateLeft(256 as Uint8, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint8.rotateLeft(-1 as Uint8, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint8.rotateLeft(255, 3.1);
    },
    TypeError,
    "amount",
  );
});
