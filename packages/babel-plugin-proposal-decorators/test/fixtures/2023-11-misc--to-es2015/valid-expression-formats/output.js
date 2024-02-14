var _initProto, _initClass, _obj, _classDecs, _obj2, _methodDecs, _Foo2;
const dec = () => {};
_obj = array;
_classDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj, _obj[expr]];
_obj2 = array;
_methodDecs = [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj2, _obj2[expr]];
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, void _initProto(this));
  }
  method() {}
  makeClass() {
    var _barDecs, _init_bar, _init_extra_bar, _Nested;
    return _barDecs = babelHelpers.classPrivateFieldGet2(this, _a), (_Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, "bar", _init_bar(this));
        _init_extra_bar(this);
      }
    }, [_init_bar, _init_extra_bar] = babelHelpers.applyDecs2311(_Nested, [[_barDecs, 0, "bar"]], []).e, _Nested);
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2311(_Foo2, [[_methodDecs, 18, "method"]], _classDecs, 1));
_initClass();
