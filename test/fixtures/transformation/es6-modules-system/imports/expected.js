System.register(["foo", "foo-bar", "./directory/foo-bar"], function (_export) {
  var _foo, _fooBar, _directoryFooBar;
  return {
    setters: [function (m) {
      _foo = m
    }, function (m) {
      _fooBar = m
    }, function (m) {
      _directoryFooBar = m
    }],
    execute: function () {
      "use strict";
    }
  };
});