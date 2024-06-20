import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint32 } from "../mod.ts";

Deno.test("Uint32.isUint32(number)", () => {
  assertStrictEquals(Uint32.isUint32(-1), false);
  assertStrictEquals(Uint32.isUint32(-0), true);
  assertStrictEquals(Uint32.isUint32(0), true);
  assertStrictEquals(Uint32.isUint32(63), true);
  assertStrictEquals(Uint32.isUint32(64), true);
  assertStrictEquals(Uint32.isUint32(127), true);
  assertStrictEquals(Uint32.isUint32(128), true);
  assertStrictEquals(Uint32.isUint32(255), true);
  assertStrictEquals(Uint32.isUint32(256), true);
  assertStrictEquals(Uint32.isUint32(65535), true);
  assertStrictEquals(Uint32.isUint32(65536), true);
  assertStrictEquals(Uint32.isUint32(0xFFFFFF), true);
  assertStrictEquals(Uint32.isUint32(0x1000000), true);
  assertStrictEquals(Uint32.isUint32(0xFFFFFFFF), true);
  assertStrictEquals(Uint32.isUint32(0x100000000), false);
  assertStrictEquals(Uint32.isUint32(0.1), false);
});

Deno.test("Uint32.isUint32(any)", () => {
  assertStrictEquals(Uint32.isUint32("0"), false);
  assertStrictEquals(Uint32.isUint32("255"), false);
  assertStrictEquals(Uint32.isUint32(true), false);
  assertStrictEquals(Uint32.isUint32({}), false);
  assertStrictEquals(Uint32.isUint32([]), false);
  assertStrictEquals(Uint32.isUint32([0]), false);
  assertStrictEquals(Uint32.isUint32(undefined), false);
  assertStrictEquals(Uint32.isUint32(null), false);
});

Deno.test("Uint32.saturateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint32.saturateFromSafeInteger(-1), 0);
  assertStrictEquals(Uint32.saturateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint32.saturateFromSafeInteger(0), 0);
  assertStrictEquals(Uint32.saturateFromSafeInteger(255), 255);
  assertStrictEquals(Uint32.saturateFromSafeInteger(256), 256);
  assertStrictEquals(Uint32.saturateFromSafeInteger(65535), 65535);
  assertStrictEquals(Uint32.saturateFromSafeInteger(65536), 65536);
  assertStrictEquals(Uint32.saturateFromSafeInteger(0xFFFFFFFF), 0xFFFFFFFF);
  assertStrictEquals(Uint32.saturateFromSafeInteger(0x100000000), 0xFFFFFFFF);

  assertThrows(
    () => {
      Uint32.saturateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.saturateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.saturateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint32.truncateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint32.truncateFromSafeInteger(-1), Uint32Array.of(-1)[0]);
  assertStrictEquals(Uint32.truncateFromSafeInteger(-0), Uint32Array.of(-0)[0]);
  assertStrictEquals(Uint32.truncateFromSafeInteger(0), Uint32Array.of(0)[0]);
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(255),
    Uint32Array.of(255)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(256),
    Uint32Array.of(256)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(65535),
    Uint32Array.of(65535)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(65536),
    Uint32Array.of(65536)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(0xFFFFFFFF),
    Uint32Array.of(0xFFFFFFFF)[0],
  );
  assertStrictEquals(
    Uint32.truncateFromSafeInteger(0x100000000),
    Uint32Array.of(0x100000000)[0],
  );

  for (let i = 1; i < Number.MAX_SAFE_INTEGER; i = i * 3) {
    // console.log(`${i} -> ${i % 0x100000000}`);
    assertStrictEquals(Uint32.truncateFromSafeInteger(i), Uint32Array.of(i)[0]);
  }

  for (let i = -1; i > Number.MIN_SAFE_INTEGER; i = i * 3) {
    // console.log(`${i} -> ${0x100000000 + (i % 0x100000000)}`);
    assertStrictEquals(Uint32.truncateFromSafeInteger(i), Uint32Array.of(i)[0]);
  }

  assertThrows(
    () => {
      Uint32.truncateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.truncateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.truncateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint32.toBytes(number)", () => {
  assertStrictEquals(Uint32.toBytes(0).join(","), "0,0,0,0");
  assertStrictEquals(Uint32.toBytes(1).join(","), "0,0,0,1");
  assertStrictEquals(Uint32.toBytes(10).join(","), "0,0,0,10");
  assertStrictEquals(Uint32.toBytes(20).join(","), "0,0,0,20");
  assertStrictEquals(Uint32.toBytes(50).join(","), "0,0,0,50");
  assertStrictEquals(Uint32.toBytes(100).join(","), "0,0,0,100");
  assertStrictEquals(Uint32.toBytes(110).join(","), "0,0,0,110");
  assertStrictEquals(Uint32.toBytes(127).join(","), "0,0,0,127");
  assertStrictEquals(Uint32.toBytes(128).join(","), "0,0,0,128");
  assertStrictEquals(Uint32.toBytes(200).join(","), "0,0,0,200");
  assertStrictEquals(Uint32.toBytes(0xFF).join(","), "0,0,0,255");
  assertStrictEquals(Uint32.toBytes(0x100).join(","), "0,0,1,0");
  assertStrictEquals(Uint32.toBytes(0x1FF).join(","), "0,0,1,255");
  assertStrictEquals(Uint32.toBytes(0x200).join(","), "0,0,2,0");
  assertStrictEquals(Uint32.toBytes(0xFFFE).join(","), "0,0,255,254");
  assertStrictEquals(Uint32.toBytes(0xFFFF).join(","), "0,0,255,255");
  assertStrictEquals(Uint32.toBytes(0x10000).join(","), "0,1,0,0");
  assertStrictEquals(Uint32.toBytes(0x10001).join(","), "0,1,0,1");
  assertStrictEquals(Uint32.toBytes(0x10100).join(","), "0,1,1,0");
  assertStrictEquals(Uint32.toBytes(0x1FFFF).join(","), "0,1,255,255");
  assertStrictEquals(Uint32.toBytes(0xFFFFFF).join(","), "0,255,255,255");
  assertStrictEquals(Uint32.toBytes(0x1000000).join(","), "1,0,0,0");
  assertStrictEquals(Uint32.toBytes(0xFF000000).join(","), "255,0,0,0");
  assertStrictEquals(Uint32.toBytes(0xFFFFFFFF).join(","), "255,255,255,255");

  // const bx = new ArrayBuffer(4);
  // const bxv = new DataView(bx);
  // const bxv2 = new Uint8Array(bx);
  // const start = 0x8F000000;
  // const end = 0x8FFFFFFF;
  // for (let i = start; i <= end; i++) {
  //   bxv.setUint32(0, i);
  //   assertStrictEquals(Uint32.toBytes(i).join(","), [...bxv2].join(","));
  // }

  assertThrows(
    () => {
      Uint32.toBytes(-1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.toBytes(0x100000000);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.toBytes(1.5);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint32.toBytes("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});
