var _initClass, _A, _class, _initClass2, _A2, _temp, _initClass3, _A3, _class3, _initClass4, _B, _class4, _initClass5, _C, _class5, _initClass6, _D, _class6;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
let A0, A1, A2;
A0 = ((_class = class A0 {}, [_A, _initClass] = babelHelpers.applyDecs2203(_class, [], [dec]), _initClass()), _A);
A1 = (new (_temp = class extends babelHelpers.identity {
  constructor() {
    super(_A2), (() => {})(), _initClass2();
  }
}, (() => {
  class A1 {}
  [_A2, _initClass2] = babelHelpers.applyDecs2203(A1, [], [dec]);
})(), _temp)(), _A2);
A2 = ((_class3 = class A2 extends A1 {}, [_A3, _initClass3] = babelHelpers.applyDecs2203(_class3, [], [dec]), _initClass3()), _A3);
var B = true;
B &&= ((_class4 = class B {}, [_B, _initClass4] = babelHelpers.applyDecs2203(_class4, [], [dec]), _initClass4()), _B);
var C = false;
C ||= ((_class5 = class C {}, [_C, _initClass5] = babelHelpers.applyDecs2203(_class5, [], [dec]), _initClass5()), _C);
var D = undefined;
D ??= ((_class6 = class D {}, [_D, _initClass6] = babelHelpers.applyDecs2203(_class6, [], [dec]), _initClass6()), _D);
expect(logs).toEqual(["A0", "A1", "A2", "B", "C", "D"]);
