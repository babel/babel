function* foo(foo = "bar") {
  return foo;
}

assert.deepEqual(foo().next().value, "bar");
assert.deepEqual(foo("foo").next().value, "foo");
