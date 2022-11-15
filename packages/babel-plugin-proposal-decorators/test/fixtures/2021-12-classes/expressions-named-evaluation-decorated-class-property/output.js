var _initClass, _decorated_class, _init_computedKey, _initClass2, _proto__, _init___proto__, _initStatic, _initClass3, _A, _id, _initClass4, _decorated_class2, _initClass5, _decorated_class3, _id2, _initClass6, _decorated_class4, _initClass7, _decorated_class5, _initClass8, _decorated_class6, _init_A, _computedKey, _init_computedKey2, _init_computedKey3, _computedKey2, _init_computedKey4, _init__, _get__, _set__, _init__2, _initStatic2;
const logs = [];
const noop = (value, context) => {
  return value;
};
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};

// __proto__ has no special meaning in class fields
class A extends class _Class {
  static {
    [_init___proto__, _initStatic] = babelHelpers.applyDecs(this, [[noop, 6, "__proto__"]], []);
    _initStatic(this);
  }
  static #A = _init___proto__(this, (class __proto__ {
    static {
      [_proto__, _initClass2] = babelHelpers.applyDecs(this, [], [dec]);
    }
    static {
      _initClass2();
    }
  }, _proto__));
  static get __proto__() {
    return this.#A;
  }
  static set __proto__(v) {
    this.#A = v;
  }
} {
  static {
    [_init_computedKey] = babelHelpers.applyDecs(this, [[noop, 5, "__proto__"]], []);
  }
  static "__proto__" = _init_computedKey(this, (class {
    static {
      babelHelpers.setFunctionName(this, "__proto__");
      [_decorated_class, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
    }
    static {
      _initClass();
    }
  }, _decorated_class));
}
const id = x => {
  logs.push("computing id");
  return x;
};
_computedKey = _id = id(1);
_computedKey2 = _id2 = id(3n);
class C {
  static {
    [_init_computedKey3, _init_computedKey4, _init__, _get__, _set__, _init_A, _init_computedKey2, _init__2, _initStatic2] = babelHelpers.applyDecs(this, [[noop, 6, "2"], [noop, 6, _computedKey2], [noop, 6, "_4", function () {
      return this.#C;
    }, function (value) {
      this.#C = value;
    }], [noop, 5, "A0"], [noop, 5, _computedKey], [noop, 5, "_5", function () {
      return this.#_5;
    }, function (value) {
      this.#_5 = value;
    }]], []);
    _initStatic2(this);
  }
  static A0 = _init_A(this, (class A0 {
    static {
      [_A, _initClass3] = babelHelpers.applyDecs(this, [], [dec]);
    }
    static {
      _initClass3();
    }
  }, _A));
  static [_computedKey] = _init_computedKey2(this, (new class extends babelHelpers.identity {
    static {
      (class {
        static {
          babelHelpers.setFunctionName(this, _id);
          [_decorated_class2, _initClass4] = babelHelpers.applyDecs(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class2), (() => {})(), _initClass4();
    }
  }(), _decorated_class2));
  static #A = _init_computedKey3(this, (class extends class {} {
    static {
      babelHelpers.setFunctionName(this, "2");
      [_decorated_class3, _initClass5] = babelHelpers.applyDecs(this, [], [dec]);
    }
    static {
      _initClass5();
    }
  }, _decorated_class3));
  static get 2() {
    return this.#A;
  }
  static set 2(v) {
    this.#A = v;
  }
  static #B = _init_computedKey4(this, (new class extends babelHelpers.identity {
    static {
      (class extends class {} {
        static {
          babelHelpers.setFunctionName(this, _id2);
          [_decorated_class4, _initClass6] = babelHelpers.applyDecs(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class4), (() => {})(), _initClass6();
    }
  }(), _decorated_class4));
  static get [_computedKey2]() {
    return this.#B;
  }
  static set [_computedKey2](v) {
    this.#B = v;
  }
  static #C = _init__(this, (class {
    static {
      babelHelpers.setFunctionName(this, "#_4");
      [_decorated_class5, _initClass7] = babelHelpers.applyDecs(this, [], [dec]);
    }
    p;
    static {
      _initClass7();
    }
  }, _decorated_class5));
  set #_4(v) {
    _set__(this, v);
  }
  get #_4() {
    return _get__(this);
  }
  static #_5 = _init__2(this, (class {
    static {
      babelHelpers.setFunctionName(this, "#_5");
      [_decorated_class6, _initClass8] = babelHelpers.applyDecs(this, [], [dec]);
    }
    p;
    static {
      _initClass8();
    }
  }, _decorated_class6));
}
expect(logs).toEqual(["__proto__", "__proto__", "computing id", "computing id", "A0", "1", "2", "3", "#_4", "#_5"]);
