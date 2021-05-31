function* foo({ bar }) {
  return bar;
}

expect(foo({ bar: "bar" }).next().value).toBe("bar");
