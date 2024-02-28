var _foo;
console.log((_foo = Symbol("foo"), class A {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }
  method() {
    this[_foo]();
  }
}));
function _foo2() {}
