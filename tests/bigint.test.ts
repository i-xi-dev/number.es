import { assertStrictEquals, assertThrows } from "./deps.ts";
import { BigIntEx } from "../mod.ts";

const {
  clampBigInt,
  inRange,
} = BigIntEx;

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
