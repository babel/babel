var _call_a, _initStatic;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initStatic] = babelHelpers.applyDecs2203(this, [[dec, 8, "a", function () {
      return this.value;
    }]], []);
    _initStatic(this);
  }
  static value = 1;
  static get #a() {
    return _call_a(this);
  }
  static getA() {
    return this.#a;
  }
}
