System.register("actual", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "actual";

  return {
    setters: [function (m) {
      (function (obj) {
        for (var i in obj) {
          _export(i, obj[i]);
        }
      })(m);

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
