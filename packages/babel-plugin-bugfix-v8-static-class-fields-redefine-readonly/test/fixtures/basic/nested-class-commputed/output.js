class C {
  static {
    babelHelpers.defineProperty(this, "p", class {
      [magic(C)](C) {}
    });
    babelHelpers.defineProperty(this, "x", 2);
  }
}
class D {
  static p = class {
    x(C) {
      magic(C);
    }
  };
  static x = 2;
}
