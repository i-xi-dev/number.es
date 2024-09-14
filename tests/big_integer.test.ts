import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Integer, BigInteger } from "../mod.ts";

const MIN = BigInt(Number.MIN_SAFE_INTEGER);//TODO 変数名かえる
const MAX = BigInt(Number.MAX_SAFE_INTEGER);

Deno.test("BigInteger.ZERO", () => {
  assertStrictEquals(BigInteger.ZERO === 0n, true);
  assertStrictEquals(BigInteger.ZERO === (0 as unknown as bigint), false);
});

Deno.test("SafeInteger.isPositive()", () => {
  assertStrictEquals(BigInteger.isPositive(0n), false);
  assertStrictEquals(BigInteger.isPositive(-0n), false);
  assertStrictEquals(BigInteger.isPositive(1n), true);
  assertStrictEquals(BigInteger.isPositive(-1n), false);

  assertStrictEquals(BigInteger.isPositive(-10.1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(-9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(10.1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isPositive(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(-0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(-1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isPositive(MAX + 1n), true);
  assertStrictEquals(BigInteger.isPositive(MAX), true);
  assertStrictEquals(BigInteger.isPositive(MIN), false);
  assertStrictEquals(BigInteger.isPositive(MIN - 1n), false);

  assertStrictEquals(
    BigInteger.isPositive(undefined as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isPositive(null as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(true as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive(false as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isPositive("0" as unknown as bigint), false);
});

Deno.test("SafeInteger.isNonNegative()", () => {
  assertStrictEquals(BigInteger.isNonNegative(0n), true);
  assertStrictEquals(BigInteger.isNonNegative(-0n), true);
  assertStrictEquals(BigInteger.isNonNegative(1n), true);
  assertStrictEquals(BigInteger.isNonNegative(-1n), false);

  assertStrictEquals(BigInteger.isNonNegative(-10.1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(-9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(10.1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNonNegative(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(-0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(-1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNonNegative(MAX + 1n), true);
  assertStrictEquals(BigInteger.isNonNegative(MAX), true);
  assertStrictEquals(BigInteger.isNonNegative(MIN), false);
  assertStrictEquals(BigInteger.isNonNegative(MIN - 1n), false);

  assertStrictEquals(
    BigInteger.isNonNegative(undefined as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNonNegative(null as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(true as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(false as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative("0" as unknown as bigint), false);
});

Deno.test("SafeInteger.isNonPositive()", () => {
  assertStrictEquals(BigInteger.isNonPositive(0n), true);
  assertStrictEquals(BigInteger.isNonPositive(-0n), true);
  assertStrictEquals(BigInteger.isNonPositive(1n), false);
  assertStrictEquals(BigInteger.isNonPositive(-1n), true);

  assertStrictEquals(BigInteger.isNonPositive(-10.1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(-9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(10.1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNonPositive(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(-0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(-1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNonPositive(MAX + 1n), false);
  assertStrictEquals(BigInteger.isNonPositive(MAX), false);
  assertStrictEquals(BigInteger.isNonPositive(MIN), true);
  assertStrictEquals(BigInteger.isNonPositive(MIN - 1n), true);

  assertStrictEquals(
    BigInteger.isNonPositive(undefined as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNonPositive(null as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(true as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(false as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive("0" as unknown as bigint), false);
});

Deno.test("SafeInteger.isNegative()", () => {
  assertStrictEquals(BigInteger.isNegative(0n), false);
  assertStrictEquals(BigInteger.isNegative(-0n), false);
  assertStrictEquals(BigInteger.isNegative(1n), false);
  assertStrictEquals(BigInteger.isNegative(-1n), true);

  assertStrictEquals(BigInteger.isNegative(-10.1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(-9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(10.1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNegative(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(-0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(-1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNegative(MAX + 1n), false);
  assertStrictEquals(BigInteger.isNegative(MAX), false);
  assertStrictEquals(BigInteger.isNegative(MIN), true);
  assertStrictEquals(BigInteger.isNegative(MIN - 1n), true);

  assertStrictEquals(
    BigInteger.isNegative(undefined as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNegative(null as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(true as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative(false as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNegative("0" as unknown as bigint), false);
});

//TODO isOdd,isEven

//TODO min,max

//TODO fromNumber

//TODO toNumber

//TODO fromString

//TODO toString
