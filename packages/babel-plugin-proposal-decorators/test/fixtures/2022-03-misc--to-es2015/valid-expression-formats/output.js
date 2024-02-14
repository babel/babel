var _initProto, _initClass, _classDecs, _methodDecs, _Foo2;
const dec = () => {};
_classDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]];
_methodDecs = [dec, call(), chain.expr(), arbitrary + expr, array[expr]];
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, void _initProto(this));
  }
  method() {}
  makeClass() {
    var _barDecs, _init_bar, _Nested;
    return _barDecs = babelHelpers.classPrivateFieldGet2(this, _a), (_Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, "bar", _init_bar(this));
      }
    }, [_init_bar] = babelHelpers.applyDecs2203R(_Nested, [[_barDecs, 0, "bar"]], []).e, _Nested);
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2203R(_Foo2, [[_methodDecs, 2, "method"]], _classDecs));
_initClass();
