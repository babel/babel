var _A;

var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

console.log((_A = class A {
  method() {
    babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
  }

}, Object.defineProperty(_A, _foo, {
  value: _foo2
}), _A));

function _foo2() {}
