class C {
  static p = class {
    [magic(C)](C) {}
  }
  static x = 2;
}

class D {
  static p = class {
    x(C) {
      magic(C);
    }
  }
  static x = 2;
}