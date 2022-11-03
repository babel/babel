var _initClass, _A, _initClass2, _A2, _initClass3, _A3, _initClass4, _B, _initClass5, _C, _initClass6, _D;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
let A0, A1, A2;
A0 = (class A0 {
  static {
    [_A, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass();
  }
}, _A);
A1 = (new class extends babelHelpers.identity {
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
A2 = (class A2 extends A1 {
  static {
    [_A3, _initClass3] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass3();
  }
}, _A3);
var B = true;
B &&= (class B {
  static {
    [_B, _initClass4] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass4();
  }
}, _B);
var C = false;
C ||= (class C {
  static {
    [_C, _initClass5] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass5();
  }
}, _C);
var D = undefined;
D ??= (class D {
  static {
    [_D, _initClass6] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass6();
  }
}, _D);
expect(logs).toEqual(["A0", "A1", "A2", "B", "C", "D"]);
