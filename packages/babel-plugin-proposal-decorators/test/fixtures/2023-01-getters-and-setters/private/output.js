var _initProto, _call_a, _call_a2;
const dec = () => {};
class Foo {
  static {
    [_call_a, _call_a2, _initProto] = babelHelpers.applyDecs2301(this, [[dec, 3, "a", function () {
      return this.value;
    }], [dec, 4, "a", function (v) {
      this.value = v;
    }]], [], _ => #a in _).e;
  }
  value = (_initProto(this), 1);
  get #a() {
    return _call_a(this);
  }
  set #a(v) {
    _call_a2(this, v);
  }
  getA() {
    return this.#a;
  }
  setA(v) {
    this.#a = v;
  }
}
