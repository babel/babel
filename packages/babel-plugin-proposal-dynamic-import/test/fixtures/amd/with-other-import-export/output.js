define(["require", "exports", "foo"], function (_require, _exports, _foo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.mod = void 0;
  _foo = babelHelpers.interopRequireDefault(_foo);
  var mod;
  _exports.mod = mod;
  new Promise((_resolve, _reject) => _require(["mod"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject)).then(m => _exports.mod = mod = m);
});
