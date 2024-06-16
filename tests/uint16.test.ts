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

Deno.test("Uint16.rotateLeft(number, number)", () => {
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 0),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 1),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 2),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 3),
    0b00000000_00000100,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 4),
    0b00000000_00001000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 5),
    0b00000000_00010000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 6),
    0b00000000_00100000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 7),
    0b00000000_01000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 8),
    0b00000000_10000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 9),
    0b00000001_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 10),
    0b00000010_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 11),
    0b00000100_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 12),
    0b00001000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 13),
    0b00010000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 14),
    0b00100000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 15),
    0b01000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b10000000_00000000, 16),
    0b10000000_00000000,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 0),
    0b01111111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 1),
    0b11111111_11111110,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 2),
    0b11111111_11111101,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 3),
    0b11111111_11111011,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 4),
    0b11111111_11110111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 5),
    0b11111111_11101111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 6),
    0b11111111_11011111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 7),
    0b11111111_10111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 8),
    0b11111111_01111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 9),
    0b11111110_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 10),
    0b11111101_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 11),
    0b11111011_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 12),
    0b11110111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 13),
    0b11101111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 14),
    0b11011111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 15),
    0b10111111_11111111,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b01111111_11111111, 16),
    0b01111111_11111111,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -17),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -16),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, -1),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 0),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 1),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 2),
    0b00000000_00000100,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 3),
    0b00000000_00001000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 4),
    0b00000000_00010000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 5),
    0b00000000_00100000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 6),
    0b00000000_01000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 7),
    0b00000000_10000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 8),
    0b00000001_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 9),
    0b00000010_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 10),
    0b00000100_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 11),
    0b00001000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 12),
    0b00010000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 13),
    0b00100000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 14),
    0b01000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 15),
    0b10000000_00000000,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 16),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 17),
    0b00000000_00000010,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 32),
    0b00000000_00000001,
  );
  assertStrictEquals(
    Uint16.rotateLeft(0b00000000_00000001, 33),
    0b00000000_00000010,
  );

  assertStrictEquals(
    Uint16.rotateLeft(0b11111111_11111111, 1),
    0b11111111_11111111,
  );

  assertThrows(
    () => {
      Uint16.rotateLeft(0x10000 as Uint16, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.rotateLeft(-1 as Uint16, 1);
    },
    TypeError,
    "source",
  );
  assertThrows(
    () => {
      Uint16.rotateLeft(0xFFFF, 3.1);
    },
    TypeError,
    "amount",
  );
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
