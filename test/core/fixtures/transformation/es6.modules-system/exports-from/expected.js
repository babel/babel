System.register(["foo"], function (_export) {
  "use strict";

  return {
    setters: [function (_foo) {
      var exportObj = {};

      for (var _key in _foo) {
        if (_key !== 'default')
          exportObj[_key] = _foo[_key];
      }

      exportObj["foo"] = _foo.foo;

      exportObj["bar"] = _foo.bar;

      exportObj["bar"] = _foo.foo;

      exportObj["default"] = _foo.foo;

      exportObj["default"] = _foo.foo;

      exportObj["bar"] = _foo.bar;

      _export(exportObj);
    }],
    execute: function () {}
  };
});
