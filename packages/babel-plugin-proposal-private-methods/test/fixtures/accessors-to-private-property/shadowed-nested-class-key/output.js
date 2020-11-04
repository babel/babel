var _get_foo, _set_foo, _get_bar, _set_bar;

class A {
  #foo = Object.defineProperty({
    t: this
  }, "_", {
    get: _get_foo || (_get_foo = function () {}),
    set: _set_foo || (_set_foo = function (x) {})
  });
  #bar = Object.defineProperty({
    t: this
  }, "_", {
    get: _get_bar || (_get_bar = function () {}),
    set: _set_bar || (_set_bar = function (x) {})
  });
  #baz;

  test() {
    var _get_baz, _set_baz;

    class B {
      #baz = Object.defineProperty({
        t: this
      }, "_", {
        get: _get_baz || (_get_baz = function () {}),
        set: _set_baz || (_set_baz = function (x) {})
      });
      #foo;

      [this.#foo._]() {
        this.#foo = 1;
        this.#bar._ = 2;
      }

      [this.#bar._]() {
        this.#foo = 3;
        this.#bar._ = 4;
      }

      [this.#baz]() {
        this.#foo = 3;
        this.#bar._ = 4;
      }

    }
  }

}
