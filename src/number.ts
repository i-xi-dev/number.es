export const ZERO = 0;

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
