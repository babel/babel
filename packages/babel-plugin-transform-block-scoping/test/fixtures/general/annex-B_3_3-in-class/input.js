class A {
  m() {
    if (true) {
      function f() {
        return true;
      }
    }

    function g() {
      return f();
    }

    return g();
  }
}

expect(new A().m).toThrow(ReferenceError);