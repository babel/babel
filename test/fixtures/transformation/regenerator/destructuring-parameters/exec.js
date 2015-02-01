function* foo({ bar }) {
  return bar;
}

assert(foo({ bar: "bar" }).next().value, "bar");
