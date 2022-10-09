var _init_a, _init_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b] = babelHelpers.applyDecs(this, [[dec, 5, "a", function () {
      return this.#a;
    }, function (value) {
      this.#a = value;
    }], [dec, 5, "b", function () {
      return this.#b;
    }, function (value) {
      this.#b = value;
    }]], []);
  }
  static #a = _init_a(this);
  static #b = _init_b(this, 123);
}
