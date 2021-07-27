class A {
  static test() {
    [(this, babelHelpers.readOnlyErrorSet("#priv"))._] = [3];
  }

}

function _priv() {}
