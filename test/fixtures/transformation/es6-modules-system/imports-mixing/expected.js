System.register("es6-modules-system/imports-mixing/expected", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "es6-modules-system/imports-mixing/expected";

  var foo, xyz;
  return {
    setters: [function (m) {
      foo = m.default;
      xyz = m.baz;
    }],
    execute: function () {}
  };
});
