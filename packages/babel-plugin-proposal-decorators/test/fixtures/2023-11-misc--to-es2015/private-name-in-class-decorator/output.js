let called = false;
class A {
  constructor() {
    var _initClass, _Class_brand, _temp;
    let _B;
    new (_Class_brand = /*#__PURE__*/new WeakSet(), (_temp = class extends babelHelpers.identity {
      constructor() {
        (super(_B), babelHelpers.classPrivateMethodInitSpec(this, _Class_brand), this), _initClass();
      }
    }, (_B2 => {
      class B extends A {}
      _B2 = B;
      [_B, _initClass] = babelHelpers.applyDecs2311(_B2, [_x], [], 0, void 0, A).c;
    })(), _temp))();
    function _x3() {
      throw new Error("Should not be called");
    }
  }
}
function _x() {
  called = true;
}
new A();
expect(called).toBe(true);
