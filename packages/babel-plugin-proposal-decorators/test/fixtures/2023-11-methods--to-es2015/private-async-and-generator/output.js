var _initProto, _aDecs, _call_a, _gDecs, _call_g, _agDecs, _call_ag, _Foo;
_aDecs = dec;
_gDecs = dec;
_agDecs = dec;
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
[_call_a, _call_g, _call_ag, _initProto] = babelHelpers.applyDecs2311(_Foo, [], [[_aDecs, 2, "a", async function () {}], [_gDecs, 2, "g", function* () {}], [_agDecs, 2, "ag", async function* () {}]], 0, _ => _a.has(babelHelpers.checkInRHS(_))).e;
