export function _isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function _max(...args: bigint[]): bigint {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => _isBigInt(i))) !== true
  ) {
    throw new TypeError("args");
  }
  let max = args[0];
  let tmp: bigint;
  for (let i = 1; i < args.length; i++) {
    tmp = args[i];
    if (tmp > max) {
      max = tmp;
    }
  }
  return max;
}

export function _min(...args: bigint[]): bigint {
  if (
    (Array.isArray(args) && (args.length > 0) &&
      args.every((i) => _isBigInt(i))) !== true
  ) {
    throw new TypeError("args");
  }
  let min = args[0];
  let tmp: bigint;
  for (let i = 1; i < args.length; i++) {
    tmp = args[i];
    if (tmp < min) {
      min = tmp;
    }
  }
  return min;
}
