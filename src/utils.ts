export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export const NUMBER_ZERO = 0;

export const BIGINT_ZERO = 0n;

export function normalizeNumber<T extends number>(source: T): T {
  if (isNumber(source) !== true) {
    throw new TypeError("`source` is must be a `number`.");
  }
  if (Number.isFinite(source) !== true) {
    return source;
  }

  // -0は0にする
  // asを使っているが、0がTの範囲外ならそもそも0が返ることは無い
  return (source === NUMBER_ZERO) ? (NUMBER_ZERO as T) : source;
}

export function clampToSafeInteger(input: number): number {
  if (input <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }
  if (input >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  return input;
}

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}
