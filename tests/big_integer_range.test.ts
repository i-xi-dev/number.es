import { assertStrictEquals, assertThrows } from "./deps.ts";
import { BigIntegerRange } from "../mod.ts";

const range00 = BigIntegerRange.of(0n);
const range01 = BigIntegerRange.of(0n, 1n);
const range10 = BigIntegerRange.of(-1n, 0n);
const range23 = BigIntegerRange.of(2n, 3n);
const range32 = BigIntegerRange.of(-3n, -2n);

const range00b = BigIntegerRange.from({ min: 0n, max: 0n });
const range01b = BigIntegerRange.from({ min: 0n, max: 1n });
const range10b = BigIntegerRange.from({ min: -1n, max: 0n });

const rangeX01 = BigIntegerRange.of(-20n, 280n);

Deno.test("new BigIntegerRange()", () => {
  const em1 = "Range size exceeds upper limit.";

  assertThrows(
    () => {
      BigIntegerRange.from([0n, 0x1_0000_0000_0000_0000n]);
    },
    RangeError,
    em1,
  );

  assertThrows(
    () => {
      BigIntegerRange.from([-1n, 0xFFFF_FFFF_FFFF_FFFFn]);
    },
    RangeError,
    em1,
  );

  const x0 = BigIntegerRange.from([1n, BigInt(Number.MAX_SAFE_INTEGER)]);
  assertStrictEquals(x0.size, Number.MAX_SAFE_INTEGER);
});

Deno.test("BigIntegerRange.prototype.min", () => {
  assertStrictEquals(range00.min, 0n);
  assertStrictEquals(range01.min, 0n);
  assertStrictEquals(range10.min, -1n);
  assertStrictEquals(range23.min, 2n);
  assertStrictEquals(range32.min, -3n);

  assertStrictEquals(range00b.min, 0n);
  assertStrictEquals(range01b.min, 0n);
  assertStrictEquals(range10b.min, -1n);

  assertStrictEquals(rangeX01.min, -20n);
});

Deno.test("BigIntegerRange.prototype.max", () => {
  assertStrictEquals(range00.max, 0n);
  assertStrictEquals(range01.max, 1n);
  assertStrictEquals(range10.max, 0n);
  assertStrictEquals(range23.max, 3n);
  assertStrictEquals(range32.max, -2n);

  assertStrictEquals(range00b.max, 0n);
  assertStrictEquals(range01b.max, 1n);
  assertStrictEquals(range10b.max, 0n);

  assertStrictEquals(rangeX01.max, 280n);
});

Deno.test("BigIntegerRange.prototype.size", () => {
  assertStrictEquals(range00.size, 1);
  assertStrictEquals(range01.size, 2);
  assertStrictEquals(range10.size, 2);
  assertStrictEquals(range23.size, 2);
  assertStrictEquals(range32.size, 2);

  assertStrictEquals(range00b.size, 1);
  assertStrictEquals(range01b.size, 2);
  assertStrictEquals(range10b.size, 2);

  assertStrictEquals(rangeX01.size, 301);
});

Deno.test("BigIntegerRange.from()", () => {
  const t1 = BigIntegerRange.from(rangeX01);
  assertStrictEquals(t1.min, -20n);
  assertStrictEquals(t1.max, 280n);
  assertStrictEquals(t1.size, 301);
});

Deno.test("BigIntegerRange.of()", () => {
  const t1 = BigIntegerRange.of(4n, 8n, 9n);
  assertStrictEquals(t1.min, 4n);
  assertStrictEquals(t1.max, 8n);
  assertStrictEquals(t1.size, 5);
});

