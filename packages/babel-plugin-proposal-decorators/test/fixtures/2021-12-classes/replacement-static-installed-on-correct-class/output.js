var _initClass;
const dec = () => {};
let hasX, hasM;
let _Foo;
new class extends babelHelpers.identity {
  static {
    class Foo {
      static {
        [_Foo, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
      }
      static m() {}
    }
  }
  #x;
  #m() {}
  x;
  constructor() {
    super(_Foo), (() => {
      hasX = o => #x in o;
      hasM = o => #m in o;
    })(), _initClass();
  }
}();
