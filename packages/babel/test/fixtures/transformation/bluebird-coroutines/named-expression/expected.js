"use strict";

var _bluebird = require("bluebird");

var _bar;

var foo = _bar = _bluebird.coroutine(function* () {
  console.log(_bar);
});

foo();
