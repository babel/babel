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
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor(...args) {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: void 0
    });
    _initProto(this);
  }
  method() {}
  makeClass() {
    var _dec9, _init_bar, _class;
    return _dec9 = babelHelpers.classPrivateFieldGet(this, _a), (_class = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, "bar", _init_bar(this));
      }
    }, [_init_bar] = babelHelpers.applyDecs2305(_class, [[_dec9, 0, "bar"]], []).e, _class);
  }
}
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2305(Foo, [[[void 0, dec, void 0, _dec5, void 0, _dec6, void 0, _dec7, _obj2, _dec8], 18, "method"]], [void 0, dec, void 0, _dec, void 0, _dec2, void 0, _dec3, _obj, _dec4], 1));
_initClass();
