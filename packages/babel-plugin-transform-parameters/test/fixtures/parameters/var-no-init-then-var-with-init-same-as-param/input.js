function f(a = 2, b = 3) {
  var a;
  var { a } = { a: 4 };
  return a + b;
}
