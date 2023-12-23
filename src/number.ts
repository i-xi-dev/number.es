export const ZERO = 0;

const UP = Symbol("UP"); // TOWARD_POSITIVE_INFINITY
const DOWN = Symbol("DOWN"); // TOWARD_NEGATIVE_INFINITY
const TOWARD_ZERO = Symbol("TOWARD_ZERO");
const HALF_AWAY_FROM_ZERO = Symbol("HALF_AWAY_FROM_ZERO");
const HALF_TO_EVEN = Symbol("HALF_TO_EVEN");

export const RoundingMode = {
  UP,
  DOWN,
  TOWARD_ZERO,
  AWAY_FROM_ZERO: Symbol("AWAY_FROM_ZERO"),
  HALF_UP: Symbol("HALF_UP"),
  HALF_DOWN: Symbol("HALF_DOWN"),
  HALF_TOWARD_ZERO: Symbol("HALF_TOWARD_ZERO"),
  HALF_AWAY_FROM_ZERO,
  HALF_TO_EVEN,

  /** Alias for `UP`. */
  CEILING: UP,

  /** Alias for `DOWN`. */
  FLOOR: DOWN,

  /** Alias for `TOWARD_ZERO`. */
  TRUNCATE: TOWARD_ZERO,

  /** Alias for `HALF_AWAY_FROM_ZERO`. */
  ROUND: HALF_AWAY_FROM_ZERO, // Math.roundとは違うので注意（Math.roundは.5の場合切り捨て）

  /** Alias for `HALF_TO_EVEN`. */
  CONVERGENT: HALF_TO_EVEN,
} as const;

export type RoundingMode = typeof RoundingMode[keyof typeof RoundingMode];

function _assertRange(min: number, max: number): void {
  if (Number.isFinite(min) !== true) {
    throw new TypeError("min");
  }
  if (Number.isFinite(max) !== true) {
    throw new TypeError("max");
  }
  if (min > max) {
    throw new RangeError("min, max");
  }
}

export function inRange(test: number, min: number, max: number): boolean {
  if (Number.isFinite(test) !== true) {
    throw new TypeError("test");
  }
  _assertRange(min, max);
  return (test >= min) && (test <= max);
}

export function clamp(source: number, min: number, max: number): number {
  if (Number.isFinite(source) !== true) {
    throw new TypeError("source");
  }
  _assertRange(min, max);
  return Math.max(min, Math.min(max, (source === 0) ? 0 : source));
}
