let called = false;
class A {
  static #x() {
    called = true;
  }
  constructor() {
    var _initClass, _classDecs;
    _classDecs = [A, A.#x];
    let _B;
    new class extends babelHelpers.identity {
      static {
        class B extends A {
          static {
            [_B, _initClass] = babelHelpers.applyDecs2311(this, _classDecs, [], 1, void 0, A).c;
          }
        }
      }
      #x() {
        throw new Error("Should not be called");
      }
      constructor() {
        super(_B), _initClass();
      }
    }();
  }
}
new A();
expect(called).toBe(true);
