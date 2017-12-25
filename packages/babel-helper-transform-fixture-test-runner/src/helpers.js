import assert from "assert";

export function assertNoOwnProperties(obj) {
  assert.equal(Object.getOwnPropertyNames(obj).length, 0);
}

export function assertHasOwnProperty() {}

export function assertLacksOwnProperty() {}

export function multiline(arr) {
  return arr.join("\n");
}

export const NODE_VERSION = parseInt(process.version.slice(1), 10);

export const assertArrayEquals = assert.deepEqual;
