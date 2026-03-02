class Foo {
  constructor() {
    var _newtarget = this.constructor,
      _Class;
    babelHelpers.defineProperty(this, "test", function _target() {
      this instanceof _target ? this.constructor : void 0;
    });
    babelHelpers.defineProperty(this, "test2", function () {
      _newtarget;
    });
    this.Bar = (_Class = class {
      constructor() {
        // should not replace
        babelHelpers.defineProperty(this, "q", this.constructor);
      } // should not replace
    }, babelHelpers.defineProperty(_Class, "p", void 0), babelHelpers.defineProperty(_Class, "p1", class {
      constructor() {
        this.constructor;
      }
    }), babelHelpers.defineProperty(_Class, "p2", new function _target2() {
      this instanceof _target2 ? this.constructor : void 0;
    }()), babelHelpers.defineProperty(_Class, "p3", function () {
      void 0;
    }), babelHelpers.defineProperty(_Class, "p4", function _target3() {
      this instanceof _target3 ? this.constructor : void 0;
    }), _Class);
  }
}
