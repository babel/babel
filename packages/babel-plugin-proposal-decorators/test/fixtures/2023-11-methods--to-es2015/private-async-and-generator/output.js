var _initProto, _call_a, _call_g, _call_ag, _Foo;
var _ag = /*#__PURE__*/new WeakMap();
var _g = /*#__PURE__*/new WeakMap();
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _ag, _call_ag);
    babelHelpers.classPrivateFieldInitSpec(this, _g, _call_g);
    babelHelpers.classPrivateFieldInitSpec(this, _a, _call_a);
    _initProto(this);
  }
}
_Foo = Foo;
[_call_a, _call_g, _call_ag, _initProto] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 2, "a", async function () {}], [dec, 2, "g", function* () {}], [dec, 2, "ag", async function* () {}]], 0, _ => _a.has(babelHelpers.checkInRHS(_))).e;
