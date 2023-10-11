var _call_a, _call_a2, _initProto;
const dec = () => {};
class Foo {
  static {
    [_call_a, _call_a2, _initProto] = babelHelpers.applyDecs2305(this, [[dec, 3, "a", function () {
      return this.value;
    }], [dec, 4, "a", function (v) {
      this.value = v;
    }]], [], 0, _ => #a in _).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
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
