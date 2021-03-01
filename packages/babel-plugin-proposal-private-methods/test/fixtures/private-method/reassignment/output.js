var counter = 0;

var _privateMethod = new WeakSet();

class Foo {
  constructor() {
    _privateMethod.add(this);

    ++counter, babelHelpers.readOnlyError("#privateMethod");
  }

}

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
