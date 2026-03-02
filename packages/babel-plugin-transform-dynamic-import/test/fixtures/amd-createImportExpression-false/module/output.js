define(["require"], function (_require) {
  "use strict";

  var modP = new Promise((_resolve, _reject) => _require(["mod"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
});
