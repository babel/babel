let _initProto, _call_x;
const dec = () => {};
class Foo extends Bar {
  static {
    [_call_x, _initProto] = babelHelpers.applyDecs(this, [[dec, 2, "x", function () {
      return babelHelpers.superPropGet(Foo, "foo", this, 2)([]);
    }]], []);
  }
  constructor(...args) {
    super(...args);
    _initProto(this);
  }
  #x = _call_x;
}
