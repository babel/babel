"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("./foo");

Object.keys(_foo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foo[key];
    }
  });
});
