var _initProto, _call_x;
const dec = () => {};
class Foo {
  static {
    [_call_x, _initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 2, "x", function () {
      class Nested {
        static #x;
        static set x(v) {
          this.#x = v;
        }
      }
    }]], 0, _ => #x in _).e;
  }
  constructor() {
    _initProto(this);
  }
  #x = _call_x;
}
