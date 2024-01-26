var _initProto, _initClass, _classDecs, _dec, _dec2, _dec3, _dec4, _Foo2;
const dec = () => {};
_classDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]];
_dec = call();
_dec2 = chain.expr();
_dec3 = arbitrary + expr;
_dec4 = array[expr];
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
    }, [_init_bar] = babelHelpers.applyDecs2301(_Nested, [[_dec5, 0, "bar"]], []).e, _Nested);
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2301(_Foo2, [[[dec, _dec, _dec2, _dec3, _dec4], 2, "method"]], _classDecs));
_initClass();
