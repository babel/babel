var _Bar;
let _initProto, _call_x;
const dec = () => {};
class Foo extends (_Bar = Bar) {
  static {
    [_call_x, _initProto] = babelHelpers.applyDecs2305(this, [[dec, 3, "x", function () {
      return babelHelpers.superPropGet(Foo, "foo", this, 2)([]);
    }]], [], 0, _ => #x in _, _Bar).e;
  }
  constructor(...args) {
    super(...args);
    _initProto(this);
  }
  get #x() {
    return _call_x(this);
  }
}
