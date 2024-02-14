var _initClass;
const dec = () => {};
let hasX, hasA, hasM;
let _Foo;
new class extends babelHelpers.identity {
  static {
    class Foo {
      static {
        [_Foo, _initClass] = babelHelpers.applyDecs2311(this, [dec], []).c;
      }
      static get a() {
        return _Foo.#B;
      }
      static set a(v) {
        _Foo.#B = v;
      }
      static m() {}
    }
  }
  #x;
  #A;
  get #a() {
    return _Foo.#A;
  }
  set #a(v) {
    _Foo.#A = v;
  }
  #m() {}
  x;
  #B;
  constructor() {
    super(_Foo), (() => {
      hasX = o => #x in o;
      hasA = o => #a in o;
      hasM = o => #m in o;
    })(), _initClass();
  }
}();
