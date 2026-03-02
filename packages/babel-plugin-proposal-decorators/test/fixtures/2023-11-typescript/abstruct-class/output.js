let _initClass;
function classDec(target, context) {}
let _C;
new class extends babelHelpers.identity {
  static [class C {
    static {
      [_C, _initClass] = babelHelpers.applyDecs2311(this, [classDec], []).c;
    }
  }];
  foo = false;
  constructor() {
    super(_C), _initClass();
  }
}();
