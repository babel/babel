System.register(["foo"], function (_export) {
  "use strict";

  var foo;
  return {
    setters: [function (_foo) {
      foo = _foo;
    }],
    execute: function () {}
  };
});
