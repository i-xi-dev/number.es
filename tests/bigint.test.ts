import { assertStrictEquals, assertThrows } from "./deps.ts";
import { BigIntEx } from "../mod.ts";

const {
  clampBigInt,
  inRange,
  isEvenBigInt,
  isNegativeBigInt,
  isNonNegativeBigInt,
  isNonPositiveBigInt,
  isOddBigInt,
  isPositiveBigInt,
  ZERO,
} = BigIntEx;

Deno.test("ZERO", () => {
  assertStrictEquals(ZERO, 0n);
});

Deno.test("isPositiveBigInt()", () => {
  assertStrictEquals(isPositiveBigInt(0n), false);
  assertStrictEquals(isPositiveBigInt(-0n), false);
  assertStrictEquals(isPositiveBigInt(1n), true);
  assertStrictEquals(isPositiveBigInt(-1n), false);

  assertStrictEquals(isPositiveBigInt(-10.1), false);
  assertStrictEquals(isPositiveBigInt(-9.9), false);
  assertStrictEquals(isPositiveBigInt(9.9), false);
  assertStrictEquals(isPositiveBigInt(10.1), false);

  assertStrictEquals(isPositiveBigInt(Number.NaN), false);
  assertStrictEquals(isPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isPositiveBigInt(undefined), false);
  assertStrictEquals(isPositiveBigInt(null), false);
  assertStrictEquals(isPositiveBigInt(""), false);
  assertStrictEquals(isPositiveBigInt("0"), false);
});

Deno.test("isNonNegativeBigInt()", () => {
  assertStrictEquals(isNonNegativeBigInt(0n), true);
  assertStrictEquals(isNonNegativeBigInt(-0n), true);
  assertStrictEquals(isNonNegativeBigInt(1n), true);
  assertStrictEquals(isNonNegativeBigInt(-1n), false);

  assertStrictEquals(isNonNegativeBigInt(-10.1), false);
  assertStrictEquals(isNonNegativeBigInt(-9.9), false);
  assertStrictEquals(isNonNegativeBigInt(9.9), false);
  assertStrictEquals(isNonNegativeBigInt(10.1), false);

  assertStrictEquals(isNonNegativeBigInt(Number.NaN), false);
  assertStrictEquals(isNonNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonNegativeBigInt(undefined), false);
  assertStrictEquals(isNonNegativeBigInt(null), false);
  assertStrictEquals(isNonNegativeBigInt(""), false);
  assertStrictEquals(isNonNegativeBigInt("0"), false);
});

Deno.test("isNonPositiveBigInt()", () => {
  assertStrictEquals(isNonPositiveBigInt(0n), true);
  assertStrictEquals(isNonPositiveBigInt(-0n), true);
  assertStrictEquals(isNonPositiveBigInt(1n), false);
  assertStrictEquals(isNonPositiveBigInt(-1n), true);

  assertStrictEquals(isNonPositiveBigInt(-10.1), false);
  assertStrictEquals(isNonPositiveBigInt(-9.9), false);
  assertStrictEquals(isNonPositiveBigInt(9.9), false);
  assertStrictEquals(isNonPositiveBigInt(10.1), false);

  assertStrictEquals(isNonPositiveBigInt(Number.NaN), false);
  assertStrictEquals(isNonPositiveBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNonPositiveBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNonPositiveBigInt(undefined), false);
  assertStrictEquals(isNonPositiveBigInt(null), false);
  assertStrictEquals(isNonPositiveBigInt(""), false);
  assertStrictEquals(isNonPositiveBigInt("0"), false);
});

Deno.test("isNegativeBigInt()", () => {
  assertStrictEquals(isNegativeBigInt(0n), false);
  assertStrictEquals(isNegativeBigInt(-0n), false);
  assertStrictEquals(isNegativeBigInt(1n), false);
  assertStrictEquals(isNegativeBigInt(-1n), true);

  assertStrictEquals(isNegativeBigInt(-10.1), false);
  assertStrictEquals(isNegativeBigInt(-9.9), false);
  assertStrictEquals(isNegativeBigInt(9.9), false);
  assertStrictEquals(isNegativeBigInt(10.1), false);

  assertStrictEquals(isNegativeBigInt(Number.NaN), false);
  assertStrictEquals(isNegativeBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isNegativeBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isNegativeBigInt(undefined), false);
  assertStrictEquals(isNegativeBigInt(null), false);
  assertStrictEquals(isNegativeBigInt(""), false);
  assertStrictEquals(isNegativeBigInt("0"), false);
});

