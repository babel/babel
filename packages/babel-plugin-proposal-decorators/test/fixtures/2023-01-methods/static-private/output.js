var _call_a, _initStatic;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initStatic] = babelHelpers.applyDecs2301(this, [[dec, 7, "a", function () {
      return this.value;
    }, _ => #a in _]], []).e;
    _initStatic(this);
  }
  static #a = _call_a;
  static value = 1;
  static callA() {
    return this.#a();
  }
}
