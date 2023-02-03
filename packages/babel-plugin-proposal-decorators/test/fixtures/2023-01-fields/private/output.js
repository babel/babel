var _init_a, _init_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b] = babelHelpers.applyDecs2203R(this, [[dec, 0, "a", function () {
      return this.#a;
    }, function (value) {
      this.#a = value;
    }], [dec, 0, "b", function () {
      return this.#b;
    }, function (value) {
      this.#b = value;
    }]], []).e;
  }
  #a = _init_a(this);
  #b = _init_b(this, 123);
}
