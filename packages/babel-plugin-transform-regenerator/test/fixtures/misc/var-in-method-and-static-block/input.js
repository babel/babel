function* g() {
  var o = {
    m() {
      var x = 1;
      return x;
    }
  };
  class A {
    static {
      var y = 2;
    }
  }
  yield o;
}
