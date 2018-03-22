function foo(x=5, y=6) {
  return [x, y];
}

expect(foo(undefined, null)).toEqual([5, null]);
