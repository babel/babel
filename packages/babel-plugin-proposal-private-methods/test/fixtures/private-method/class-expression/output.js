var _foo;
console.log((_foo = /*#__PURE__*/new WeakSet(), class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
  method() {
    babelHelpers.classPrivateMethodGet(this, _foo, _foo2).call(this);
  }
}));
function _foo2() {}
