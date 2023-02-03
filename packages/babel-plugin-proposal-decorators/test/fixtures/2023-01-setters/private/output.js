var _call_a, _initProto;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initProto] = babelHelpers.applyDecs2203R(this, [[dec, 4, "a", function (v) {
      return this.value = v;
    }]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  set #a(v) {
    _call_a(this, v);
  }
  setA(v) {
    this.#a = v;
  }
}
