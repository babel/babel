var exfiltrated;

var _privateMethod = new WeakSet();

class Foo {
  constructor() {
    _privateMethod.add(this);

    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2);
    }
  }

}

var _privateMethod2 = function _privateMethod2() {};
