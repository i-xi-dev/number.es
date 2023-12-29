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
        if (Number.isFinite(range[0])) {
          min = range[0];
        }

        if (range.length > 1) {
          if (Number.isFinite(range[1])) {
            max = range[1];
          }
        } else {
          if (Number.isFinite(range[0])) {
            max = range[0];
          }
        }
      }
    }

    return [
      Math.min(min, max),
      Math.max(min, max),
    ];
  }
}
