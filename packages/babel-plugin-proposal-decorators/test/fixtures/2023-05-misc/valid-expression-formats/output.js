var _initClass, _dec, _dec2, _dec3, _obj, _dec4, _dec5, _dec6, _dec7, _obj2, _dec8, _initProto;
const dec = () => {};
let _Foo;
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_obj = array;
_dec4 = _obj[expr];
_dec5 = call();
_dec6 = chain.expr();
_dec7 = arbitrary + expr;
_obj2 = array;
_dec8 = _obj2[expr];
class Foo {
  static {
    ({
      e: [_initProto],
      c: [_Foo, _initClass]
    } = babelHelpers.applyDecs2305(this, [[[void 0, dec, void 0, _dec5, void 0, _dec6, void 0, _dec7, _obj2, _dec8], 18, "method"]], [void 0, dec, void 0, _dec, void 0, _dec2, void 0, _dec3, _obj, _dec4], 1));
  }
  constructor(...args) {
    _initProto(this);
  }
  #a;
  method() {}
  makeClass() {
    var _obj3, _dec9, _init_bar;
    return _obj3 = this, _dec9 = this.#a, class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs2305(this, [[[_obj3, _dec9], 16, "bar"]], []).e;
      }
      bar = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
