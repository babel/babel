"use strict";

var _bluebird2 = require("bluebird");

var foo = _bluebird2.coroutine(function* () {
  var wat = yield bar();
});
