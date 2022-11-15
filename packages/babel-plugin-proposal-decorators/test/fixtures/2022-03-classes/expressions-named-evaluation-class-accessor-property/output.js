var _initClass, _decorated_class, _initClass2, _proto__, _initClass3, _A, _initClass4, _decorated_class2, _initClass5, _decorated_class3, _initClass6, _decorated_class4, _, _initClass7, _decorated_class5, _computedKey, _2, _initClass8, _decorated_class6, _computedKey2, _3, _initClass9, _decorated_class7, _computedKey3, _f, _initClass10, _decorated_class8, _init_computedKey, _initStatic, _computedKey4, _Symbol, _initClass11, _decorated_class9, _computedKey5, _initClass12, _decorated_class10;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};

// __proto__ has no special meaning in class fields
class A extends class {
  static #A = (class __proto__ {
    static {
      [_proto__, _initClass2] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass2();
    }
  }, _proto__);
  static get __proto__() {
    return this.#A;
  }
  static set __proto__(v) {
    this.#A = v;
  }
} {
  static #A = (class {
    static {
      babelHelpers.setFunctionName(this, "__proto__");
      [_decorated_class, _initClass] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass();
    }
  }, _decorated_class);
  static get "__proto__"() {
    return this.#A;
  }
  static set "__proto__"(v) {
    this.#A = v;
  }
}
const f = () => {
  logs.push("computing f");
  return 8.;
};
_computedKey = _ = "4";
_computedKey2 = _2 = 5;
_computedKey3 = _3 = 6n;
_computedKey4 = _f = f();
_computedKey5 = _Symbol = Symbol(9);
class C {
  static #A = (class A0 {
    static {
      [_A, _initClass3] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass3();
    }
  }, _A);
  static get A0() {
    return this.#A;
  }
  static set A0(v) {
    this.#A = v;
  }
  static #B = (new class extends babelHelpers.identity {
    static {
      (class {
        static {
          babelHelpers.setFunctionName(this, "1");
          [_decorated_class2, _initClass4] = babelHelpers.applyDecs2203(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class2), (() => {})(), _initClass4();
    }
  }(), _decorated_class2);
  static get "1"() {
    return this.#B;
  }
  static set "1"(v) {
    this.#B = v;
  }
  static #C = (class extends class {} {
    static {
      babelHelpers.setFunctionName(this, "2");
      [_decorated_class3, _initClass5] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass5();
    }
  }, _decorated_class3);
  static get 2() {
    return this.#C;
  }
  static set 2(v) {
    this.#C = v;
  }
  static #D = (new class extends babelHelpers.identity {
    static {
      (class extends class {} {
        static {
          babelHelpers.setFunctionName(this, "3");
          [_decorated_class4, _initClass6] = babelHelpers.applyDecs2203(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class4), (() => {})(), _initClass6();
    }
  }(), _decorated_class4);
  static get 3n() {
    return this.#D;
  }
  static set 3n(v) {
    this.#D = v;
  }
  static #E = (class {
    static {
      babelHelpers.setFunctionName(this, _);
      [_decorated_class5, _initClass7] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass7();
    }
  }, _decorated_class5);
  static get [_computedKey]() {
    return this.#E;
  }
  static set [_computedKey](v) {
    this.#E = v;
  }
  static #F = (class {
    static {
      babelHelpers.setFunctionName(this, _2);
      [_decorated_class6, _initClass8] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass8();
    }
  }, _decorated_class6);
  static get [_computedKey2]() {
    return this.#F;
  }
  static set [_computedKey2](v) {
    this.#F = v;
  }
  static #G = (class {
    static {
      babelHelpers.setFunctionName(this, _3);
      [_decorated_class7, _initClass9] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass9();
    }
  }, _decorated_class7);
  static get [_computedKey3]() {
    return this.#G;
  }
  static set [_computedKey3](v) {
    this.#G = v;
  }
  static #H = (new class extends babelHelpers.identity {
    static {
      (class {
        static {
          babelHelpers.setFunctionName(this, _f);
          [_init_computedKey, _initStatic, _decorated_class8, _initClass10] = babelHelpers.applyDecs2203(this, [[dec, 6, "7"]], [dec]);
          _initStatic(this);
        }
        static get 7() {
          return this.#A;
        }
        static set 7(v) {
          this.#A = v;
        }
      });
    }
    #A = _init_computedKey(this);
    constructor() {
      super(_decorated_class8), _initClass10();
    }
  }(), _decorated_class8);
  static get [_computedKey4]() {
    return this.#H;
  }
  static set [_computedKey4](v) {
    this.#H = v;
  }
  static #I = (class {
    static {
      babelHelpers.setFunctionName(this, _Symbol);
      [_decorated_class9, _initClass11] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    p;
    static {
      _initClass11();
    }
  }, _decorated_class9);
  static get [_computedKey5]() {
    return this.#I;
  }
  static set [_computedKey5](v) {
    this.#I = v;
  }
  static #J = (class {
    static {
      babelHelpers.setFunctionName(this, "#_10");
      [_decorated_class10, _initClass12] = babelHelpers.applyDecs2203(this, [], [dec]);
    }
    static {
      _initClass12();
    }
  }, _decorated_class10);
  static get #_10() {
    return this.#J;
  }
  static set #_10(v) {
    this.#J = v;
  }
}
expect(logs).toEqual(["__proto__", "__proto__", "computing f", "A0", "1", "2", "3", "4", "5", "6", "7", "8", "[9]", "#_10"]);
