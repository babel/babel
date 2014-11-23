System.register("actual", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "actual";

  var foo;
  return {
    setters: [function (m) {
      foo = m;
    }],
    execute: function () {}
  };
});
