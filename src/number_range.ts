import * as _Utils from "./_utils.ts";

export type NumberRange = [min: number, max: number] | [minmax: number];

export namespace NumberRange {
  export type Resolved = [
    min: number,
    max: number,
  ];

  export function resolve(
    range: unknown, /* (NumberRange | Resolved) */
  ): Resolved {
    let min = Number.NEGATIVE_INFINITY;
    let max = Number.POSITIVE_INFINITY;
    if (Array.isArray(range)) {
      if (range.length > 0) {
        if (_Utils._isNumber(range[0])) {
          if (Number.isNaN(range[0])) {
            throw new RangeError("range[0]");
          }

          // finite or infinity
          min = range[0];
        } else {
          throw new TypeError("range[0]");
        }

        if (range.length > 1) {
          if (_Utils._isNumber(range[1])) {
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
