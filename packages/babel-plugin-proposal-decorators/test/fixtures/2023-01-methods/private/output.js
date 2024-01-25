var _initProto, _call_a;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initProto] = babelHelpers.applyDecs2301(this, [[dec, 2, "a", function () {
      return this.value;
    }]], [], _ => #a in _).e;
  }
  constructor() {
    _initProto(this);
  }
  #a = _call_a;
  value = 1;
  callA() {
    return this.#a();
  }
}
