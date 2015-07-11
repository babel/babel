System.register(["foo", "bar"], function (_export) {
  "use strict";

  var foo, bar;
  return {
    setters: [function (_foo) {
      var _exportObj = {};

      for (var _key in _foo) {
        _exportObj[_key] = _foo[_key];
      }

      _exportObj["foo"] = _foo.foo;
      _exportObj["foo"] = _foo.foo;
      _exportObj["bar"] = _foo.bar;

      _export(_exportObj);
    }, function (_bar) {
      var _exportObj2 = {};
      _exportObj2["bar"] = _bar.foo;
      _exportObj2["default"] = _bar.foo;
      _exportObj2["default"] = _bar.foo;
      _exportObj2["bar"] = _bar.bar;

      _export(_exportObj2);
    }],
    execute: function () {
      _export("foo", foo);

      _export("bar", bar);
    }
  };
});
