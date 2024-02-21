var _initProto, _call_a, _call_g, _call_ag;
class Foo {
  static {
    [_call_a, _call_g, _call_ag, _initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 2, "a", async function () {}], [dec, 2, "g", function* () {}], [dec, 2, "ag", async function* () {}]], 0, _ => #a in _).e;
  }
  constructor() {
    _initProto(this);
  }
  #ag = _call_ag;
  #g = _call_g;
  #a = _call_a;
}
