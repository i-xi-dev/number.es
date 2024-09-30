import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint6, uint6 } from "../mod.ts";

Deno.test("Uint6.bitLength", () => {
  assertStrictEquals(Uint6.bitLength, 6);
});

Deno.test("Uint6.inRange()", () => {
  assertStrictEquals(Uint6.inRange(-1), false);
  assertStrictEquals(Uint6.inRange(-0), true);
  assertStrictEquals(Uint6.inRange(0), true);
  assertStrictEquals(Uint6.inRange(63), true);
  assertStrictEquals(Uint6.inRange(64), false);
  assertStrictEquals(Uint6.inRange(127), false);
  assertStrictEquals(Uint6.inRange(128), false);
  assertStrictEquals(Uint6.inRange(255), false);
  assertStrictEquals(Uint6.inRange(256), false);
  assertStrictEquals(Uint6.inRange(65535), false);
  assertStrictEquals(Uint6.inRange(65536), false);
  assertStrictEquals(Uint6.inRange(0xFFFFFFFF), false);
  assertStrictEquals(Uint6.inRange(0x100000000), false);

  assertStrictEquals(Uint6.inRange(0.1), false);
  assertStrictEquals(Uint6.inRange(0.5), false);
  assertStrictEquals(Uint6.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint6.inRange(false as unknown as number), false);
  assertStrictEquals(Uint6.inRange({} as unknown as number), false);
  assertStrictEquals(Uint6.inRange([] as unknown as number), false);
  assertStrictEquals(Uint6.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint6.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint6.inRange(null as unknown as number), false);
});

Deno.test("Uint6.bitwiseAnd()", () => {
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_00, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1111_11, 0b0000_00), 0b0000_00);

  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b1000_00, 0b0000_01), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseAnd(0b0000_01, 0b0000_01), 0b0000_01);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(undefined as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseAnd(0, undefined as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.bitwiseOr()", () => {
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseOr(0b0000_01, 0b0000_01), 0b0000_01);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseOr(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr("0" as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseOr(0, null as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.bitwiseXOr()", () => {
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b1111_11), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(Uint6.bitwiseXOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b1000_00), 0b0000_00);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(Uint6.bitwiseXOr(0b0000_01, 0b0000_01), 0b0000_00);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0x100 as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0n as unknown as uint6, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, 0x100 as unknown as uint6);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint6.bitwiseXOr(0, [0] as unknown as uint6);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.rotateLeft()", () => {
  assertStrictEquals(Uint6.rotateLeft(0b100000, 0), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 1), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 2), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 3), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 4), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 5), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b100000, 6), 0b100000);

  assertStrictEquals(Uint6.rotateLeft(0b011111, 0), 0b011111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 1), 0b111110);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 2), 0b111101);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 3), 0b111011);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 4), 0b110111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 5), 0b101111);
  assertStrictEquals(Uint6.rotateLeft(0b011111, 6), 0b011111);

  assertStrictEquals(Uint6.rotateLeft(0b000001, -1), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 0), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 1), 0b000010);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 2), 0b000100);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 3), 0b001000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 4), 0b010000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 5), 0b100000);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 6), 0b000001);
  assertStrictEquals(Uint6.rotateLeft(0b000001, 7), 0b000010);

  assertStrictEquals(Uint6.rotateLeft(0b111111, 1), 0b111111);

  assertStrictEquals(Uint6.rotateLeft(0, -1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 0), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 1), 0);
  assertStrictEquals(Uint6.rotateLeft(0, 101), 0);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.rotateLeft(0x40 as uint6, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.rotateLeft(-1 as uint6, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint6.rotateLeft(0x3F, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint6.toNumber()", () => {
  assertStrictEquals(Uint6.toNumber(0), 0);
  assertStrictEquals(Uint6.toNumber(-0), 0);
  assertStrictEquals(Object.is(Uint6.toNumber(-0), 0), true);
  assertStrictEquals(Uint6.toNumber(0x3F), 0x3F);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.toNumber(0x40 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toNumber(-1 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toNumber(undefined as unknown as uint6);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint6.toBigInt()", () => {
  assertStrictEquals(Uint6.toBigInt(0), 0n);
  assertStrictEquals(Uint6.toBigInt(-0), 0n);
  assertStrictEquals(Uint6.toBigInt(0x3F), 0x3Fn);

  const e1 = "The type of `self` does not match the type of `uint6`.";
  assertThrows(
    () => {
      Uint6.toBigInt(0x40 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toBigInt(-1 as uint6);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint6.toBigInt(undefined as unknown as uint6);
    },
    TypeError,
    e1,
  );
});
