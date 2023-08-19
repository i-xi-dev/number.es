import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Integer } from "../mod.ts";

Deno.test("Integer.isInteger(number)", () => {
  assertStrictEquals(Integer.isInteger(-1), true);
  assertStrictEquals(Integer.isInteger(-0), true);
  assertStrictEquals(Integer.isInteger(0), true);
  assertStrictEquals(Integer.isInteger(1), true);
  assertStrictEquals(Integer.isInteger(Number.MAX_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isInteger(Number.MIN_SAFE_INTEGER), true);
  assertStrictEquals(Integer.isInteger(1.1), false);
  assertStrictEquals(Integer.isInteger(Number.NaN), false);
  assertStrictEquals(Integer.isInteger(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(Integer.isInteger(Number.NEGATIVE_INFINITY), false);
});

Deno.test("Integer.fromString(string)", () => {
  assertStrictEquals(Integer.fromString("1"), 1);
  assertStrictEquals(Integer.fromString("0"), 0);
  assertStrictEquals(Integer.fromString("-0"), -0);
  assertStrictEquals(Integer.fromString("-1"), -1);

  assertThrows(
    () => {
      Integer.fromString("");
    },
    TypeError,
    "s",
  );
  assertThrows(
    () => {
      Integer.fromString("-");
    },
    TypeError,
    "s",
  );
  assertThrows(
    () => {
      Integer.fromString("1.0");
    },
    TypeError,
    "s",
  );
});

Deno.test("Integer.fromString(any)", () => {
  assertThrows(
    () => {
      Integer.fromString(1 as unknown as string);
    },
    TypeError,
    "s",
  );
});

Deno.test("Integer.toString(number)", () => {
  assertStrictEquals(Integer.toString(1.0), "1");
  assertStrictEquals(Integer.toString(1), "1");
  assertStrictEquals(Integer.toString(0), "0");
  assertStrictEquals(Integer.toString(-0), "0");
  assertStrictEquals(Integer.toString(-1), "-1");

  assertThrows(
    () => {
      Integer.toString(1.1);
    },
    TypeError,
    "source",
  );
});

Deno.test("Integer.toString(any)", () => {
  assertThrows(
    () => {
      Integer.toString("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("Integer.fromNumber(number)", () => {
  assertStrictEquals(Integer.fromNumber(), 0);
  assertStrictEquals(Integer.fromNumber(0), 0);
  assertStrictEquals(Integer.fromNumber(-0), 0);
  assertStrictEquals(Integer.fromNumber(1), 1);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER + 1), 0);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER - 1), 0);
  assertStrictEquals(Integer.fromNumber("1" as unknown as number), 0);
  assertStrictEquals(Integer.fromNumber(1.1), 1);
  assertStrictEquals(Integer.fromNumber(1.9), 2);
  assertStrictEquals(Integer.fromNumber(-1.1), -1);
  assertStrictEquals(Integer.fromNumber(-1.9), -2);
});

Deno.test("Integer.fromNumber(number, {}) - method:round", () => {
  const opt = { method: "round" } as const;
  assertStrictEquals(Integer.fromNumber(undefined, opt), 0);
  assertStrictEquals(Integer.fromNumber(0, opt), 0);
  assertStrictEquals(Integer.fromNumber(-0, opt), 0);
  assertStrictEquals(Integer.fromNumber(1, opt), 1);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER, opt), Number.MAX_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER, opt), Number.MIN_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER + 1, opt), 0);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER - 1, opt), 0);
  assertStrictEquals(Integer.fromNumber("1" as unknown as number, opt), 0);
  assertStrictEquals(Integer.fromNumber(1.1, opt), 1);
  assertStrictEquals(Integer.fromNumber(1.9, opt), 2);
  assertStrictEquals(Integer.fromNumber(-1.1, opt), -1);
  assertStrictEquals(Integer.fromNumber(-1.9, opt), -2);
});

Deno.test("Integer.fromNumber(number, {}) - method:trunc", () => {
  const opt = { method: "trunc" } as const;
  assertStrictEquals(Integer.fromNumber(undefined, opt), 0);
  assertStrictEquals(Integer.fromNumber(0, opt), 0);
  assertStrictEquals(Integer.fromNumber(-0, opt), 0);
  assertStrictEquals(Integer.fromNumber(1, opt), 1);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER, opt), Number.MAX_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER, opt), Number.MIN_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER + 1, opt), 0);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER - 1, opt), 0);
  assertStrictEquals(Integer.fromNumber("1" as unknown as number, opt), 0);
  assertStrictEquals(Integer.fromNumber(1.1, opt), 1);
  assertStrictEquals(Integer.fromNumber(1.9, opt), 1);
  assertStrictEquals(Integer.fromNumber(-1.1, opt), -1);
  assertStrictEquals(Integer.fromNumber(-1.9, opt), -1);
});

Deno.test("Integer.fromNumber(number, {}) - fallback:9999", () => {
  const opt = { fallback: 9999 } as const;
  assertStrictEquals(Integer.fromNumber(undefined, opt), 9999);
  assertStrictEquals(Integer.fromNumber(0, opt), 0);
  assertStrictEquals(Integer.fromNumber(-0, opt), 0);
  assertStrictEquals(Integer.fromNumber(1, opt), 1);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER, opt), Number.MAX_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER, opt), Number.MIN_SAFE_INTEGER);
  assertStrictEquals(Integer.fromNumber(Number.MAX_SAFE_INTEGER + 1, opt), 9999);
  assertStrictEquals(Integer.fromNumber(Number.MIN_SAFE_INTEGER - 1, opt), 9999);
  assertStrictEquals(Integer.fromNumber("1" as unknown as number, opt), 9999);
  assertStrictEquals(Integer.fromNumber(1.1, opt), 1);
  assertStrictEquals(Integer.fromNumber(1.9, opt), 2);
  assertStrictEquals(Integer.fromNumber(-1.1, opt), -1);
  assertStrictEquals(Integer.fromNumber(-1.9, opt), -2);
});

