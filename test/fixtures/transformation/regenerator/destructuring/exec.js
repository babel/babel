function* foo() {
  var { bar } = { bar: "bar" };
  return bar;
}

assert.deepEqual(foo().next().value, "bar");
