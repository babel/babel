"use strict";

const actual = [];
const expected = ["foo", "bar", "baz", "xyz"];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* test() {
  yield await delay(0).then(() => actual.push("foo"));
  await delay(0).then(() => actual.push("bar"));
  yield delay(0).then(() => actual.push("baz"));
  actual.push("xyz");
}

async function main() {
  const g = test();
  g.next();
  g.next();
  await g.next();
}

return main().then(() => {
  expect(actual).toEqual(expected);
});
