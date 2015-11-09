function f(...p) {
  return p;
}

function g(a, ...p) {
  return p;
}

assertArrayEquals([], f());
assertArrayEquals([0], f(0));
assertArrayEquals([0, 1], f(0, 1));

assertArrayEquals([], g());
assertArrayEquals([], g(0));
assertArrayEquals([1], g(0, 1));
assertArrayEquals([1, 2], g(0, 1, 2));
