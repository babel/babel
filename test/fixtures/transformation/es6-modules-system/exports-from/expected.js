System.register("es6-modules-system/exports-from/expected", ["foo"], function (_export) {
  var _foo;
  return {
    setters: [function (m) {
      _foo = m
    }],
    execute: function () {
      "use strict";

      for (var i in _foo) {
        _export(i, _foo[i])
      }

      _export("foo", _foo.foo);

      _export("foo", _foo.foo);

      _export("bar", _foo.bar);

      _export("bar", _foo.foo);

      _export("default", _foo.foo);

      _export("default", _foo.foo);

      _export("bar", _foo.bar);
    }
  };
});
