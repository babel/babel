import mod1 from "./mod1.txt" with { type: "bytes" };
import mod2 from "./mod2.txt" with { type: "bytes" };

expect(mod1.buffer !== mod2.buffer).toBe(true);
expect(mod1.byteOffset).toBe(0);
expect(mod2.byteOffset).toBe(0);
expect(mod1.byteLength).toBe(5);
expect(mod2.byteLength).toBe(5);

// Currently this only runs when manually enabling the flag:
// node --js-immutable-arraybuffer ./node_modules/.bin/jest bytes-modules
if (ArrayBuffer.prototype.transferToImmutable) {
  expect(mod1.buffer.immutable).toBe(true);
  expect(mod2.buffer.immutable).toBe(true);
}

expect(mod1).toEqual(
  // Hello
  new Uint8Array([72, 101, 108, 108, 111])
);
expect(mod2).toEqual(
  // world
  new Uint8Array([119, 111, 114, 108, 100])
);
