"use strict";

var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

_applyConstructor(Numbers, _toArray(nums));
_applyConstructor(Numbers, [1].concat(_toArray(nums)));