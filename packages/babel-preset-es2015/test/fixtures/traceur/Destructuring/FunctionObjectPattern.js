function f({a, b: {c}}, d) {
  return [a, c, d];
}

expect(f({a: 1, b: {c: 2}}, 3)).toEqual([1, 2, 3]);;