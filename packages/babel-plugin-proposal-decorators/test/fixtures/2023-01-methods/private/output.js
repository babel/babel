var _initProto, _call_a;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initProto] = babelHelpers.applyDecs2301(this, [[dec, 2, "a", function () {
      return this.value;
    }]], [], _ => #a in _).e;
  }
  #a = _call_a;
  value = (_initProto(this), 1);
  callA() {
    return this.#a();
  }
}
