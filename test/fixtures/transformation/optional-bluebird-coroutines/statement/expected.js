"use strict";

var _bluebird = require("bluebird");

var foo = _bluebird.coroutine(function* () {
  var wat = yield bar();
});
