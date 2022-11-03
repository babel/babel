var _initClass, _decorated_class, _initClass2, _decorated_class2, _initClass3, _A, _initClass4, _decorated_class3, _initClass5, _decorated_class4, _initClass6, _decorated_class5, _, _initClass7, _decorated_class6, _2, _initClass8, _decorated_class7, _3, _initClass9, _decorated_class8, _f, _initClass10, _decorated_class9, _init_computedKey, _Symbol, _initClass11, _decorated_class10;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
const f = () => {
  logs.push("computing f");
  return 8.;
};

// __proto__ setter should not name anonymous class
({
  __proto__: (class {
    static {
      [_decorated_class, _initClass] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass();
    }
  }, _decorated_class)
});
({
  "__proto__": (class {
    static {
      [_decorated_class2, _initClass2] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass2();
    }
  }, _decorated_class2)
});
({
  A0: (class A0 {
    static {
      [_A, _initClass3] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass3();
    }
  }, _A),
  "1": (new class extends babelHelpers.identity {
    static {
      (class {
        static {
          babelHelpers.setFunctionName(this, "1");
          [_decorated_class3, _initClass4] = babelHelpers.applyDecs2203(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class3), (() => {})(), _initClass4();
    }
  }(), _decorated_class3),
  2: (class extends class {} {
    static {
      babelHelpers.setFunctionName(this, "2");
      [_decorated_class4, _initClass5] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass5();
    }
  }, _decorated_class4),
  3n: (new class extends babelHelpers.identity {
    static {
      (class extends class {} {
        static {
          babelHelpers.setFunctionName(this, "3");
          [_decorated_class5, _initClass6] = babelHelpers.applyDecs2203(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class5), (() => {})(), _initClass6();
    }
  }(), _decorated_class5),
  [_ = "4"]: (class {
    static {
      babelHelpers.setFunctionName(this, _);
      [_decorated_class6, _initClass7] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass7();
    }
  }, _decorated_class6),
  [_2 = 5]: (class {
    static {
      babelHelpers.setFunctionName(this, _2);
      [_decorated_class7, _initClass8] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass8();
    }
  }, _decorated_class7),
  [_3 = 6n]: (class {
    static {
      babelHelpers.setFunctionName(this, _3);
      [_decorated_class8, _initClass9] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass9();
    }
  }, _decorated_class8),
  [_f = f()]: (new class extends babelHelpers.identity {
    static {
      (class {
        static {
          babelHelpers.setFunctionName(this, _f);
          [_init_computedKey, _decorated_class9, _initClass10] = babelHelpers.applyDecs2203(this, [[dec, 5, "7"]], [dec]);
        }
      });
    }
    7 = _init_computedKey(this);
    constructor() {
      super(_decorated_class9), _initClass10();
    }
  }(), _decorated_class9),
  [_Symbol = Symbol(9)]: (class {
    static {
      babelHelpers.setFunctionName(this, _Symbol);
      [_decorated_class10, _initClass11] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass11();
    }
  }, _decorated_class10)
});
expect(logs).toEqual(["", "", "A0", "1", "2", "3", "4", "5", "6", "computing f", "7", "8", "[9]"]);
