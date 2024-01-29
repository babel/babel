var _initProto, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initProto] = babelHelpers.applyDecs2203R(this, [[dec, 1, "a", function () {
      return this.#A;
    }, function (value) {
      this.#A = value;
    }], [dec, 1, "b", function () {
      return this.#B;
    }, function (value) {
      this.#B = value;
    }]], []).e;
  }
  #A = (_initProto(this), _init_a(this));
  set #a(v) {
    _set_a(this, v);
  }
  get #a() {
    return _get_a(this);
  }
  #B = _init_b(this, 123);
  set #b(v) {
    _set_b(this, v);
  }
  get #b() {
    return _get_b(this);
  }
}
