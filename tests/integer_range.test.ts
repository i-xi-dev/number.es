import { assertStrictEquals, assertThrows } from "./deps.ts";
import { IntegerRange } from "../mod.ts";

const minmax2m = { min: -2, max: -2 };
const minmax1m = { min: -1, max: -1 };
const minmax0 = { min: 0, max: 0 };
const minmax1 = { min: 1, max: 1 };
const minmax2 = { min: 2, max: 2 };

const min0max1 = { min: 0, max: 1 };

Deno.test("IntegerRange.rangeEquals()", () => {
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax0), true);

  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax1), false);
  assertStrictEquals(IntegerRange.rangeEquals(min0max1, minmax2m), false);

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, min0max1), false);
  assertStrictEquals(
    IntegerRange.rangeEquals({ min: -1, max: 0 }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeEquals(minmax0, { min: -1, max: 0 }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax1), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax1m, minmax0), false);

  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax2), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax2, minmax0), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax0, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeEquals(minmax2m, minmax0), false);
});

Deno.test("IntegerRange.rangeOverlaps()", () => {
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax0, minmax0), true);

  assertStrictEquals(IntegerRange.rangeOverlaps(min0max1, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(min0max1, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(min0max1, minmax0), true);
  assertStrictEquals(IntegerRange.rangeOverlaps(min0max1, minmax1), true);
  assertStrictEquals(IntegerRange.rangeOverlaps(min0max1, minmax2m), false);

  assertStrictEquals(IntegerRange.rangeOverlaps(minmax0, min0max1), true);
  assertStrictEquals(
    IntegerRange.rangeOverlaps({ min: -1, max: 0 }, minmax0),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeOverlaps(minmax0, { min: -1, max: 0 }),
    true,
  );

  assertStrictEquals(IntegerRange.rangeOverlaps(minmax0, minmax1), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax0, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax1m, minmax0), false);

  assertStrictEquals(IntegerRange.rangeOverlaps(minmax0, minmax2), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax2, minmax0), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax0, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeOverlaps(minmax2m, minmax0), false);
});

Deno.test("IntegerRange.rangeCovers()", () => {
  assertStrictEquals(IntegerRange.rangeCovers(minmax0, minmax0), true);

  assertStrictEquals(IntegerRange.rangeCovers(min0max1, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeCovers(min0max1, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeCovers(min0max1, minmax0), true);
  assertStrictEquals(IntegerRange.rangeCovers(min0max1, minmax1), true);
  assertStrictEquals(IntegerRange.rangeCovers(min0max1, minmax2m), false);

  assertStrictEquals(IntegerRange.rangeCovers(minmax0, min0max1), false);
  assertStrictEquals(
    IntegerRange.rangeCovers({ min: -1, max: 0 }, minmax0),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeCovers(minmax0, { min: -1, max: 0 }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeCovers(minmax0, minmax1), false);
  assertStrictEquals(IntegerRange.rangeCovers(minmax1, minmax0), false);
  assertStrictEquals(IntegerRange.rangeCovers(minmax0, minmax1m), false);
  assertStrictEquals(IntegerRange.rangeCovers(minmax1m, minmax0), false);

  assertStrictEquals(IntegerRange.rangeCovers(minmax0, minmax2), false);
  assertStrictEquals(IntegerRange.rangeCovers(minmax2, minmax0), false);
  assertStrictEquals(IntegerRange.rangeCovers(minmax0, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeCovers(minmax2m, minmax0), false);
});

Deno.test("IntegerRange.rangeIsDisjointFrom()", () => {
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax0), false);

  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax2m),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax1m),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(min0max1, minmax2m),
    true,
  );

  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(minmax0, min0max1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom({ min: -1, max: 0 }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsDisjointFrom(minmax0, { min: -1, max: 0 }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax1), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax1, minmax0), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax1m), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax1m, minmax0), true);

  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax2), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax2, minmax0), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax0, minmax2m), true);
  assertStrictEquals(IntegerRange.rangeIsDisjointFrom(minmax2m, minmax0), true);
});

Deno.test("IntegerRange.rangeIsAdjacentTo()", () => {
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax0), false);

  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax2m),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax1m),
    true,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(min0max1, minmax2m),
    false,
  );

  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(minmax0, min0max1),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo({ min: -1, max: 0 }, minmax0),
    false,
  );
  assertStrictEquals(
    IntegerRange.rangeIsAdjacentTo(minmax0, { min: -1, max: 0 }),
    false,
  );

  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax1), true);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax1, minmax0), true);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax1m), true);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax1m, minmax0), true);

  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax2), false);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax2, minmax0), false);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax0, minmax2m), false);
  assertStrictEquals(IntegerRange.rangeIsAdjacentTo(minmax2m, minmax0), false);
});

//TODO ,,fromRangeLike 
