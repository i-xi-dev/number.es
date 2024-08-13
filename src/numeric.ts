export const ZERO = 0;

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isPositive(test: number): boolean {
  return isNumber(test) && (test > ZERO);
}

export function isNonNegative(test: number): boolean {
  return isNumber(test) && (test >= ZERO);
}

export function isNonPositive(test: number): boolean {
  return isNumber(test) && (test <= ZERO);
}

export function isNegative(test: number): boolean {
  return (isNumber(test) && test < ZERO);
}

export function normalize<T extends number>(source: T): T {
  if (isNumber(source) !== true) {
    throw new TypeError("`source` is must be a `number`.");
  }
  if (Number.isFinite(source) !== true) {
    return source;
  }

  // -0は0とする
  return (source === ZERO) ? ZERO as T : source;
}
