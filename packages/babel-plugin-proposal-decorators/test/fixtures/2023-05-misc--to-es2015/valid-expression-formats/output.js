var _Foo2;
let _initProto, _initClass, _obj, _classDecs, _methodDecs, _ref;
const dec = () => {};
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]];
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
_ref = (_methodDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]], "method");
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, void _initProto(this));
  }
  [_ref]() {}
  makeClass() {
    var _Nested;
    let _barDecs, _init_bar, _ref2;
    return _ref2 = (_barDecs = babelHelpers.classPrivateFieldGet2(_a, this), "bar"), _Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, _ref2, _init_bar(this));
      }
    }, [_init_bar] = babelHelpers.applyDecs2305(_Nested, [[_barDecs, 0, "bar"]], []).e, _Nested;
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2305(_Foo2, [[_methodDecs, 18, "method"]], _classDecs, 1));
_initClass();
