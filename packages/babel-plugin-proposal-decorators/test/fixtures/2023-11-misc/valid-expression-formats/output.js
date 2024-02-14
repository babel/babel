var _initProto, _initClass, _obj, _classDecs, _obj2, _methodDecs;
const dec = () => {};
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]];
_methodDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj2 = array, _obj2[expr]];
let _Foo;
class Foo {
  static {
    ({
      e: [_initProto],
      c: [_Foo, _initClass]
    } = babelHelpers.applyDecs2311(this, [[_methodDecs, 18, "method"]], _classDecs, 1));
  }
  #a = void _initProto(this);
  method() {}
  makeClass() {
    var _obj3, _barDecs, _init_bar, _init_extra_bar;
    return _obj3 = this, _barDecs = [_obj3, this.#a], class Nested {
      static {
        [_init_bar, _init_extra_bar] = babelHelpers.applyDecs2311(this, [[_barDecs, 16, "bar"]], []).e;
      }
      constructor() {
        _init_extra_bar(this);
      }
      bar = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
