import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint6 } from "../mod.ts";

Deno.test("Uint6.isUint6(number)", () => {
  assertStrictEquals(Uint6.isUint6(-1), false);
  assertStrictEquals(Uint6.isUint6(-0), true);
  assertStrictEquals(Uint6.isUint6(0), true);
  assertStrictEquals(Uint6.isUint6(63), true);
  assertStrictEquals(Uint6.isUint6(64), false);
  assertStrictEquals(Uint6.isUint6(127), false);
  assertStrictEquals(Uint6.isUint6(128), false);
  assertStrictEquals(Uint6.isUint6(255), false);
  assertStrictEquals(Uint6.isUint6(256), false);
  assertStrictEquals(Uint6.isUint6(65535), false);
  assertStrictEquals(Uint6.isUint6(65536), false);
  assertStrictEquals(Uint6.isUint6(0xFFFFFFFF), false);
  assertStrictEquals(Uint6.isUint6(0x100000000), false);
  assertStrictEquals(Uint6.isUint6(0.1), false);
});

Deno.test("Uint6.isUint6(any)", () => {
  assertStrictEquals(Uint6.isUint6("0"), false);
  assertStrictEquals(Uint6.isUint6("255"), false);
  assertStrictEquals(Uint6.isUint6(true), false);
  assertStrictEquals(Uint6.isUint6({}), false);
  assertStrictEquals(Uint6.isUint6([]), false);
  assertStrictEquals(Uint6.isUint6([0]), false);
  assertStrictEquals(Uint6.isUint6(undefined), false);
  assertStrictEquals(Uint6.isUint6(null), false);
});

Deno.test("Uint6.saturateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint6.saturateFromSafeInteger(-1), 0);
  assertStrictEquals(Uint6.saturateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint6.saturateFromSafeInteger(0), 0);
  assertStrictEquals(Uint6.saturateFromSafeInteger(0x3F), 0x3F);
  assertStrictEquals(Uint6.saturateFromSafeInteger(0x40), 0x3F);

  assertThrows(
    () => {
      Uint6.saturateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint6.saturateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint6.saturateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint6.truncateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint6.truncateFromSafeInteger(-1), 0x3F);
  assertStrictEquals(Uint6.truncateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint6.truncateFromSafeInteger(0), 0);
  assertStrictEquals(Uint6.truncateFromSafeInteger(0x3F), 0x3F);
  assertStrictEquals(Uint6.truncateFromSafeInteger(0x40), 0);

  // for (let i = 1; i < Number.MAX_SAFE_INTEGER; i = i * 3) {
  //   // console.log(`${i} -> ${i % 256}`);
  //   assertStrictEquals(Uint6.truncateFromSafeInteger(i), Uint8Array.of(i)[0]);
  // }

  // for (let i = -1; i > Number.MIN_SAFE_INTEGER; i = i * 3) {
  //   // console.log(`${i} -> ${256 + (i % 256)}`);
  //   assertStrictEquals(Uint6.truncateFromSafeInteger(i), Uint8Array.of(i)[0]);
  // }

  assertThrows(
    () => {
      Uint6.truncateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint6.truncateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint6.truncateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});
