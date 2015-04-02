"use strict";

var _bluebird2 = require("bluebird");

var _bar;

var foo = _bar = _bluebird2.coroutine(function* () {
  console.log(_bar);
});

foo();
