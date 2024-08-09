var _Foo2;
let _initProto, _initClass, _classDecs, _methodDecs, _ref;
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
    var _Nested;
    let _barDecs, _init_bar, _ref2;
    return _ref2 = (_barDecs = babelHelpers.classPrivateFieldGet2(_a, this), "bar"), _Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, _ref2, _init_bar(this));
      }
    }, [_init_bar] = babelHelpers.applyDecs(_Nested, [[_barDecs, 0, "bar"]], []), _Nested;
  }
}
_Foo2 = Foo;
[_initProto, _Foo, _initClass] = babelHelpers.applyDecs(_Foo2, [[_methodDecs, 2, "method"]], _classDecs);
_initClass();
