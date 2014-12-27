System.register("es6-modules-system/overview/expected", ["foo", "foo-bar", "./directory/foo-bar"], function (_export) {
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

      var foo = _foo["default"];
      var foo = _foo;
      var bar = _foo.bar;
      var bar = _foo.foo;
      _export("test", test);

      var test = _export("test", 5);

      _export("default", test);
    }
  };
});
