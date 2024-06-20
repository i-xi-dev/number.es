import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint16 } from "../mod.ts";

Deno.test("Uint16.isUint16(number)", () => {
  assertStrictEquals(Uint16.isUint16(-1), false);
  assertStrictEquals(Uint16.isUint16(-0), true);
  assertStrictEquals(Uint16.isUint16(0), true);
  assertStrictEquals(Uint16.isUint16(63), true);
  assertStrictEquals(Uint16.isUint16(64), true);
  assertStrictEquals(Uint16.isUint16(127), true);
  assertStrictEquals(Uint16.isUint16(128), true);
  assertStrictEquals(Uint16.isUint16(255), true);
  assertStrictEquals(Uint16.isUint16(256), true);
  assertStrictEquals(Uint16.isUint16(65535), true);
  assertStrictEquals(Uint16.isUint16(65536), false);
  assertStrictEquals(Uint16.isUint16(0xFFFFFF), false);
  assertStrictEquals(Uint16.isUint16(0x1000000), false);
  assertStrictEquals(Uint16.isUint16(0xFFFFFFFF), false);
  assertStrictEquals(Uint16.isUint16(0x100000000), false);
  assertStrictEquals(Uint16.isUint16(0.1), false);
});

Deno.test("Uint16.isUint16(any)", () => {
  assertStrictEquals(Uint16.isUint16("0"), false);
  assertStrictEquals(Uint16.isUint16("255"), false);
  assertStrictEquals(Uint16.isUint16(true), false);
  assertStrictEquals(Uint16.isUint16({}), false);
  assertStrictEquals(Uint16.isUint16([]), false);
  assertStrictEquals(Uint16.isUint16([0]), false);
  assertStrictEquals(Uint16.isUint16(undefined), false);
  assertStrictEquals(Uint16.isUint16(null), false);
});

Deno.test("Uint16.saturateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint16.saturateFromSafeInteger(-1), 0);
  assertStrictEquals(Uint16.saturateFromSafeInteger(-0), 0);
  assertStrictEquals(Uint16.saturateFromSafeInteger(0), 0);
  assertStrictEquals(Uint16.saturateFromSafeInteger(255), 255);
  assertStrictEquals(Uint16.saturateFromSafeInteger(256), 256);
  assertStrictEquals(Uint16.saturateFromSafeInteger(65535), 65535);
  assertStrictEquals(Uint16.saturateFromSafeInteger(65536), 65535);

  assertThrows(
    () => {
      Uint16.saturateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.saturateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.saturateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint16.truncateFromSafeInteger(number)", () => {
  assertStrictEquals(Uint16.truncateFromSafeInteger(-1), Uint16Array.of(-1)[0]);
  assertStrictEquals(Uint16.truncateFromSafeInteger(-0), Uint16Array.of(-0)[0]);
  assertStrictEquals(Uint16.truncateFromSafeInteger(0), Uint16Array.of(0)[0]);
  assertStrictEquals(
    Uint16.truncateFromSafeInteger(255),
    Uint16Array.of(255)[0],
  );
  assertStrictEquals(
    Uint16.truncateFromSafeInteger(256),
    Uint16Array.of(256)[0],
  );
  assertStrictEquals(
    Uint16.truncateFromSafeInteger(65535),
    Uint16Array.of(65535)[0],
  );
  assertStrictEquals(
    Uint16.truncateFromSafeInteger(65536),
    Uint16Array.of(65536)[0],
  );

  for (let i = 1; i < Number.MAX_SAFE_INTEGER; i = i * 3) {
    // console.log(`${i} -> ${i % 65536}`);
    assertStrictEquals(Uint16.truncateFromSafeInteger(i), Uint16Array.of(i)[0]);
  }

  for (let i = -1; i > Number.MIN_SAFE_INTEGER; i = i * 3) {
    // console.log(`${i} -> ${65536 + (i % 65536)}`);
    assertStrictEquals(Uint16.truncateFromSafeInteger(i), Uint16Array.of(i)[0]);
  }

  assertThrows(
    () => {
      Uint16.truncateFromSafeInteger("" as unknown as number);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.truncateFromSafeInteger(Number.NaN);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.truncateFromSafeInteger(1.5);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint16.toBytes(number)", () => {
  assertStrictEquals(Uint16.toBytes(0).join(","), "0,0");
  assertStrictEquals(Uint16.toBytes(1).join(","), "0,1");
  assertStrictEquals(Uint16.toBytes(10).join(","), "0,10");
  assertStrictEquals(Uint16.toBytes(20).join(","), "0,20");
  assertStrictEquals(Uint16.toBytes(50).join(","), "0,50");
  assertStrictEquals(Uint16.toBytes(100).join(","), "0,100");
  assertStrictEquals(Uint16.toBytes(110).join(","), "0,110");
  assertStrictEquals(Uint16.toBytes(127).join(","), "0,127");
  assertStrictEquals(Uint16.toBytes(128).join(","), "0,128");
  assertStrictEquals(Uint16.toBytes(200).join(","), "0,200");
  assertStrictEquals(Uint16.toBytes(0xFF).join(","), "0,255");
  assertStrictEquals(Uint16.toBytes(0x100).join(","), "1,0");
  assertStrictEquals(Uint16.toBytes(0x1FF).join(","), "1,255");
  assertStrictEquals(Uint16.toBytes(0x200).join(","), "2,0");
  assertStrictEquals(Uint16.toBytes(0xFFFE).join(","), "255,254");
  assertStrictEquals(Uint16.toBytes(0xFFFF).join(","), "255,255");

  assertThrows(
    () => {
      Uint16.toBytes(-1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.toBytes(0x10000);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.toBytes(1.5);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.toBytes("1" as unknown as number);
    },
    TypeError,
    "source",
  );
});

Deno.test("Uint16.toBytes(number, boolean)", () => {
  assertStrictEquals(Uint16.toBytes(0, true).join(","), "0,0");
  assertStrictEquals(Uint16.toBytes(1, true).join(","), "1,0");
  assertStrictEquals(Uint16.toBytes(10, true).join(","), "10,0");
  assertStrictEquals(Uint16.toBytes(20, true).join(","), "20,0");
  assertStrictEquals(Uint16.toBytes(50, true).join(","), "50,0");
  assertStrictEquals(Uint16.toBytes(100, true).join(","), "100,0");
  assertStrictEquals(Uint16.toBytes(110, true).join(","), "110,0");
  assertStrictEquals(Uint16.toBytes(127, true).join(","), "127,0");
  assertStrictEquals(Uint16.toBytes(128, true).join(","), "128,0");
  assertStrictEquals(Uint16.toBytes(200, true).join(","), "200,0");
  assertStrictEquals(Uint16.toBytes(0xFF, true).join(","), "255,0");
  assertStrictEquals(Uint16.toBytes(0x100, true).join(","), "0,1");
  assertStrictEquals(Uint16.toBytes(0x1FF, true).join(","), "255,1");
  assertStrictEquals(Uint16.toBytes(0x200, true).join(","), "0,2");
  assertStrictEquals(Uint16.toBytes(0xFFFE, true).join(","), "254,255");
  assertStrictEquals(Uint16.toBytes(0xFFFF, true).join(","), "255,255");
});