Deno.test("BigIntegerRange.prototype.rangeEquals()", () => {
  assertStrictEquals(range00.rangeEquals(range00), true);
  assertStrictEquals(range00.rangeEquals([0n]), true);
  assertStrictEquals(range00.rangeEquals([0n, 0n]), true);
  assertStrictEquals(range00.rangeEquals({ min: 0n, max: 0n }), true);
  assertStrictEquals(range00.rangeEquals(range01), false);
  assertStrictEquals(range00.rangeEquals(range10), false);

  assertStrictEquals(range00.rangeEquals(range00b), true);
  assertStrictEquals(range00.rangeEquals(range01b), false);
  assertStrictEquals(range00.rangeEquals(range10b), false);

  assertStrictEquals(range01.rangeEquals(range00), false);
  assertStrictEquals(range01.rangeEquals([0n, 1n]), true);
  assertStrictEquals(range01.rangeEquals({ min: 0n, max: 1n }), true);
  assertStrictEquals(range01.rangeEquals(range01), true);
  assertStrictEquals(range01.rangeEquals(range10), false);

  assertStrictEquals(range01.rangeEquals(range00b), false);
  assertStrictEquals(range01.rangeEquals(range01b), true);
  assertStrictEquals(range01.rangeEquals(range10b), false);

  assertStrictEquals(range10.rangeEquals(range00), false);
  assertStrictEquals(range10.rangeEquals(range01), false);
  assertStrictEquals(range10.rangeEquals(range10), true);

  assertStrictEquals(range10.rangeEquals(range00b), false);
  assertStrictEquals(range10.rangeEquals(range01b), false);
  assertStrictEquals(range10.rangeEquals(range10b), true);

  assertStrictEquals(range23.rangeEquals(range00), false);
  assertStrictEquals(range23.rangeEquals(range01), false);
  assertStrictEquals(range23.rangeEquals(range10), false);

  assertStrictEquals(range23.rangeEquals(range00b), false);
  assertStrictEquals(range23.rangeEquals(range01b), false);
  assertStrictEquals(range23.rangeEquals(range10b), false);

  assertStrictEquals(range32.rangeEquals(range00), false);
  assertStrictEquals(range32.rangeEquals(range01), false);
  assertStrictEquals(range32.rangeEquals(range10), false);

  assertStrictEquals(range32.rangeEquals(range00b), false);
  assertStrictEquals(range32.rangeEquals(range01b), false);
  assertStrictEquals(range32.rangeEquals(range10b), false);
});

Deno.test("BigIntegerRange.prototype.overlaps()", () => {
  assertStrictEquals(range00.overlaps(range00), true);
  assertStrictEquals(range00.overlaps([0n]), true);
  assertStrictEquals(range00.overlaps([0n, 0n]), true);
  assertStrictEquals(range00.overlaps({ min: 0n, max: 0n }), true);
  assertStrictEquals(range00.overlaps(range01), true);
  assertStrictEquals(range00.overlaps(range10), true);

  assertStrictEquals(range00.overlaps(range00b), true);
  assertStrictEquals(range00.overlaps(range01b), true);
  assertStrictEquals(range00.overlaps(range10b), true);

  assertStrictEquals(range01.overlaps(range00), true);
  assertStrictEquals(range01.overlaps([0n, 1n]), true);
  assertStrictEquals(range01.overlaps({ min: 0n, max: 1n }), true);
  assertStrictEquals(range01.overlaps(range01), true);
  assertStrictEquals(range01.overlaps(range10), true);

  assertStrictEquals(range01.overlaps(range00b), true);
  assertStrictEquals(range01.overlaps(range01b), true);
  assertStrictEquals(range01.overlaps(range10b), true);

  assertStrictEquals(range10.overlaps(range00), true);
  assertStrictEquals(range10.overlaps(range01), true);
  assertStrictEquals(range10.overlaps(range10), true);

  assertStrictEquals(range10.overlaps(range00b), true);
  assertStrictEquals(range10.overlaps(range01b), true);
  assertStrictEquals(range10.overlaps(range10b), true);

  assertStrictEquals(range23.overlaps(range00), false);
  assertStrictEquals(range23.overlaps(range01), false);
  assertStrictEquals(range23.overlaps(range10), false);

  assertStrictEquals(range23.overlaps(range00b), false);
  assertStrictEquals(range23.overlaps(range01b), false);
  assertStrictEquals(range23.overlaps(range10b), false);

  assertStrictEquals(range32.overlaps(range00), false);
  assertStrictEquals(range32.overlaps(range01), false);
  assertStrictEquals(range32.overlaps(range10), false);

  assertStrictEquals(range32.overlaps(range00b), false);
  assertStrictEquals(range32.overlaps(range01b), false);
  assertStrictEquals(range32.overlaps(range10b), false);
});

