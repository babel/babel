var _init_a, _init_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b] = babelHelpers.applyDecs2301(this, [[dec, 5, "a", function () {
      return this.#a;
    }, function (value) {
      this.#a = value;
    }, _ => #a in _], [dec, 5, "b", function () {
      return this.#b;
    }, function (value) {
      this.#b = value;
    }, _ => #b in _]], []).e;
  }
  static #a = _init_a(this);
  static #b = _init_b(this, 123);
}
