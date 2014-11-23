System.register("actual", [], function (_export) {
  "use strict";

  var __moduleName = "actual";

  return {
    setters: [],
    execute: function () {
      var exports = _export;
      (function (obj) {
        for (var i in obj) {
          exports[i] = obj[i];
        }
      })(foo);

      _export("foo", foo.foo);

      _export("foo", foo.foo);

      _export("bar", foo.bar);

      _export("bar", foo.foo);

      _export("default", foo.foo);

      _export("default", foo.foo);

      _export("bar", foo.bar);
    }
  };
});
