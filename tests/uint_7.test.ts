import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint7, uint7 } from "../mod.ts";

Deno.test("Uint7.bitLength", () => {
  assertStrictEquals(Uint7.bitLength, 7);
});

Deno.test("Uint7.inRange()", () => {
  assertStrictEquals(Uint7.inRange(-1), false);
  assertStrictEquals(Uint7.inRange(-0), true);
  assertStrictEquals(Uint7.inRange(0), true);
  assertStrictEquals(Uint7.inRange(63), true);
  assertStrictEquals(Uint7.inRange(64), true);
  assertStrictEquals(Uint7.inRange(127), true);
  assertStrictEquals(Uint7.inRange(128), false);
  assertStrictEquals(Uint7.inRange(255), false);
  assertStrictEquals(Uint7.inRange(256), false);
  assertStrictEquals(Uint7.inRange(65535), false);
  assertStrictEquals(Uint7.inRange(65536), false);
  assertStrictEquals(Uint7.inRange(0xFFFFFFFF), false);
  assertStrictEquals(Uint7.inRange(0x100000000), false);

  assertStrictEquals(Uint7.inRange(0.1), false);
  assertStrictEquals(Uint7.inRange(0.5), false);
  assertStrictEquals(Uint7.inRange("0" as unknown as number), false);
  assertStrictEquals(Uint7.inRange(false as unknown as number), false);
  assertStrictEquals(Uint7.inRange({} as unknown as number), false);
  assertStrictEquals(Uint7.inRange([] as unknown as number), false);
  assertStrictEquals(Uint7.inRange([0] as unknown as number), false);
  assertStrictEquals(Uint7.inRange(undefined as unknown as number), false);
  assertStrictEquals(Uint7.inRange(null as unknown as number), false);
});

Deno.test("Uint7.bitwiseAnd()", () => {
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_000, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1111_111, 0b0000_000), 0b0000_000);

  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b1000_000, 0b0000_001), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseAnd(0b0000_001, 0b0000_001), 0b0000_001);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd([0] as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseAnd(0, undefined as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.bitwiseOr()", () => {
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseOr(0b0000_001, 0b0000_001), 0b0000_001);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseOr(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr("0" as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseOr(0, null as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.bitwiseXOr()", () => {
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b1111_111), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(Uint7.bitwiseXOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b1000_000), 0b0000_000);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(Uint7.bitwiseXOr(0b0000_001, 0b0000_001), 0b0000_000);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0x100 as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0n as unknown as uint7, 0);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, 0x100 as unknown as uint7);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      Uint7.bitwiseXOr(0, [0] as unknown as uint7);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.rotateLeft()", () => {
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

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.rotateLeft(0x80 as uint7, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.rotateLeft(-1 as uint7, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      Uint7.rotateLeft(0x7F, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("Uint7.toNumber()", () => {
  assertStrictEquals(Uint7.toNumber(0), 0);
  assertStrictEquals(Uint7.toNumber(-0), 0);
  assertStrictEquals(Object.is(Uint7.toNumber(-0), 0), true);
  assertStrictEquals(Uint7.toNumber(0x7F), 0x7F);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.toNumber(0x80 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toNumber(-1 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toNumber(undefined as unknown as uint7);
    },
    TypeError,
    e1,
  );
});

Deno.test("Uint7.toBigInt()", () => {
  assertStrictEquals(Uint7.toBigInt(0), 0n);
  assertStrictEquals(Uint7.toBigInt(-0), 0n);
  assertStrictEquals(Uint7.toBigInt(0x7F), 0x7Fn);

  const e1 = "The type of `self` does not match the type of `uint7`.";
  assertThrows(
    () => {
      Uint7.toBigInt(0x80 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toBigInt(-1 as uint7);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      Uint7.toBigInt(undefined as unknown as uint7);
    },
    TypeError,
    e1,
  );
});
