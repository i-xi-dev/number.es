import * as NumberUtils from "./number.ts";

type Integer = number;

const _RADIX_DECIMAL = 10;

namespace Integer {
  export function isInteger(test: unknown): test is Integer {
    return (typeof test === "number") && Number.isSafeInteger(test);
  }

  export function fromString(source: string): Integer {
    if (
      (typeof source === "string") && /^-?(?:[0-9]|[1-9][0-9]+)$/.test(source)
    ) {
      return Number.parseInt(source, _RADIX_DECIMAL);
    }
    throw new TypeError("source");
  }

  export function toString(source: Integer): string {
    if (isInteger(source)) {
      if (source === NumberUtils.ZERO) {
        if (1 / source === Number.NEGATIVE_INFINITY) {
          return "-0";
        }
        return "0";
      }
      return source.toString(_RADIX_DECIMAL);
    }
    throw new TypeError("source");
  }

  export type FromOptions = {
    fallback?: Integer;
    method?: "trunc" | "round";
  };

  export type ClampOptions = FromOptions & {
    lowerLimit?: Integer;
    upperLimit?: Integer;
  };

  export function fromNumber(source?: number, options?: FromOptions): Integer {
    if ((typeof source === "number") && Number.isFinite(source)) {
      return (options?.method === "trunc")
        ? Math.trunc(source)
        : Math.round(source);
    }
    return (options && isInteger(options.fallback))
      ? options.fallback
      : NumberUtils.ZERO;
  }

  export function clamp(source: number, options?: ClampOptions): Integer {
    const int = fromNumber(source, options);

    const min = fromNumber(options?.lowerLimit, {
      fallback: Number.MIN_VALUE,
      method: "trunc",
    });
    const max = fromNumber(options?.upperLimit, {
      fallback: Number.MAX_VALUE,
      method: "trunc",
    });
    return Math.max(min, Math.min(max, int));
  }
}
Object.freeze(Integer);

export { Integer };
