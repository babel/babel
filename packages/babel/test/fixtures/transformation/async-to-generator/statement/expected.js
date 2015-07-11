"use strict";

var foo = babelHelpers.asyncToGenerator(function* () {
  var wat = yield bar();
});