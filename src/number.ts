export const ZERO = 0;

export function inRange(test: number, min: number, max: number): boolean {
  if (Number.isFinite(test)) {
    return (test >= min) && (test <= max);
  }
  return false;
}

// 引数チェック済み前提
export function clamp(source: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, (source === 0) ? 0 : source));
}
