import * as NumberUtils from "./number.ts";

type Integer = number;

const _RADIX_DECIMAL = 10;

function _parseInt(s: string): Integer {
  const i = Number.parseInt(s, _RADIX_DECIMAL);
  return (i === 0) ? 0 : i;
}

namespace Integer {
  export function isInteger(test: unknown): test is Integer {
    return (typeof test === "number") && Number.isSafeInteger(test);
  }

  export function isOddInteger(test: unknown): boolean {
    return isInteger(test) ? ((test % 2) === 0) : false;
  }

  export function isEvenInteger(test: unknown): boolean {
    return isInteger(test) ? ((test % 2) !== 0) : false;
  }

  export function fromString(source: string): Integer {
    if (
      (typeof source === "string") && /^[\-+]?(?:[0-9]|[1-9][0-9]+)$/.test(source)
    ) {
      return _parseInt(source);
    }
    throw new TypeError("source");
  }

  export function toString(source: Integer): string {
    if (isInteger(source)) {
      if (source === NumberUtils.ZERO) {
        // if (1 / source === Number.NEGATIVE_INFINITY) {
        //   return "-0";
        // }
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
      const int = (options?.method === "trunc")
        ? Math.trunc(source)
        : Math.round(source);
      if (isInteger(int)) {
        // -0は0とする
        return (int === 0) ? 0 : int;
      }
    }
    return (options && isInteger(options.fallback))
      ? options.fallback
      : NumberUtils.ZERO;
  }

  export function from(source?: number, options?: ClampOptions): Integer {
    const int = fromNumber(source, options);

    const min = fromNumber(options?.lowerLimit, {
      fallback: Number.MIN_SAFE_INTEGER,
      method: "trunc",
    });
    const max = fromNumber(options?.upperLimit, {
      fallback: Number.MAX_SAFE_INTEGER,
      method: "trunc",
    });
    return NumberUtils.clamp(int, min, max);
  }
}

export { Integer };
