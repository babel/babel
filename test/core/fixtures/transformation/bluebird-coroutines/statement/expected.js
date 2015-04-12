"use strict";

var _bluebird2 = require("bluebird");

var _bluebird3 = _interopRequireWildcard(_bluebird2);

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var foo = _bluebird3["default"].coroutine(function* () {
  var wat = yield bar();
});
