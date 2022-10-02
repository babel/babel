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
    }, [_init_bar] = babelHelpers.applyDecs(_class, [[_dec9, 0, "bar"]], []), _class);
  }
}
[_initProto, _Foo, _initClass] = babelHelpers.applyDecs(Foo, [[[dec, _dec5, _dec6, _dec7, _dec8], 2, "method"]], [dec, _dec, _dec2, _dec3, _dec4]);
_initClass();
