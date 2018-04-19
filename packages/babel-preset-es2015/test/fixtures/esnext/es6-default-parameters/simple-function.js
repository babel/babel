function foo(x=5) {
  return x;
}
expect(foo()).toBe(5);