Deno.test("BigIntegerRange.prototype.covers()", () => {
  assertStrictEquals(range00.covers(range00), true);
  assertStrictEquals(range00.covers([0n]), true);
  assertStrictEquals(range00.covers([0n, 0n]), true);
  assertStrictEquals(range00.covers({ min: 0n, max: 0n }), true);
  assertStrictEquals(range00.covers(range01), false);
  assertStrictEquals(range00.covers(range10), false);

  assertStrictEquals(range00.covers(range00b), true);
  assertStrictEquals(range00.covers(range01b), false);
  assertStrictEquals(range00.covers(range10b), false);

  assertStrictEquals(range01.covers(range00), true);
  assertStrictEquals(range01.covers([0n, 1n]), true);
  assertStrictEquals(range01.covers({ min: 0n, max: 1n }), true);
  assertStrictEquals(range01.covers(range01), true);
  assertStrictEquals(range01.covers(range10), false);

  assertStrictEquals(range01.covers(range00b), true);
  assertStrictEquals(range01.covers(range01b), true);
  assertStrictEquals(range01.covers(range10b), false);

  assertStrictEquals(range10.covers(range00), true);
  assertStrictEquals(range10.covers(range01), false);
  assertStrictEquals(range10.covers(range10), true);

  assertStrictEquals(range10.covers(range00b), true);
  assertStrictEquals(range10.covers(range01b), false);
  assertStrictEquals(range10.covers(range10b), true);

  assertStrictEquals(range23.covers(range00), false);
  assertStrictEquals(range23.covers(range01), false);
  assertStrictEquals(range23.covers(range10), false);

  assertStrictEquals(range23.covers(range00b), false);
  assertStrictEquals(range23.covers(range01b), false);
  assertStrictEquals(range23.covers(range10b), false);

  assertStrictEquals(range32.covers(range00), false);
  assertStrictEquals(range32.covers(range01), false);
  assertStrictEquals(range32.covers(range10), false);

  assertStrictEquals(range32.covers(range00b), false);
  assertStrictEquals(range32.covers(range01b), false);
  assertStrictEquals(range32.covers(range10b), false);
});

Deno.test("BigIntegerRange.prototype.isDisjointFrom()", () => {
  assertStrictEquals(range00.isDisjointFrom(range00), false);
  assertStrictEquals(range00.isDisjointFrom([0n]), false);
  assertStrictEquals(range00.isDisjointFrom([0n, 0n]), false);
  assertStrictEquals(range00.isDisjointFrom({ min: 0n, max: 0n }), false);
  assertStrictEquals(range00.isDisjointFrom(range01), false);
  assertStrictEquals(range00.isDisjointFrom(range10), false);

  assertStrictEquals(range00.isDisjointFrom(range00b), false);
  assertStrictEquals(range00.isDisjointFrom(range01b), false);
  assertStrictEquals(range00.isDisjointFrom(range10b), false);

  assertStrictEquals(range01.isDisjointFrom(range00), false);
  assertStrictEquals(range01.isDisjointFrom([0n, 1n]), false);
  assertStrictEquals(range01.isDisjointFrom({ min: 0n, max: 1n }), false);
  assertStrictEquals(range01.isDisjointFrom(range01), false);
  assertStrictEquals(range01.isDisjointFrom(range10), false);

  assertStrictEquals(range01.isDisjointFrom(range00b), false);
  assertStrictEquals(range01.isDisjointFrom(range01b), false);
  assertStrictEquals(range01.isDisjointFrom(range10b), false);

  assertStrictEquals(range10.isDisjointFrom(range00), false);
  assertStrictEquals(range10.isDisjointFrom(range01), false);
  assertStrictEquals(range10.isDisjointFrom(range10), false);

  assertStrictEquals(range10.isDisjointFrom(range00b), false);
  assertStrictEquals(range10.isDisjointFrom(range01b), false);
  assertStrictEquals(range10.isDisjointFrom(range10b), false);

  assertStrictEquals(range23.isDisjointFrom(range00), true);
  assertStrictEquals(range23.isDisjointFrom(range01), true);
  assertStrictEquals(range23.isDisjointFrom(range10), true);

  assertStrictEquals(range23.isDisjointFrom(range00b), true);
  assertStrictEquals(range23.isDisjointFrom(range01b), true);
  assertStrictEquals(range23.isDisjointFrom(range10b), true);

  assertStrictEquals(range32.isDisjointFrom(range00), true);
  assertStrictEquals(range32.isDisjointFrom(range01), true);
  assertStrictEquals(range32.isDisjointFrom(range10), true);

  assertStrictEquals(range32.isDisjointFrom(range00b), true);
  assertStrictEquals(range32.isDisjointFrom(range01b), true);
  assertStrictEquals(range32.isDisjointFrom(range10b), true);
});

