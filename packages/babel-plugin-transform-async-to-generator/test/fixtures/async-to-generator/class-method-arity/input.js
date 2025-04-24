class Foo {
  async one(a, b = 1) {}
  async two(a, b, ...c) {}
  async three(a, b = 1, c, d = 3) {}
  async four(a, b = 1, c, ...d) {}
  async five(a, { b }) {}
  async six(a, { b } = {}) {}
}
