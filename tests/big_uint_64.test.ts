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

// Deno.test("BigUint64.bitwiseAnd()", () => {
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b0000_0000_0000_0000_0000_0000,
//       0b0000_0000_0000_0000_0000_0000,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b1111_1111_1111_1111_1111_1111,
//       0b1111_1111_1111_1111_1111_1111,
//     ),
//     0b1111_1111_1111_1111_1111_1111,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b0000_0000_0000_0000_0000_0000,
//       0b1111_1111_1111_1111_1111_1111,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b1111_1111_1111_1111_1111_1111,
//       0b0000_0000_0000_0000_0000_0000,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );

//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b1000_0000_0000_0000_0000_0000,
//       0b1000_0000_0000_0000_0000_0000,
//     ),
//     0b1000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b0000_0000_0000_0000_0000_0001,
//       0b1000_0000_0000_0000_0000_0000,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b1000_0000_0000_0000_0000_0000,
//       0b0000_0000_0000_0000_0000_0001,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseAnd(
//       0b0000_0000_0000_0000_0000_0001,
//       0b0000_0000_0000_0000_0000_0001,
//     ),
//     0b0000_0000_0000_0000_0000_0001,
//   );

//   const e1 = "The type of `self` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.bitwiseAnd(0x1000000 as unknown as number, 0);
//     },
//     TypeError,
//     e1,
//   );
//   assertThrows(
//     () => {
//       BigUint64.bitwiseAnd([0] as unknown as number, 0);
//     },
//     TypeError,
//     e1,
//   );

//   const e2 = "The type of `other` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.bitwiseAnd(0, 0x1000000 as unknown as number);
//     },
//     TypeError,
//     e2,
//   );
//   assertThrows(
//     () => {
//       BigUint64.bitwiseAnd(0, undefined as unknown as number);
//     },
//     TypeError,
//     e2,
//   );
// });

// Deno.test("BigUint64.bitwiseOr()", () => {
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b0000_0000_0000_0000_0000_0000,
//       0b0000_0000_0000_0000_0000_0000,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b1111_1111_1111_1111_1111_1111,
//       0b1111_1111_1111_1111_1111_1111,
//     ),
//     0b1111_1111_1111_1111_1111_1111,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b0000_0000_0000_0000_0000_0000,
//       0b1111_1111_1111_1111_1111_1111,
//     ),
//     0b1111_1111_1111_1111_1111_1111,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b1111_1111_1111_1111_1111_1111,
//       0b0000_0000_0000_0000_0000_0000,
//     ),
//     0b1111_1111_1111_1111_1111_1111,
//   );

//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b1000_0000_0000_0000_0000_0000,
//       0b1000_0000_0000_0000_0000_0000,
//     ),
//     0b1000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b0000_0000_0000_0000_0000_0001,
//       0b1000_0000_0000_0000_0000_0000,
//     ),
//     0b1000_0000_0000_0000_0000_0001,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b1000_0000_0000_0000_0000_0000,
//       0b0000_0000_0000_0000_0000_0001,
//     ),
//     0b1000_0000_0000_0000_0000_0001,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseOr(
//       0b0000_0000_0000_0000_0000_0001,
//       0b0000_0000_0000_0000_0000_0001,
//     ),
//     0b0000_0000_0000_0000_0000_0001,
//   );

//   const e1 = "The type of `self` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.bitwiseOr(0x1000000 as unknown as number, 0);
//     },
//     TypeError,
//     e1,
//   );
//   assertThrows(
//     () => {
//       BigUint64.bitwiseOr("0" as unknown as number, 0);
//     },
//     TypeError,
//     e1,
//   );

//   const e2 = "The type of `other` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.bitwiseOr(0, 0x1000000 as unknown as number);
//     },
//     TypeError,
//     e2,
//   );
//   assertThrows(
//     () => {
//       BigUint64.bitwiseOr(0, null as unknown as number);
//     },
//     TypeError,
//     e2,
//   );
// });

// Deno.test("BigUint64.bitwiseXOr()", () => {
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b0000_0000_0000_0000_0000_0000,
//       0b0000_0000_0000_0000_0000_0000,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b1111_1111_1111_1111_1111_1111,
//       0b1111_1111_1111_1111_1111_1111,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b0000_0000_0000_0000_0000_0000,
//       0b1111_1111_1111_1111_1111_1111,
//     ),
//     0b1111_1111_1111_1111_1111_1111,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b1111_1111_1111_1111_1111_1111,
//       0b0000_0000_0000_0000_0000_0000,
//     ),
//     0b1111_1111_1111_1111_1111_1111,
//   );

