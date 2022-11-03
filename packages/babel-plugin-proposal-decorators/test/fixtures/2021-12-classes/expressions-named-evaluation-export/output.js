"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.atypical = void 0;
var _initClass, _initClass2, _atypical;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
let _default2;
exports.default = _default2;
class _default {
  static {
    babelHelpers.setFunctionName(this, "default");
    [_default2, _initClass] = babelHelpers.applyDecs2203(this, [], [dec]);
    exports.default = _default2;
  }
  static {
    _initClass();
  }
}
const atypical = (class atypical {
  static {
    [_atypical, _initClass2] = babelHelpers.applyDecs2203(this, [], [dec]);
  }
  static {
    _initClass2();
  }
}, _atypical);
exports.atypical = atypical;
expect(logs).toEqual(["default", "atypical"]);
