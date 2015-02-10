"use strict";

var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; if (obj[key] === undefined) { Object.defineProperty(obj, key, Object.getOwnPropertyDescriptor(defaults, key)); } } return obj; };

_defaults(obj, bar);