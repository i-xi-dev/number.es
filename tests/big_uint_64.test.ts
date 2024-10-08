import { assertStrictEquals, assertThrows } from "./deps.ts";
import { BigUint64 } from "../mod.ts";

Deno.test("BigUint64.bitLength", () => {
  assertStrictEquals(BigUint64.bitLength, 64);
});

Deno.test("BigUint64.inRange()", () => {
  assertStrictEquals(BigUint64.inRange(-1n), false);
  assertStrictEquals(BigUint64.inRange(-0n), true);
  assertStrictEquals(BigUint64.inRange(0n), true);
  assertStrictEquals(BigUint64.inRange(63n), true);
  assertStrictEquals(BigUint64.inRange(64n), true);
  assertStrictEquals(BigUint64.inRange(127n), true);
  assertStrictEquals(BigUint64.inRange(128n), true);
  assertStrictEquals(BigUint64.inRange(255n), true);
  assertStrictEquals(BigUint64.inRange(256n), true);
  assertStrictEquals(BigUint64.inRange(65535n), true);
  assertStrictEquals(BigUint64.inRange(65536n), true);
  assertStrictEquals(BigUint64.inRange(0xFFFFFFn), true);
  assertStrictEquals(BigUint64.inRange(0x1000000n), true);
  assertStrictEquals(BigUint64.inRange(0xFFFFFFFFn), true);
  assertStrictEquals(BigUint64.inRange(0x100000000n), true);
  assertStrictEquals(BigUint64.inRange(0xFFFFFFFFFFFFFFFFn), true);
  assertStrictEquals(BigUint64.inRange(0x10000000000000000n), false);

  assertStrictEquals(BigUint64.inRange(0.1 as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange(0.5 as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange("0" as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange(false as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange({} as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange([] as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange([0] as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange(undefined as unknown as bigint), false);
  assertStrictEquals(BigUint64.inRange(null as unknown as bigint), false);
});

Deno.test("BigUint64.bitwiseAnd()", () => {
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseAnd(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseAnd([0] as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseAnd(0n, undefined as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.bitwiseOr()", () => {
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );

  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseOr("0" as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseOr(0n, null as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.bitwiseXOr()", () => {
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b11111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111n,
  );

  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.bitwiseXOr(
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
      0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0x10000000000000000n as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0 as unknown as bigint, 0n);
    },
    TypeError,
    e1,
  );

  const e2 = "The type of `other` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0n, 0x10000000000000000n as unknown as bigint);
    },
    TypeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.bitwiseXOr(0n, [0] as unknown as bigint);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.rotateLeft()", () => {
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      0,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      1,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      2,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000010n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      3,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000100n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      4,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00001000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      5,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00010000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      6,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00100000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      7,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_01000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      8,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_10000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      9,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000001_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      10,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000010_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      11,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000100_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      12,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00001000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      13,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00010000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      14,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00100000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      15,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_01000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      16,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_10000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      17,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000001_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      18,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000010_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      19,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000100_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      20,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00001000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      21,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00010000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      22,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00100000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      23,
    ),
    0b00000000_00000000_00000000_00000000_00000000_01000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      24,
    ),
    0b00000000_00000000_00000000_00000000_00000000_10000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      25,
    ),
    0b00000000_00000000_00000000_00000000_00000001_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      26,
    ),
    0b00000000_00000000_00000000_00000000_00000010_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      27,
    ),
    0b00000000_00000000_00000000_00000000_00000100_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      28,
    ),
    0b00000000_00000000_00000000_00000000_00001000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      29,
    ),
    0b00000000_00000000_00000000_00000000_00010000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      30,
    ),
    0b00000000_00000000_00000000_00000000_00100000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      31,
    ),
    0b00000000_00000000_00000000_00000000_01000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      32,
    ),
    0b00000000_00000000_00000000_00000000_10000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      33,
    ),
    0b00000000_00000000_00000000_00000001_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      34,
    ),
    0b00000000_00000000_00000000_00000010_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      35,
    ),
    0b00000000_00000000_00000000_00000100_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      36,
    ),
    0b00000000_00000000_00000000_00001000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      37,
    ),
    0b00000000_00000000_00000000_00010000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      38,
    ),
    0b00000000_00000000_00000000_00100000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      39,
    ),
    0b00000000_00000000_00000000_01000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      40,
    ),
    0b00000000_00000000_00000000_10000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      41,
    ),
    0b00000000_00000000_00000001_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      42,
    ),
    0b00000000_00000000_00000010_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      43,
    ),
    0b00000000_00000000_00000100_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      44,
    ),
    0b00000000_00000000_00001000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      45,
    ),
    0b00000000_00000000_00010000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      46,
    ),
    0b00000000_00000000_00100000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      47,
    ),
    0b00000000_00000000_01000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      48,
    ),
    0b00000000_00000000_10000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      49,
    ),
    0b00000000_00000001_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      50,
    ),
    0b00000000_00000010_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      51,
    ),
    0b00000000_00000100_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      52,
    ),
    0b00000000_00001000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      53,
    ),
    0b00000000_00010000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      54,
    ),
    0b00000000_00100000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      55,
    ),
    0b00000000_01000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      56,
    ),
    0b00000000_10000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      57,
    ),
    0b00000001_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      58,
    ),
    0b00000010_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      59,
    ),
    0b00000100_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      60,
    ),
    0b00001000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      61,
    ),
    0b00010000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      62,
    ),
    0b00100000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      63,
    ),
    0b01000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      64,
    ),
    0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      65,
    ),
    0b00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000001n,
  );
  assertStrictEquals(
    BigUint64.rotateLeft(
      0b10000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
      -1,
    ),
    0b01000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000n,
  );

  assertStrictEquals(BigUint64.rotateLeft(0n, -1), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 0), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 1), 0n);
  assertStrictEquals(BigUint64.rotateLeft(0n, 101), 0n);

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.rotateLeft(0x10000000000000000n as bigint, 1);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.rotateLeft(-1n as bigint, 1);
    },
    TypeError,
    e1,
  );

  const e2 = "`offset` must be a safe integer.";
  assertThrows(
    () => {
      BigUint64.rotateLeft(0xFFn, 3.1);
    },
    TypeError,
    e2,
  );
});

