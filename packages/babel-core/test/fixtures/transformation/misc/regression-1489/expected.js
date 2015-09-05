System.register(["foo"], function (_export) {
    var toString;
  return {
    setters: [function (_foo) {
      toString = _foo["default"];
    }],
    execute: function () {
      toString;
    }
  };
});
