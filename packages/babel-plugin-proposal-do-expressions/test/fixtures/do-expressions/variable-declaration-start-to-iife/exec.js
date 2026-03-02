expect(
  do {
    var bar = "foo";
    if (!bar) throw new Error(
      "unreachable"
    )
    bar;
  }
).toBe("foo");
expect(bar).toBe("foo");
