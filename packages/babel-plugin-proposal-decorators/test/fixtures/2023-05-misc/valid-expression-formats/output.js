let _initProto, _initClass, _obj, _classDecs, _methodDecs;
const dec = () => {};
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]];
let _Foo;
class Foo {
  static {
    ({
      e: [_initProto],
      c: [_Foo, _initClass]
    } = babelHelpers.applyDecs2305(this, [[_methodDecs, 18, "method"]], _classDecs, 1));
  }
  #a = void _initProto(this);
  [(_methodDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]], "method")]() {}
  makeClass() {
    let _barDecs, _init_bar;
    return class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs2305(this, [[_barDecs, 16, "bar"]], []).e;
      }
      [(_barDecs = [this, this.#a], "bar")] = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
