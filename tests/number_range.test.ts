// Deno.test("inRange()", () => {
//   assertStrictEquals(inRange(0, [0, 0]), true);
//   assertStrictEquals(inRange(-0, [0, 0]), true);
//   assertStrictEquals(inRange(1, [0, 0]), false);
//   assertStrictEquals(inRange(-1, [0, 0]), false);

//   assertStrictEquals(inRange(0, [-10, 10]), true);
//   assertStrictEquals(inRange(-0, [-10, 10]), true);
//   assertStrictEquals(inRange(-11, [-10, 10]), false);
//   assertStrictEquals(inRange(-10.1, [-10, 10]), false);
//   assertStrictEquals(inRange(-10, [-10, 10]), true);
//   assertStrictEquals(inRange(-9.9, [-10, 10]), true);
//   assertStrictEquals(inRange(9.9, [-10, 10]), true);
//   assertStrictEquals(inRange(10, [-10, 10]), true);
//   assertStrictEquals(inRange(10.1, [-10, 10]), false);
//   assertStrictEquals(inRange(11, [-10, 10]), false);

//   assertStrictEquals(inRange(10.6, [-10.5, 10.5]), false);
//   assertStrictEquals(inRange(10.5, [-10.5, 10.5]), true);
//   assertStrictEquals(inRange(10.4, [-10.5, 10.5]), true);
//   assertStrictEquals(inRange(-10.4, [-10.5, 10.5]), true);
//   assertStrictEquals(inRange(-10.5, [-10.5, 10.5]), true);
//   assertStrictEquals(inRange(-10.6, [-10.5, 10.5]), false);

//   assertThrows(
//     () => {
//       inRange(Number.MAX_SAFE_INTEGER, [undefined as unknown as number]);
//     },
//     TypeError,
//     "range[0]",
//   );
//   assertThrows(
//     () => {
//       inRange(Number.MAX_SAFE_INTEGER, ["0" as unknown as number]);
//     },
//     TypeError,
//     "range[0]",
//   );
//   assertThrows(
//     () => {
//       inRange(Number.MAX_SAFE_INTEGER, [0, undefined as unknown as number]);
//     },
//     TypeError,
//     "range[1]",
//   );
//   assertThrows(
//     () => {
//       inRange(Number.MAX_SAFE_INTEGER, [Number.NaN]);
//     },
//     RangeError,
//     "range[0]",
//   );
//   assertThrows(
//     () => {
//       inRange(Number.MAX_SAFE_INTEGER, [0, Number.NaN]);
//     },
//     RangeError,
//     "range[1]",
//   );

//   assertStrictEquals(
//     inRange(Number.NaN, [0]),
//     false,
//   );
//   assertStrictEquals(
//     inRange("0" as unknown as number, [0]),
//     false,
//   );
// });

// Deno.test("inRange() - 2", () => {
//   assertStrictEquals(inRange(0, [0]), true);
//   assertStrictEquals(inRange(-0, [0]), true);
//   assertStrictEquals(inRange(1, [0]), false);
//   assertStrictEquals(inRange(-1, [0]), false);

//   assertStrictEquals(inRange(0, [10, -10]), true);
//   assertStrictEquals(inRange(-0, [10, -10]), true);
//   assertStrictEquals(inRange(-11, [10, -10]), false);
//   assertStrictEquals(inRange(-10.1, [10, -10]), false);
//   assertStrictEquals(inRange(-10, [10, -10]), true);
//   assertStrictEquals(inRange(-9.9, [10, -10]), true);
//   assertStrictEquals(inRange(9.9, [10, -10]), true);
//   assertStrictEquals(inRange(10, [10, -10]), true);
//   assertStrictEquals(inRange(10.1, [10, -10]), false);
//   assertStrictEquals(inRange(11, [10, -10]), false);
// });

// Deno.test("Numeric.clampNumber()", () => {
//   assertStrictEquals(Numeric.clampNumber(0, 0, 0), 0);
//   assertStrictEquals(Numeric.clampNumber(-0, 0, 0), 0);
//   assertStrictEquals(Numeric.clampNumber(1, 0, 0), 0);
//   assertStrictEquals(Numeric.clampNumber(-1, 0, 0), 0);

