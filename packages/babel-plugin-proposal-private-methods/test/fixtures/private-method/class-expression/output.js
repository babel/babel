var _foo;

console.log((_foo = new WeakSet(), class A {
  constructor() {
    _foo.add(this);
  }

  method() {
    babelHelpers.classPrivateMethodGet(this, _foo, _foo2).call(this);
  }

}));

function _foo2() {}
