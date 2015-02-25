System.register(["babel-runtime/helpers"], function (_export) {
  var _babelHelpers;

  return {
    setters: [function (_babelRuntimeHelpers) {
      _babelHelpers = _babelRuntimeHelpers["default"];
    }],
    execute: function () {
      "use strict";

      foo.apply(undefined, _babelHelpers.toConsumableArray(bar));
    }
  };
});