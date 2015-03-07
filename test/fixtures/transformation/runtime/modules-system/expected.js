System.register(["babel-runtime/helpers/to-consumable-array"], function (_export) {
  var _toConsumableArray;

  return {
    setters: [function (_babelRuntimeHelpersToConsumableArray) {
      _toConsumableArray = _babelRuntimeHelpersToConsumableArray["default"];
    }],
    execute: function () {
      "use strict";

      foo.apply(undefined, _toConsumableArray(bar));
    }
  };
});