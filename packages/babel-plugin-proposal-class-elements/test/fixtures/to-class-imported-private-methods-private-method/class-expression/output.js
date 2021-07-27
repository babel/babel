var _foo = /*#__PURE__*/new WeakSet();

console.log(class A {
  constructor() {
    _foo.add(this);
  }

  method() {
    babelHelpers.classPrivateMethodGet(this, _foo, _foo2).call(this);
  }

});

function _foo2() {}
