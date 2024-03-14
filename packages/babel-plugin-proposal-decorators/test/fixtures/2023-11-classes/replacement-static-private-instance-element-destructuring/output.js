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
        getX = _p => {
          var x = _p.#x;
          return x;
        };
        getA = _p2 => {
          var a = _p2.#a;
          return a;
        };
        callM = _p3 => {
          var m = _p3.#m;
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
