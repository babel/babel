function f({a, b: {c}}, d) {
  return [a, c, d];
}

assertArrayEquals([1, 2, 3], f({a: 1, b: {c: 2}}, 3));