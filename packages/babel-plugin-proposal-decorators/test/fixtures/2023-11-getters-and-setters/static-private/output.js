var _initStatic, _call_a, _call_a2;
const dec = () => {};
class Foo {
  static {
    [_call_a, _call_a2, _initStatic] = babelHelpers.applyDecs2311(this, [], [[dec, 11, "a", function () {
      return this.value;
    }], [dec, 12, "a", function (v) {
      this.value = v;
    }]]).e;
    _initStatic(this);
  }
  static value = 1;
  static get #a() {
    return _call_a(this);
  }
  static set #a(v) {
    _call_a2(this, v);
  }
  static getA() {
    return this.#a;
  }
  static setA(v) {
    this.#a = v;
  }
}
