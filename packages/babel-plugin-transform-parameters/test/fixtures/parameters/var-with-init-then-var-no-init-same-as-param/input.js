function f(a = 2, b = 3) {
  var { a } = { a: 4 };
  var a;
  var b;
  return a + b;
}
