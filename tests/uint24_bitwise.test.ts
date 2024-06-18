import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint24 } from "../mod.ts";

Deno.test("Uint24.bitwiseAnd(number, number)", () => {
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

  assertThrows(
    () => {
      Uint24.bitwiseAnd(0x1000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint24.bitwiseAnd(0, 0x1000000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint24.bitwiseOr(number, number)", () => {
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

  assertThrows(
    () => {
      Uint24.bitwiseOr(0x1000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint24.bitwiseOr(0, 0x1000000);
    },
    TypeError,
    "b",
  );
});

Deno.test("Uint24.bitwiseXOr(number, number)", () => {
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

  assertThrows(
    () => {
      Uint24.bitwiseXOr(0x1000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint24.bitwiseXOr(0, 0x1000000);
    },
    TypeError,
    "b",
  );
});
