define("modules-amd/imports-mixing/expected", ["exports", "foo"], function (exports, _foo) {
  "use strict";

  var foo = _foo["default"];
  var xyz = _foo.baz;
});