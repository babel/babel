System.register("actual", [], function (_export) {
  "use strict";

  var __moduleName = "actual";

  var foo;
  var foo2;
  var foo3;
  var foo4;
  var foo5;
  var foo6;
  function foo7() {}
  _export("foo7", foo7);

  var foo8;
  return {
    setters: [],
    execute: function () {
      _export("foo", foo = 1);

      _export("foo2", foo2 = function () {});

      _export("foo3", foo3);

      _export("foo4", foo4 = 2);

      _export("foo5", foo5);

      _export("foo6", foo6 = 3);

      _export("foo7", foo7);

      _export("foo8", foo8 = function foo8() {});
    }
  };
});
