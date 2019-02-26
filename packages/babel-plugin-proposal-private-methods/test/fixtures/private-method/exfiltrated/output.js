var exfiltrated;

class Foo {
  constructor() {
    _privateMethod.add(this);

    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2);
    }
  }

}

var _privateMethod = new WeakSet();

var _privateMethod2 = function _privateMethod2() {};
