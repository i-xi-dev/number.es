import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint7 } from "../mod.ts";

Deno.test("Uint7.bitwiseAnd(number, number)", () => {
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b0000_000), 0b0000_000);

  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b0000_001), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b0000_001), 0b0000_001);

  assertThrows(
    () => {
      Uint7.bitwiseAnd(0x100 as unknown as Uint7, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, 0x100 as unknown as Uint7);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint7.bitwiseOr(number, number)", () => {
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b0000_001), 0b0000_001);

  assertThrows(
    () => {
      Uint7.bitwiseOr(0x100 as unknown as Uint7, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, 0x100 as unknown as Uint7);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint7.bitwiseXOr(number, number)", () => {
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b0000_001), 0b0000_000);

  assertThrows(
    () => {
      Uint7.bitwiseXOr(0x100 as unknown as Uint7, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, 0x100 as unknown as Uint7);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint7.rotateLeft(number, number)", () => {
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 0), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 1), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 2), 0b0000010);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 3), 0b0000100);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 4), 0b0001000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 5), 0b0010000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 6), 0b0100000);
  assertStrictEquals(Uint7.rotateLeft(0b1000000, 7), 0b1000000);

  assertStrictEquals(Uint7.rotateLeft(0b0111111, 0), 0b0111111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 1), 0b1111110);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 2), 0b1111101);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 3), 0b1111011);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 4), 0b1110111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 5), 0b1101111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 6), 0b1011111);
  assertStrictEquals(Uint7.rotateLeft(0b0111111, 7), 0b0111111);

  assertStrictEquals(Uint7.rotateLeft(0b0000001, -1), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 0), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 1), 0b0000010);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 2), 0b0000100);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 3), 0b0001000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 4), 0b0010000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 5), 0b0100000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 6), 0b1000000);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 7), 0b0000001);
  assertStrictEquals(Uint7.rotateLeft(0b0000001, 8), 0b0000010);

  assertStrictEquals(Uint7.rotateLeft(0b1111111, 1), 0b1111111);

  assertStrictEquals(Uint7.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint7.rotateLeft(0, 101), 0);

  assertThrows(
    () => {
      Uint7.rotateLeft(0x80 as Uint7, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint7.rotateLeft(-1 as Uint7, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint7.rotateLeft(0x7F, 3.1);
    },
    TypeError,
    "amount",
  );
});
