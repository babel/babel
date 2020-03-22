function test(a, b = 1) {
  var a = a + b;
  return a;
}

expect(test(2)).toBe(3);
