var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class X {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
  }

}

var _privateMethod = _classPrivateFieldLooseKey("privateMethod");

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
