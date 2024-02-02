var _initProto, _dec, _call_a, _dec2, _call_g, _dec3, _call_ag;
_dec = dec;
_dec2 = dec;
_dec3 = dec;
class Foo {
  static {
    [_call_a, _call_g, _call_ag, _initProto] = babelHelpers.applyDecs2311(this, [[_dec, 2, "a", async function () {}], [_dec2, 2, "g", function* () {}], [_dec3, 2, "ag", async function* () {}]], [], 0, _ => #a in _).e;
  }
  constructor() {
    _initProto(this);
  }
  #ag = _call_ag;
  #g = _call_g;
  #a = _call_a;
}
