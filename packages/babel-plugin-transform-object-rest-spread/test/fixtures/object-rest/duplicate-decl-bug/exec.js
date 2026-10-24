var tests = [];
function it(name, fn) {
  tests.push(name);
  fn();
}

it("es7.objectRestSpread", () => {
  let original = { a: 1, b: 2 };
  let { ...copy } = original;
  expect(copy).toEqual({ a: 1, b: 2 });
  expect(copy).not.toBe(original);
});

expect(tests).toEqual(["es7.objectRestSpread"]);
