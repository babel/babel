class A {
  m() {
    if (true) {
      var _f = function () {
        return true;
      };
    }
    function g() {
      return f();
    }
    return g();
  }
}
expect(new A().m).toThrow(ReferenceError);
