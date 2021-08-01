var _method;

class A {
  #method = _method ||= function () {};
  counter = 0;

  self() {
    this.counter++;
    return this;
  }

  constructor() {
    this.self(), babelHelpers.readOnlyError("#method");
    [babelHelpers.readOnlyErrorSet("#method")._] = [2];
  }

}
