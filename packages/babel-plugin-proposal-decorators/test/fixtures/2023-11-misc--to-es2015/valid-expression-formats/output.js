var _Foo2;
let _initProto, _initClass, _obj;
const dec = () => {};
let _Foo;
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, void _initProto(this));
  }
  method() {}
  makeClass() {
    var _Nested;
    let _barDecs, _init_bar, _init_extra_bar, _ref;
    return _ref = (_barDecs = babelHelpers.classPrivateFieldGet2(_a, this), "bar"), _Nested = class Nested {
      constructor() {
        babelHelpers.defineProperty(this, _ref, _init_bar(this));
        _init_extra_bar(this);
      }
    }, [_init_bar, _init_extra_bar] = babelHelpers.applyDecs2311(_Nested, [], [[_barDecs, 0, "bar"]]).e, _Nested;
  }
}
_Foo2 = Foo;
({
  e: [_initProto],
  c: [_Foo, _initClass]
} = babelHelpers.applyDecs2311(_Foo2, [void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]], [[[void 0, dec, void 0, call(), void 0, chain.expr(), void 0, arbitrary + expr, _obj = array, _obj[expr]], 18, "method"]], 1));
_initClass();