Deno.test("isOddBigInt()", () => {
  assertStrictEquals(isOddBigInt(0n), false);
  assertStrictEquals(isOddBigInt(-0n), false);
  assertStrictEquals(isOddBigInt(1n), true);
  assertStrictEquals(isOddBigInt(-1n), true);
  assertStrictEquals(isOddBigInt(2n), false);
  assertStrictEquals(isOddBigInt(-2n), false);
  assertStrictEquals(isOddBigInt(3n), true);
  assertStrictEquals(isOddBigInt(-3n), true);

  assertStrictEquals(isOddBigInt(-10.1), false);
  assertStrictEquals(isOddBigInt(-9.9), false);
  assertStrictEquals(isOddBigInt(9.9), false);
  assertStrictEquals(isOddBigInt(10.1), false);

  assertStrictEquals(isOddBigInt(Number.NaN), false);
  assertStrictEquals(isOddBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isOddBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isOddBigInt(undefined), false);
  assertStrictEquals(isOddBigInt(null), false);
  assertStrictEquals(isOddBigInt(""), false);
  assertStrictEquals(isOddBigInt("0"), false);
});

Deno.test("isEvenBigInt()", () => {
  assertStrictEquals(isEvenBigInt(0n), true);
  assertStrictEquals(isEvenBigInt(-0n), true);
  assertStrictEquals(isEvenBigInt(1n), false);
  assertStrictEquals(isEvenBigInt(-1n), false);
  assertStrictEquals(isEvenBigInt(2n), true);
  assertStrictEquals(isEvenBigInt(-2n), true);
  assertStrictEquals(isEvenBigInt(3n), false);
  assertStrictEquals(isEvenBigInt(-3n), false);

  assertStrictEquals(isEvenBigInt(-10.1), false);
  assertStrictEquals(isEvenBigInt(-9.9), false);
  assertStrictEquals(isEvenBigInt(9.9), false);
  assertStrictEquals(isEvenBigInt(10.1), false);

  assertStrictEquals(isEvenBigInt(Number.NaN), false);
  assertStrictEquals(isEvenBigInt(Number.POSITIVE_INFINITY), false);
  assertStrictEquals(isEvenBigInt(Number.NEGATIVE_INFINITY), false);

  assertStrictEquals(isEvenBigInt(undefined), false);
  assertStrictEquals(isEvenBigInt(null), false);
  assertStrictEquals(isEvenBigInt(""), false);
  assertStrictEquals(isEvenBigInt("0"), false);
});

