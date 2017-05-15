function broken(x, ..._ref) {
  let [, ...foo] = [, ..._ref];

  if (true) {
    class Foo extends Bar {}
    return hello(...foo);
  }
}