//   assertStrictEquals(Numeric.clampNumber(0, -10, 10), 0);
//   assertStrictEquals(Numeric.clampNumber(-0, -10, 10), 0);
//   assertStrictEquals(Numeric.clampNumber(-11, -10, 10), -10);
//   assertStrictEquals(Numeric.clampNumber(-10.1, -10, 10), -10);
//   assertStrictEquals(Numeric.clampNumber(-10, -10, 10), -10);
//   assertStrictEquals(Numeric.clampNumber(-9.9, -10, 10), -9.9);
//   assertStrictEquals(Numeric.clampNumber(9.9, -10, 10), 9.9);
//   assertStrictEquals(Numeric.clampNumber(10, -10, 10), 10);
//   assertStrictEquals(Numeric.clampNumber(10.1, -10, 10), 10);
//   assertStrictEquals(Numeric.clampNumber(11, -10, 10), 10);

//   assertStrictEquals(Numeric.clampNumber(10.6, -10.5, 10.5), 10.5);
//   assertStrictEquals(Numeric.clampNumber(10.5, -10.5, 10.5), 10.5);
//   assertStrictEquals(Numeric.clampNumber(10.4, -10.5, 10.5), 10.4);
//   assertStrictEquals(Numeric.clampNumber(-10.4, -10.5, 10.5), -10.4);
//   assertStrictEquals(Numeric.clampNumber(-10.5, -10.5, 10.5), -10.5);
//   assertStrictEquals(Numeric.clampNumber(-10.6, -10.5, 10.5), -10.5);

//   assertThrows(
//     () => {
//       Numeric.clampNumber(Number.MAX_SAFE_INTEGER, [
//         undefined as unknown as number,
//       ]);
//     },
//     TypeError,
//     "range[0]",
//   );
//   assertThrows(
//     () => {
//       Numeric.clampNumber(Number.MAX_SAFE_INTEGER, ["0" as unknown as number]);
//     },
//     TypeError,
//     "range[0]",
//   );
//   assertThrows(
//     () => {
//       Numeric.clampNumber(Number.MAX_SAFE_INTEGER, [
//         0,
//         undefined as unknown as number,
//       ]);
//     },
//     TypeError,
//     "range[1]",
//   );
//   assertThrows(
//     () => {
//       Numeric.clampNumber(Number.MAX_SAFE_INTEGER, [Number.NaN]);
//     },
//     RangeError,
//     "range[0]",
//   );
//   assertThrows(
//     () => {
//       Numeric.clampNumber(Number.MAX_SAFE_INTEGER, [0, Number.NaN]);
//     },
//     RangeError,
//     "range[1]",
//   );

//   assertThrows(
//     () => {
//       Numeric.clampNumber(Number.NaN, [0]);
//     },
//     TypeError,
//     "source",
//   );
//   assertThrows(
//     () => {
//       Numeric.clampNumber("0" as unknown as number, [0]);
//     },
//     TypeError,
//     "source",
//   );
// });

// Deno.test("Numeric.clampNumber() - 2", () => {
//   assertStrictEquals(Numeric.clampNumber(0, [0]), 0);
//   assertStrictEquals(Numeric.clampNumber(-0, [0]), 0);
//   assertStrictEquals(Numeric.clampNumber(1, [0]), 0);
//   assertStrictEquals(Numeric.clampNumber(-1, [0]), 0);

//   assertStrictEquals(Numeric.clampNumber(0, [10, -10]), 0);
//   assertStrictEquals(Numeric.clampNumber(-0, [10, -10]), 0);
//   assertStrictEquals(Numeric.clampNumber(-11, [10, -10]), -10);
//   assertStrictEquals(Numeric.clampNumber(-10.1, [10, -10]), -10);
//   assertStrictEquals(Numeric.clampNumber(-10, [10, -10]), -10);
//   assertStrictEquals(Numeric.clampNumber(-9.9, [10, -10]), -9.9);
//   assertStrictEquals(Numeric.clampNumber(9.9, [10, -10]), 9.9);
//   assertStrictEquals(Numeric.clampNumber(10, [10, -10]), 10);
//   assertStrictEquals(Numeric.clampNumber(10.1, [10, -10]), 10);
//   assertStrictEquals(Numeric.clampNumber(11, [10, -10]), 10);
// });
