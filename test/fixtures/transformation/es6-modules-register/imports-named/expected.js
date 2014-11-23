System.register("actual", ["foo"], function ($__export) {
  "use strict";

  var __moduleName = "actual";

  var bar, baz, xyz;
  return {
    setters: [function (m) {
      bar = m.bar;
      bar = m.bar;
      baz = m.baz;
      baz = m.bar;
      baz = m.bar;
      xyz = m.xyz;
    }],
    execute: function () {}
  };
});
