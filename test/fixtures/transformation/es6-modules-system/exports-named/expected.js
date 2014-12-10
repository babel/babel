System.register("actual", [], function (_export) {
  "use strict";

  var __moduleName = "actual";

  return {
    setters: [],
    execute: function () {
      _export("foo", foo);

      _export("foo", foo);

      _export("bar", bar);

      _export("bar", foo);

      _export("default", foo);

      _export("default", foo);

      _export("bar", bar);
    }
  };
});
