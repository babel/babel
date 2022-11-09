var _initClass, _A, _initClass2, _A2, _initClass3, _A3, _initClass4, _A4, _initClass5, _A5, _initClass6, _A6, _initClass7, _A7;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
const [A0 = (class A0 {
  static {
    [_A, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass();
  }
}, _A)] = [];
const {
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
  }(), _A2)
} = {};
const {
  A0: A2 = (class A2 {
    static {
      [_A3, _initClass3] = babelHelpers.applyDecs(this, [], [dec]);
    }
    p;
    static {
      _initClass3();
    }
  }, _A3)
} = {};
let A3, A4;
[A3 = (class A3 extends A1 {
  static {
    [_A4, _initClass4] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass4();
  }
}, _A4)] = [];
({
  A4 = (new class extends babelHelpers.identity {
    static {
      class A4 extends A1 {
        static {
          [_A5, _initClass5] = babelHelpers.applyDecs(this, [], [dec]);
        }
      }
    }
    constructor() {
      super(_A5), (() => {})(), _initClass5();
    }
  }(), _A5)
} = {});
({
  ["A0"]: A5 = (class A5 {
    static {
      [_A6, _initClass6] = babelHelpers.applyDecs(this, [], [dec]);
    }
    p;
    static {
      _initClass6();
    }
  }, _A6)
});
((A6 = (class A6 {
  static {
    [_A7, _initClass7] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    _initClass7();
  }
}, _A7)) => {})();
expect(logs).toEqual(["A0", "A1", "A2", "A3", "A4", "A5", "A6"]);
