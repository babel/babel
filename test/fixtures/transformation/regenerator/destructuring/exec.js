function* foo() {
  var { bar } = { bar: "bar" };
  return bar;
}

assert.equal(foo().next().value, "bar");

function* foo2({ bar = 0 }) {
  return bar;
}

assert.equal(foo2({ bar: undefined }).next().value, 0);
assert.equal(foo2({ bar: 3 }).next().value, 3);
