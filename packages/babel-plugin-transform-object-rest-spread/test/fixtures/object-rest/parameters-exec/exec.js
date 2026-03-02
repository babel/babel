function sum(x, y, z) {
  return x + y + z;
}
function test() {
  var args = arguments;
  return sum(...args);
}

expect(test(1, 2, 3)).toBe(6);
