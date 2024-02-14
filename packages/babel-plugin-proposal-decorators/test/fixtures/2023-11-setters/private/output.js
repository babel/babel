var _initProto, _call_a;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 4, "a", function (v) {
      return this.value = v;
    }]], 0, _ => #a in _).e;
  }
  value = (_initProto(this), 1);
  set #a(v) {
    _call_a(this, v);
  }
  setA(v) {
    this.#a = v;
  }
}