Deno.test("BigIntegerRange.prototype.isAdjacentTo()", () => {
  assertStrictEquals(range00.isAdjacentTo(range00), false);
  assertStrictEquals(range00.isAdjacentTo([0n]), false);
  assertStrictEquals(range00.isAdjacentTo([0n, 0n]), false);
  assertStrictEquals(range00.isAdjacentTo({ min: 0n, max: 0n }), false);
  assertStrictEquals(range00.isAdjacentTo(range01), false);
  assertStrictEquals(range00.isAdjacentTo(range10), false);

  assertStrictEquals(range00.isAdjacentTo(range00b), false);
  assertStrictEquals(range00.isAdjacentTo(range01b), false);
  assertStrictEquals(range00.isAdjacentTo(range10b), false);

  assertStrictEquals(range01.isAdjacentTo(range00), false);
  assertStrictEquals(range01.isAdjacentTo([0n, 1n]), false);
  assertStrictEquals(range01.isAdjacentTo({ min: 0n, max: 1n }), false);
  assertStrictEquals(range01.isAdjacentTo(range01), false);
  assertStrictEquals(range01.isAdjacentTo(range10), false);

  assertStrictEquals(range01.isAdjacentTo(range00b), false);
  assertStrictEquals(range01.isAdjacentTo(range01b), false);
  assertStrictEquals(range01.isAdjacentTo(range10b), false);

  assertStrictEquals(range10.isAdjacentTo(range00), false);
  assertStrictEquals(range10.isAdjacentTo(range01), false);
  assertStrictEquals(range10.isAdjacentTo(range10), false);

  assertStrictEquals(range10.isAdjacentTo(range00b), false);
  assertStrictEquals(range10.isAdjacentTo(range01b), false);
  assertStrictEquals(range10.isAdjacentTo(range10b), false);

  assertStrictEquals(range23.isAdjacentTo(range00), false);
  assertStrictEquals(range23.isAdjacentTo(range01), true);
  assertStrictEquals(range23.isAdjacentTo(range10), false);

  assertStrictEquals(range23.isAdjacentTo(range00b), false);
  assertStrictEquals(range23.isAdjacentTo(range01b), true);
  assertStrictEquals(range23.isAdjacentTo(range10b), false);

  assertStrictEquals(range32.isAdjacentTo(range00), false);
  assertStrictEquals(range32.isAdjacentTo(range01), false);
  assertStrictEquals(range32.isAdjacentTo(range10), true);

  assertStrictEquals(range32.isAdjacentTo(range00b), false);
  assertStrictEquals(range32.isAdjacentTo(range01b), false);
  assertStrictEquals(range32.isAdjacentTo(range10b), true);
});

