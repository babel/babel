"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.atypical = void 0;
var _initClass, _initClass2, _atypical, _class;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
  return value;
};
let _default2;
exports.default = _default2;
class _default {}
(() => {
  babelHelpers.setFunctionName(_default, "default");
  [_default2, _initClass] = babelHelpers.applyDecs2203(_default, [], [dec]);
  exports.default = _default2;
})();
_initClass();
const atypical = ((_class = class atypical {}, [_atypical, _initClass2] = babelHelpers.applyDecs2203(_class, [], [dec]), _initClass2()), _atypical);
exports.atypical = atypical;
expect(logs).toEqual(["default", "atypical"]);
