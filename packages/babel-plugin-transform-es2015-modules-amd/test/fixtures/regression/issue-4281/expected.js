define(["require", "foo"], function (require, _foo) {
  "use strict";

  const _module = "test";
  let _module1 = _foo.bar;

  function foo() {
    require("module").test();
  }
});
