var _initClass, _A, _class, _initClass2, _A2, _temp, _initClass3, _A3, _class3;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
var A0 = ((_class = class A0 {}, [_A, _initClass] = babelHelpers.applyDecs(_class, [], [dec]), _initClass()), _A);
let A1 = (new (_temp = class extends babelHelpers.identity {
  constructor() {
    super(_A2), (() => {})(), _initClass2();
  }
}, (() => {
  class A1 {}
  [_A2, _initClass2] = babelHelpers.applyDecs(A1, [], [dec]);
})(), _temp)(), _A2);
const A2 = ((_class3 = class A2 extends A1 {}, [_A3, _initClass3] = babelHelpers.applyDecs(_class3, [], [dec]), _initClass3()), _A3);
expect(logs).toEqual(["A0", "A1", "A2"]);
