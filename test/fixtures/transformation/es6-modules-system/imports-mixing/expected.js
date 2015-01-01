System.register(["foo"], function (_export) {
  var foo, xyz;
  return {
    setters: [function (_foo) {
      foo = _foo["default"];
      xyz = _foo.baz;
    }],
    execute: function () {
      "use strict";
    }
  };
});
