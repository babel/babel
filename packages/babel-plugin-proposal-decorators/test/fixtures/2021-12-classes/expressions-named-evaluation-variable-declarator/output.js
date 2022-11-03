var _initClass, _A, _initClass2, _A2, _initClass3, _A3;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
var A0 = (class A0 {
  static {
    [_A, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass();
  }
}, _A);
let A1 = (new class extends babelHelpers.identity {
  static {
    class A1 {
      static {
        [_A2, _initClass2] = babelHelpers.applyDecs(this, [], [dec]);
      }
    }
  }
  constructor() {
    super(_A2), (() => {})(), _initClass2();
  }
}(), _A2);
const A2 = (class A2 extends A1 {
  static {
    [_A3, _initClass3] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass3();
  }
}, _A3);
expect(logs).toEqual(["A0", "A1", "A2"]);
