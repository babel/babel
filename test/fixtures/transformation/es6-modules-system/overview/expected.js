System.register("actual", ["foo", "foo-bar", "./directory/foo-bar"], function (_export) {
  "use strict";

  var __moduleName = "actual";

  var foo, bar;
  var test;

  return {
    setters: [function (m) {
      foo = m.default;
      foo = m;
      bar = m.bar;
      bar = m.foo;
    }, null, null],
    execute: function () {
      _export("test", test);

      _export("test", test = 5);

      _export("default", test);
    }
  };
});
