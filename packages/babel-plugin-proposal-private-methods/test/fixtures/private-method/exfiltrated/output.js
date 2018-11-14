var exfiltrated;

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _privateMethod.add(this);

  if (exfiltrated === undefined) {
    exfiltrated = babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2);
  }
};

var _privateMethod = new WeakSet();

var _privateMethod2 = function _privateMethod2() {};
