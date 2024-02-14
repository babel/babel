var _initStatic, _call_a;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initStatic] = babelHelpers.applyDecs2311(this, [], [[dec, 10, "a", function () {
      return this.value;
    }]]).e;
    _initStatic(this);
  }
  static #a = _call_a;
  static value = 1;
  static callA() {
    return this.#a();
  }
}
