expect(
  do {
    var bar = "foo";
    bar;
  }
).toBe("foo");
expect(bar).toBe("foo");
