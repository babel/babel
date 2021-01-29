var counter = 0;

var _privateFieldValue = new WeakMap();

class Foo {
  constructor() {
    _privateFieldValue.set(this, {
      get: _get_privateFieldValue,
      set: void 0
    });

    babelHelpers.classPrivateMethodSet(++counter);
  }

}

var _get_privateFieldValue = function () {
  return 42;
};
