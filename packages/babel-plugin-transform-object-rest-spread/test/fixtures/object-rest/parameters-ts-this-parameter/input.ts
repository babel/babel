function f(this: Foo, { ...a }, b = a, ...rest) {
  return rest[0];
}
