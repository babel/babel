var _initClass, _A, _class, _initClass2, _A2, _temp, _initClass3, _A3, _class3, _initClass4, _A4, _class4, _initClass5, _A5, _temp2, _initClass6, _A6, _class5, _initClass7, _A7;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
const [A0 = ((_class = class A0 {}, [_A, _initClass] = babelHelpers.applyDecs(_class, [], [dec]), _initClass()), _A)] = [];
const {
  A1 = (new (_temp = class extends babelHelpers.identity {
    constructor() {
      super(_A2), (() => {})(), _initClass2();
    }
  }, (() => {
    class A1 {}
    [_A2, _initClass2] = babelHelpers.applyDecs(A1, [], [dec]);
  })(), _temp)(), _A2)
} = {};
const {
  A0: A2 = ((_class3 = class A2 {
    constructor() {
      babelHelpers.defineProperty(this, "p", void 0);
    }
  }, [_A3, _initClass3] = babelHelpers.applyDecs(_class3, [], [dec]), _initClass3()), _A3)
} = {};
let A3, A4;
[A3 = ((_class4 = class A3 extends A1 {}, [_A4, _initClass4] = babelHelpers.applyDecs(_class4, [], [dec]), _initClass4()), _A4)] = [];
({
  A4 = (new (_temp2 = class extends babelHelpers.identity {
    constructor() {
      super(_A5), (() => {})(), _initClass5();
    }
  }, (() => {
    class A4 extends A1 {}
    [_A5, _initClass5] = babelHelpers.applyDecs(A4, [], [dec]);
  })(), _temp2)(), _A5)
} = {});
({
  ["A0"]: A5 = ((_class5 = class A5 {
    constructor() {
      babelHelpers.defineProperty(this, "p", void 0);
    }
  }, [_A6, _initClass6] = babelHelpers.applyDecs(_class5, [], [dec]), _initClass6()), _A6)
});
((A6 = ((() => {
  var _temp3;
  return _temp3 = _class6 = class A6 {}, [_A7, _initClass7] = babelHelpers.applyDecs(_class6, [], [dec]), _initClass7(), _temp3;
})(), _A7)) => {
  var _class6;
})();
expect(logs).toEqual(["A0", "A1", "A2", "A3", "A4", "A5", "A6"]);
