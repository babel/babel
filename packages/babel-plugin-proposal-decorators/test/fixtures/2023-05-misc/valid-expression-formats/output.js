var _initProto, _initClass, _obj, _classDecs, _methodDecs;
const dec = () => {};
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]];
let _Foo;
class Foo {
  static {
    _methodDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]];
    ({
      e: [_initProto],
      c: [_Foo, _initClass]
    } = babelHelpers.applyDecs2305(this, [[_methodDecs, 18, "method"]], _classDecs, 1));
  }
  #a = void _initProto(this);
  method() {}
  makeClass() {
    var _barDecs, _init_bar, _outerThis;
    return _outerThis = this, class Nested {
      static {
        _barDecs = [_outerThis, _outerThis.#a];
        [_init_bar] = babelHelpers.applyDecs2305(this, [[_barDecs, 16, "bar"]], []).e;
      }
      bar = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
