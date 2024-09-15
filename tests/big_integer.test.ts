import { assertStrictEquals, assertThrows } from "./deps.ts";
import { BigInteger } from "../mod.ts";

const PL = BigInt(Number.MIN_SAFE_INTEGER); //TODO 変数名かえる
const NL = BigInt(Number.MAX_SAFE_INTEGER);

Deno.test("BigInteger.ZERO", () => {
  assertStrictEquals(BigInteger.ZERO === 0n, true);
  assertStrictEquals(BigInteger.ZERO === (0 as unknown as bigint), false);
});

Deno.test("BigInteger.isPositive()", () => {
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

  assertStrictEquals(BigInteger.isPositive(NL + 1n), true);
  assertStrictEquals(BigInteger.isPositive(NL), true);
  assertStrictEquals(BigInteger.isPositive(PL), false);
  assertStrictEquals(BigInteger.isPositive(PL - 1n), false);

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

Deno.test("BigInteger.isNonNegative()", () => {
  assertStrictEquals(BigInteger.isNonNegative(0n), true);
  assertStrictEquals(BigInteger.isNonNegative(-0n), true);
  assertStrictEquals(BigInteger.isNonNegative(1n), true);
  assertStrictEquals(BigInteger.isNonNegative(-1n), false);

  assertStrictEquals(
    BigInteger.isNonNegative(-10.1 as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonNegative(-9.9 as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNonNegative(9.9 as unknown as bigint), false);
  assertStrictEquals(
    BigInteger.isNonNegative(10.1 as unknown as bigint),
    false,
  );

  assertStrictEquals(BigInteger.isNonNegative(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(-0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative(-1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNonNegative(NL + 1n), true);
  assertStrictEquals(BigInteger.isNonNegative(NL), true);
  assertStrictEquals(BigInteger.isNonNegative(PL), false);
  assertStrictEquals(BigInteger.isNonNegative(PL - 1n), false);

  assertStrictEquals(
    BigInteger.isNonNegative(undefined as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonNegative(null as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonNegative(true as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonNegative(false as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNonNegative("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonNegative("0" as unknown as bigint), false);
});

Deno.test("BigInteger.isNonPositive()", () => {
  assertStrictEquals(BigInteger.isNonPositive(0n), true);
  assertStrictEquals(BigInteger.isNonPositive(-0n), true);
  assertStrictEquals(BigInteger.isNonPositive(1n), false);
  assertStrictEquals(BigInteger.isNonPositive(-1n), true);

  assertStrictEquals(
    BigInteger.isNonPositive(-10.1 as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonPositive(-9.9 as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNonPositive(9.9 as unknown as bigint), false);
  assertStrictEquals(
    BigInteger.isNonPositive(10.1 as unknown as bigint),
    false,
  );

  assertStrictEquals(BigInteger.isNonPositive(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(-0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive(-1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isNonPositive(NL + 1n), false);
  assertStrictEquals(BigInteger.isNonPositive(NL), false);
  assertStrictEquals(BigInteger.isNonPositive(PL), true);
  assertStrictEquals(BigInteger.isNonPositive(PL - 1n), true);

  assertStrictEquals(
    BigInteger.isNonPositive(undefined as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonPositive(null as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonPositive(true as unknown as bigint),
    false,
  );
  assertStrictEquals(
    BigInteger.isNonPositive(false as unknown as bigint),
    false,
  );
  assertStrictEquals(BigInteger.isNonPositive("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isNonPositive("0" as unknown as bigint), false);
});

Deno.test("BigInteger.isNegative()", () => {
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

  assertStrictEquals(BigInteger.isNegative(NL + 1n), false);
  assertStrictEquals(BigInteger.isNegative(NL), false);
  assertStrictEquals(BigInteger.isNegative(PL), true);
  assertStrictEquals(BigInteger.isNegative(PL - 1n), true);

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

Deno.test("BigInteger.isOdd(number)", () => {
  assertStrictEquals(BigInteger.isOdd(0n), false);
  assertStrictEquals(BigInteger.isOdd(-0n), false);
  assertStrictEquals(BigInteger.isOdd(1n), true);
  assertStrictEquals(BigInteger.isOdd(-1n), true);
  assertStrictEquals(BigInteger.isOdd(2n), false);
  assertStrictEquals(BigInteger.isOdd(-2n), false);
  assertStrictEquals(BigInteger.isOdd(3n), true);
  assertStrictEquals(BigInteger.isOdd(-3n), true);

  assertStrictEquals(BigInteger.isOdd(-10.1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(-9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(10.1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isOdd(NL), true);
  assertStrictEquals(BigInteger.isOdd(PL), true);

  assertStrictEquals(BigInteger.isOdd(undefined as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(null as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(true as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(false as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isOdd("0" as unknown as bigint), false);
});

Deno.test("BigInteger.isEven(number)", () => {
  assertStrictEquals(BigInteger.isEven(0n), true);
  assertStrictEquals(BigInteger.isEven(-0n), true);
  assertStrictEquals(BigInteger.isEven(1n), false);
  assertStrictEquals(BigInteger.isEven(-1n), false);
  assertStrictEquals(BigInteger.isEven(2n), true);
  assertStrictEquals(BigInteger.isEven(-2n), true);
  assertStrictEquals(BigInteger.isEven(3n), false);
  assertStrictEquals(BigInteger.isEven(-3n), false);

  assertStrictEquals(BigInteger.isEven(-10.1 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(-9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(9.9 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(10.1 as unknown as bigint), false);

  assertStrictEquals(BigInteger.isEven(NL), false);
  assertStrictEquals(BigInteger.isEven(PL), false);

  assertStrictEquals(BigInteger.isEven(undefined as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(null as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(true as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(false as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven(0 as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven("" as unknown as bigint), false);
  assertStrictEquals(BigInteger.isEven("0" as unknown as bigint), false);
});

Deno.test("BigInteger.min()", () => {
  const rfe1 = "`args` must be one or more `bigint`s.";

  assertThrows(
    () => {
      BigInteger.min();
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.min(1 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.min(1n, 2 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(BigInteger.min(0n), 0n);
  assertStrictEquals(BigInteger.min(0n, 1n, 1n), 0n);
  assertStrictEquals(BigInteger.min(1n, 0n, 1n), 0n);
  assertStrictEquals(BigInteger.min(1n, 1n, 0n), 0n);
  assertStrictEquals(BigInteger.min(0n, -1n, -1n), -1n);
  assertStrictEquals(BigInteger.min(-1n, 0n, -1n), -1n);
  assertStrictEquals(BigInteger.min(-1n, -1n, 0n), -1n);
});

Deno.test("BigInteger.max()", () => {
  const rfe1 = "`args` must be one or more `bigint`s.";

  assertThrows(
    () => {
      BigInteger.max();
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.max(1 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.max(1n, 2 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(BigInteger.max(0n), 0n);
  assertStrictEquals(BigInteger.max(0n, 1n, 1n), 1n);
  assertStrictEquals(BigInteger.max(1n, 0n, 1n), 1n);
  assertStrictEquals(BigInteger.max(1n, 1n, 0n), 1n);
  assertStrictEquals(BigInteger.max(0n, -1n, -1n), 0n);
  assertStrictEquals(BigInteger.max(-1n, 0n, -1n), 0n);
  assertStrictEquals(BigInteger.max(-1n, -1n, 0n), 0n);
});

const SIMIN = Number.MIN_SAFE_INTEGER;
const SIMAX = Number.MAX_SAFE_INTEGER;

Deno.test("BigInteger.fromNumber()", () => {
  const rfe1 = "`source` must be a safe integer.";

  assertThrows(
    () => {
      BigInteger.fromNumber(undefined as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(0n as unknown as number);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(Number.NaN);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(Number.POSITIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(Number.NEGATIVE_INFINITY);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromNumber(0.5);
    },
    TypeError,
    rfe1,
  );

  assertStrictEquals(BigInteger.fromNumber(-1), -1n);
  assertStrictEquals(BigInteger.fromNumber(-0), 0n);
  assertStrictEquals(BigInteger.fromNumber(0), 0n);
  assertStrictEquals(BigInteger.fromNumber(1), 1n);

  assertStrictEquals(BigInteger.fromNumber(SIMAX), BigInt(SIMAX));
  assertStrictEquals(BigInteger.fromNumber(SIMIN), BigInt(SIMIN));
});

Deno.test("BigInteger.toNumber()", () => {
  const rfe1 = "`source` must be a `bigint`.";

  assertThrows(
    () => {
      BigInteger.toNumber(undefined as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.toNumber(0 as unknown as bigint);
    },
    TypeError,
    rfe1,
  );

  const rfe2 = "`source` must be within the range of safe integer.";

  assertThrows(
    () => {
      BigInteger.toNumber(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      BigInteger.toNumber(BigInt(Number.MIN_SAFE_INTEGER) - 1n);
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(BigInteger.toNumber(-1n), -1);
  assertStrictEquals(BigInteger.toNumber(-0n), 0);
  assertStrictEquals(BigInteger.toNumber(0n), 0);
  assertStrictEquals(BigInteger.toNumber(0n).toString(), "0");
  assertStrictEquals(BigInteger.toNumber(1n), 1);

  assertStrictEquals(BigInteger.toNumber(BigInt(SIMAX)), SIMAX);
  assertStrictEquals(BigInteger.toNumber(BigInt(SIMIN)), SIMIN);
});

Deno.test("BigInteger.fromString()", () => {
  const rfe1 = "`source` must be a `string`.";

  assertThrows(
    () => {
      BigInteger.fromString(undefined as unknown as string);
    },
    TypeError,
    rfe1,
  );

  assertThrows(
    () => {
      BigInteger.fromString(0 as unknown as string);
    },
    TypeError,
    rfe1,
  );

  const rfe2 = "`source` must be a representation of a integer.";

  assertThrows(
    () => {
      BigInteger.fromString("");
    },
    RangeError,
    rfe2,
  );

  assertThrows(
    () => {
      BigInteger.fromString("g");
    },
    RangeError,
    rfe2,
  );

  assertStrictEquals(BigInteger.fromString("-1"), -1n);
  assertStrictEquals(BigInteger.fromString("-0"), 0n);
  assertStrictEquals(BigInteger.fromString("-0").toString(), "0");
  assertStrictEquals(BigInteger.fromString("1"), 1n);

  assertStrictEquals(BigInteger.fromString("2"), 2n);
  assertStrictEquals(BigInteger.fromString("3"), 3n);
  assertStrictEquals(BigInteger.fromString("4"), 4n);
  assertStrictEquals(BigInteger.fromString("5"), 5n);
  assertStrictEquals(BigInteger.fromString("6"), 6n);
  assertStrictEquals(BigInteger.fromString("7"), 7n);
  assertStrictEquals(BigInteger.fromString("8"), 8n);
  assertStrictEquals(BigInteger.fromString("9"), 9n);
  assertStrictEquals(BigInteger.fromString("10"), 10n);

  assertStrictEquals(BigInteger.fromString(SIMAX.toString()), BigInt(SIMAX));
  assertStrictEquals(BigInteger.fromString(SIMIN.toString()), BigInt(SIMIN));
});

//TODO toString
