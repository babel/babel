var _initProto, _dec, _call_a, _dec2, _call_g, _dec3, _call_ag, _Foo;
_dec = dec;
_dec2 = dec;
_dec3 = dec;
var _ag = /*#__PURE__*/new WeakMap();
var _g = /*#__PURE__*/new WeakMap();
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _ag, {
      writable: true,
      value: _call_ag
    });
    babelHelpers.classPrivateFieldInitSpec(this, _g, {
      writable: true,
      value: _call_g
    });
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: _call_a
    });
    _initProto(this);
  }
}
_Foo = Foo;
[_call_a, _call_g, _call_ag, _initProto] = babelHelpers.applyDecs2311(_Foo, [[_dec, 2, "a", async function () {}], [_dec2, 2, "g", function* () {}], [_dec3, 2, "ag", async function* () {}]], [], 0, _ => _a.has(babelHelpers.checkInRHS(_))).e;
