var _initClass, _decorated_class, _initClass2, _decorated_class2;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
class C {
  static #A = (class {
    static {
      babelHelpers.setFunctionName(this, "#A");
      [_decorated_class, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
    }
    static {
      _initClass();
    }
  }, _decorated_class);
  static #B = (new class extends babelHelpers.identity {
    static {
      (class {
        static {
          babelHelpers.setFunctionName(this, "#B");
          [_decorated_class2, _initClass2] = babelHelpers.applyDecs(this, [], [dec]);
        }
      });
    }
    constructor() {
      super(_decorated_class2), (() => {})(), _initClass2();
    }
  }(), _decorated_class2);
}
expect(logs).toEqual(["#A", "#B"]);
