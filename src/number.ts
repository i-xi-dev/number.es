namespace NumberUtils {
  export const ZERO = 0;

  export function clamp(c: number, min: number, max: number): number {
    if (Number.isFinite(c) && Number.isFinite(min) && Number.isFinite(max)) {
      return Math.max(min, Math.min(max, c));
    }
    throw new TypeError("c | min | max");
  }
}

export { NumberUtils };