//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b1000_0000_0000_0000_0000_0000,
//       0b1000_0000_0000_0000_0000_0000,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b0000_0000_0000_0000_0000_0001,
//       0b1000_0000_0000_0000_0000_0000,
//     ),
//     0b1000_0000_0000_0000_0000_0001,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b1000_0000_0000_0000_0000_0000,
//       0b0000_0000_0000_0000_0000_0001,
//     ),
//     0b1000_0000_0000_0000_0000_0001,
//   );
//   assertStrictEquals(
//     BigUint64.bitwiseXOr(
//       0b0000_0000_0000_0000_0000_0001,
//       0b0000_0000_0000_0000_0000_0001,
//     ),
//     0b0000_0000_0000_0000_0000_0000,
//   );

//   const e1 = "The type of `self` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.bitwiseXOr(0x1000000 as unknown as number, 0);
//     },
//     TypeError,
//     e1,
//   );
//   assertThrows(
//     () => {
//       BigUint64.bitwiseXOr(0n as unknown as number, 0);
//     },
//     TypeError,
//     e1,
//   );

//   const e2 = "The type of `other` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.bitwiseXOr(0, 0x1000000 as unknown as number);
//     },
//     TypeError,
//     e2,
//   );
//   assertThrows(
//     () => {
//       BigUint64.bitwiseXOr(0, [0] as unknown as number);
//     },
//     TypeError,
//     e2,
//   );
// });

// Deno.test("BigUint64.rotateLeft()", () => {
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 0),
//     0b10000000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 1),
//     0b00000000_00000000_00000001,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 2),
//     0b00000000_00000000_00000010,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 3),
//     0b00000000_00000000_00000100,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 4),
//     0b00000000_00000000_00001000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 5),
//     0b00000000_00000000_00010000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 6),
//     0b00000000_00000000_00100000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 7),
//     0b00000000_00000000_01000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 8),
//     0b00000000_00000000_10000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 9),
//     0b00000000_00000001_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 10),
//     0b00000000_00000010_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 11),
//     0b00000000_00000100_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 12),
//     0b00000000_00001000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 13),
//     0b00000000_00010000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 14),
//     0b00000000_00100000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 15),
//     0b00000000_01000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 16),
//     0b00000000_10000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 17),
//     0b00000001_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 18),
//     0b00000010_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 19),
//     0b00000100_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 20),
//     0b00001000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 21),
//     0b00010000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 22),
//     0b00100000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 23),
//     0b01000000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b10000000_00000000_00000000, 24),
//     0b10000000_00000000_00000000,
//   );

//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 0),
//     0b01111111_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 1),
//     0b11111111_11111111_11111110,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 2),
//     0b11111111_11111111_11111101,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 3),
//     0b11111111_11111111_11111011,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 4),
//     0b11111111_11111111_11110111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 5),
//     0b11111111_11111111_11101111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 6),
//     0b11111111_11111111_11011111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 7),
//     0b11111111_11111111_10111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 8),
//     0b11111111_11111111_01111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 9),
//     0b11111111_11111110_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 10),
//     0b11111111_11111101_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 11),
//     0b11111111_11111011_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 12),
//     0b11111111_11110111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 13),
//     0b11111111_11101111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 14),
//     0b11111111_11011111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 15),
//     0b11111111_10111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 16),
//     0b11111111_01111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 17),
//     0b11111110_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 18),
//     0b11111101_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 19),
//     0b11111011_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 20),
//     0b11110111_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 21),
//     0b11101111_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 22),
//     0b11011111_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 23),
//     0b10111111_11111111_11111111,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b01111111_11111111_11111111, 24),
//     0b01111111_11111111_11111111,
//   );

