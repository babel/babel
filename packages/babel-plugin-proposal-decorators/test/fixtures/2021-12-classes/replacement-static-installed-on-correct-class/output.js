let _initClass;
const dec = () => {};
let hasX, hasA, hasM;
let _Foo;
new class extends babelHelpers.identity {
  static [class Foo {
    static {
      [_Foo, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
    }
    static get a() {
      return this.#B;
    }
    static set a(v) {
      this.#B = v;
    }
    static m() {}
  }];
  #x;
  #A;
  get #a() {
    return this.#A;
  }
  set #a(v) {
    this.#A = v;
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
