let _initClass, _method;
const dec = () => {};
let hasX, hasA, hasM;
class Base {
  static id(v) {
    return v;
  }
}
let _Foo;
new class extends babelHelpers.identity {
  static [class Foo extends Base {
    static {
      [_Foo, _initClass] = babelHelpers.applyDecs2311(this, [dec], [], 0, void 0, Base).c;
      _method = function () {
        babelHelpers.superPropGet(_Foo, "id", this, 2)([this]);
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
  #method(...arg) {
    return _method.apply(this, arg);
  }
  constructor() {
    super(_Foo), _initClass();
  }
}();
