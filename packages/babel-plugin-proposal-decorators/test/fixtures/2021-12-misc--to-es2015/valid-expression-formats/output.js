var _initClass, _initProto;

let _Foo;

var _a = /*#__PURE__*/new WeakMap();

class Foo {
  constructor(...args) {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: void 0
    });

    _initProto(this);
  }

  method() {}

  makeClass() {
    var _init_bar, _class, _temp;

    return _temp = _class = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, "bar", _init_bar(this));
      }

    }, (() => {
      [_init_bar] = babelHelpers.applyDecs(_class, [], [[babelHelpers.classPrivateFieldGet(_class, _a), 0, "bar"]]);
    })(), _temp;
  }

}

(() => {
  [_initProto, _Foo, _initClass] = babelHelpers.applyDecs(Foo, [dec, call(), chain.expr(), arbitrary + expr, array[expr]], [[[dec, call(), chain.expr(), arbitrary + expr, array[expr]], 2, "method"]]);
})();

(() => {
  _initClass();
})();
