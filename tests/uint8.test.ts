import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint8 } from "../mod.ts";

Deno.test("Uint8.isUint8(number)", () => {
  assertStrictEquals(Uint8.isUint8(-1), false);
  assertStrictEquals(Uint8.isUint8(-0), true);
  assertStrictEquals(Uint8.isUint8(0), true);
  assertStrictEquals(Uint8.isUint8(63), true);
  assertStrictEquals(Uint8.isUint8(64), true);
  assertStrictEquals(Uint8.isUint8(255), true);
  assertStrictEquals(Uint8.isUint8(256), false);
  assertStrictEquals(Uint8.isUint8(0.1), false);
});

Deno.test("Uint8.isUint8(any)", () => {
  assertStrictEquals(Uint8.isUint8("0"), false);
  assertStrictEquals(Uint8.isUint8("255"), false);
  assertStrictEquals(Uint8.isUint8(true), false);
  assertStrictEquals(Uint8.isUint8({}), false);
  assertStrictEquals(Uint8.isUint8([]), false);
  assertStrictEquals(Uint8.isUint8([0]), false);
  assertStrictEquals(Uint8.isUint8(undefined), false);
  assertStrictEquals(Uint8.isUint8(null), false);
});

Deno.test("Uint8.fromNumber(number)", () => {
  assertStrictEquals(Uint8.fromNumber(undefined as unknown as number), 0);
  assertStrictEquals(Uint8.fromNumber(-1), 0);
  assertStrictEquals(Uint8.fromNumber(-0), 0);
  assertStrictEquals(Uint8.fromNumber(0), 0);
  assertStrictEquals(Uint8.fromNumber(63), 63);
  assertStrictEquals(Uint8.fromNumber(64), 64);
  assertStrictEquals(Uint8.fromNumber(255), 255);
  assertStrictEquals(Uint8.fromNumber(256), 255);
  assertStrictEquals(Uint8.fromNumber(0.1), 0);
  assertStrictEquals(Uint8.fromNumber(0.6), 0);
  assertStrictEquals(Uint8.fromNumber(Number.NaN), 0);

  assertThrows(
    () => {
      Uint8.fromNumber("10" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint8.fromNumber(number, {}) - fallback", () => {
  const op = { fallback: 127 } as const;
  assertStrictEquals(Uint8.fromNumber(undefined as unknown as number, op), 127);
  assertStrictEquals(Uint8.fromNumber(-1, op), 0);
  assertStrictEquals(Uint8.fromNumber(-0, op), 0);
  assertStrictEquals(Uint8.fromNumber(0, op), 0);
  assertStrictEquals(Uint8.fromNumber(63, op), 63);
  assertStrictEquals(Uint8.fromNumber(64, op), 64);
  assertStrictEquals(Uint8.fromNumber(255, op), 255);
  assertStrictEquals(Uint8.fromNumber(256, op), 255);
  assertStrictEquals(Uint8.fromNumber(0.1, op), 0);
  assertStrictEquals(Uint8.fromNumber(0.6, op), 0);
  assertStrictEquals(Uint8.fromNumber(Number.NaN, op), 127);
  assertThrows(
    () => {
      Uint8.fromNumber("10" as unknown as number, op);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      Uint8.fromNumber("10" as unknown as number, {
        fallback: Number.NaN as unknown as Uint8,
      });
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint8.fromNumber(number, {}) - strict", () => {
  const op = { strict: true } as const;
  assertThrows(
    () => {
      Uint8.fromNumber(undefined as unknown as number, op);
    },
    TypeError,
    "source",
  );
  assertStrictEquals(Uint8.fromNumber(-1, op), 0);
  assertStrictEquals(Uint8.fromNumber(-0, op), 0);
  assertStrictEquals(Uint8.fromNumber(0, op), 0);
  assertStrictEquals(Uint8.fromNumber(63, op), 63);
  assertStrictEquals(Uint8.fromNumber(64, op), 64);
  assertStrictEquals(Uint8.fromNumber(255, op), 255);
  assertStrictEquals(Uint8.fromNumber(256, op), 255);
  assertThrows(
    () => {
      Uint8.fromNumber(0.1, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Uint8.fromNumber(0.6, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Uint8.fromNumber(Number.NaN, op);
    },
    RangeError,
    "source",
  );
  assertThrows(
    () => {
      Uint8.fromNumber("10" as unknown as number, op);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint8.fromBigInt(bigint)", () => {
  assertStrictEquals(Uint8.fromBigInt(undefined as unknown as bigint), 0);
  assertStrictEquals(Uint8.fromBigInt(-1n), 0);
  assertStrictEquals(Uint8.fromBigInt(-0n), 0);
  assertStrictEquals(Uint8.fromBigInt(0n), 0);
  assertStrictEquals(Uint8.fromBigInt(63n), 63);
  assertStrictEquals(Uint8.fromBigInt(64n), 64);
  assertStrictEquals(Uint8.fromBigInt(255n), 255);
  assertStrictEquals(Uint8.fromBigInt(256n), 255);
  //assertStrictEquals(Uint8.fromBigInt(0.1), 0);
  //assertStrictEquals(Uint8.fromBigInt(0.6), 0);
  //assertStrictEquals(Uint8.fromBigInt(Number.NaN), 0);

  assertThrows(
    () => {
      Uint8.fromBigInt("10" as unknown as bigint);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint8.fromBigInt(bigint, {}) - fallback", () => {
  const op = { fallback: 127 } as const;
  assertStrictEquals(Uint8.fromBigInt(undefined as unknown as bigint, op), 127);
  assertStrictEquals(Uint8.fromBigInt(-1n, op), 0);
  assertStrictEquals(Uint8.fromBigInt(-0n, op), 0);
  assertStrictEquals(Uint8.fromBigInt(0n, op), 0);
  assertStrictEquals(Uint8.fromBigInt(63n, op), 63);
  assertStrictEquals(Uint8.fromBigInt(64n, op), 64);
  assertStrictEquals(Uint8.fromBigInt(255n, op), 255);
  assertStrictEquals(Uint8.fromBigInt(256n, op), 255);
  //assertStrictEquals(Uint8.fromBigInt(0.1, op), 0);
  //assertStrictEquals(Uint8.fromBigInt(0.6, op), 0);
  //assertStrictEquals(Uint8.fromBigInt(Number.NaN, op), 127);
  assertThrows(
    () => {
      Uint8.fromBigInt("10" as unknown as bigint, op);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      Uint8.fromBigInt("10" as unknown as bigint, {
        fallback: Number.NaN as unknown as Uint8,
      });
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint8.fromBigInt(bigint, {}) - strict", () => {
  const op = { strict: true } as const;
  assertThrows(
    () => {
      Uint8.fromBigInt(undefined as unknown as bigint, op);
    },
    RangeError,
    "source",
  );
  assertStrictEquals(Uint8.fromBigInt(-1n, op), 0);
  assertStrictEquals(Uint8.fromBigInt(-0n, op), 0);
  assertStrictEquals(Uint8.fromBigInt(0n, op), 0);
  assertStrictEquals(Uint8.fromBigInt(63n, op), 63);
  assertStrictEquals(Uint8.fromBigInt(64n, op), 64);
  assertStrictEquals(Uint8.fromBigInt(255n, op), 255);
  assertStrictEquals(Uint8.fromBigInt(256n, op), 255);
  // assertThrows(
  //   () => {
  //     Uint8.fromBigInt(0.1, op);
  //   },
  //   RangeError,
  //   "source",
  // );
  // assertThrows(
  //   () => {
  //     Uint8.fromBigInt(0.6, op);
  //   },
  //   RangeError,
  //   "source",
  // );
  // assertThrows(
  //   () => {
  //     Uint8.fromBigInt(Number.NaN, op);
  //   },
  //   RangeError,
  //   "source",
  // );
  assertThrows(
    () => {
      Uint8.fromBigInt("10" as unknown as bigint, op);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint8.toBigInt(number)", () => {
  assertStrictEquals(Uint8.toBigInt(1.0), 1n);
  assertStrictEquals(Uint8.toBigInt(1), 1n);
  assertStrictEquals(Uint8.toBigInt(0), 0n);
  assertStrictEquals(Uint8.toBigInt(-0), 0n);

  assertThrows(
    () => {
      Uint8.toBigInt(-1 as unknown as Uint8);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint8.toBigInt(1.1 as unknown as Uint8);
    },
    TypeError,
    "source",
  );
});

Deno.test("SafeInteger.toBigInt(any)", () => {
  assertThrows(
    () => {
      Uint8.toBigInt("1" as unknown as Uint8);
    },
    TypeError,
    "source",
  );
});
