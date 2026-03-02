let _initClass, _staticBlock;
const dec = () => {};
let hasX, hasA, hasM;
let _Foo;
new class extends babelHelpers.identity {
  static [class Foo {
    static {
      [_Foo, _initClass] = babelHelpers.applyDecs2311(this, [dec], []).c;
      _staticBlock = function () {
        hasX = o => #x in o;
        hasA = o => #a in o;
        hasM = o => #m in o;
      };
    }
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
    get a() {
      return this.#B;
    }
    set a(v) {
      this.#B = v;
    }
    m() {}
  }];
  constructor() {
    super(_Foo), _staticBlock.call(this), _initClass();
  }
}();
