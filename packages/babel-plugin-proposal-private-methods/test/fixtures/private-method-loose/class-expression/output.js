var _foo;
console.log((_foo = /*#__PURE__*/Symbol("foo"), class A {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }
  method() {
    babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
  }
}));
function _foo2() {}
