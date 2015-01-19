"use strict";

var _bluebird = require("bluebird");

var foo = _bluebird.coroutine(function* foo() {
  var wat = yield bar();
});
