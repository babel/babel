var _initProto, _aDecs, _call_a, _gDecs, _call_g, _agDecs, _call_ag;
_aDecs = dec;
_gDecs = dec;
_agDecs = dec;
class Foo {
  static {
    [_call_a, _call_g, _call_ag, _initProto] = babelHelpers.applyDecs2311(this, [[_aDecs, 2, "a", async function () {}], [_gDecs, 2, "g", function* () {}], [_agDecs, 2, "ag", async function* () {}]], [], 0, _ => #a in _).e;
  }
  constructor() {
    _initProto(this);
  }
  #ag = _call_ag;
  #g = _call_g;
  #a = _call_a;
}
