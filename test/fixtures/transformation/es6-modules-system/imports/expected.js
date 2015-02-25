System.register(["foo", "foo-bar", "./directory/foo-bar"], function (_export) {
  return {
    setters: [function (_foo) {}, function (_fooBar) {}, function (_directoryFooBar) {}],
    execute: function () {
      "use strict";
    }
  };
});