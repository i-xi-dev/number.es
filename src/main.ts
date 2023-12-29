export const ZERO = 0;

/**
 * 2, 8, 10, or 16.
 */
export const Radix = {
  BINARY: 2,
  DECIMAL: 10,
  HEXADECIMAL: 16,
  OCTAL: 8,
} as const;

export type Radix = typeof Radix[keyof typeof Radix];

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

/**
 * Determines whether the `test` is a positive number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a positive number. (positive finite or positive infinity)
 */
export function isPositiveNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) > ZERO);
}

/**
 * Determines whether the `test` is a non-negative number.
 *
 * @param test - The value to be tested
 * @returns Whether the `test` is a non-negative number. (non-negative finite or positive infinity)
 */
export function isNonNegativeNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) >= ZERO);
}

export function isNonPositiveNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) <= ZERO);
}

export function isNegativeNumber(test: unknown): boolean {
  return isNumber(test) && ((test as number) < ZERO);
}

export function isOddInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) !== ZERO) : false;
}

export function isEvenInteger(test: unknown): boolean {
  return Number.isInteger(test) ? (((test as number) % 2) === ZERO) : false;
}

export function normalizeNumber(source: number): number {
  if (isNumber(source) !== true) {
    throw new TypeError("source");
  }

  // -0は0とする
  return (source === ZERO) ? ZERO : source;
}

export type Range = [min: number, max: number] | [minmax: number];

export namespace Range {
  export type Resolved = [
    min: number,
    max: number,
  ];

  export function resolve(range: unknown /* (Range | Resolved) */): Resolved {
    let min = Number.NEGATIVE_INFINITY;
    let max = Number.POSITIVE_INFINITY;
    if (Array.isArray(range)) {
      if (range.length > 0) {
        if (isNumber(range[0])) {
          if (Number.isNaN(range[0])) {
            throw new RangeError("range[0]");
          }

          // finite or infinity
          min = range[0];
        } else {
          throw new TypeError("range[0]");
        }

        if (range.length > 1) {
          if (isNumber(range[1])) {
            if (Number.isNaN(range[1])) {
              throw new RangeError("range[1]");
            }

            // finite or infinity
            max = range[1];
          } else {
            throw new TypeError("range[1]");
          }
        } else {
          max = min;
        }
      }
    }

    return [
      Math.min(min, max),
      Math.max(min, max),
    ];
  }
}

export function clampNumber(source: number, range: Range): number {
  if ((isNumber(source) !== true) || Number.isNaN(source)) {
    throw new TypeError("source");
  }

  const [min, max] = Range.resolve(range);
  const clamped = Math.max(
    min,
    Math.min(max, source),
  );
  return normalizeNumber(clamped);
}

export function inRange(test: number, range: Range): boolean {
  if ((isNumber(test) !== true) || Number.isNaN(test)) {
    return false;
  }

  const [min, max] = Range.resolve(range);
  return (test >= min) && (test <= max);
}
