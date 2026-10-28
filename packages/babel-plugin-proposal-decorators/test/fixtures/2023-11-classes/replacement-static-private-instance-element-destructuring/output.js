let _initClass, _staticBlock;
const dec = () => {};
let getX, getA, callM;
let _Foo;
new class extends babelHelpers.identity {
  static [class Foo {
    static {
      [_Foo, _initClass] = babelHelpers.applyDecs2311(this, [dec], []).c;
      _staticBlock = function () {
        staticThis = this;
        getX = _ref => {
          let x = _ref.#x;
          return x;
        };
        getA = _ref2 => {
          let a = _ref2.#a;
          return a;
        };
        callM = _ref3 => {
          let m = _ref3.#m;
          return m();
        };
      };
    }
    #x = "#x";
    #A = "#a";
    get #a() {
      return this.#A;
    }
    set #a(v) {
      this.#A = v;
    }
    #m() {
      return "#m";
    }
  }];
  constructor() {
    super(_Foo), _staticBlock.call(this), _initClass();
  }
}();
