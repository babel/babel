let _initClass;
let _A;
new class extends babelHelpers.identity {
  static [(() => class A {
    static {
      [_A, _initClass] = babelHelpers.applyDecs2311(this, [deco], []).c;
    }
    #x = 1;
  })()];
  #y = 2;
  constructor() {
    super(_A), _initClass();
  }
}();
