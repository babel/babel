System.register(["foo"], function (_export) {
  return {
    setters: [function (_foo) {
      for (var _key in _foo) {
        _export(_key, _foo[_key]);
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