Deno.test("Integer.from(number)", () => {
  assertStrictEquals(Integer.from(), 0);
  assertStrictEquals(Integer.from(0), 0);
  assertStrictEquals(Integer.from(-0), 0);
  assertStrictEquals(Integer.from(1), 1);
  assertStrictEquals(Integer.from(-1), -1);
  assertStrictEquals(Integer.from(1.1), 1);
  assertStrictEquals(Integer.from(1.9), 2);
  assertStrictEquals(Integer.from(-1.1), -1);
  assertStrictEquals(Integer.from(-1.9), -2);
  assertStrictEquals(Integer.from("1" as unknown as number), 0);
  assertStrictEquals(Integer.from(2), 2);
  assertStrictEquals(Integer.from(-2), -2);
});

Deno.test("Integer.from(number, {}) - method:round", () => {
  const opt = { method: "round" } as const;
  assertStrictEquals(Integer.from(undefined, opt), 0);
  assertStrictEquals(Integer.from(0, opt), 0);
  assertStrictEquals(Integer.from(-0, opt), 0);
  assertStrictEquals(Integer.from(1, opt), 1);
  assertStrictEquals(Integer.from(-1, opt), -1);
  assertStrictEquals(Integer.from(1.1, opt), 1);
  assertStrictEquals(Integer.from(1.9, opt), 2);
  assertStrictEquals(Integer.from(-1.1, opt), -1);
  assertStrictEquals(Integer.from(-1.9, opt), -2);
  assertStrictEquals(Integer.from("1" as unknown as number, opt), 0);
  assertStrictEquals(Integer.from(2, opt), 2);
  assertStrictEquals(Integer.from(-2, opt), -2);
});

Deno.test("Integer.from(number, {}) - method:trunc", () => {
  const opt = { method: "trunc" } as const;
  assertStrictEquals(Integer.from(undefined, opt), 0);
  assertStrictEquals(Integer.from(0, opt), 0);
  assertStrictEquals(Integer.from(-0, opt), 0);
  assertStrictEquals(Integer.from(1, opt), 1);
  assertStrictEquals(Integer.from(-1, opt), -1);
  assertStrictEquals(Integer.from(1.1, opt), 1);
  assertStrictEquals(Integer.from(1.9, opt), 1);
  assertStrictEquals(Integer.from(-1.1, opt), -1);
  assertStrictEquals(Integer.from(-1.9, opt), -1);
  assertStrictEquals(Integer.from("1" as unknown as number, opt), 0);
  assertStrictEquals(Integer.from(2, opt), 2);
  assertStrictEquals(Integer.from(-2, opt), -2);
});

Deno.test("Integer.from(number, {}) - fallback:9999", () => {
  const opt = { fallback: 9999 } as const;
  assertStrictEquals(Integer.from(undefined, opt), 9999);
  assertStrictEquals(Integer.from(0, opt), 0);
  assertStrictEquals(Integer.from(-0, opt), 0);
  assertStrictEquals(Integer.from(1, opt), 1);
  assertStrictEquals(Integer.from(-1, opt), -1);
  assertStrictEquals(Integer.from(1.1, opt), 1);
  assertStrictEquals(Integer.from(1.9, opt), 2);
  assertStrictEquals(Integer.from(-1.1, opt), -1);
  assertStrictEquals(Integer.from(-1.9, opt), -2);
  assertStrictEquals(Integer.from("1" as unknown as number, opt), 9999);
  assertStrictEquals(Integer.from(2, opt), 2);
  assertStrictEquals(Integer.from(-2, opt), -2);
});

Deno.test("Integer.from(number, {}) - lowerLimit:1", () => {
  const opt = { lowerLimit: 1 } as const;
  assertStrictEquals(Integer.from(undefined, opt), 1);
  assertStrictEquals(Integer.from(0, opt), 1);
  assertStrictEquals(Integer.from(-0, opt), 1);
  assertStrictEquals(Integer.from(1, opt), 1);
  assertStrictEquals(Integer.from(-1, opt), 1);
  assertStrictEquals(Integer.from(1.1, opt), 1);
  assertStrictEquals(Integer.from(1.9, opt), 2);
  assertStrictEquals(Integer.from(-1.1, opt), 1);
  assertStrictEquals(Integer.from(-1.9, opt), 1);
  assertStrictEquals(Integer.from("1" as unknown as number, opt), 1);
  assertStrictEquals(Integer.from(2, opt), 2);
  assertStrictEquals(Integer.from(-2, opt), 1);
});

Deno.test("Integer.from(number, {}) - upperLimit:1", () => {
  const opt = { upperLimit: 1 } as const;
  assertStrictEquals(Integer.from(undefined, opt), 0);
  assertStrictEquals(Integer.from(0, opt), 0);
  assertStrictEquals(Integer.from(-0, opt), 0);
  assertStrictEquals(Integer.from(1, opt), 1);
  assertStrictEquals(Integer.from(-1, opt), -1);
  assertStrictEquals(Integer.from(1.1, opt), 1);
  assertStrictEquals(Integer.from(1.9, opt), 1);
  assertStrictEquals(Integer.from(-1.1, opt), -1);
  assertStrictEquals(Integer.from(-1.9, opt), -2);
  assertStrictEquals(Integer.from("1" as unknown as number, opt), 0);
  assertStrictEquals(Integer.from(2, opt), 1);
  assertStrictEquals(Integer.from(-2, opt), -2);
});
