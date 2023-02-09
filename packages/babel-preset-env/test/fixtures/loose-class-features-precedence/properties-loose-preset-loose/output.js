var _foo = /*#__PURE__*/Symbol("foo");
class A {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
    this.x = 2;
  }
}
function _foo2() {}
