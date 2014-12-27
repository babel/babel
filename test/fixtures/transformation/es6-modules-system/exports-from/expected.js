System.register("es6-modules-system/exports-from/expected", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "es6-modules-system/exports-from/expected";

  return {
    setters: [function (m) {
      for (var i in m) {
        _export(i, m[i]);
      }

      _export("foo", m.foo);

      _export("foo", m.foo);

      _export("bar", m.bar);

      _export("bar", m.foo);

      _export("default", m.foo);

      _export("default", m.foo);

      _export("bar", m.bar);
    }],
    execute: function () {}
  };
});
