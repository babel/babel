const field = Symbol('field');

class A {
  constructor() {
    babelHelpers.defineProperty(this, field, 10);
  }

}
