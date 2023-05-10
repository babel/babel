var _class, _foo;
console.log((_foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo"), (_class = class A {
  method() {
    babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
  }
}, Object.defineProperty(_class, _foo, {
  value: _foo2
}), _class)));
function _foo2() {}
