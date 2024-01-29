var _initProto, _initClass, _classDecs, _dec, _dec2, _dec3, _obj, _dec4, _Foo2;
const dec = () => {};
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, array, array[expr]];
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_obj = array;
_dec4 = _obj[expr];
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: void _initProto(this)
    });
  }
  method() {}
  makeClass() {
    var _dec5, _init_bar, _Nested;
    return _dec5 = babelHelpers.classPrivateFieldGet(this, _a), (_Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, "bar", _init_bar(this));
      }
    }, [_init_bar] = babelHelpers.applyDecs2305(_Nested, [[_dec5, 0, "bar"]], []).e, _Nested);
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2305(_Foo2, [[[void 0, dec, void 0, _dec, void 0, _dec2, void 0, _dec3, _obj, _dec4], 18, "method"]], _classDecs, 1));
_initClass();
