class B {
  method() {

  }
}

class D extends B {
  static method() {
    let B;
    let D;
    return super.method();
  }
}
