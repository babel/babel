"use strict";

const actual = [];
const expected = ["foo_0", "bar_1", "baz_2"];

async function* test() {
  actual.push(yield await Promise.resolve("foo"));
  actual.push(yield await Promise.resolve("bar"));
  actual.push(yield await Promise.resolve("baz"));
}

async function main() {
  const g = test();
  let i = 0;
  await g
    .next()
    .then(({ value }) => g.next(`${value}_${i++}`))
    .then(({ value }) => g.next(`${value}_${i++}`))
    .then(({ value }) => g.next(`${value}_${i++}`));
}

return main().then(() => {
  assert.deepEqual(actual, expected);
});
