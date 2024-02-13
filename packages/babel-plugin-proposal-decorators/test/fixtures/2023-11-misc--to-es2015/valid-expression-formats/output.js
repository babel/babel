var _initProto, _initClass, _obj, _classDecs, _dec, _dec2, _dec3, _obj2, _dec4, _Foo2;
const dec = () => {};
_obj = array;
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj, _obj[expr]];
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_obj2 = array;
_dec4 = _obj2[expr];
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, void _initProto(this));
  }
  method() {}
  makeClass() {
    var _dec5, _init_bar, _init_extra_bar, _Nested;
    return _dec5 = babelHelpers.classPrivateFieldGet2(this, _a), (_Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, "bar", _init_bar(this));
        _init_extra_bar(this);
      }
    }, [_init_bar, _init_extra_bar] = babelHelpers.applyDecs2311(_Nested, [[_dec5, 0, "bar"]], []).e, _Nested);
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2311(_Foo2, [[[void 0, dec, void 0, _dec, void 0, _dec2, void 0, _dec3, _obj2, _dec4], 18, "method"]], _classDecs, 1));
_initClass();
