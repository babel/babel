class A {
  static #method = function () {};

  run() {
    babelHelpers.readOnlyError("#method");
    [babelHelpers.readOnlyErrorSet("#method")._] = [2];

    for (babelHelpers.readOnlyErrorSet("#method")._ of [2]);
  }

}
