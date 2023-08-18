export const ZERO = 0;

export function inRange(test: number, min: number, max: number): boolean {
  if (Number.isFinite(test)) {
    return (test >= min) && (test <= max);
  }
  return false;
}
