class Foo {
  constructor() {
    var _newtarget = this.constructor,
        _class,
        _temp;

    babelHelpers.defineProperty(this, "test", function _target() {
      this instanceof _target ? this.constructor : void 0;
    });
    babelHelpers.defineProperty(this, "test2", function () {
      _newtarget;
    });
    this.Bar = (_temp = _class = class _target2 {
      constructor() {
        babelHelpers.defineProperty(this, "q", this.constructor);
      } // should not replace


    }, babelHelpers.defineProperty(_class, "p", void 0), babelHelpers.defineProperty(_class, "p1", class {
      constructor() {
        void 0;
      }

    }), babelHelpers.defineProperty(_class, "p2", new function () {
      void 0;
    }()), babelHelpers.defineProperty(_class, "p3", function () {
      void 0;
    }), _temp);
  }

}