Deno.test("BigUint64.toNumber()", () => {
  assertStrictEquals(BigUint64.toNumber(0n), 0);
  assertStrictEquals(BigUint64.toNumber(-0n), 0);
  assertStrictEquals(Object.is(BigUint64.toNumber(-0n), 0), true);
  // assertStrictEquals(BigUint64.toNumber(0xFFFFFFFFFFFFFFFFn), 0xFFFFFFFFFFFFFFFF);
  assertStrictEquals(
    BigUint64.toNumber(BigInt(Number.MAX_SAFE_INTEGER)),
    Number.MAX_SAFE_INTEGER,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toNumber(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );

  const e2 = "`self` must be within the range of safe integer.";
  assertThrows(
    () => {
      BigUint64.toNumber(0xFFFFFFFFFFFFFFFFn);
    },
    RangeError,
    e2,
  );
  assertThrows(
    () => {
      BigUint64.toNumber(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    e2,
  );
});

Deno.test("BigUint64.toBigInt()", () => {
  assertStrictEquals(BigUint64.toBigInt(0n), 0n);
  assertStrictEquals(BigUint64.toBigInt(-0n), 0n);
  assertStrictEquals(
    BigUint64.toBigInt(0xFFFFFFFFFFFFFFFFn),
    0xFFFFFFFFFFFFFFFFn,
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toBigInt(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBigInt(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBigInt(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});

Deno.test("BigUint64.byteLength", () => {
  assertStrictEquals(BigUint64.byteLength, 8);
});

Deno.test("BigUint64.toBytes()", () => {
  assertStrictEquals(
    [...BigUint64.toBytes(0n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0n, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0n, true)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,0,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFn, true)].map((i) => i.toString()).join(","),
    "255,0,0,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x100n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,1,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100n, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,1,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100n, true)].map((i) => i.toString()).join(","),
    "0,1,0,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,0,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFn, true)].map((i) => i.toString()).join(","),
    "255,255,0,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,1,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,1,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000n, true)].map((i) => i.toString()).join(","),
    "0,0,1,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn, false)].map((i) => i.toString()).join(","),
    "0,0,0,0,0,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFn, true)].map((i) => i.toString()).join(","),
    "255,255,255,0,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n)].map((i) => i.toString()).join(","),
    "0,0,0,0,1,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,1,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000n, true)].map((i) => i.toString()).join(","),
    "0,0,0,1,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFn, true)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,0,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n)].map((i) => i.toString()).join(","),
    "0,0,0,1,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,1,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000n, true)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,1,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,0,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFn, true)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,0,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n)].map((i) => i.toString()).join(","),
    "0,0,1,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n, false)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,1,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x10000000000n, true)].map((i) => i.toString()).join(
      ",",
    ),
    "0,0,0,0,0,1,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn)].map((i) => i.toString()).join(","),
    "0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn, false)].map((i) => i.toString())
      .join(","),
    "0,0,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFn, true)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,255,0,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n)].map((i) => i.toString()).join(","),
    "0,1,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n, false)].map((i) => i.toString())
      .join(","),
    "0,1,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x1000000000000n, true)].map((i) => i.toString())
      .join(","),
    "0,0,0,0,0,0,1,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn)].map((i) => i.toString()).join(
      ",",
    ),
    "0,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn, false)].map((i) => i.toString())
      .join(","),
    "0,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFn, true)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,0",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n)].map((i) => i.toString()).join(
      ",",
    ),
    "1,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n, false)].map((i) => i.toString())
      .join(","),
    "1,0,0,0,0,0,0,0",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0x100000000000000n, true)].map((i) => i.toString())
      .join(","),
    "0,0,0,0,0,0,0,1",
  );

  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn)].map((i) => i.toString()).join(
      ",",
    ),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn, false)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,255",
  );
  assertStrictEquals(
    [...BigUint64.toBytes(0xFFFFFFFFFFFFFFFFn, true)].map((i) => i.toString())
      .join(","),
    "255,255,255,255,255,255,255,255",
  );

  const e1 = "The type of `self` does not match the type of `uint64`.";
  assertThrows(
    () => {
      BigUint64.toBytes(0x10000000000000000n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBytes(-1n);
    },
    TypeError,
    e1,
  );
  assertThrows(
    () => {
      BigUint64.toBytes(undefined as unknown as bigint);
    },
    TypeError,
    e1,
  );
});
