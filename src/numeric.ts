import { BigIntType, NumberType } from "../deps.ts";

export const NUMBER_ZERO = 0;

export const BIGINT_ZERO = 0n;

export function normalizeNumber<T extends number>(input: T): T {
  NumberType.assertNumber(input, "input");
  return NumberType.toNormalized(input);
}

export function clampToSafeInteger(input: number): number {
  NumberType.assertNumber(input, "input");

  if (Number.isNaN(input)) {
    throw new RangeError("`input` must not be `Number.NaN`.");
  }

  return NumberType.toClamped(
    input,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  );
}

export type numeric = number | bigint;

export function isPositive(test: numeric): test is numeric {
  return NumberType.isPositive(test) || BigIntType.isPositive(test);
}

export function isNonNegative(test: numeric): test is numeric {
  return NumberType.isNonNegative(test) || BigIntType.isNonNegative(test);
}

export function isNonPositive(test: numeric): test is numeric {
  return NumberType.isNonPositive(test) || BigIntType.isNonPositive(test);
}

export function isNegative(test: numeric): test is numeric {
  return NumberType.isNegative(test) || BigIntType.isNegative(test);
}

//TODO inRange

export function inSafeIntegerRange(test: numeric): test is numeric {
  return NumberType.isInRange(
    test,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  ) ||
    BigIntType.isInRange(
      test,
      BigInt(Number.MIN_SAFE_INTEGER),
      BigInt(Number.MAX_SAFE_INTEGER),
    );
}
