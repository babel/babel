System.register(["babel-runtime/es5/helpers/to-consumable-array", "babel-runtime/es5/regenerator"], function (_export) {
  var _toConsumableArray, _regeneratorRuntime, generator;

  return {
    setters: [function (_babelRuntimeEs5HelpersToConsumableArray) {
      _toConsumableArray = _babelRuntimeEs5HelpersToConsumableArray["default"];
    }, function (_babelRuntimeEs5Regenerator) {
      _regeneratorRuntime = _babelRuntimeEs5Regenerator["default"];
    }],
    execute: function () {
      "use strict";

      generator = _regeneratorRuntime.mark(function generator() {
        return _regeneratorRuntime.wrap(function generator$(context$1$0) {
          while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
              context$1$0.next = 2;
              return 1;

            case 2:
            case "end":
              return context$1$0.stop();
          }
        }, generator, this);
      });

      _export("generator", generator);

      foo.apply(undefined, _toConsumableArray(bar));
    }
  };
});