class A {
  run() {
    A, 2, babelHelpers.readOnlyError("#method");
    [(A, babelHelpers.readOnlyErrorSet("#method"))._] = [2];
  }

}

function _method() {}
