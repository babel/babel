"use strict";

var _iterlib = require("iterlib");

_iterlib.forEach.call(_iterlib.takeWhile.call(_iterlib.map.call(getPlayers(), function (x) {
  return x.character();
}), function (x) {
  return x.strength > 100;
}), function (x) {
  return console.log(x);
});