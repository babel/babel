define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var foo = _interopRequire(_foo["default"]);

  var xyz = _foo.baz;
});
