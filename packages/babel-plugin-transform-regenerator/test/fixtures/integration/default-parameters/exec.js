function* foo(bar = "bar") {
  return bar;
}

expect(foo().next().value).toBe("bar");
expect(foo("foo").next().value).toBe("foo");
