function* foo(bar = "bar") {
  return bar;
}

assert.deepEqual(foo().next().value, "bar");
assert.deepEqual(foo("foo").next().value, "foo");
