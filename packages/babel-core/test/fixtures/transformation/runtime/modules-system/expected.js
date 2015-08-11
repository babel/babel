System.register(["babel-runtime/helpers/to-consumable-array", "babel-runtime/regenerator"], function (_export) {
  var _toConsumableArray, _regeneratorRuntime, marked0$0;

  function generator() {
    return _regeneratorRuntime.wrap(function generator$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return 1;

        case 2:
        case "end":
          return context$1$0.stop();
      }
    }, marked0$0[0], this);
  }

  return {
    setters: [function (_babelRuntimeHelpersToConsumableArray) {
      _toConsumableArray = _babelRuntimeHelpersToConsumableArray["default"];
    }, function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator["default"];
    }],
    execute: function () {
      "use strict";

      _export("generator", generator);

      marked0$0 = [generator].map(_regeneratorRuntime.mark);
      foo.apply(undefined, _toConsumableArray(bar));
    }
  };
});