function* g(a = arguments.length, b = this, o = { [arguments[0]]() {} }) {
  yield [a, b, Object.keys(o), arguments.length];
}
