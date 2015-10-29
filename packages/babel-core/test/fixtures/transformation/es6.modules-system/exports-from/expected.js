System.register(["foo"], function (_export) {
  return {
    setters: [function (_foo) {
      var _exportObj = {};

      for (var _key in _foo) {
        if (_key !== "default") _exportObj[_key] = _foo[_key];
      }

      _exportObj.foo = _foo.foo;
      _exportObj.foo = _foo.foo;
      _exportObj.bar = _foo.bar;
      _exportObj.bar = _foo.foo;
      _exportObj.default = _foo.foo;
      _exportObj.default = _foo.foo;
      _exportObj.bar = _foo.bar;

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
