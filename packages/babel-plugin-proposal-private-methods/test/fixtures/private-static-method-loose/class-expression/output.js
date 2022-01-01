var _class, _foo, _temp;

console.log((_temp = (_foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo"), _class = class A {
  method() {
    babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
  }

}), Object.defineProperty(_class, _foo, {
  value: _foo2
}), _temp));

function _foo2() {}
