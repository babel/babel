var _call_x, _initProto;
const dec = () => {};
class Foo extends Bar {
  static {
    [_call_x, _initProto] = babelHelpers.applyDecs2303(this, [[[0, dec], 2, "x", function () {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Foo), "foo", this).call(this);
    }]], [], _ => #x in _).e;
  }
  constructor(...args) {
    super(...args);
    _initProto(this);
  }
  #x = _call_x;
}
