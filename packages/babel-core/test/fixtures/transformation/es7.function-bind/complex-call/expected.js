"use strict";

var _context;

var _iterlib = require("iterlib");

(_context = (_context = (_context = getPlayers(), _iterlib.map).call(_context, function (x) {
  return x.character();
}), _iterlib.takeWhile).call(_context, function (x) {
  return x.strength > 100;
}), _iterlib.forEach).call(_context, function (x) {
  return console.log(x);
});