Deno.test("clampBigInt()", () => {
  assertStrictEquals(clampBigInt(0n, [0n, 0n]), 0n);
  assertStrictEquals(clampBigInt(-0n, [0n, 0n]), 0n);
  assertStrictEquals(clampBigInt(1n, [0n, 0n]), 0n);
  assertStrictEquals(clampBigInt(1n, [-0n, -0n]), 0n);
  assertStrictEquals(clampBigInt(-1n, [0n, 0n]), 0n);

  assertStrictEquals(clampBigInt(0n, [-10n, 10n]), 0n);
  assertStrictEquals(clampBigInt(-0n, [-10n, 10n]), 0n);
  assertStrictEquals(clampBigInt(-11n, [-10n, 10n]), -10n);
  assertStrictEquals(clampBigInt(-10n, [-10n, 10n]), -10n);
  assertStrictEquals(clampBigInt(-9n, [-10n, 10n]), -9n);
  assertStrictEquals(clampBigInt(9n, [-10n, 10n]), 9n);
  assertStrictEquals(clampBigInt(10n, [-10n, 10n]), 10n);
  assertStrictEquals(clampBigInt(11n, [-10n, 10n]), 10n);
  assertStrictEquals(
    clampBigInt(BigInt(Number.MAX_SAFE_INTEGER), [-10n, 10n]),
    10n,
  );
  assertStrictEquals(
    clampBigInt(BigInt(Number.MIN_SAFE_INTEGER), [-10n, 10n]),
    -10n,
  );

  assertThrows(
    () => {
      clampBigInt(0n, [undefined as unknown as bigint]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      clampBigInt(0n, ["0" as unknown as bigint]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      clampBigInt(0n, [0n, undefined as unknown as bigint]);
    },
    TypeError,
    "range[1]",
  );
  assertThrows(
    () => {
      clampBigInt(0n, [Number.NaN as unknown as bigint]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      clampBigInt(0n, [0n, Number.NaN as unknown as bigint]);
    },
    TypeError,
    "range[1]",
  );

  assertThrows(
    () => {
      clampBigInt(Number.NaN as unknown as bigint, [0n]);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      clampBigInt("0" as unknown as bigint, [0n]);
    },
    TypeError,
    "source",
  );
});

Deno.test("clampBigInt() - 2", () => {
  assertStrictEquals(clampBigInt(0n, [0n]), 0n);
  assertStrictEquals(clampBigInt(-0n, [0n]), 0n);
  assertStrictEquals(clampBigInt(-0n, [-0n]), 0n);
  assertStrictEquals(clampBigInt(1n, [0n]), 0n);
  assertStrictEquals(clampBigInt(-1n, [0n]), 0n);

  assertStrictEquals(clampBigInt(0n, [10n, -10n]), 0n);
  assertStrictEquals(clampBigInt(-0n, [10n, -10n]), 0n);
  assertStrictEquals(clampBigInt(-11n, [10n, -10n]), -10n);
  assertStrictEquals(clampBigInt(-10n, [10n, -10n]), -10n);
  assertStrictEquals(clampBigInt(-9n, [10n, -10n]), -9n);
  assertStrictEquals(clampBigInt(9n, [10n, -10n]), 9n);
  assertStrictEquals(clampBigInt(10n, [10n, -10n]), 10n);
  assertStrictEquals(clampBigInt(11n, [10n, -10n]), 10n);
});

Deno.test("inRange()", () => {
  assertStrictEquals(inRange(0n, [0n, 0n]), true);
  assertStrictEquals(inRange(-0n, [0n, 0n]), true);
  assertStrictEquals(inRange(1n, [0n, 0n]), false);
  assertStrictEquals(inRange(-1n, [0n, 0n]), false);

  assertStrictEquals(inRange(0n, [-10n, 10n]), true);
  assertStrictEquals(inRange(-0n, [-10n, 10n]), true);
  assertStrictEquals(inRange(-11n, [-10n, 10n]), false);
  assertStrictEquals(inRange(-10n, [-10n, 10n]), true);
  assertStrictEquals(inRange(-9n, [-10n, 10n]), true);
  assertStrictEquals(inRange(9n, [-10n, 10n]), true);
  assertStrictEquals(inRange(10n, [-10n, 10n]), true);
  assertStrictEquals(inRange(11n, [-10n, 10n]), false);

  assertThrows(
    () => {
      inRange(0n, [undefined as unknown as bigint]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      inRange(0n, ["0" as unknown as bigint]);
    },
    TypeError,
    "range[0]",
  );
  assertThrows(
    () => {
      inRange(0n, [0n, undefined as unknown as bigint]);
    },
    TypeError,
    "range[1]",
  );

  assertStrictEquals(
    inRange(Number.NaN as unknown as bigint, [0n]),
    false,
  );
  assertStrictEquals(
    inRange("0" as unknown as bigint, [0n]),
    false,
  );
});

Deno.test("inRange() - 2", () => {
  assertStrictEquals(inRange(0n, [0n]), true);
  assertStrictEquals(inRange(-0n, [0n]), true);
  assertStrictEquals(inRange(1n, [0n]), false);
  assertStrictEquals(inRange(-1n, [0n]), false);

  assertStrictEquals(inRange(0n, [10n, -10n]), true);
  assertStrictEquals(inRange(-0n, [10n, -10n]), true);
  assertStrictEquals(inRange(-11n, [10n, -10n]), false);
  assertStrictEquals(inRange(-10n, [10n, -10n]), true);
  assertStrictEquals(inRange(-9n, [10n, -10n]), true);
  assertStrictEquals(inRange(9n, [10n, -10n]), true);
  assertStrictEquals(inRange(10n, [10n, -10n]), true);
  assertStrictEquals(inRange(11n, [10n, -10n]), false);
});