//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, -25),
//     0b10000000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, -24),
//     0b00000000_00000000_00000001,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, -1),
//     0b10000000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 0),
//     0b00000000_00000000_00000001,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 1),
//     0b00000000_00000000_00000010,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 2),
//     0b00000000_00000000_00000100,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 3),
//     0b00000000_00000000_00001000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 4),
//     0b00000000_00000000_00010000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 5),
//     0b00000000_00000000_00100000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 6),
//     0b00000000_00000000_01000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 7),
//     0b00000000_00000000_10000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 8),
//     0b00000000_00000001_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 9),
//     0b00000000_00000010_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 10),
//     0b00000000_00000100_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 11),
//     0b00000000_00001000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 12),
//     0b00000000_00010000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 13),
//     0b00000000_00100000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 14),
//     0b00000000_01000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 15),
//     0b00000000_10000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 16),
//     0b00000001_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 17),
//     0b00000010_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 18),
//     0b00000100_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 19),
//     0b00001000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 20),
//     0b00010000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 21),
//     0b00100000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 22),
//     0b01000000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 23),
//     0b10000000_00000000_00000000,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 24),
//     0b00000000_00000000_00000001,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 25),
//     0b00000000_00000000_00000010,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 48),
//     0b00000000_00000000_00000001,
//   );
//   assertStrictEquals(
//     BigUint64.rotateLeft(0b00000000_00000000_00000001, 49),
//     0b00000000_00000000_00000010,
//   );

//   assertStrictEquals(
//     BigUint64.rotateLeft(0b11111111_11111111_11111111, 1),
//     0b11111111_11111111_11111111,
//   );

//   assertStrictEquals(BigUint64.rotateLeft(0, -1), 0);
//   assertStrictEquals(BigUint64.rotateLeft(0, 0), 0);
//   assertStrictEquals(BigUint64.rotateLeft(0, 1), 0);
//   assertStrictEquals(BigUint64.rotateLeft(0, 101), 0);

//   const e1 = "The type of `self` does not match the type of `uint24`.";
//   assertThrows(
//     () => {
//       BigUint64.rotateLeft(0x100000000 as number, 1);
//     },
//     TypeError,
//     e1,
//   );
//   assertThrows(
//     () => {
//       BigUint64.rotateLeft(-1 as number, 1);
//     },
//     TypeError,
//     e1,
//   );

//   const e2 = "`offset` must be a safe integer.";
//   assertThrows(
//     () => {
//       BigUint64.rotateLeft(0xFF, 3.1);
//     },
//     TypeError,
//     e2,
//   );
// });

// Deno.test("BigUint64.byteLength", () => {
//   assertStrictEquals(BigUint64.byteLength, 3);
// });

// Deno.test("BigUint64.toBytes()", () => {
//   assertStrictEquals(
//     [...BigUint64.toBytes(0)].map((i) => i.toString()).join(","),
//     "0,0,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0, false)].map((i) => i.toString()).join(","),
//     "0,0,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0, true)].map((i) => i.toString()).join(","),
//     "0,0,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFF)].map((i) => i.toString()).join(","),
//     "0,0,255",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFF, false)].map((i) => i.toString()).join(","),
//     "0,0,255",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFF, true)].map((i) => i.toString()).join(","),
//     "255,0,0",
//   );

//   assertStrictEquals(
//     [...BigUint64.toBytes(0x100)].map((i) => i.toString()).join(","),
//     "0,1,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0x100, false)].map((i) => i.toString()).join(","),
//     "0,1,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0x100, true)].map((i) => i.toString()).join(","),
//     "0,1,0",
//   );

//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFFFF)].map((i) => i.toString()).join(","),
//     "0,255,255",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFFFF, false)].map((i) => i.toString()).join(","),
//     "0,255,255",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFFFF, true)].map((i) => i.toString()).join(","),
//     "255,255,0",
//   );

//   assertStrictEquals(
//     [...BigUint64.toBytes(0x10000)].map((i) => i.toString()).join(","),
//     "1,0,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0x10000, false)].map((i) => i.toString()).join(","),
//     "1,0,0",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0x10000, true)].map((i) => i.toString()).join(","),
//     "0,0,1",
//   );

//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFFFFFF)].map((i) => i.toString()).join(","),
//     "255,255,255",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFFFFFF, false)].map((i) => i.toString()).join(","),
//     "255,255,255",
//   );
//   assertStrictEquals(
//     [...BigUint64.toBytes(0xFFFFFF, true)].map((i) => i.toString()).join(","),
//     "255,255,255",
//   );
// });
