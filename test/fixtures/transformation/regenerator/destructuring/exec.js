function* foo() {
  var { bar } = { bar: "bar" };
  return bar;
}

assert.equal(foo().next().value, "bar");

function *foo({ bar = 0 }) {
  return bar;
}

assert.equal(foo({ bar: undefined }).next(), 0);
assert.equal(foo({ bar: 3 }).next(), 3);
