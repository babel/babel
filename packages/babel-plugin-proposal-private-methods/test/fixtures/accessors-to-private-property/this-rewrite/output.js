var _get_foo, _set_foo;

class A {
  #foo = Object.defineProperty({
    t: this
  }, "_", {
    get: _get_foo || (_get_foo = function () {
      this.t;

      () => this.t;

      (function () {
        this;
      }).call(this.t);
      this.t.#foo._;
      this.t.#foo._ = 2;
    }),
    set: _set_foo || (_set_foo = function (x) {})
  });
}
