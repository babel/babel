define(["require"], function (_require) {
  "use strict";

  import.source("a");
  import.defer("b");
  new Promise((_resolve, _reject) => _require(["c"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
});
