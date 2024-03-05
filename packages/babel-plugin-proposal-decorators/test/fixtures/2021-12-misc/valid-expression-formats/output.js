var _initProto, _initClass, _classDecs, _methodDecs;
const dec = () => {};
_classDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]];
let _Foo;
class Foo {
  static {
    [_initProto, _Foo, _initClass] = babelHelpers.applyDecs(this, [[_methodDecs, 2, "method"]], _classDecs);
  }
  #a = void _initProto(this);
  method() {}
  [(_methodDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]], "makeClass")]() {
    var _barDecs, _init_bar;
    return class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs(this, [[_barDecs, 0, "bar"]], []);
      }
      [(_barDecs = this.#a, "bar")] = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
