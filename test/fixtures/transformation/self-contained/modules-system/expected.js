System.register(["6to5-runtime/helpers"], function (_export) {
  "use strict";

  var _to5Helpers;
  return {
    setters: [function (_to5RuntimeHelpers) {
      _to5Helpers = _to5RuntimeHelpers["default"];
    }],
    execute: function () {
      foo.apply(undefined, _to5Helpers.toConsumableArray(bar));
    }
  };
});
