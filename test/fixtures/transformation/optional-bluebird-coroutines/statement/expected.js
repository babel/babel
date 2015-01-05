"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var _bluebird = _interopRequire(require("bluebird"));

var foo = _bluebird.coroutine(function* foo() {
  var wat = yield bar();
});
