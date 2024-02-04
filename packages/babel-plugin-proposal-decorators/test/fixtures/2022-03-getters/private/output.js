var _initProto, _call_a;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initProto] = babelHelpers.applyDecs2203R(this, [[dec, 3, "a", function () {
      return this.value;
    }]], []).e;
  }
  value = (_initProto(this), 1);
  get #a() {
    return _call_a(this);
  }
  getA() {
    return this.#a;
  }
}
