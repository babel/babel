var _initProto, _initClass, _classDecs, _dec, _dec2, _dec3, _dec4;
const dec = () => {};
_classDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]];
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_dec4 = array[expr];
let _Foo;
class Foo {
  static {
    [_initProto, _Foo, _initClass] = babelHelpers.applyDecs(this, [[[dec, _dec, _dec2, _dec3, _dec4], 2, "method"]], _classDecs);
  }
  #a = void _initProto(this);
  method() {}
  makeClass() {
    var _dec5, _init_bar;
    return _dec5 = this.#a, class Nested {
      static {
        [_init_bar] = babelHelpers.applyDecs(this, [[_dec5, 0, "bar"]], []);
      }
      bar = _init_bar(this);
    };
  }
  static {
    _initClass();
  }
}
