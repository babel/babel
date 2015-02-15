System.register(["babel-runtime/helpers"], function (_export) {
  "use strict";

  var _babelHelpers;
  return {
    setters: [function (_babelRuntimeHelpers) {
      _babelHelpers = _babelRuntimeHelpers["default"];
    }],
    execute: function () {
      foo.apply(undefined, _babelHelpers.toConsumableArray(bar));
    }
  };
});
