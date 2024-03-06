let _ref;
var _initProto, _initClass, _classDecs, _methodDecs, _Foo2;
const dec = () => {};
_classDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]];
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
_ref = (_methodDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]], "method");
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, void _initProto(this));
  }
  [_ref]() {}
  makeClass() {
    let _ref2;
    var _barDecs, _init_bar, _Nested;
    return _ref2 = (_barDecs = babelHelpers.classPrivateFieldGet2(_a, this), "bar"), (_Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, _ref2, _init_bar(this));
      }
    }, [_init_bar] = babelHelpers.applyDecs2301(_Nested, [[_barDecs, 0, "bar"]], []).e, _Nested);
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2301(_Foo2, [[_methodDecs, 2, "method"]], _classDecs));
_initClass();
