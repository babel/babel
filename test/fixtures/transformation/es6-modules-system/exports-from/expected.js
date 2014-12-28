System.register(["foo"], function (_export) {
  var _foo;
  return {
    setters: [function (m) {
      _foo = m

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

    }],
    execute: function () {
      "use strict";
    }
  };
});
