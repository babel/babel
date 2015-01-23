"use strict";

var _defaults = function (obj, defaults) {
  for (var key in defaults) {
    if (obj[key] === undefined) {
      obj[key] = defaults[key];
    }
  }

  return obj;
};

_defaults(obj, bar);
