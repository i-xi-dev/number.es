export const NUMBER_ZERO = 0;

export const BIGINT_ZERO = 0n;

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function normalizeNumber<T extends number>(input: T): T {
  if (isNumber(input) !== true) {
    throw new TypeError("`input` must be a `number`.");
  }
  if (Number.isFinite(input) !== true) {
    return input;
  }

  // -0は0にする
  // asを使っているが、0がTの範囲外ならそもそも0が返ることは無い
  return (input === NUMBER_ZERO) ? (NUMBER_ZERO as T) : input;
}

export function clampToSafeInteger(input: number): number {
  if (isNumber(input) !== true) {
    throw new TypeError("`input` must be a `number`.");
  }
  if (Number.isNaN(input)) {
    throw new RangeError("`input` must not be `Number.NaN`.");
  }

  if (input <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }
  if (input >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  return input;
}

export type numeric = number | bigint;

function _isNumeric(test: unknown): test is numeric {
  return (isNumber(test) && (Number.isNaN(test) !== true)) || isBigInt(test);
}

export function isPositive(test: numeric): boolean {
  return _isNumeric(test) && (test > NUMBER_ZERO);
}

export function isNonNegative(test: numeric): boolean {
  return _isNumeric(test) && (test >= NUMBER_ZERO);
}

export function isNonPositive(test: numeric): boolean {
  return _isNumeric(test) && (test <= NUMBER_ZERO);
}

export function isNegative(test: numeric): boolean {
  return _isNumeric(test) && (test < NUMBER_ZERO);
}

export function inSafeIntegerRange(test: numeric) {
  return _isNumeric(test) && (test >= Number.MIN_SAFE_INTEGER) &&
    (test <= Number.MAX_SAFE_INTEGER);
}
