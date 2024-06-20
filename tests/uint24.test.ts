import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint24 } from "../mod.ts";

Deno.test("Uint24.isUint24(number)", () => {
  assertStrictEquals(Uint24.isUint24(-1), false);
  assertStrictEquals(Uint24.isUint24(-0), true);
  assertStrictEquals(Uint24.isUint24(0), true);
  assertStrictEquals(Uint24.isUint24(63), true);
  assertStrictEquals(Uint24.isUint24(64), true);
  assertStrictEquals(Uint24.isUint24(127), true);
  assertStrictEquals(Uint24.isUint24(128), true);
  assertStrictEquals(Uint24.isUint24(255), true);
  assertStrictEquals(Uint24.isUint24(256), true);
  assertStrictEquals(Uint24.isUint24(65535), true);
  assertStrictEquals(Uint24.isUint24(65536), true);
  assertStrictEquals(Uint24.isUint24(0xFFFFFF), true);
  assertStrictEquals(Uint24.isUint24(0x1000000), false);
  assertStrictEquals(Uint24.isUint24(0xFFFFFFFF), false);
  assertStrictEquals(Uint24.isUint24(0x100000000), false);
  assertStrictEquals(Uint24.isUint24(0.1), false);
});

Deno.test("Uint24.isUint24(any)", () => {
  assertStrictEquals(Uint24.isUint24("0"), false);
  assertStrictEquals(Uint24.isUint24("255"), false);
  assertStrictEquals(Uint24.isUint24(true), false);
  assertStrictEquals(Uint24.isUint24({}), false);
  assertStrictEquals(Uint24.isUint24([]), false);
  assertStrictEquals(Uint24.isUint24([0]), false);
  assertStrictEquals(Uint24.isUint24(undefined), false);
  assertStrictEquals(Uint24.isUint24(null), false);
});

Deno.test("Uint24.saturateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint24.saturateFromSafeInteger(-1), 0);
  assertStrictEquals(Uint24.saturateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint24.saturateFromSafeInteger(0), 0);
  assertStrictEquals(Uint24.saturateFromSafeInteger(0xFFFFFF), 0xFFFFFF);
  assertStrictEquals(Uint24.saturateFromSafeInteger(0x1000000), 0xFFFFFF);

  assertThrows(
    () => {
      Uint24.saturateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.saturateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.saturateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint24.truncateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint24.truncateFromSafeInteger(-1), 0xFFFFFF);
  assertStrictEquals(Uint24.truncateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint24.truncateFromSafeInteger(0), 0);
  assertStrictEquals(Uint24.truncateFromSafeInteger(0xFFFFFF), 0xFFFFFF);
  assertStrictEquals(Uint24.truncateFromSafeInteger(0x1000000), 0);

  // for (let i = 1; i < Number.MAX_SAFE_INTEGER; i = i * 3) {
  //   // console.log(`${i} -> ${i % 256}`);
  //   assertStrictEquals(Uint24.truncateFromSafeInteger(i), Uint8Array.of(i)[0]);
  // }

  // for (let i = -1; i > Number.MIN_SAFE_INTEGER; i = i * 3) {
  //   // console.log(`${i} -> ${256 + (i % 256)}`);
  //   assertStrictEquals(Uint24.truncateFromSafeInteger(i), Uint8Array.of(i)[0]);
  // }

  assertThrows(
    () => {
      Uint24.truncateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.truncateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint24.truncateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});
