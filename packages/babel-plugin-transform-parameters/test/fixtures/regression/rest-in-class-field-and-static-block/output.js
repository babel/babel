function f() {
  for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
    a[_key] = arguments[_key];
  }
  class A {
    x = a[0];
    static {
      console.log(a[1]);
    }
  }
  return a.length;
}
