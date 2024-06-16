import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint32 } from "../mod.ts";

const count = 16384;

const aArray1 = new Uint32Array(count);
crypto.getRandomValues(aArray1);

const bArray1 = new Uint32Array(count);
crypto.getRandomValues(bArray1);

function _bitwiseAnd(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba & bb) & 0b11111111_11111111_11111111_11111111n);
}

function _bitwiseOr(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba | bb) & 0b11111111_11111111_11111111_11111111n);
}

function _bitwiseXOr(a: number, b: number): number {
  const ba = BigInt(a);
  const bb = BigInt(b);
  return Number((ba ^ bb) & 0b11111111_11111111_11111111_11111111n);
}

function _format(i: number): string {
  return i.toString(16).toUpperCase().padStart(8, "0");
}

Deno.test("Uint32.bitwiseAnd(number, number)", () => {
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

  assertThrows(
    () => {
      Uint32.bitwiseAnd(0x100000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint32.bitwiseAnd(0, 0x100000000);
    },
    TypeError,
    "b",
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

Deno.test("Uint32.bitwiseOr(number, number)", () => {
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

  assertThrows(
    () => {
      Uint32.bitwiseOr(0x100000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint32.bitwiseOr(0, 0x100000000);
    },
    TypeError,
    "b",
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

Deno.test("Uint32.bitwiseXOr(number, number)", () => {
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

  assertThrows(
    () => {
      Uint32.bitwiseXOr(0x100000000, 0);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      Uint32.bitwiseXOr(0, 0x100000000);
    },
    TypeError,
    "b",
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
