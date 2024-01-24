var _initProto, _initClass, _classDecs, _dec, _dec2, _dec3, _obj, _dec4;
const dec = () => {};
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, array, array[expr]];
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_obj = array;
_dec4 = _obj[expr];
let _Foo;
class Foo {
  static {
    ({
      e: [_initProto],
      c: [_Foo, _initClass]
    } = babelHelpers.applyDecs2305(this, [[[void 0, dec, void 0, _dec, void 0, _dec2, void 0, _dec3, _obj, _dec4], 18, "method"]], _classDecs, 1));
  }
  #a = void _initProto(this);
  method() {}
  makeClass() {
    var _obj2, _dec5, _init_bar;
    return _obj2 = this, _dec5 = this.#a, class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs2305(this, [[[_obj2, _dec5], 16, "bar"]], []).e;
      }
      bar = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
