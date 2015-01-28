function* foo({ foo }) {
  return foo;
}

assert(foo({ foo: "bar" }).next().value, "bar");
