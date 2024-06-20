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
