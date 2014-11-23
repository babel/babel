System.register("actual", ["foo", "foo-bar", "./directory/foo-bar"], function ($__export) {
  "use strict";

  var __moduleName = "actual";

  var foo, bar;
  var test = 5;

  return {
    setters: [function (m) {
      foo = m.default;
      foo = m;
      bar = m.bar;
      bar = m.foo;
    }, null, null],
    execute: function () {
      $__export("test", test);

      $__export("test", test);

      $__export("default", test);
    }
  };
});
