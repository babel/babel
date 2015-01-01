"use strict";

System.register(["foo", "foo-bar", "./directory/foo-bar"], function (_export) {
  var foo, foo, bar, bar, test;
  return {
    setters: [function (_foo) {
      foo = _foo["default"];
      foo = _foo;
      bar = _foo.bar;
      bar = _foo.foo;
    }, function (_fooBar) {}, function (_directoryFooBar) {}],
    execute: function () {
      _export("test", test);

      test = _export("test", 5);
      _export("default", test);
    }
  };
});
