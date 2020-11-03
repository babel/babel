var _get_foo, _set_foo;

class Cl {
  #foo = Object.defineProperty({
    t: this
  }, "_", {
    get: _get_foo || (_get_foo = function () {}),
    set: _set_foo || (_set_foo = function (x) {})
  });

  test() {
    this.#foo._?.bar;
    this?.#foo._;
    this?.self.#foo._;
  }

}
