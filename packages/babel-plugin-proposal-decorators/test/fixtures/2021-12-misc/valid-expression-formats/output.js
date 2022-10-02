var _initClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _initProto;
const dec = () => {};
let _Foo;
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_dec4 = array[expr];
_dec5 = call();
_dec6 = chain.expr();
_dec7 = arbitrary + expr;
_dec8 = array[expr];
class Foo {
  static {
    [_initProto, _Foo, _initClass] = babelHelpers.applyDecs(this, [[[dec, _dec5, _dec6, _dec7, _dec8], 2, "method"]], [dec, _dec, _dec2, _dec3, _dec4]);
  }
  constructor(...args) {
    _initProto(this);
  }
  #a;
  method() {}
  makeClass() {
    var _dec9, _init_bar;
    return _dec9 = this.#a, class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs(this, [[_dec9, 0, "bar"]], []);
      }
      bar = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
