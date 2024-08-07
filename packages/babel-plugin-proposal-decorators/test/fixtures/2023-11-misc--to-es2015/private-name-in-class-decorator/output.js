let called = false;
class A {
  constructor() {
    var _Class, _Class_brand, _B3;
    let _initClass, _B2;
    let _B;
    new (_Class_brand = /*#__PURE__*/new WeakSet(), _B2 = (_B3 = class B extends A {}, [_B, _initClass] = babelHelpers.applyDecs2311(_B3, [_x], [], 0, void 0, A).c, _B3), _Class = class extends babelHelpers.identity {
      constructor() {
        super(_B), babelHelpers.classPrivateMethodInitSpec(this, _Class_brand), this, _initClass();
      }
    }, babelHelpers.defineProperty(_Class, _B2, void 0), _Class)();
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
