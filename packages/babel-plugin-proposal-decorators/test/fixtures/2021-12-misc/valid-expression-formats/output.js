var _initClass, _initProto;

let _Foo;

class Foo {
  static {
    [_Foo, _initClass, _initProto] = babelHelpers.applyDecs(this, [[[dec, call(), chain.expr(), arbitrary + expr, array[expr]], 2, "method"]], [dec, call(), chain.expr(), arbitrary + expr, array[expr]]);
  }

  constructor(...args) {
    _initProto(this);
  }

  #a;

  method() {}

  makeClass() {
    var _init_bar;

    return class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs(this, [[this.#a, 0, "bar"]], []);
      }
      bar = _init_bar(this);
    };
  }

  static {
    _initClass();

  }
}
