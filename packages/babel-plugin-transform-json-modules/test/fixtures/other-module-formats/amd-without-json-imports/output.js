define(["exports", "./a.js", "./b.json"], function (_exports, _a, _b) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.x = void 0;
  _a = babelHelpers.interopRequireDefault(_a);
  _b = babelHelpers.interopRequireDefault(_b);
  const x = _exports.x = _a.default + _b.default;
});