Deno.test("BigIntegerRange.prototype.includes()", () => {
  assertStrictEquals(range00.includes(-1n), false);
  assertStrictEquals(range00.includes(-0n), true);
  assertStrictEquals(range00.includes(0n), true);
  assertStrictEquals(range00.includes(1n), false);

  assertStrictEquals(range01.includes(-1n), false);
  assertStrictEquals(range01.includes(-0n), true);
  assertStrictEquals(range01.includes(0n), true);
  assertStrictEquals(range01.includes(1n), true);
  assertStrictEquals(range01.includes(2n), false);

  assertStrictEquals(range10.includes(-2n), false);
  assertStrictEquals(range10.includes(-1n), true);
  assertStrictEquals(range10.includes(-0n), true);
  assertStrictEquals(range10.includes(0n), true);
  assertStrictEquals(range10.includes(1n), false);

  assertStrictEquals(range23.includes(0n), false);
  assertStrictEquals(range23.includes(1n), false);
  assertStrictEquals(range23.includes(2n), true);
  assertStrictEquals(range23.includes(3n), true);
  assertStrictEquals(range23.includes(4n), false);

  assertStrictEquals(range32.includes(-4n), false);
  assertStrictEquals(range32.includes(-3n), true);
  assertStrictEquals(range32.includes(-2n), true);
  assertStrictEquals(range32.includes(-1n), false);
  assertStrictEquals(range32.includes(0n), false);
});

Deno.test("BigIntegerRange.prototype.clamp()", () => {
  const em1 = "`input` must be a `bigint`.";

  assertThrows(
    () => {
      range00.clamp(undefined as unknown as bigint);
    },
    TypeError,
    em1,
  );

  assertThrows(
    () => {
      range00.clamp(0 as unknown as bigint);
    },
    TypeError,
    em1,
  );

  assertStrictEquals(range00.clamp(-1n), 0n);
  assertStrictEquals(range00.clamp(-0n), 0n);
  assertStrictEquals(Object.is(range00.clamp(-0n), 0n), true);
  assertStrictEquals(range00.clamp(0n), 0n);
  assertStrictEquals(range00.clamp(1n), 0n);

  assertStrictEquals(range01.clamp(-2n), 0n);
  assertStrictEquals(range01.clamp(-1n), 0n);
  assertStrictEquals(range01.clamp(0n), 0n);
  assertStrictEquals(range01.clamp(1n), 1n);
  assertStrictEquals(range01.clamp(2n), 1n);

  assertStrictEquals(range10.clamp(-2n), -1n);
  assertStrictEquals(range10.clamp(-1n), -1n);
  assertStrictEquals(range10.clamp(0n), 0n);
  assertStrictEquals(range10.clamp(1n), 0n);
  assertStrictEquals(range10.clamp(2n), 0n);
});

Deno.test("BigIntegerRange.prototype.equals()", () => {
  assertStrictEquals(range00.equals(range00), true);
  assertStrictEquals(range00.equals([0n]), false);
  assertStrictEquals(range00.equals([0n, 0n]), false);
  assertStrictEquals(range00.equals({ min: 0n, max: 0n }), false);
  assertStrictEquals(range00.equals(range00b), true);
  assertStrictEquals(range00.equals(range01), false);
});

Deno.test("BigIntegerRange.prototype[Symbol.iterator]()", () => {
  assertStrictEquals(
    JSON.stringify([...range00[Symbol.iterator]()].map((b) => b.toString(10))),
    '["0"]',
  );
  assertStrictEquals(
    JSON.stringify([...range01[Symbol.iterator]()].map((b) => b.toString(10))),
    '["0","1"]',
  );
  assertStrictEquals(
    JSON.stringify([...range10[Symbol.iterator]()].map((b) => b.toString(10))),
    '["-1","0"]',
  );
});

Deno.test("BigIntegerRange.prototype.toArray()", () => {
  assertStrictEquals(
    JSON.stringify(range00.toArray().map((b) => b.toString(10))),
    '["0"]',
  );
  assertStrictEquals(
    JSON.stringify(range01.toArray().map((b) => b.toString(10))),
    '["0","1"]',
  );
  assertStrictEquals(
    JSON.stringify(range10.toArray().map((b) => b.toString(10))),
    '["-1","0"]',
  );
});

Deno.test("BigIntegerRange.prototype.toSet()", () => {
  assertStrictEquals(
    JSON.stringify([...range00.toSet()].map((b) => b.toString(10))),
    '["0"]',
  );
  assertStrictEquals(
    JSON.stringify([...range01.toSet()].map((b) => b.toString(10))),
    '["0","1"]',
  );
  assertStrictEquals(
    JSON.stringify([...range10.toSet()].map((b) => b.toString(10))),
    '["-1","0"]',
  );
});
